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
                <li style="line-height: 40px;"><a style="color: white" class="col-2" href="" @click.prevent="logout">登出系統</a>
                </li>
            </ul>
        </div>
        <div class="container">
            <form class="form-group" @submit="onSubmit">
                <div class="row">
                    <div class="col-lg-2 col-md-12">
                        <label for="deviceID"></label>
                        <select class="form-control" id="deviceID" v-model="input.deviceID.selected">
                            <option value="" disabled selected>選擇電錶號碼</option>
                            <option v-for="option in input.deviceID.options" :key="option.id" :value="option.text">
                                {{option.text}}
                            </option>
                        </select>
                    </div>
                    <div class="col-lg-2 col-md-12">
                        <label for="date"></label>
                        <input class="form-control" type="date" id="date" v-model="input.date.selected">
                    </div>
                    <div class="col-lg-2 col-md-12">
                        <label for="days"></label>
                        <select class="form-control" id="days" v-model="input.days.selected">
                            <option value="" disabled selected>選擇顯示天數</option>
                            <option v-for="days in 31" :key="days">
                                {{days}}
                            </option>
                        </select>
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <div class="row">
                            <div class="col-6 mt-4">
                                <button class=" btn btn-info" type="submit" style="width: 80%">
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
                <div class="text-center py-3">
                    <p style="color: white;font-size: 20px">{{message.total}}</p>
                </div>
            </form>
            <apexchart ref="heatmap" :height="apex.height" type="heatmap" :options="apex.chartOptions"
                       :series="apex.series"></apexchart>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';

    export default {
        data: () => {
            return {
                input: {
                    deviceID: {
                        selected: '',
                        options: [
                            {
                                id: 1, text: '16274114w00_010se'
                            }, {
                                id: 2, text: '16484660100_010se'
                            }, {
                                id: 3, text: '16484851013_010se'
                            }, {
                                id: 4, text: '16484840019_010se'
                            }, {
                                id: 5, text: '16484740018_010se'
                            }
                        ],
                    },
                    date: {
                        selected: '',
                    },
                    days: {
                        selected: '',
                    },
                },
                output: {
                    total: 0,
                    csv: {
                        href: '',
                        fileName: '',
                        header: "data:text/csv;charset=utf-8,%EF%BB%BF",
                        content: ''
                    }
                },
                message: {
                    total: ""
                },
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
                }
            }
        },
        methods: {
            showHeatmap(heatmapData) {
                const monthTotal = this.sumTotal(heatmapData);
                this.modifyData(heatmapData);
                this.modifyName(heatmapData, monthTotal);
                const maximum = this.findMaximum(heatmapData);
                const minimum = this.findMinimum(heatmapData);
                const upperLimit = Math.ceil(maximum);
                const lowerLimit = Math.floor(minimum);
                const percent = this.setPercent(upperLimit, lowerLimit);
                let labelShow = false;
                if (window.innerWidth > 991) {
                    labelShow = true;
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
                        enabled: labelShow
                    }, xaxis: {
                        type: 'category',
                        categories: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
                    }
                };
                this.apex.series = heatmapData;
            }, onSubmit(e) {
                e.preventDefault();
                let formValue = new FormData();
                const path = "https://analytic.ima-ems.com/api/kwh_summary";
                formValue.append("device_id", this.input.deviceID.selected);
                formValue.append("check_day", this.input.date.selected);
                formValue.append("days", this.input.days.selected);
                axios.post(path, formValue).then(
                    (response) => {
                        let heatmapData = response.data;
                        this.showHeatmap(heatmapData);
                        this.outputCSV(heatmapData);
                        this.message.total = "從 " + this.input.date.selected + " 開始的 " + this.input.days.selected + " 天，總用電度數為：" + this.output.total;
                    }).catch(error => {
                    console.log(error);
                })
            }, modifyName(inputArray, valueList) {
                inputArray.forEach((item, index) => {
                    item.name = item.name.replace('2020-', '');
                    item.name += '（' + valueList[index] + '）';
                });
            }, modifyData(inputArray) {
                inputArray.forEach((item, index, thisArray) => {
                    thisArray[index].data.forEach((data, dataIndex, dataArray) => {
                        let data_min = Infinity;
                        dataArray.forEach((value) => {
                            if (value !== 0) {
                                if (value < data_min) {
                                    data_min = value;
                                }
                            }
                        });
                        if (data === 0) {
                            dataArray[dataIndex] = data_min;
                        }
                    })
                });
            }, findMaximum(inputArray) {
                let dataList = [];
                inputArray.forEach((item) => {
                    dataList.push(Math.max.apply(null, item.data));
                });
                return Math.max.apply(null, dataList);
            }, findMinimum(inputArray) {
                let dataList = [];
                inputArray.forEach((item) => {
                    dataList.push(Math.min.apply(null, item.data))
                });
                return Math.min.apply(null, dataList);
            }, setPercent(upperLimit, lowerLimit) {
                let percent = [];
                const step = Math.floor((upperLimit - lowerLimit) / 10);
                for (let i = 1, j = 1; i < 10; i++) {
                    percent[i] = lowerLimit + step * j++;
                }
                return percent;
            }, percent2color(percent) {
                let r, g, b = 0;
                if (percent < 40) {
                    g = 180;
                    r = Math.round(5.1 * percent);
                }
                else if (percent >= 40 && percent <= 50) {
                    g = 225;
                    r = Math.round(2 * percent + 155);
                }
                else {
                    r = 255;
                    g = Math.round(510 - 5.10 * percent);
                }
                let h = r * 0x10000 + g * 0x100 + b * 0x1;
                return '#' + ('000000' + h.toString(16)).slice(-6);
            }, outputCSV(inputArray) {
                let encodedUri = '';
                this.output.csv.fileName = 'heatmap-' + this.input.date.selected + '-' + this.input.days.selected + '.csv';
                inputArray.forEach((item) => {
                    this.output.csv.content += "日期（總度數）," + item.name + "\r\n" + "時間,度數" + "\r\n";
                    item.data.forEach((data, index) => {
                        this.output.csv.content += this.apex.chartOptions.xaxis.categories[index] + ',' + data + "\r\n";
                    });
                    encodedUri = encodeURI(this.output.csv.content);
                });
                this.output.csv.href = this.output.csv.header + encodedUri;
            }, sumTotal(inputArray) {
                let dayTotal = [];
                const reducer = (accumulator, currentValue) => accumulator + currentValue;
                inputArray.forEach((item, index) => {
                    dayTotal[index] = parseInt(item.data.reduce(reducer).toFixed(0));
                });
                this.output.total = dayTotal.reduce(reducer);
                return dayTotal;
            }
        }
    };
</script>