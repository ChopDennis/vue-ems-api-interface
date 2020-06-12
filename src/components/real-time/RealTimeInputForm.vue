<template>
  <div>
    <b-card
      bg-variant="dark"
      class="mb-5"
    >
      <b-form
        @submit="onSubmit"
      >
        <b-form-group
          label-cols-sm="3"
          label="輸入電錶號碼："
          label-align-sm="right"
          label-for="real-time-place-id"
        >
          <b-form-input
            v-if="admin"
            id="real-time-place-id"
            v-model="selected.place_id"
            type="text"
            placeholder="輸入電錶號碼"
          />
          <b-form-select
            v-else
            id="real-time-place-id"
            v-model="selected.place_id"
          >
            <option
              value=""
              disabled
              selected
            >
              選擇電錶號碼
            </option>
            <option
              v-for="(item, key) in options.place_id"
              :key="key"
              :value="item"
            >
              {{ key }}
            </option>
          </b-form-select>
        </b-form-group>
        <b-form-group
          v-if="admin"
          label-cols-sm="3"
          label="輸入伺服器位置："
          label-align-sm="right"
          label-for="real-time-server-ip"
        >
          <b-form-select
            id="real-time-server-ip"
            v-model="selected.server_ip"
          >
            <option
              v-for="(item, key) in options.server_ip"
              :key="key"
              :value="item"
            >
              {{ key }}
            </option>
          </b-form-select>
        </b-form-group>
        <b-button
          type="submit"
        >
          送出查詢資料
        </b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
    export default {
        name: "RealTimeInputForm",
        data() {
            return {
                admin: false,
                options: {
                    place_id: Object,
                    server_ip: {
                        '195 商辦': "db4.ima-ems.com",
                        '196 非商辦': "db2.ima-ems.com"
                    }
                },
                selected: {
                    place_id: String,
                    server_ip: String
                },
                get: {
                    params: Object
                }
            }
        },
        created() {
            const path2lists = this.$store.state.axios.baseURL + "/api/user/lists"
            this.axios.get(path2lists).then(
                (response) => {
                    this.admin = (response.data.permission === 1)
                    this.options.place_id = Object.assign({}, response.data.places)
                }
            )
        },
        methods: {
            onSubmit(e) {
                e.preventDefault()
                this.getRealTimeData()
            },
            getRealTimeData() {
                this.get.params = this.selected
                this.axios.get(this.$store.state.axios.baseURL + "/api/realtime", this.get).then(
                    (response) => {
                        this.$store.commit('setRealTimeData',response.data)
                        this.$emit('get-responded-data')
                        console.log("submit")
                    }
                )
            }
        }
    }
</script>

<style scoped>

</style>