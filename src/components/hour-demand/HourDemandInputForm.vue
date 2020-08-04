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
                        label-for="heatmap-place-id"
                >
                    <b-form-input
                            v-if="admin"
                            id="heatmap-place-id"
                            v-model="selected.place_id"
                            type="text"
                            placeholder="輸入電錶號碼"
                    />
                    <b-form-select
                            v-else
                            id="heatmap-place-id"
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
                        label-for="heatmap-server-ip"
                >
                    <b-form-select
                            id="heatmap-server-ip"
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
                        label-for="heatmap-date"
                >
                    <b-form-input
                            id="heatmap-date"
                            v-model="selected.date"
                            type="date"
                    />
                </b-form-group>
                <b-form-group
                        label-cols-sm="3"
                        label="顯示天數："
                        label-align-sm="right"
                        label-for="heatmap-days"
                >
                    <b-form-select
                            id="heatmap-days"
                            v-model="selected.days"
                    >
                        <option
                                value=""
                                disabled
                                selected
                        >
                            選擇顯示天數
                        </option>
                        <option
                                v-for="days in 31"
                                :key="days"
                        >
                            {{ days }}
                        </option>
                    </b-form-select>
                </b-form-group>
                <b-row>
                    <b-col offset-lg="3" lg="3" class="text-center">
                        <b-button
                                type="submit"
                                class="btn-info mb-lg-0 mb-3"
                        >
                            送出查詢資料
                        </b-button>
                    </b-col>
                    <b-col lg="3" class="text-center">
                        <b-button v-show="downloadBtnShow">
                            <a
                                    :href="csvHref"
                                    :download="fileName"
                                    style="color: white!important;"
                            >下載表格資料</a>
                        </b-button>
                    </b-col>
                </b-row>


            </b-form>
        </b-card>
    </div>
</template>

<script>
    export default {
        name: "HeatmapInputForm",
        props: {
            csvHref: {
                type: String,
                required: true
            },
            fileName: {
                type: String,
                required: true
            },
            downloadBtnShow: {
                type: Boolean,
                default: false,
                required: true
            }
        },
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
                    place_id: "",
                    server_ip: "",
                    date: "",
                    days: ""
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
                let heatmapFormValue = new FormData()
                heatmapFormValue.append("device_id", this.selected.place_id)
                heatmapFormValue.append("check_day", this.selected.date)
                heatmapFormValue.append("days", this.selected.days)
                heatmapFormValue.append("server_ip", this.selected.server_ip)
                this.axios.post(this.$store.state.axios.baseURL + "/api/analytic/kw_summary/range", heatmapFormValue).then(
                    (response) => {
                        this.$store.commit("setHeatmapData", response.data)
                        this.$emit('get-responded-data', this.selected)
                    }
                )
            },
        }
    }
</script>

<style scoped>

</style>