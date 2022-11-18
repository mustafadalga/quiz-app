<script lang="ts" setup>
import QuestionOption from "./QuestionOption.vue";
import store from "@/store";

const props = defineProps({
  question: {
    type: Object,
    required: true
  },
  questionNumber: {
    type: Number,
    required: true
  },
  showAnswer: {
    type: Boolean,
    default: false
  }
});


function questionOptionClass(option: string): string {
  const userAnswer = store.getters.getUserAnswers(props.questionNumber);
  if (props.showAnswer) {
    if (option == userAnswer && userAnswer == props.question.correct_answer) {
      return "bg-green-300";
    } else if (option == userAnswer) {
      return "bg-red-300"
    }
    return "bg-white";
  }

  if (option == store.getters.getUserAnswers(props.questionNumber)) {
    return "bg-gray-200"
  }
  return "bg-white"
}
</script>

<template>
  <div class="question">
    <h3 class="question__text" v-html="question.question"></h3>

    <div class="question__options">
      <QuestionOption v-for="option in question.options"
                      :option="option"
                      :class="questionOptionClass(option)"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/scss/variables/_index.scss";
@import "@/scss/local/_mixins.scss";

.question {
  &__text {
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    @include breakpoint("md") {
      font-size: 18px;
      line-height: 28px;
    }
    @include breakpoint("lg") {
      font-size: 20px;
    }
  }

  &__options {
    margin-top: 30px;
    display: grid;
    width: 100%;
    gap: 15px;
  }
}
</style>