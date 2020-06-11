<template>
  <nav class="navbar row fixed-top">
    <div class="col-lg-3 col-6">
      <div class="float-left">
        <img
          src="../assets/logo.png"
          style="width: 30px"
        >
        <span style="color: white;vertical-align: middle;font-weight: bold;font-size: 1.5rem;letter-spacing: 2px">今時科技</span>
      </div>
    </div>
    <div class="col-lg-6 mobile-disable">
      <div class="row">
        <router-link
          class="col-3 mobile-disable"
          to="/real-time"
        >
          即時用電量
        </router-link>
        <router-link
          class="col-3 mobile-disable"
          to="/heatmap"
        >
          每日用電熱圖
        </router-link>
        <router-link
          class="col-3 mobile-disable"
          to="/area"
        >
          每十五分鐘需量
        </router-link>
        <router-link
          class="col-3 mobile-disable"
          to="/heatmap-month"
        >
          每小時最高需量
        </router-link>
        <a
          class="col-3 mobile-disable"
          href=""
          @click.prevent="logout"
        >登出系統</a>
      </div>
    </div>
    <div class="col-lg-3 col-6">
      <a
        class="float-right desktop-disable"
        data-toggle="collapse"
        href="#collapseExample"
        role="button"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        <i
          class="fa fa-th-list"
          style="font-size: 24px"
        />
      </a>
    </div>
  </nav>
</template>
<script>
    import axios from 'axios'
    axios.defaults.withCredentials = true
        const baseURL = "https://demo-site.ima-ems.com"
//    const baseURL = ""
    export default {
        methods: {
            logout() {
                this.$router.push('/')
                axios.get(baseURL + "/api/user/logout").then(
                    (response) => {
                        console.log(response)
                        document.cookie = "login=false;";
                        alert("已登出系統，請重新登入")
                    }
                ).catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>