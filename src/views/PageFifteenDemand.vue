<template>
    <div>
        <b-container class="py-3 text-white">
            <h4 class="text-center mb-3">
                每十五分鐘需量
            </h4>
            <DemandInputForm @get-responded-data="preprocessData($event)"/>
            <b-button class="d-block m-auto">
                <a
                        :href="output.csv.href"
                        :download="output.csv.fileName"
                        style="color: white!important;"
                >下載表格資料</a>
            </b-button>
            <div class="mt-3 text-dark">
                <apexchart
                        ref="area"
                        :height="apex.height"
                        type="area"
                        :options="apex.chartOptions"
                        :series="apex.series"
                />
            </div>
        </b-container>
    </div>
</template>

<script>
    import DemandInputForm from "../components/fifteen-demand/DemandInputForm";

    export default {
        name: "PageFifteenDemand",
        components: {
            DemandInputForm
        },
        data() {
            return {
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
                output: {
                    csv: {
                        href: '',
                        fileName: '',
                        header: "data:text/csv;charset=utf-8,%EF%BB%BF",
                        content: ''
                    }
                },
                selected: {}
            }
        },
        methods: {
            preprocessData(event) {
                this.selected = event
                const demandData = this.$store.getters.RespondedDemandData
                console.log(demandData)
                const dataWithTime = this.addTime2xAxis(demandData)
                this.apex.series = [{name: this.$store.state.selected.date, data: dataWithTime}]
                this.outputCSV(dataWithTime)
            }, addTime2xAxis(inputJson) {
                let timestamp = new Date(this.$store.state.selected.date).getTime()
                let dataWithTime = []
                inputJson.data.forEach((item, index) => {
                    dataWithTime[index] = []
                    dataWithTime[index].push(timestamp, Number.parseFloat(item).toFixed(1))
                    timestamp += 900000
                })
                return dataWithTime
            }, outputCSV(inputArray) {
                this.output.csv.content = ''
                let encodedUri = ''
                this.output.csv.fileName = this.selected.place_id + '-' + this.$store.state.selected.date + '.csv'
                this.output.csv.content += '日期,' + this.$store.state.selected.date + "\r\n" + "時間,需量" + "\r\n"
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
        }
    }
</script>

<style scoped>

</style>