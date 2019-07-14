<template lang="pug">
v-flex
  v-flex(offset-xs2 xs8)
    v-text-field(label='folder name' v-model='folderName')
  v-flex(xs6 offset-xs3)
    v-btn.mt-5(block color='success' @click='addFolder' large) add folder
</template>
<script>
export default {
  data() {
    return {
      folderName: ''
    }
  },
  methods: {
    async addFolder() {
      try {
        await this.$firestore.collection('folders').add({
          root: true,
          name: this.folderName
        })
        this.folderName = ''
        this.$emit('finish')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
