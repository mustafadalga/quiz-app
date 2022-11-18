<script lang="ts" setup>
import Question from "@/components/Question.vue";
import store from "@/store";
import { computed } from "vue";

const questions = computed(() => store.getters.getQuestions());
const report = computed(() => store.getters.getActiveQuizResult());
</script>

<template>
  <section class="c-report">

    <div class="title">
      You got {{ report.correctAnswersNumber }} out of {{ report.totalQuestionsNumber }} questions right!

      <h4 v-if="report.hasAllQuizzesSuccessRate">
        You where better then {{ report.allQuizzesSuccessRate }}% of all quizer!
      </h4>
    </div>

    <div class="questions">
      <Question v-for="(question,index) in questions"
                :question="question"
                :question-number="index"
                :show-answer="true"/>
    </div>

    <button class="btn-primary btn-new-quiz" @click="store.mutations.newQuiz()">
      New Quiz
    </button>

  </section>
</template>

<style lang="scss" scoped>
@import "@/scss/variables/_index.scss";
@import "@/scss/local/_mixins.scss";
@import "@/scss/partials/_button.scss";

.c-report {
  display: grid;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  max-width: $br_sm;
  width: 100%;
  margin: 0 auto;
  background-color: $colorWhite;
  border-radius: 8px;
  overflow: hidden;
  padding: 30px;
}

.title {
  color: $colorBlack;
  font-size: 18px;
  line-height: 28px;
  text-align: center;
  @include breakpoint("md") {
    font-size: 20px;
  }
  @include breakpoint("xl") {
    font-size: 24px;
    line-height: 32px;
  }
}

.questions{
  margin: 60px 0 30px;
  display: grid;
  gap: 30px;
  @include breakpoint("lg") {
    gap: 60px;
  }
}
:deep(.question){
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  padding: 30px;
}
.btn-new-quiz{
  max-width: $br_2xs;
  margin: 0 auto;
  width: 100%;
}
</style>