<template>
    <div
            id="ems-demo-page"
            class="text-white mt-5"
            style="height: 100vh"
    >
        <b-container
                id="ems-login-container"
                class="my-5 p-3"
        >
            <b-card
                    bg-variant="dark"
                    class="mb-3 px-md-5"
            >
                <h2 class="text-center mb-3">
                    立刻體驗 EMS 系統
                </h2>
               <p class="text-center">正在為您準備登入...</p>
            </b-card>
            <b-alert
                    :show="login_alert"
                    variant="success"
                    fade
                    class="text-center"
            >
                登入成功！
            </b-alert>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: "PageLogin",
        data() {
            return {
                input: {
                    email: 'ems-demo@ima-ems.com',
                    password: 'ems-spa'
                },
                login_alert: false
            }
        },
        created() {
            this.loginEMS()
        },
        methods: {
            loginEMS() {
                this.axios.post(this.$store.state.axios.baseURL + "/api/user/login", this.input).then(
                    (response) => {
                        if (response.status === 200) {
                            this.login_alert = true
                            this.getPlacesList()
                            this.insertCookie()
                            this.loadPageDelay()
                        } else {
                            alert('伺服器回傳錯誤代碼：' + response.status)
                        }
                    }
                ).catch(
                    error => {
                        alert('登入失敗，帳號或密碼錯誤：' + error)
                    }
                )
            },
            getPlacesList() {
                this.axios.get(this.$store.state.axios.baseURL + "/api/user/lists").then(
                    (response) => {
                        const isAdmin = (response.data.permission === 1)
                        this.$store.commit("setAuthority", isAdmin)
                        this.$store.commit("setOptionPlaces", response.data.places)
                    }
                )
            },
            insertCookie() {
                document.cookie = "login=true;";
            },
            loadPageDelay() {
                const delayInMilliseconds = 2000;
                setTimeout(() => {
                    this.$router.push('/real-time')
                }, delayInMilliseconds);
            }
        }
    }
</script>

<style scoped>
    #ems-login-page {
        height: 100vh;
    }

    #ems-login-container {
        border-radius: 7px;
    }
</style>