<template>
  <div :class="$style.loader">
    <div :class="$style.animation">
      <div v-for="index in 12"
           :key="index"
           :class="[$style.circle,`${$style[`circle-${index}`]}`]"></div>
    </div>
  </div>
</template>

<style lang="scss" module>
@import "@/scss/variables/_index.scss";
@import "@/scss/local/_mixins.scss";

.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 15px;
  background-color: rgba($colorBlack,.25);
  z-index: 2022;
}

.animation {
  position: relative;
  width: 60px;
  height: 60px;

  @include breakpoint("lg") {
    width: 96px;
    height: 96px;
  }
  @include breakpoint("lg") {
    width: 128px;
    height: 128px;
  }

  @include breakpoint("xl") {
    width: 160px;
    height: 160px;
  }
}

.circle {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  &:before {
    content: '';
    display: block;
    margin: 0 auto;
    background-color: $colorIndigo500;
    border-radius: 100%;
    -webkit-animation: fadeDelay 1.2s infinite ease-in-out both;
    animation: fadeDelay 1.2s infinite ease-in-out both;

    width: 5px;
    height: 5px;

    @include breakpoint("lg") {
      width: 10px;
      height: 10px;
    }

    @include breakpoint("xl") {
      width: 15px;
      height: 15px;
    }
  }

  &-2 {
    @include setTransform(rotate(30deg));

    &:before {
      -webkit-animation-delay: -1.1s;
      animation-delay: -1.1s;
    }
  }

  &-3 {
    @include setTransform(rotate(60deg));

    &:before {
      -webkit-animation-delay: -1s;
      animation-delay: -1s;
    }
  }

  &-4 {
    @include setTransform(rotate(90deg));

    &:before {
      -webkit-animation-delay: -0.9s;
      animation-delay: -0.9s;
    }
  }

  &-5 {
    @include setTransform(rotate(120deg));

    &:before {
      -webkit-animation-delay: -0.8s;
      animation-delay: -0.8s;
    }
  }

  &-6 {
    @include setTransform(rotate(150deg));

    &:before {
      -webkit-animation-delay: -0.7s;
      animation-delay: -0.7s;
    }
  }

  &-7 {
    @include setTransform(rotate(180deg));

    &:before {
      -webkit-animation-delay: -0.6s;
      animation-delay: -0.6s;
    }
  }

  &-8 {
    @include setTransform(rotate(210deg));

    &:before {
      -webkit-animation-delay: -0.5s;
      animation-delay: -0.5s;
    }
  }

  &-9 {
    @include setTransform(rotate(240deg));

    &:before {
      -webkit-animation-delay: -0.4s;
      animation-delay: -0.4s;
    }
  }

  &-10 {
    @include setTransform(rotate(270deg));

    &:before {
      -webkit-animation-delay: -0.3s;
      animation-delay: -0.3s;
    }
  }

  &-11 {
    @include setTransform(rotate(300deg));

    &:before {
      -webkit-animation-delay: -0.2s;
      animation-delay: -0.2s;
    }
  }

  &-12 {
    @include setTransform(rotate(330deg));

    &:before {
      -webkit-animation-delay: -0.1s;
      animation-delay: -0.1s;
    }
  }
}

@-webkit-keyframes fadeDelay {
  0%,
  39%,
  100% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
}

@keyframes fadeDelay {
  0%,
  39%,
  100% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
}
</style>