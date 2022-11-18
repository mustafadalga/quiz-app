<script lang="ts" setup>
import { computed, defineAsyncComponent, ref, watch } from "vue";
import store from "@/store";
import CustomSelect from "@/components/CustomSelect.vue";
import type { ICategory, IDifficulty } from "@/types";
import { ScreenComponents } from "@/enums";

const Loader = defineAsyncComponent(() => import("@/components/Loader.vue"));

const difficulties: IDifficulty[] = [
  {id: "easy", name: "Easy"},
  {id: "medium", name: "Medium"},
  {id: "hard", name: "Hard"} ];

const selectedDifficulty = ref<IDifficulty>(difficulties[0]);
const selectedCategory = ref<ICategory>();
const categories = computed<ICategory[]>(() => store.getters.getCategories());
const isLoadedCategories = computed(() => store.getters.getApiLoadState().categories?.isLoaded)
const isLoadedQuestions = computed(() => store.getters.getApiLoadState().questions?.isLoaded)
const isCalledQuestions = computed(() => store.getters.getApiLoadState().questions?.isCalled)

watch(() => isLoadedCategories.value, () => setInitialSelectedCategory(), {
  immediate: true
});


function setInitialSelectedCategory() {
  if (categories.value.length) {
    selectedCategory.value = categories.value[0];
  }
}

async function handleSelectedOptions() {
  if (!selectedCategory.value) return;

  await store.actions.fetchQuestions(selectedCategory.value.id, selectedDifficulty.value.id);

  if (store.getters.getQuestions().length){
    store.mutations.setActiveComponent(ScreenComponents.Quiz);
  }
}
</script>

<template>
  <section class="c-options">
    <div class="form">
      <div class="form-group">
        <label class="form-label">Select a category</label>
        <CustomSelect
            :clearable="false"
            @selected="selectedCategory=$event"
            :selected-option="selectedCategory"
            :options="categories"/>
      </div>

      <div class="form-group">
        <label class="form-label">Select a difficulty</label>

        <CustomSelect
            @selected="selectedDifficulty=$event"
            :selected-option="selectedDifficulty"
            :clearable="false"
            :options="difficulties"/>
      </div>

      <div class="form-group">
        <button type="button"
                @click="handleSelectedOptions"
                class="btn-primary">Start
        </button>
      </div>
    </div>

    <Teleport to="body">
      <Loader v-if="isCalledQuestions && !isLoadedQuestions"/>
    </Teleport>
  </section>
</template>

<style lang="scss" scoped>
@import "@/scss/variables/_index.scss";
@import "@/scss/local/_index.scss";
@import "@/scss/local/_mixins.scss";


.c-options {
  width: 100%;
  display: grid;
  place-items: center;
}

.form {
  margin-top: 30px;
  display: grid;
  gap: 30px;
  width: 100%;
  max-width: $br_sm;

  &-group {
    display: grid;
    gap: 8px;
  }

  &-label {
    font-size: 12px;
    @include breakpoint("md") {
      font-size: 15px;
    }
    @include breakpoint("2xl") {
      font-size: 16px;
    }
  }
}
</style>
