<template>
  <div>
    <b-container class="py-3 text-white">
      <h4 class="text-center mb-3">
        即時用電需量
      </h4>
      <RealTimeInputForm
        ref="inputForm"
        @get-responded-data="preprocessData"
      />
      <RealTimeDashBoard :output-data="output" />
      <h4 class="text-center mt-3">
        下一次資料更新時間為：{{ output.countdown }} 秒後
      </h4>
      <apexchart
        id="apex-chart"
        ref="ApexLine"
        class="mt-3"
        type="line"
        :height="apex.height"
        :options="apex.chartOptions"
        :series="apex.series"
      />
    </b-container>
  </div>
</template>
<script>
    import RealTimeInputForm from "../components/real-time/RealTimeInputForm";
    import RealTimeDashBoard from "../components/real-time/RealTimeDashBoard";
    export default {
        name: "PageRealTime",
        components: {
            RealTimeInputForm,
            RealTimeDashBoard
        },
        data() {
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
            preprocessData() {
                const RealTimeData = this.$store.getters.RespondedRealTimeData
                if (RealTimeData.status === "success") {
                    let ValueList = RealTimeData.data[1]
                    ValueList.forEach((item, index) => {
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
                this.setApexLine()
                this.countDown()
            },
            setApexLine() {
                const AppendTime = new Date().getTime()
                this.$refs.ApexLine.appendData([{data: [[AppendTime + 28800000, this.output.lists[2].value]]}])
            },
            countDown() {
                setInterval(() => {
                    this.output.countdown--
                    if (this.output.countdown === 0) {
                        this.output.countdown = 60
                    }
                }, 1000)
            }
        },
    }
</script>

<style scoped>

</style>