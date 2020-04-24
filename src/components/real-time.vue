<template>
    <div style="padding-top: 75px;padding-bottom: 75px">
        <div class="collapse" id="collapseExample" style="background-color: rgb(24, 23, 69);
    padding: 1em;
    margin-top: -15px;">
            <ul class="list-group text-left" style="list-style: none">
                <li style="line-height: 40px;">
                    <router-link style="color: white" class="col-2" to="/real-time">即時用電量</router-link>
                </li>
                <li style="line-height: 40px;">
                    <router-link style="color: white" class="col-2" to="/heatmap">每日用電熱圖</router-link>
                </li>
                <li style="line-height: 40px;">
                    <router-link style="color: white" class="col-2" to="/area">每十五分鐘需量</router-link>
                </li>
                <li style="line-height: 40px;">
                    <!--<a style="color: white" class="col-2" href="" @click.prevent="logout">登出系統</a>-->
                    <a style="color: white" class="col-2" href="" @click.prevent="logout">登出系統</a>
                </li>
            </ul>
        </div>
        <div class="container">
            <form class="form-group" @submit="onSubmit">
                <div class="row">
                    <div class="col-lg-2 col-md-6">
                        <label for="placeID"></label>
                        <input v-if="admin" class="form-control" type="text" placeholder="輸入電錶號碼"
                               v-model="input.placeID.selected"/>
                        <select v-else="" class="form-control" id="placeID" v-model="input.placeID.selected">
                            <option value="" disabled selected>選擇電錶號碼</option>
                            <option v-for="(item, key) in input.placeID.options" :value="item" :key="key">
                                {{key}}
                            </option>
                        </select>
                    </div>
                    <div v-if="admin" class="col-lg-2 col-md-6">
                        <label for="server_ip"></label>
                        <input class="form-control" type="text" placeholder="輸入伺服器位置" id="server_ip"
                               v-model="get.params.server_ip">
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <button @click="resetApex" class="btn btn-info mt-4" style="width: 80%" type="submit">
                            送出查詢資料
                        </button>
                    </div>
                    <div class="col-lg-3 col-md-12 mt-4">
                        <span style="color: white;line-height: 35px">下一次資料更新時間為：{{output.countdown}} 秒後</span>
                    </div>
                </div>
            </form>
            <div style="background-color: rgba(29,27,65,.6);
    border-radius: 7px;
    padding: 1rem 0;margin: 0" class="row">
                <div class="col-lg-3 offset-lg-1 col-md-12 text-center py-3">
                    <!--總用電度數（kWh）-->
                    <div class="row">
                        <div class="col-lg-12 col-6"><p class="real-time-title">{{output.lists[5].name}}</p>
                            <p class="real-time-value">{{output.lists[5].value}}</p></div>
                        <div class="col-lg-12 col-6"><p class="real-time-title">{{output.lists[2].name}}</p>
                            <p class="real-time-value">{{output.lists[2].value}}</p></div>
                    </div>
                    <img style="padding: 2rem;width:200px;" src="../assets/battery.png"/>
                </div>
                <div class="col-lg-7 col-md-12 text-center">
                    <div class="row py-3" style="background-color: hsla(0, 0%, 100%, .13);
    margin: 0;
    border-radius: 7px;">
                        <div class="col-4"><p class="real-time-title">{{output.lists[0].name}}</p>
                            <p class="real-time-value">{{output.lists[0].value}}</p>
                            <p class="real-time-title">{{output.lists[8].name}}</p>
                            <p class="real-time-value">{{output.lists[8].value}}</p></div>
                        <div class="col-4"><p class="real-time-title">{{output.lists[1].name}}</p>
                            <p class="real-time-value">{{output.lists[1].value}}</p>
                            <p class="real-time-title">{{output.lists[9].name}}</p>
                            <p class="real-time-value">{{output.lists[9].value}}</p></div>
                        <div class="col-4">
                            <p class="real-time-title">{{output.lists[11].name}}</p>
                            <p class="real-time-value">{{output.lists[11].value}}</p>
                            <p class="real-time-title">{{output.lists[10].name}}</p>
                            <p class="real-time-value">{{output.lists[10].value}}</p></div>
                    </div>
                    <div class="row p-3">
                        <div class="col-4">
                            <p style="font-size: 14px;color: darkgrey">{{output.lists[3].name}}</p>
                            <p style="font-weight:bold;font-size: 12px;color: white">{{output.lists[3].value}}</p>
                        </div>
                        <div class="col-4">
                            <p style="font-size: 14px;color: darkgrey">{{output.lists[4].name}}</p>
                            <p style="font-weight:bold;font-size: 12px;color: white">{{output.lists[4].value}}</p>
                        </div>
                        <div class="col-4">
                            <p style="font-size: 14px;color: darkgrey">{{output.lists[7].name}}</p>
                            <p style="font-weight:bold;font-size: 12px;color: white">{{output.lists[7].value}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <p class="mt-4" style="color: white">即時需量變化表（每一分鐘更新）</p>
            <apexchart class="mt-3" ref="line" id="apexchart" :height="apex.height" type="line"
                       :options="apex.chartOptions"
                       :series="apex.series"></apexchart>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'

    axios.defaults.withCredentials = true
    //    const baseURL = "https://demo-site.ima-ems.com"
    const baseURL = ""
    export default {
        data: () => {
            return {
                admin: false,
                apex: {
                    height: 500,
                    chartOptions: {
                        chart: {
                            foreColor: '#f5f5f5',
                            toolbar: {
                                show: false
                            }
                        },
                        dataLabels: {
                            enabled: false
                        },
                        noData: {
                            text: '等待輸入資料...'
                        },
                        xaxis: {
                            type: 'datetime',
                            labels: {
                                format: 'HH:mm',
                            }
                        },
                        tooltip: {
                            x: {
                                format: 'HH:mm'
                            }
                        }
                    },
                    series: [{
                        data: []
                    }]
                },
                get: {
                    params: {
                        place_id: '',
                        server_ip: ''
                    }
                },
                input: {
                    placeID: {
                        selected: '',
                        options: {},
                    },
                },
                output: {
                    dateTime: '',
                    countdown: 60,
                    lists: [
                        {
                            id: 1, name: '電壓（V）', value: ''
                        }, {
                            id: 2, name: '電流（A）', value: ''
                        }, {
                            id: 3, name: '需量（kW）', value: ''
                        }, {
                            id: 4, name: '視在功率（kVA）', value: ''
                        }, {
                            id: 5, name: '無功功率（kVAR）', value: ''
                        }, {
                            id: 6, name: '總用電度數（kWh）', value: ''
                        }, {
                            id: 7, name: '視在電度數（kVAh）', value: ''
                        }, {
                            id: 8, name: '無功電度數（kVARh）', value: ''
                        }, {
                            id: 9, name: '三相電流－Ａ（A）', value: ''
                        }, {
                            id: 10, name: '三相電流－Ｂ（A）', value: ''
                        }, {
                            id: 11, name: '三相電流－Ｃ（A）', value: ''
                        }, {
                            id: 12, name: '功率因數', value: ''
                        }, {
                            id: 13, name: '用電狀態', value: ''
                        }
                    ]
                }
            }
        },
        methods: {
            onSubmit(e) {
                e.preventDefault()
                this.get.params.place_id = this.input.placeID.selected
                const path2data = baseURL + "/api/realtime"
                this.getData(path2data)
                setInterval(() => {
                    this.getData(path2data)
                }, 60000)
            }, showLine() {
                let appendTime = new Date().getTime()
                this.$refs.line.appendData([{data: [[appendTime + 28800000, this.output.lists[2].value]]}])
            }, getData(path) {
                axios.get(path, this.get).then(
                    (response) => {
                        let realTimeData = response.data
                        if (realTimeData.status === "success") {
                            let valueList = realTimeData.data[1]
                            valueList.forEach((item, index) => {
                                if (index === 0) {
                                    this.output.dateTime = item
                                } else {
                                    if (item !== "None" && index !== 12) {
                                        this.output.lists[index - 1].value = Number.parseFloat(item).toFixed(1)
                                    } else {
                                        this.output.lists[index - 1].value = item
                                    }
                                }
                            })
                        }
                        this.showLine()
                    }
                ).catch(error => {
                    console.log(error)
                })
            }, countDown() {
                setInterval(() => {
                    this.output.countdown--
                    if (this.output.countdown === 0) {
                        this.output.countdown = 60
                    }
                }, 1000)
            }, resetApex() {
                this.countDown()
                this.$refs.line.updateSeries([{
                    data: []
                }])
            }, logout() {
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
        },
        beforeMount() {
            const path2lists = baseURL + "/api/user/lists"
            axios.get(path2lists).then(
                (response) => {
                    this.admin = (response.data.permission === 1)
                    this.input.placeID.options = Object.assign({}, response.data.places)
                }
            )
        }
    }
</script>