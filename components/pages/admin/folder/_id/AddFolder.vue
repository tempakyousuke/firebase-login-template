<template lang="pug">
v-flex
  v-flex(offset-xs2 xs8)
    v-text-field(label='folder name' v-model='folderName')
  v-flex(xs6 offset-xs3)
    v-btn.mt-5(block color='success' @click='addFolder' large) add folder
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      folderName: ''
    }
  },
  computed: {
    folderRef() {
      return this.$firestore.collection('folders').doc(this.id)
    }
  },
  methods: {
    async addFolder() {
      try {
        await this.$firestore.collection('folders').add({
          root: false,
          name: this.folderName,
          parentId: this.id
        })
        await this.setFolderType()
        this.folderName = ''
        this.$emit('finish')
      } catch (e) {
        console.log(e)
      }
    },
    setFolderType() {
      return this.folderRef.update({
        type: 'folder'
      })
    }
  }
}
</script>
