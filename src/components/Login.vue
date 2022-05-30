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
          class="h-8 w-8 text-purple-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
          />
        </svg>
        <h2 class="text-3xl">Login</h2>
      </div>

      <div class="flex flex-col gap-4">
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
        <p class="self-end">
          Not a member?
          <router-link class="pb-4 underline" :to="{ name: 'SignUp' }"
            >SignUp</router-link
          >
        </p>
        <button
          class="p-1 px-8 bg-purple-600 text-white rounded-full self-center"
          @click="login"
          @keypress.enter="login"
        >
          Login
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
      email: "",
      password: "",
    });
    const router = useRouter()

    async function login() {
      let result = await axios.get("http://localhost:3001/users?email="+user.email+"&password="+user.password);

      if (result.status == 200 && result.data.length > 0) {
        
        localStorage.setItem('userInfo', JSON.stringify(result.data[0]))
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
      login,
    };
  },
};
</script>

<style>
</style>