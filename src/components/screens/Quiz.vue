<script lang="ts" setup>
import store from "@/store";
import { computed, Transition } from "vue";
import ButtonNext from "@/components/ButtonNext.vue";
import Progress from "@/components/Progress.vue";
import Question from "@/components/Question.vue";

const activeQuestion = computed(() => store.getters.getActiveQuestion());
const activeQuestionAnswer = computed(() => store.getters.getActiveQuestionAnswer());
const activeQuestionNumber = computed(() => store.getters.getActiveQuestionNumber());
const footerStyle = computed(() => {
  if (activeQuestionAnswer.value) {
    return {padding: "30px", flex: 1};
  }
  return {padding: "0"};
})
</script>

<template>
  <section class="c-quiz">
    <div class="container">
      <div class="header">
        <Progress/>
      </div>

      <Transition enter-active-class="animate__animated animate__zoomIn animate-duration"
                  leave-active-class="animate__animated animate__zoomOut animate-duration"
                  mode="out-in">
        <div class="body" v-if="activeQuestion.question"
             :key="activeQuestion.question">

          <Question :question="activeQuestion"
                    :question-number="activeQuestionNumber"
                    :show-answer="false"/>
        </div>

      </Transition>

      <div class="footer" :style="footerStyle">
        <Transition enter-active-class="animate__animated animate__zoomIn animate-duration"
                    leave-active-class="animate__animated animate__zoomOut animate-duration">
          <ButtonNext v-if="activeQuestionAnswer"
                      @click="store.mutations.handleNext()"/>
        </Transition>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/scss/variables/_index.scss";
@import "@/scss/local/_mixins.scss";

.c-quiz {
  display: grid;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  max-width: $br_sm;
  margin: 0 auto;
  width: 100%;
  background-color: $colorWhite;
  border-radius: 8px;
  overflow: hidden;
}

.container {
  display: flex;
  flex-direction: column;
}


.header, .body, .footer {
  display: grid;
  padding: 30px;
  width: 100%;
}

.header {
  padding: 30px;
  background-color: $colorNeutral50;
  border-bottom: 1px solid $colorGray300;
}

.body {
  @include breakpoint("lg") {
    padding: 50px 30px;
  }
}

.footer {
  flex-basis: 0;
  transition: .3s all linear;
}

.animate-duration {
  --animate-duration: .25s;
}

</style>