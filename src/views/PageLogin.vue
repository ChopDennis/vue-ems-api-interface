<template>
  <div
    id="ems-login-page"
    class="text-white"
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
          登入 EMS 系統
        </h2>
        <b-form-group
          label-cols-sm="3"
          label="輸入信箱："
          label-align-sm="right"
          label-for="ems-email"
        >
          <b-form-input
            id="ems-email"
            v-model="input.email"
            type="email"
            required
          />
        </b-form-group>
        <b-form-group
          label-cols-sm="3"
          label="輸入密碼："
          label-align-sm="right"
          label-for="ems-password"
        >
          <b-form-input
            id="ems-email"
            v-model="input.password"
            type="password"
            required
          />
        </b-form-group>

        <b-button
          type="submit"
          class="d-block m-auto"
          @click="loginEMS()"
        >
          登入
        </b-button>
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
                    email: '',
                    password: ''
                },
                login_alert: false
            }
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
                const delayInMilliseconds = 1500;
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