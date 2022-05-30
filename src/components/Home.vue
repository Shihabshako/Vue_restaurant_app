<template>
  <Header />
  <h2 class="text-3xl text-center">This is home page welcome {{ name }}</h2>

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-1/2 mx-auto mt-20">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="
          text-xs text-gray-700
          uppercase
          bg-gray-50
          dark:bg-gray-700 dark:text-gray-400
        "
      >
        <tr>
          <th scope="col" class="px-6 py-3">ID</th>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Contact</th>
          <th scope="col" class="px-6 py-3">Address</th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="item in restaurants" :key="item.id">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                {{ item.id }}
            </th>
            <td class="px-6 py-4">
                {{ item.name }}
            </td>
            <td class="px-6 py-4">
                {{ item.contact }}
            </td>
            <td class="px-6 py-4">
                {{ item.address }}
            </td>
            <td class="px-6 py-4 text-right space-x-4">
                <router-link :to="{name: 'Update', params: {id: item.id} }" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</router-link>
                <button @click="deleteItem(item.id)" class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
            </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Header from "./Header.vue";
import axios from "axios";

export default {
  setup() {
    const router = useRouter();
    const restaurants = ref({});
    const name = ref("");

    async function deleteItem(id){
        if(!confirm('Do you want to delete this item?')){
            return;
        }
        await axios.delete("http://localhost:3001/restaurants/"+id);
        let result = await axios.get("http://localhost:3001/restaurants");
         restaurants.value = result.data;
    }

    onMounted(async () => {
      let user = localStorage.getItem("userInfo");
      name.value = JSON.parse(user).name;
      if (!user) {
        router.push({ name: "SignUp" });
      }
      let result = await axios.get("http://localhost:3001/restaurants");
      restaurants.value = result.data;
    });
    return {
      name,
      restaurants,
      deleteItem
    };
  },
  components: { Header },
};
</script>

<style>
</style>