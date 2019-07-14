<template lang="pug">
v-flex
  v-flex(xs6 offset-xs3)
    v-btn(v-if='isFolderOk' block color='primary' @click='select(`folder`)') folder
    v-btn(block color='primary' @click='select(`typing`)') typing
    v-btn(block color='primary' @click='select(`question`)') question
</template>
<script>
export default {
  props: {
    isFolderOk: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    select(type) {
      this.$emit('select', type)
    }
  }
}
</script>
