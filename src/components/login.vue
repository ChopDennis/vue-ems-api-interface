<template>
  <div style="height: 100vh">
    <div
      style="color:white;background-color: rgba(255, 255, 255, 0.13);border-radius: 7px;padding: 1rem"
      class="w-75 mx-auto my-5"
    >
      <h1>登入 EMS</h1>
      <form
        class="form-group"
        @submit.prevent="login"
      >
        <label for="email">輸入信箱：</label>
        <input
          id="email"
          v-model="input.email"
          class="form-control col-lg-6 m-auto"
          type="email"
          required
        >
        <br>
        <label for="pwd">輸入密碼：</label>
        <input
          id="pwd"
          v-model="input.password"
          class="form-control col-lg-6 m-auto"
          type="password"
          required
        >
        <br>
        <button
          type="submit"
          class="btn-info btn"
        >
          登入
        </button>
      </form>
    </div>
    <h3>{{ message }}</h3>
  </div>
</template>
<script>
    import axios from 'axios'
//    const baseURL = "https://demo-site.ima-ems.com"
//    const baseURL = ""
    axios.defaults.withCredentials = true
    export default {
        data() {
            return {
                input: {
                    email: '',
                    password: ''
                },
                message: '',
            }
        },
        methods: {
            login() {
                const path = this.$store.state.axios.baseURL + "/api/user/login"
                let config = {
                    email: this.input.email,
                    password: this.input.password,
                }
                axios.post(path, config).then(
                    (response) => {
                        if (response.status === 200) {
                            console.log(response)
                            console.log(document.session)
                            this.message = '登入成功！'
                            const delayInMilliseconds = 1500;
//                            this.setCookie('login', true, 1)
                            document.cookie = "login=true;";
                            setTimeout(() => {
                                this.$router.push('/real-time')
                            }, delayInMilliseconds);
                        }
                        else {
                            alert('伺服器回傳錯誤代碼：' + response.status)
                        }
                    }
                ).catch(error => {
                    console.log(error)
                    alert('登入失敗，帳號或密碼錯誤')
                })
            },
            setCookie(cname, cvalue, exdays) {
                let d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                let expires = "expires=" + d.toUTCString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            }
        }
    }
</script>