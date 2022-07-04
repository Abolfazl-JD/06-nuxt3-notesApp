<script lang="ts" setup>

const router = useRouter()

const { signout, user } = useAuth()
const logout = async () => {
    await signout()
    router.push("/")
}

const isLoggedIn = computed(() => !!user.value)
</script>

<template>
    <nav class="bg-black h-10vh">
        <ul class="flex items-center h-full px-2rem list-none">
            <li>
                <nuxt-link to="/">Home</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/myProfile">my profile</nuxt-link>
            </li>
            <li 
                v-if="isLoggedIn"
                @click="logout"
                class="ml-auto cursor-pointer"
            >
                logout
            </li>
        </ul>
    </nav>
</template>

<style scoped>
li {
    color: white;
    margin-right: 1rem;
}

a {
    text-decoration: none;
    color: white;
}
</style>