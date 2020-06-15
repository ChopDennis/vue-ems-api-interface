<template>
  <div
    style="background-color: rgba(29,27,65,.6);
    border-radius: 7px;
    padding: 1rem 0;margin: 0"
    class="row"
  >
    <div class="col-lg-3 offset-lg-1 col-md-12 text-center py-3">
      <!--總用電度數（kWh）-->
      <div class="row">
        <div class="col-lg-12 col-6">
          <p class="real-time-title">
            {{ outputData.lists[5].name }}
          </p>
          <p class="real-time-value">
            {{ outputData.lists[5].value }}
          </p>
        </div>
        <div class="col-lg-12 col-6">
          <p class="real-time-title">
            {{ outputData.lists[2].name }}
          </p>
          <p class="real-time-value">
            {{ outputData.lists[2].value }}
          </p>
        </div>
      </div>
      <img
        style="padding: 2rem;width:200px;"
        src="../../assets/battery.png"
      >
    </div>
    <div class="col-lg-7 col-md-12 text-center">
      <div
        class="row py-3"
        style="background-color: hsla(0, 0%, 100%, .13);
    margin: 0;
    border-radius: 7px;"
      >
        <div class="col-4">
          <p class="real-time-title">
            {{ outputData.lists[0].name }}
          </p>
          <p class="real-time-value">
            {{ outputData.lists[0].value }}
          </p>
          <p class="real-time-title">
            {{ outputData.lists[8].name }}
          </p>
          <p class="real-time-value">
            {{ outputData.lists[8].value }}
          </p>
        </div>
        <div class="col-4">
          <p class="real-time-title">
            {{ outputData.lists[1].name }}
          </p>
          <p class="real-time-value">
            {{ outputData.lists[1].value }}
          </p>
          <p class="real-time-title">
            {{ outputData.lists[9].name }}
          </p>
          <p class="real-time-value">
            {{ outputData.lists[9].value }}
          </p>
        </div>
        <div class="col-4">
          <p class="real-time-title">
            {{ outputData.lists[11].name }}
          </p>
          <p class="real-time-value">
            {{ outputData.lists[11].value }}
          </p>
          <p class="real-time-title">
            {{ outputData.lists[10].name }}
          </p>
          <p class="real-time-value">
            {{ outputData.lists[10].value }}
          </p>
        </div>
      </div>
      <div class="row p-3">
        <div class="col-4">
          <p style="font-size: 14px;color: darkgrey">
            {{ outputData.lists[3].name }}
          </p>
          <p style="font-weight:bold;font-size: 12px;color: white">
            {{ outputData.lists[3].value }}
          </p>
        </div>
        <div class="col-4">
          <p style="font-size: 14px;color: darkgrey">
            {{ outputData.lists[4].name }}
          </p>
          <p style="font-weight:bold;font-size: 12px;color: white">
            {{ outputData.lists[4].value }}
          </p>
        </div>
        <div class="col-4">
          <p style="font-size: 14px;color: darkgrey">
            {{ outputData.lists[7].name }}
          </p>
          <p style="font-weight:bold;font-size: 12px;color: white">
            {{ outputData.lists[7].value }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "RealTimeDashBoard",
        props: {
            outputData: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        }
    }
</script>

<style scoped>

</style>