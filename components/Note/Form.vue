<script setup lang="ts">
import { noteType } from "@/types"

const noteForm = reactive({
    title: "",
    body : ""
})

interface EmitType {
    (e : "pushNewNote", note : noteType) : void
}

const emit = defineEmits<EmitType>()

const { supabase } = useSupabase()
const { user } = useAuth()

const addNotesToDatabase = async () => {
    if (!noteForm.title || !noteForm.body) return

    try {
        const insertedNote : noteType = {
            title: noteForm.title,
            notes: noteForm.body,
            user_id : user.value.id
        }
        await supabase.from("notes").insert(insertedNote)
        emit("pushNewNote" , insertedNote)
        noteForm.body = ""
        noteForm.title = ""

    }
    catch (e) {
        throw e
    }
}
</script>

<template>
    <div class="p-1.5rem flex flex-col justify-center space-y-4">
        <input 
            type="text"
            v-model="noteForm.title"
            placeholder="note title"
        >
        <textarea 
            cols="30" 
            rows="10"
            v-model="noteForm.body"
            placeholder="note body"
        />
        <button
            @click="addNotesToDatabase" 
            class="bg-white self-center cursor-pointer border-gray-800 border-solid border text-gray-800 rounded py-2 px-4"
        >
            Save note
        </button>
    </div>
</template>

<style scoped>
input, textarea {
    border: 1px solid rgb(203, 203, 203);
    width: 100%;
    border-radius: 5px;
    padding: 0.5rem;
    outline: none;
}
</style>