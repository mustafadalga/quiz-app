<script lang="ts" setup>
import Question from "@/components/Question.vue";
import store from "@/store";
import { computed } from "vue";

const questions = computed(() => store.getters.getQuestions());
const report = computed(() => store.getters.getActiveQuizResult());
</script>

<template>
  <section class="c-report">

    <h1 class="title">
      You got {{ report.correctAnswersNumber }} out of {{ report.totalQuestionsNumber }} questions right!
    </h1>

    <h3 class="description" v-if="report.hasAllQuizzesSuccessRate">
      You where better then {{ report.allQuizzesSuccessRate }}% of all quizer!
    </h3>

    <div class="questions">

      <div class="questions-title">Your answers</div>

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
  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.1);
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
  }
}

.description {
  margin-top: 15px;
  color: $colorGray500;
  text-align: center;
  font-size: 13px;
  @include breakpoint("md") {
    font-size: 15px;
  }
  @include breakpoint("xl") {
    font-size: 16px;
  }
}

.questions {
  margin: 60px 0 30px;
  display: grid;
  gap: 30px;
  @include breakpoint("lg") {
    gap: 60px;
  }
}

.questions-title {
  color: $colorGray500;
  padding-bottom: 8px;
  border-bottom: 1px solid $colorGray300;
  font-size: 20px;
  @include breakpoint("md") {
    font-size: 24px;
  }
  @include breakpoint("xl") {
    font-size: 30px;
  }
}

.title, .description, .questions-title {
  text-align: center;
}

:deep(.question) {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  padding: 30px;
}

.btn-new-quiz {
  max-width: $br_2xs;
  margin: 0 auto;
  width: 100%;
}
</style>