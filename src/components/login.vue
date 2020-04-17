<template>
    <div style="height: 100vh">
        <div style="color:white;background-color: rgba(255, 255, 255, 0.13);border-radius: 7px;padding: 1rem"
             class="w-75 mx-auto my-5">
            <h1>登入 EMS</h1>
            <form @submit.prevent="login" class="form-group">
                <label for="email">輸入信箱：</label>
                <input id="email" class="form-control col-lg-6 m-auto" type="email" v-model="email" required>
                <br>
                <label for="pwd">輸入密碼：</label>
                <input id="pwd" class="form-control col-lg-6 m-auto" type="password" v-model="password" required>
                <br>
                <button type="submit" class="btn-info btn">登入</button>
            </form>
        </div>
    </div>

</template>
<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                email: '',
                password: '',
                application: 'ems-spa'
            }
        },
        methods: {
            login() {
                let formValue = new FormData();
                const baseURL = "https://demo-site.ima-ems.com";
                const path = baseURL + "/api/user/login";
                formValue.append("email", this.email);
                formValue.append("password", this.password);
                let config = {

                    email: this.email,
                    password: this.password,

                };
                axios.post(path, config).then(
                    (response) => {
                        console.log(response);
                        if (response.status === 200) {
                            this.$router.push('/real-time');
                        }
                        else {
                            alert('login failed');
                        }
                    }
                ).catch(error => {
                    console.log(error);
                })
            }
        }
    }
</script>