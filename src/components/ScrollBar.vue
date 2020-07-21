<template>
  <Scrolly :passive-scroll="true">
    <ScrollyViewport>
        <slot></slot>
    </ScrollyViewport>
    <ScrollyBar :axis="axis"/>
  </Scrolly>
</template>

<script>
import { Scrolly, ScrollyViewport, ScrollyBar } from 'vue-scrolly';
export default {
    name: 'ScrollBar',
    components: {
        Scrolly,
        ScrollyViewport,
        ScrollyBar
    },
    props: {
        axis: {
            type: String,
            default: 'y'
        }
    }
};
</script>

<style lang="less" scoped>
.scrolly-bar {
  border-width: 2px;
  &.axis-y {
    width: 6px;
  }
  &.axis-x {
    height: 6px;
  }
}
</style>

