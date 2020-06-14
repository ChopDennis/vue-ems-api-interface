<template>
  <div id="ima-ems-header">
    <b-container>
      <b-navbar
        toggleable="lg"
        type="dark"
        variant="info"
      >
        <b-navbar-brand
          id="ima-ems-logo"
          to="/real-time"
        >
          <img
            alt="ima-logo"
            src="../assets/logo.png"
          >
          <span class="mx-1">今時科技</span>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse" />
        <b-collapse
          id="nav-collapse"
          is-nav
        >
          <b-navbar-nav>
            <b-nav-item
              to="real-time"
              class="my-3 text-center"
            >
              即時用電量
            </b-nav-item>
            <b-nav-item
              to="heatmap"
              class="my-3 text-center"
            >
              每日用電熱圖
            </b-nav-item>
            <b-nav-item
              to="real-time"
              class="my-3 text-center"
            >
              每十五分鐘需量
            </b-nav-item>
            <b-nav-item
              to="real-time"
              class="my-3 text-center"
            >
              每小時最高需量
            </b-nav-item>
            <b-nav-item
              class="my-3 text-center"
              @click="loginEMS"
            >
              登出系統
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </b-container>
    <b-modal
      id="ima-ems-logout"
      centered
      hide-footer
      hide-header
      body-bg-variant="dark"
      no-close-on-backdrop
    >
      <div class="text-center p-4 rounded-lg">
        <h4>已登出系統，請重新登入</h4>
        <b-button
          variant="info"
          class="mt-3"
          block
          @click="$router.push('/')"
        >
          確認
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
    export default {
        name: "TheHeader",
        methods: {
            loginEMS() {
                this.axios.get(this.$store.state.axios.baseURL + "/api/user/logout").then(
                    (response) => {
                        if (response.data.status === "success") {
                            this.$bvModal.show('ima-ems-logout')
                            document.cookie = "login=false;";
                        }
                    }
                ).catch((error) => {
                    alert("伺服器錯誤，無法登出：" + error)
                })
            }
        }
    }
</script>

<style scoped>
    #ima-ems-header {
        background-color: rgb(23, 162, 184);
    }

    #ima-ems-logo img {
        width: 30px;
    }

    #ima-ems-logo span {
        vertical-align: middle;
        font-weight: bold;
        letter-spacing: 2px;
    }

    #nav-collapse {
        background-color: rgba(23, 162, 184, 0.7);
        z-index: 99;
    }

    @media screen and (max-width: 991px) {
        #nav-collapse {
            margin: 0 -2rem;
        }
    }

    @media screen and (min-width: 992px) {
        #nav-collapse {
            height: 0;
        }
    }

    a {
        color: white !important;
        letter-spacing: 1px;
    }
</style>