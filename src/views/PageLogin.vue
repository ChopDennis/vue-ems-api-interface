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
        class="mb-3"
      >
        <h2>登入 EMS 系統</h2>
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
          @click="loginEMS()"
        >
          登入
        </b-button>
      </b-card>
      <h3 class="text-center">
        {{ message }}
      </h3>
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
                message: ''
            }
        },
        methods: {
            loginEMS() {
                const path = this.$store.state.axios.baseURL + "/api/user/login"
                const delayInMilliseconds = 1500;
                this.axios.post(path, this.input).then(
                    (response) => {
                        if (response.status === 200) {
                            this.message = '登入成功！'
                            document.cookie = "login=true;";
                            setTimeout(() => {
                                this.$router.push('/real-time')
                            }, delayInMilliseconds);
                        } else {
                            alert('伺服器回傳錯誤代碼：' + response.status)
                        }
                    }
                ).catch(
                    error => {
                        console.log(error)
                        alert('登入失敗，帳號或密碼錯誤')
                    }
                )
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