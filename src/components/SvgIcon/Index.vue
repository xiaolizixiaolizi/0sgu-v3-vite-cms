<template>
  <div>
    <svg :style="{ width: width, height: height }">
      <use :xlink:href="`#icon-${name}`" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts" name="SvgIcon">
export type Props = {
  name: string
  color: string
  width: string
  height: string
}
withDefaults(defineProps<Props>(), {
  width: '1em',
  height: '1em',
})
</script>
<style scoped></style>
