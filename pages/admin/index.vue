<template lang="pug">
v-layout(row wrap)
  v-flex(v-for='value, key in folders' xs2 :key='key')
    v-btn(:to='{path: `folder/${ value.id }` }' fab large)
      v-icon folder
      br
      br
      | {{ value.name }}
  v-btn.plus-button(color='error' large fab @click='folderDialog= true') ＋
  v-dialog(v-model='folderDialog')
    AddFolder(@finish='finishAdd')
</template>
<script>
import AddFolder from '@/components/pages/admin/index/AddFolder'

export default {
  components: { AddFolder },
  data() {
    return {
      folderDialog: false,
      folders: []
    }
  },
  created() {
    this.getFolders()
  },
  methods: {
    finishAdd() {
      this.folderDialog = false
      this.getFolders()
    },
    async getFolders() {
      try {
        const foldersRef = this.$firestore.collection('folders')
        const querySnapshot = await foldersRef.where('root', '==', true).get()
        const folders = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          data.id = doc.id
          folders.push(data)
        })
        this.folders = folders
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style lang="sass" scoped>
.plus-button
  position: fixed
  font-size: 50px
  bottom: 10%
  right: 5%
</style>
