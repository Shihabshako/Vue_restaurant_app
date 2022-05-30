<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <div
      class="
        flex flex-col
        gap-10
        w-3/4
        shadow-2xl shadow-purple-400
        p-8
        rounded-xl
        xl:w-1/4
        lg:w-2/5
        md:w-2/5
        sm:w-1/2
      "
    >
      <div class="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 text-purple-700"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
          />
        </svg>
        <h2 class="text-3xl">Sign Up</h2>
      </div>

      <div class="flex flex-col gap-4">
        <input
          type="text"
          class="
            p-1
            px-3
            border-solid border-2 border-purple-400
            rounded-full
            focus:outline-red-500
          "
          placeholder="Name"
          v-model="name"
        />
        <input
          type="email"
          class="
            p-1
            px-3
            border-solid border-2 border-purple-400
            rounded-full
            focus:outline-red-500
          "
          placeholder="Email"
          v-model="email"
        />
        <input
          type="password"
          class="
            p-1
            px-3
            border-solid border-2 border-purple-400
            rounded-full
            focus:outline-red-500
          "
          placeholder="Password"
          v-model="password"
        />
        <p class="self-end">Already a member? <router-link class="pb-4 underline" :to="{name : 'Login'}">Login</router-link> </p>
        <button
          class="p-1 px-8 bg-purple-600 text-white rounded-full self-center"
          @click="signUp"
          @keypress.enter="signUp"
        >
          Sign Up
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
export default {
  setup() {
    const user = reactive({
      name: "",
      email: "",
      password: "",
    });
    const router = useRouter()

    async function signUp() {
      let result = await axios.post("http://localhost:3001/users", user);
      console.log(result);

      if (result.status == 201) {
        
        localStorage.setItem('userInfo', JSON.stringify(result.data))
        user.name = "";
        user.email = ""
        user.password = ""
        
        router.push({name:'Home'})
      }
    }

    onMounted(() => {
        let user = localStorage.getItem('userInfo')
        if(user){
            router.push({name : 'Home'})
        }
    })

    return {
      ...toRefs(user),
      signUp,
    };
  },
};
</script>

<style>
</style>