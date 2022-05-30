import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import SignUp from "../components/SignUp.vue";
import Login from "../components/Login.vue";
import AddRestaurant from "../components/AddRestaurant.vue";
import UpdateRestaurant from "../components/UpdateRestaurant.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/sign-up",
      name: "SignUp",
      component: SignUp,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/add",
      name: "Add",
      component: AddRestaurant,
    },
    {
      path: "/update/:id",
      name: "Update",
      component: UpdateRestaurant,
      props: true,
    },
  ],
});

export default router;
