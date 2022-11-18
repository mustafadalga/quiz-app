<script lang="ts" setup>
import store from "@/store";
import { computed, watch, ref } from "vue";
import { vCounter } from "@/directives";

let countFrom = ref(0);
const completedPercent = computed(() => {
  const numberOfQuestions = store.getters.getNumberOfQuestions();
  const selectedQuestionNumber = store.getters.getActiveQuestionNumber();
  return Math.round((selectedQuestionNumber / numberOfQuestions) * 100);
})

const completedPercentStyle = computed(() => ({"--completed": `${completedPercent.value}%`}));
const counter = computed(() => {
  return {
    countFrom: countFrom.value,
    countTo: completedPercent.value,
    duration: 500,
    text: "% complete"
  }
});


watch(() => completedPercent.value, (newValue, oldValue) => {
  countFrom.value = oldValue
});
</script>

<template>
  <div class="progress" :style="`--num:${completedPercent}`">
    <div class="progress-bar" :style="completedPercentStyle"></div>
    <span class="progress-text" :key="completedPercent" v-counter="counter">{{ completedPercent }}% complete</span>
  </div>
</template>

<style lang="scss" scoped>
@import "@/scss/variables/_index.scss";
@import "@/scss/local/_mixins.scss";


.progress {
  display: grid;
  width: 100%;
  max-width: $br_xs;
  margin: 0 auto;
  gap: 8px;

  &-bar {
    --completed: 0%;

    background-color: $colorGray300;
    height: 16px;
    border-radius: 15px;
    position: relative;
    overflow: hidden;


    &:after {
      position: absolute;
      transition: width .5s;
      content: "";
      width: var(--completed);
      background-color: $colorGreen600;
      height: 100%;
    }
  }

  &-text {
    font-size: 12px;
    text-align: center;
  }
}
</style>