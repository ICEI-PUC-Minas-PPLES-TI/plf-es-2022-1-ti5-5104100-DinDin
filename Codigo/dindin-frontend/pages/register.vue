<template>
    <!--Container-->
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="12" md="10" lg="6">
                <v-card width="100%" style="padding: 5vh">
                    <v-card-title
                        ><h2><b>Register</b></h2></v-card-title
                    >

                    <v-card-text
                        class="register-card-text"
                        style="padding: 7vh"
                    >
                        <v-form ref="user" lazy-validation autocomplete="off">
                            <v-row>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field
                                        v-model="user.name"
                                        dense
                                        hide-details="auto"
                                        label="Name"
                                        placeholder="Full name"
                                        outlined
                                        :rules="[
                                            (value) =>
                                                !!value || 'Name is requried',
                                        ]"
                                    ></v-text-field>
                                </v-col>
                                <!--LOGIN-->
                                <v-col cols="12" sm="12">
                                    <v-text-field
                                        v-model="user.email"
                                        dense
                                        hide-details="auto"
                                        label="Email"
                                        placeholder="Enter Email Address"
                                        outlined
                                        :rules="[
                                            (value) =>
                                                !!value || 'Email is requried',
                                        ]"
                                    ></v-text-field>
                                </v-col>
                                <!--SENHA-->
                                <v-col cols="12" sm="12">
                                    <v-text-field
                                        v-model="user.password"
                                        dense
                                        :append-icon="
                                            show1 ? 'mdi-eye' : 'mdi-eye-off'
                                        "
                                        :rules="[
                                            (value) =>
                                                !!value ||
                                                'Password is requried',
                                            rules.min,
                                        ]"
                                        :type="show1 ? 'text' : 'password'"
                                        label="Password"
                                        hint="At least 8 caracteres"
                                        hide-details="auto"
                                        outlined
                                        @click:append="show1 = !show1"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="12">
                                    <v-text-field
                                        v-model="user.confirmPassword"
                                        dense
                                        :append-icon="
                                            show2 ? 'mdi-eye' : 'mdi-eye-off'
                                        "
                                        :rules="[
                                            (value) =>
                                                !!value ||
                                                'Confirm Password is requried',
                                            rules.equal,
                                        ]"
                                        :type="show2 ? 'text' : 'password'"
                                        label="Confirm Password"
                                        hint="At least 8 caracteres"
                                        hide-details="auto"
                                        outlined
                                        @click:append="show2 = !show2"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="mt-n3">
                                <v-col cols="12" sm="12">
                                    <v-checkbox
                                        v-model="user.agree"
                                        :rules="[
                                            (v) =>
                                                !!v ||
                                                'You must agree to continue!',
                                        ]"
                                    >
                                        <template #label>
                                            <div>
                                                I’ve read and agree to the
                                                <v-tooltip bottom>
                                                    <template
                                                        #activator="{ on }"
                                                    >
                                                        <a
                                                            target="_blank"
                                                            href="https://vuetifyjs.com"
                                                            @click.stop
                                                            v-on="on"
                                                        >
                                                            terms
                                                        </a>
                                                    </template>
                                                    Opens in new window
                                                </v-tooltip>
                                                of privacy policy
                                            </div>
                                        </template>
                                    </v-checkbox>
                                </v-col>
                            </v-row>
                        </v-form>
                        <!--BOTAO-->
                        <v-row no-gutters>
                            <v-flex align-self-center>
                                <v-btn
                                    large
                                    block
                                    color="primary"
                                    @click="createUser"
                                >
                                    <h3>Register</h3>
                                </v-btn>
                                <div class="text-center mt-1">
                                    <p>
                                        Alredy have an account?
                                        <a @click="redirectToLogin()">
                                            Sing in
                                        </a>
                                    </p>
                                </div>
                            </v-flex>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Swal from "sweetalert2";
export default {
    layout: "main",

    data() {
        return {
            show1: false,
            show2: false,
            toast: false,
            redirect: false,
            toastMensagem: "",
            user: {
                name: "",
                password: "",
                confirmPassword: "",
                agree: false,
            },
            rules: {
                min: (v) => {
                    if (v && v.length >= 8) return true;
                    else return "Min 8 chars";
                },
                equal: (v) =>
                    v === this.user.password || "Passwords don't match",
            },
        };
    },
    methods: {
        createUser() {
            if (this.$refs.user.validate()) {
                this.$axios
                    .post("/user", this.user)
                    .then((res) => {
                        if (res.data?.id > 0) {
                            Swal.fire({
                                title: "Success!",
                                text: "User registered successfully!",
                                icon: "success",
                                showConfirmButton: false,
                                toast: true,
                                position: "top-end",
                                timer: 3000,
                                timerProgressBar: true,
                            });
                            this.redirect = true;
                        }
                        this.cleanData();
                    })
                    .catch((err) => {
                        Swal.fire({
                            title: "Error!",
                            text: err.response.data.message,
                            icon: "error",
                            showConfirmButton: false,
                            toast: true,
                            position: "top-end",
                            timer: 3000,
                            timerProgressBar: true,
                        });
                    });
            }
        },
        cleanData() {
            this.user = {
                name: "",
                senha: "",
                agree: false,
            };
            this.$refs.user.reset();
        },

        redirectToLogin() {
            this.$router.push("/login");
            this.toast = false;
        },
    },
};
</script>

<style scoped>
@media only screen and (max-width: 700px) {
    .register-card-text {
        /* background-color: lightblue; */
        padding: 1vh !important;
    }
}
</style>
