<script setup lang="ts">
import Options from "@/components/screens/Options.vue";
import { computed, defineAsyncComponent, Transition } from "vue";
import store from "@/store";
import { ScreenComponents } from "@/enums";
import Alert from "@/components/Alert.vue";

const Quiz = defineAsyncComponent(() => import("@/components/screens/Quiz.vue"));
const Report = defineAsyncComponent(() => import("@/components/screens/Report.vue"));

const components = {
  [ScreenComponents.Options]: {
    name: ScreenComponents.Options,
    component: Options
  },
  [ScreenComponents.Quiz]: {
    name: ScreenComponents.Quiz,
    component: Quiz
  },
  [ScreenComponents.Report]: {
    name: ScreenComponents.Report,
    component: Report
  },
}
const activeComponent = computed(() => {
  const activeComponentName = store.getters.getActiveComponent();

  return components[activeComponentName as keyof typeof components]
});


store.actions.fetchCategories();
</script>

<template>
  <main class="main">
    <h1 class="title">Quiz App</h1>

    <Transition enter-active-class="animate__animated animate__slideInLeft  animate-duration"
                leave-active-class="animate__animated animate__animated animate-duration"
                mode="out-in">
      <component :is="activeComponent.component"/>
    </Transition>

    <div class="alerts">
      <Alert v-for="alert in store.getters.getWarnings()"
             :alert="alert"/>
    </div>
  </main>
</template>

<style lang="scss">
@import "@/scss/_main.scss";
</style>

<style lang="scss" scoped>
@import "@/scss/variables/_index.scss";
@import "@/scss/local/_mixins.scss";

.animate-duration {
  --animate-duration: .25s;
}

.title {
  font-weight: bold;
  color: $colorBlack;
  font-size: 20px;
  margin: 25px 0px 50px;
  width: 100%;
  text-align: center;
  @include breakpoint("lg") {
    font-size: 28px;
  }
  @include breakpoint("xl") {
    font-size: 35px;
  }
  @include breakpoint("2xl") {
    font-size: 40px;
  }
}

.alerts {
  position: absolute;
  left: 15px;
  bottom: 15px;
  right: 15px;
}
</style>
