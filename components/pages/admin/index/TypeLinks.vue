<template lang="pug">
v-flex
  v-flex(xs6 offset-xs3)
    v-btn(:to='`/admin/folder/${id}`' block color='primary') folder
    v-btn(:to='`/admin/typing/${id}`' block color='primary') typing
    v-btn(:to='`/admin/question/${id}`' block color='primary') question
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  }
}
</script>
