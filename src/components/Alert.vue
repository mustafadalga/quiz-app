<script lang="ts" setup>
import type { PropType } from "vue";
import type { IWarning } from "@/types";

const props = defineProps({
  alert: {
    type: Object as PropType<IWarning>,
    required: true
  }
})
</script>

<template>
  <div :class="['alert',`bg-${props.alert.color}`]">
    {{ props.alert.message }}
  </div>
</template>

<style lang="scss" scoped>
@import "@/scss/local/_mixins.scss";
@import "@/scss/variables/_colors.scss";

.alert {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 6px 15px;
  color: $colorWhite;
  border-radius: 9999px;
  font-size: 11px;
  @include breakpoint("lg") {
    font-size: 12px;
  }
  @include breakpoint("2xl") {
    font-size: 13px;
    padding-top: 8px;
    padding-bottom: 8px;
  }
}
</style>