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
                    <router-link style="color: white" class="col-2" to="/">登出系統</router-link>
                </li>
            </ul>
        </div>
        <div class="container">
            <form class="form-group" @submit="onSubmit">
                <div class="row">
                    <div class="col-lg-2 col-md-12">
                        <label for="placeID"></label>
                        <input v-if="admin" class="form-control" type="text" placeholder="輸入電錶號碼"/>
                        <select v-else="" class="form-control" id="placeID" v-model="input.placeID.selected">
                            <option value="" disabled selected>選擇電錶號碼</option>
                            <option v-for="(item, key) in input.placeID.options" :value="item" :key="key">
                                {{key}}
                            </option>
                        </select>
                    </div>
                    <div class="col-lg-2 col-md-12">
                        <label for="date"></label>
                        <input class="form-control" type="date" id="date" v-model="input.date.selected">
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <div class="row">
                            <div class="col-6 mt-4">
                                <button class="btn btn-info" type="submit" style="width: 80%">
                                    送出查詢資料
                                </button>
                            </div>
                            <div class="col-6 mt-4">
                                <button class="btn btn-info" type="button" style="width: 80%">
                                    <a :href="output.csv.href" :download="output.csv.fileName"
                                       style="color: white!important;">下載表格資料</a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div>
                <apexchart ref="area" :height="apex.height" type="area" :options="apex.chartOptions"
                           :series="apex.series"></apexchart>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    axios.defaults.withCredentials = true
    const baseURL = "https://demo-site.ima-ems.com"
    export default {
        data: () => {
            return {
                admin:false,
                apex: {
                    height: window.innerHeight - 200,
                    chartOptions: {
                        chart: {
                            foreColor: '#f5f5f5',
                            zoom: {
                                zoomedArea: {
                                    fill: {
                                        color: '#831b49',
                                        opacity: 1
                                    },
                                }
                            },
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
                    series: [],
                },
                input: {
                    placeID: {
                        selected: '',
                        options: {}
                    },
                    date: {
                        selected: '',
                    },
                },
                output: {
                    csv: {
                        href: '',
                        fileName: '',
                        header: "data:text/csv;charset=utf-8,%EF%BB%BF",
                        content: ''
                    }
                },
            }
        },
        methods: {
            onSubmit(e) {
                e.preventDefault()
                let formValue = new FormData()
                const path = baseURL + "/api/analytic/kw_summary"
                formValue.append("device_id", this.input.placeID.selected)
                formValue.append("check_day", this.input.date.selected)
                axios.post(path, formValue).then(
                    (response) => {
                        console.log(response)
                        const dataWithTime = this.addTime2xAxis(response.data)
                        this.apex.series = [{name: this.input.date.selected, data: dataWithTime}]
                        this.outputCSV(dataWithTime)
                    }
                ).catch(error => {
                    console.log(error)
                })
            }, addTime2xAxis(inputJson) {
                let timestamp = new Date(this.input.date.selected).getTime()
                let dataWithTime = []
                inputJson.data.forEach((item, index) => {
                    dataWithTime[index] = []
                    dataWithTime[index].push(timestamp, Number.parseFloat(item).toFixed(1))
                    timestamp += 900000
                })
                return dataWithTime
            }, outputCSV(inputArray) {
                let encodedUri = ''
                this.output.csv.fileName = 'kw-' + this.input.date.selected + '.csv'
                this.output.csv.content += '日期,' + this.input.date.selected + "\r\n" + "時間,需量" + "\r\n"
                inputArray.forEach((item) => {
                    let row = this.timestamp2String(item[0]) + ',' + item[1]
                    this.output.csv.content += row + "\r\n"
                    encodedUri = encodeURI(this.output.csv.content)
                })
                this.output.csv.href = this.output.csv.header + encodedUri
            }, timestamp2String(time) {
                let datetime = new Date()
                datetime.setTime(time)
                const hour = datetime.getUTCHours()
                const minute = datetime.getUTCMinutes()
                const zero = (minute === 0) ? "0" : ""
                return hour + ":" + minute + zero
            }
        },beforeMount() {
            const path2lists = baseURL + "/api/user/lists"
            axios.get(path2lists).then(
                (response) => {
                    this.admin = (response.data.permission===1)
                    this.input.placeID.options = Object.assign({}, response.data.places)
                }
            )
        }
    }
</script>