<template>
  <div>
    <apexchart
      ref="heatmap"
      :height="apex.height"
      type="heatmap"
      :options="apex.chartOptions"
      :series="apex.series"
    />
  </div>
</template>

<script>
    export default {
        name: "HeatmapApexChart",
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
            }
        },
        methods: {
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
                const step = Math.floor((upperLimit - lowerLimit) / 10)
                for (let i = 1, j = 1; i < 10; i++) {
                    percent[i] = lowerLimit + step * j++
                }
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
        }
    }
</script>

<style scoped>

</style>