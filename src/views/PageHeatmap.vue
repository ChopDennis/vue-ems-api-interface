<template>
  <div>
    <b-container class="py-5 text-white">
      <HeatmapInputForm @get-responded-data="preprocessData" />
    </b-container>
  </div>
</template>

<script>
    import HeatmapInputForm from "../components/heatmap/HeatmapInputForm";

    export default {
        name: "PageHeatmap",
        components: {
            HeatmapInputForm
        },
        data() {
            return {
                output: {
                    total_of_day: 0
                }
            }
        },
        methods: {
            preprocessData() {
                const heatmapData = this.$store.getters.RespondedHeatmapData
                const monthTotal = this.sumTotal(heatmapData)
                this.modifyName(heatmapData, monthTotal)
                console.log(heatmapData)
            },
            modifyName(inputArray, dataList) {
                inputArray.forEach((item, index) => {
                    item.name = item.name.replace('2020-', '')
                    item.name += '（' + dataList[index] + '）'
                })
            },
            sumTotal(inputArray) {
                let totalOfDay = []
                const reducer = (accumulator, currentValue) => accumulator + currentValue
                inputArray.forEach((item, index) => {
                    totalOfDay[index] = parseInt(item.data.reduce(reducer).toFixed(0))
                })
                this.output.total_of_day = totalOfDay.reduce(reducer)
                return totalOfDay
            },
        }
    }
</script>

<style scoped>

</style>