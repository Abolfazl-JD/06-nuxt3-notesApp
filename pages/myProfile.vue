<script setup lang="ts">
import { responseType, noteType } from "@/types"

definePageMeta({
    middleware: ["auth"]
})

const notesResponse = ref<null | responseType>(null)

const addNewNote = (note : noteType) => {
    notesResponse.value?.body.push(note)
}

const { supabase } = useSupabase()
const { user } = useAuth()

if (process.client) {
    notesResponse.value = await supabase.from("notes").select().eq("user_id", user.value.id)
}
</script>

<template>
    <div>
        <div class="container mx-auto p-8 h-90vh w-1/2">
            <h3 class="text-2rem">My Notes</h3>
            <NoteForm @push-new-note="addNewNote" />
            <div 
                class="p-4"
                v-if="notesResponse.body"
            >
                <div 
                    class="py-4 px-8 border border-solid rounded border-gray-300 mt-5" 
                    v-for="note in notesResponse.body" 
                    :key="note.id"
                >
                    <h2 class="font-bold text-2xl mt-0"> {{ note.title }} </h2>
                    <p> {{ note.notes }} </p>
                </div>
            </div>
        </div>
    </div>
</template>