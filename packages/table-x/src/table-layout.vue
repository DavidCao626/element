<template>
  <div class="elx-table-layout">
    <div style="float: right;margin-top: 4px;">
      <slot name="headerRight"></slot>
    </div>

    <slot name="headerLeft"></slot>
    <div style="clear: none;height: 50px;" v-if="!$slots.headerLeft"></div>
    <div>
      <slot name="default"></slot>
    </div>
    <div style="margin-top: 10px;">
      <slot name="footer"></slot>
    </div>
  </div>

</template>
<script>
export default {
  name: "ElxTableLayout"
};
</script>
