<template>
    <div>.</div>
</template>
<script>
export default {
    methods: {
        logOut() {
            document.cookie =
                "dindin-cookies=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            this.$router.push("/login");
        },
    },
    mounted() {
        this.logOut();
    },
};
</script>
