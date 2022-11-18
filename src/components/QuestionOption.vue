<script lang="ts" setup>
import store from "@/store";

const props = defineProps({
  option: {
    type: String,
    required: true
  },
});

function handleOption() {
  if (store.getters.getIsQuizEnded()) return;

  store.mutations.setAnswer(props.option);
}
</script>

<template>
  <button
      @click.prevent="handleOption"
      :disabled="store.getters.getIsQuizEnded()"
      class="btn-option">
    <span v-html="option"/>
  </button>
</template>

<style lang="scss" scoped>
@import "@/scss/variables/_index.scss";
@import "@/scss/local/_mixins.scss";

.btn-option {
  outline: 0;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid $colorGray300;
  cursor: pointer;
  transition: .1s background-color, .1s transform;
  font-size: 12px;
  line-height: 26px;

  &:not(:disabled):hover {
    background-color: $colorGray200;
  }

  &:not(:disabled):active {
    transform: scaleX(0.9);
  }

  @include breakpoint("md"){
    font-size: 14px;
    line-height: 20px;
  }
  @include breakpoint("lg") {
    padding: 15px;
    font-size: 16px;
    line-height: 24px;
  }
}
</style>

