<script setup lang="ts">

const authState = ref<"login" | "signup">("login")
const changeAuthState = () => authState.value === 'login' ? authState.value = "signup" : authState.value = "login"

const buttonTxt = computed(() => {
    if (authState.value === 'login') return "Don't you have an account ? Create one"
    else return "Already have an account ? Go ahead and Login"
})

const formData = reactive({
    email: "",
    password : ""
})
const router = useRouter()

const { signup, login, signout, user } = useAuth()
const authError = ref("")
const showVerificationMessage = ref(false)

const submitForm = async () => {
    try {
        if (authState.value === 'login') {
            await login(formData.email, formData.password) 
            router.push("/myProfile")
        }
        else {
            await signup(formData.email, formData.password)
            showVerificationMessage.value = true
        }
        formData.email = ""
        formData.password = ""
    }
    catch (error) {
        authError.value = error.message
    }
}

watch(authError, () => {
    setTimeout(() => {
        authError.value = ""
    }, 5000)
})
</script>

<template>
<div>
    <div
        v-if="!showVerificationMessage" 
        class="border-gray-300 w-25rem border-solid border p-2rem"
    >
        <h3 class="text-3xl mb-4 mt-0">
            {{ authState === "login" ? "Login" : "Signup" }}
        </h3>
        <div class="flex mb-4 flex-col space-y-4">
            <input 
                type="text" 
                placeholder="Email"
                v-model="formData.email"
            >
            <input 
                type="password" 
                placeholder="password"
                v-model="formData.password"
            >
        </div>
        <button 
            @click="submitForm"
            class="bg-white cursor-pointer border-black border-solid border text-gray-800 rounded py-2 px-4"
        >
            Submit
        </button>
        <p 
            @click="changeAuthState"
            class="text-blue-500 mt-2 text-sm cursor-pointer"
        >
            {{ buttonTxt }}
        </p>
        <p 
            v-if="authError"
            class="text-red-600 text-sm"
        >
            {{ authError }}
        </p>
    </div>
    <h3 v-else>
        We've sent you a virification email;
        <br>
        please verify your email
    </h3>
</div>
</template>

<style scoped>
input {
    padding: 0.5rem;
    outline: none;
    border : 1px solid rgb(215, 215, 215);
    border-radius: 5px;
}
</style>