<template>
  <div>
    <b-card
      bg-variant="dark"
      class="mb-5 px-lg-5"
    >
      <b-form
        @submit="onSubmit"
      >
        <b-form-group
          label-cols-sm="3"
          label="電錶號碼："
          label-align-sm="right"
          label-for="demand-place-id"
        >
          <b-form-input
            v-if="admin"
            id="demand-place-id"
            v-model="selected.place_id"
            type="text"
            placeholder="輸入電錶號碼"
          />
          <b-form-select
            v-else
            id="demand-place-id"
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
          label="伺服器位置："
          label-align-sm="right"
          label-for="demand-server-ip"
        >
          <b-form-select
            id="demand-server-ip"
            v-model="selected.server_ip"
          >
            <option
              value=""
              disabled
              selected
            >
              選擇伺服器
            </option>
            <option
              v-for="(item, key) in options.server_ip"
              :key="key"
              :value="item"
            >
              {{ key }}
            </option>
          </b-form-select>
        </b-form-group>
        <b-form-group
          label-cols-sm="3"
          label="日期："
          label-align-sm="right"
          label-for="demand-date"
        >
          <b-form-input
            id="demand-date"
            v-model="selected.date"
            type="date"
          />
        </b-form-group>
        <b-button
          type="submit"
          class="m-auto d-block"
        >
          送出查詢資料
        </b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
    export default {
        name: "DemandInputForm",
        data(){
            return{
                admin: false,
                options: {
                    place_id: Object,
                    server_ip: {
                        '195 商辦': "db4.ima-ems.com",
                        '196 非商辦': "db2.ima-ems.com"
                    }
                },
                selected: {
                    place_id: "",
                    server_ip: "",
                    date: "",
                },
            }
        },created() {
            const path2lists = this.$store.state.axios.baseURL + "/api/user/lists"
            this.axios.get(path2lists).then(
                (response) => {
                    this.admin = (response.data.permission === 1)
                    this.options.place_id = Object.assign({}, response.data.places)
                }
            )
        },methods: {
            onSubmit(e) {
                e.preventDefault()
                let demandFormValue = new FormData()
                demandFormValue.append("device_id", this.selected.place_id)
                demandFormValue.append("check_day", this.selected.date)
                demandFormValue.append("server_ip", this.selected.server_ip)
                this.axios.post(this.$store.state.axios.baseURL + "/api/analytic/kw_summary", demandFormValue).then(
                    (response) => {
                        this.$store.commit("setDemandData",response.data)
                        this.$store.commit("setSelectedDate", this.selected.date)
                        this.$emit('get-responded-data',this.selected)
                    }
                )
            },
        }
    }
</script>

<style scoped>

</style>