<template>
  <div>
    <b-container class="py-3 text-white">
      <h4 class="text-center mb-3">
        每小時最高需量
      </h4>
      <HourDemandInputForm
        :csv-href="output.csv.href"
        :file-name="output.csv.fileName"
        :download-btn-show="output.csv.button"
        @get-responded-data="preprocessData($event)"
      />
      <h4 class="text-center mt-3">
        {{ message.peakOfSearch }}
      </h4>
      <div class="mt-3 text-dark">
        <apexchart
          ref="heatmap"
          :height="apex.height"
          type="heatmap"
          :options="apex.chartOptions"
          :series="apex.series"
        />
      </div>
    </b-container>
  </div>
</template>

<script>
    import HourDemandInputForm from "../components/hour-demand/HourDemandInputForm";

    export default {
        name: "PageHourDemanf",
        components: {
            HourDemandInputForm
        },
        data() {
            return {
                apex: {
                    height: window.innerHeight - 100,
                    chartOptions: {
                        chart: {
                            foreColor: '#f5f5f5',
                            toolbar: {
                                show: false
                            }
                        },
                        dataLabels: {
                            enabled: false
                        }
                        ,
                        noData: {
                            text: '等待輸入資料...'
                        }
                        ,
                    },
                    series: []
                },
                output: {
                    total_of_day: 0,
                    csv: {
                        href: '',
                        fileName: '',
                        header: "data:text/csv;charset=utf-8,%EF%BB%BF",
                        content: '',
                        button:false
                    },
                },
                selected: {},
                message:{
                    peakOfSearch:''
                },

            }
        },
        methods: {
            preprocessData(event) {
                this.selected = event
                console.log(this.selected)
                const heatmapData = this.$store.getters.RespondedHeatmapData
                const peakOfDay = this.findPeakOfDay(heatmapData)
                const peakValue = Math.max.apply(null,peakOfDay)
                this.message.peakOfSearch = "從 " + this.selected.date + " 開始的 " + this.selected.days + " 天，最高用電需量為："
                    + peakValue + ' 瓩'
                this.modifyName(heatmapData, peakOfDay)
                this.showHeatmap(heatmapData)
                this.outputCSV(heatmapData)
                this.output.csv.button = true
            },
            modifyName(inputArray, dataList) {
                inputArray.forEach((item, index) => {
                    item.name = item.name.replace('2020-', '')
                    item.name += '（' + dataList[index] + '）'
                })
            },
            findPeakOfDay(inputArray) {
                let peakOfDay = []
                inputArray.forEach((item,index) =>{
                    peakOfDay[index] = Math.max.apply(Math,item.data)
                })
                return peakOfDay
            },
            showHeatmap(heatmapData) {
                const maximum = this.findMaximum(heatmapData)
                const minimum = this.findMinimum(heatmapData)
                const upperLimit = Math.ceil(maximum)
                const lowerLimit = Math.floor(minimum)
                const percent = this.setPercent(upperLimit, lowerLimit)
                let showLabel = false
                if (window.innerWidth > 991) {
                    showLabel = true
                }
                this.apex.chartOptions = {
                    plotOptions: {
                        heatmap: {
                            colorScale: {
                                ranges: [
                                    {
                                        from: lowerLimit,
                                        to: percent[1] - 0.1,
                                        color: this.percent2color(10)
                                    }, {
                                        from: percent[1],
                                        to: percent[2] - 0.1,
                                        color: this.percent2color(20)
                                    }, {
                                        from: percent[2],
                                        to: percent[3] - 0.1,
                                        color: this.percent2color(30)
                                    }, {
                                        from: percent[3],
                                        to: percent[4] - 0.1,
                                        color: this.percent2color(40)
                                    }, {
                                        from: percent[4],
                                        to: percent[5] - 0.1,
                                        color: this.percent2color(50)
                                    }, {
                                        from: percent[5],
                                        to: percent[6] - 0.1,
                                        color: this.percent2color(60)
                                    }, {
                                        from: percent[6],
                                        to: percent[7] - 0.1,
                                        color: this.percent2color(70)
                                    }, {
                                        from: percent[7],
                                        to: percent[8] - 0.1,
                                        color: this.percent2color(80)
                                    }, {
                                        from: percent[8],
                                        to: percent[9] - 0.1,
                                        color: this.percent2color(90)
                                    }, {
                                        from: percent[9],
                                        to: upperLimit,
                                        color: this.percent2color(100)
                                    }]
                            }
                        }
                    }, dataLabels: {
                        enabled: showLabel
                    }, xaxis: {
                        type: 'category',
                        categories: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
                    }
                }
                this.apex.series = heatmapData
            },
            findMaximum(inputArray) {
                let dataList = []
                inputArray.forEach((item) => {
                    dataList.push(Math.max(...item.data))
                })
                return Math.max(...dataList)
            },
            findMinimum(inputArray) {
                let dataList = []
                inputArray.forEach((item) => {
                    dataList.push(Math.min(...item.data))
                })
                return Math.min(...dataList)
            },
            setPercent(upperLimit, lowerLimit) {
                let percent = []
                let step = 0
                const range = upperLimit - lowerLimit
                if (range < 10){
                    step = Math.ceil((range) / 10)
                }else{
                    step = Math.floor((range) / 10)
                }
                for (let i = 1, j = 1; i < 10; i++) {
                    percent[i] = lowerLimit + step * j++
                }
                console.log('最大值：',upperLimit,'；最小值：',lowerLimit,'；範圍：'+percent,'；階層：',step)
                return percent
            },
            percent2color(percent) {
                let r, g, b = 0
                if (percent < 40) {
                    g = 180
                    r = Math.round(5.1 * percent)
                } else if (percent >= 40 && percent <= 50) {
                    g = 225
                    r = Math.round(2 * percent + 155)
                } else {
                    r = 255
                    g = Math.round(510 - 5.10 * percent)
                }
                let h = r * 0x10000 + g * 0x100 + b * 0x1
                return '#' + ('000000' + h.toString(16)).slice(-6)
            },
            outputCSV(inputArray) {
                this.output.csv.content = ''
                let encodedUri = ''
                this.output.csv.fileName = this.selected.place_id + '-' + this.selected.date + '-' + this.selected.days
                inputArray.forEach((item) => {
                    this.output.csv.content += "日期（總度數）," + item.name + "\r\n" + "時間,需量" + "\r\n"
                    item.data.forEach((data, index) => {
                        this.output.csv.content += this.apex.chartOptions.xaxis.categories[index] + ',' + data + "\r\n"
                    })
                    encodedUri = encodeURI(this.output.csv.content)
                })
                this.output.csv.href = this.output.csv.header + encodedUri
            },
        }
    }
</script>

<style scoped>

</style>