<template>
    <login />
</template>

<script>
import login from "./login.vue";
export default {
    components: { login },
    name: "IndexPage",
    asyncData({ store, redirect }) {
        if (store.getters["login/token"]) {
            redirect("/dashboard");
        }
    },
};
</script>
