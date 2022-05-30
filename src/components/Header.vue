<template>
  <nav
    class="
      flex
      justify-center
      gap-10
      p-10
      border-solid border-b-4 border-purple-500
      mb-6
    "
  >
    <router-link
      class="
        text-lg
        hover:text-purple-700 hover:ring
        rounded-tl-full rounded-br-full
        px-3
        duration-300
      "
      :to="{ name: 'Home' }"
      >Home</router-link
    >
    <router-link
      class="
        text-lg
        hover:text-purple-700 hover:ring
        rounded-tl-full rounded-br-full
        px-3
        duration-300
      "
      :to="{ name: 'Add' }"
      >Add Restaurant</router-link
    >
    <a
      href="#"
      class="
        text-lg
        hover:text-purple-700 hover:ring
        rounded-tl-full rounded-br-full
        px-3
        duration-300
      "
      @click="logout"
      >Logout</a
    >
    
  </nav>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    function logout() {
      localStorage.clear();
      router.push({ name: "Login" });
    }

    return {
      logout,
    };
  },
};
</script>

<style scoped>
.router-link-active,
.router-link-exact-active {
    background-color: rgb(192, 7, 192);
    color: white;
    padding: 0 1rem;
}
</style>