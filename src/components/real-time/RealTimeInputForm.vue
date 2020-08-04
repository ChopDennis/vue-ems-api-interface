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
              v-for="(item, key) in $store.getters.OptionPlaces"
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
          label-for="real-time-server-ip"
        >
          <b-form-select
            id="real-time-server-ip"
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
              v-for="(item, key) in option.server_ip"
              :key="key"
              :value="item"
            >
              {{ key }}
            </option>
          </b-form-select>
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
        name: "RealTimeInputForm",
        data() {
            return {
                admin: this.$store.getters.Authority,
                option: {
                    server_ip: {
                        '195 商辦': "db4.ima-ems.com",
                        '196 非商辦': "db2.ima-ems.com"
                    }
                },
                selected: {
                    place_id: "",
                    server_ip: ""
                },
                get: {
                    params: Object
                }
            }
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
                        this.$store.commit('setRealTimeData', response.data)
                        this.$emit('get-responded-data')
                    }
                )
            },
            alert() {
                alert("OK")
            }
        }
    }
</script>

<style scoped>

</style>