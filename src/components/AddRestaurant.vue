<template>
    <Header />
    <form class="w-1/2  bg-gray-700 p-10 rounded-lg mx-auto mt-20 flex flex-col  space-y-6" @submit.prevent="handleForm">
        <div>
            <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
            <input type="text" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="name">
        </div>
        <div>
            <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Contact</label>
            <input type="text" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="contact">
        </div>
        <div>
            <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Address</label>
            <input type="text" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="address">
        </div>
         <div class="flex items-center justify-end space-x-4">
             <router-link :to="{ name: 'Home' }" class="self-end text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Cancel</router-link>
             <button type="submit" class="self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
         </div>
    </form>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import Header from './Header.vue';
import axios from 'axios';
export default {
    setup() {
        const router = useRouter();
        const restaurant = reactive({
            'name' : '',
            'contact' : '',
            'address' : ''
        })
        async function handleForm(){
            event.preventDefault()
            let result = await axios.post('http://localhost:3001/restaurants', restaurant)
            restaurant.name = ''
            restaurant.address = ''
            restaurant.contact = ''
            if(result.status = 201)
                router.push({name : 'Home'})
            else
                alert('Something went wrong please try again')
        }
        onMounted(() => {
            let user = localStorage.getItem("userInfo");
            if (!user) {
                router.push({ name: "SignUp" });
            }
        });
        return{
            handleForm,
            ...toRefs(restaurant)
        }
    },
    components: { Header }
};
</script>

<style>
</style>