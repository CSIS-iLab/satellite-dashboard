<template>
  <div>
    <div class="chart-globe">
      <div id="loaderBox" style="opacity: 0.999678;">
        <div id="loader-globe">
          <div id="sat1o" class="loader-orbit"></div>
          <div id="sat1" class="loader-sat"></div>
          <div id="sat2o" class="loader-orbit"></div>
          <div id="sat2" class="loader-sat"></div>
          <div id="sat3o" class="loader-orbit"></div>

          <div id="sat3" class="loader-sat"></div>

          <div id="loader-globe-svg">
            <div class="globe">
              <svg
                width="82"
                height="87"
                viewBox="0 0 82 87"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.0133 15.9872C8.43731 15.9872 2.60531 22.0352 2.60531 29.8112C2.60531 46.6592 26.2213 44.4272 26.2213 55.7312C26.2213 60.2672 23.7013 62.4992 18.5173 62.4992C14.3413 62.4992 10.3813 60.0512 8.72531 55.0832L1.95731 57.5312C3.97331 65.0192 10.8133 69.6272 18.5893 69.6272C28.3813 69.6272 34.7173 64.2992 34.7173 54.7952C34.7173 38.0912 11.5333 39.5312 11.5333 29.3792C11.5333 25.7072 13.4773 23.1152 18.7333 23.1152C23.0533 23.1152 26.3653 25.4912 27.8773 29.7392L34.2133 26.8592C31.7653 20.3072 26.2213 15.9872 18.0133 15.9872ZM41.7699 16.7072V68.9072H59.6979C71.2899 68.9072 77.9859 61.8512 77.9859 50.7632V34.9232C77.9859 23.7632 71.2899 16.7072 59.6979 16.7072H41.7699ZM68.9859 35.3552V50.5472C68.9859 58.3232 65.8899 61.5632 59.6979 61.5632H50.7699V24.2672H59.6979C65.8899 24.2672 68.9859 27.6512 68.9859 35.3552Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@include '../assets/css/components/loading';
</style>
