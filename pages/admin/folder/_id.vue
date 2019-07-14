<template lang="pug">
v-layout(row wrap)
  v-flex(v-for='value, key in folders' xs2 :key='key')
    v-btn(:to='{path: `/admin/folder/${ value.id }` }' fab large)
      v-icon folder
      br
      br
      | {{ value.name }}
  v-flex(v-for='value, key in typings' xs3 :key='key' @click='startEditTyping(key)')
    v-card
      | {{ value.text }}
      | {{ value.description }}
  v-btn.plus-button(color='error' large fab @click='startSelect') ＋
  v-dialog(v-model='selectDialog')
    SelectType(:isFolderOk='isFolderOk' @select='selectType($event)')
  v-dialog(v-model='folderDialog')
    AddFolder(:id='folderId' @finish='finishFolderAdd')
  v-dialog(v-model='typingDialog')
    AddTyping(:id='folderId' @finish='finishTyping')
  v-dialog(v-model='typingEditDialog')
    EditTyping(:id='folderId' :typing='selectedTyping' @finish='finishTyping')
</template>
<script>
import AddFolder from '@/components/pages/admin/folder/_id/AddFolder'
import AddTyping from '@/components/pages/admin/folder/_id/AddTyping'
import EditTyping from '@/components/pages/admin/folder/_id/EditTyping'
import SelectType from '@/components/pages/admin/folder/_id/SelectType'

export default {
  components: { AddFolder, AddTyping, EditTyping, SelectType },
  data() {
    return {
      folderDialog: false,
      folder: {},
      folders: [],
      typings: [],
      typingDialog: false,
      typingEditDialog: false,
      selectedFolderId: '',
      selectDialog: false,
      selectedTypingKey: 0
    }
  },
  computed: {
    folderId() {
      return this.$route.params.id
    },
    folderRef() {
      return this.$firestore.collection('folders').doc(this.folderId)
    },
    isFolderOk() {
      return this.folder.type === undefined || this.folder.type === 'folder'
    },
    selectedTyping() {
      return this.typings[this.selectedTypingKey]
    }
  },
  async created() {
    await this.getFolderInfo()
    if (this.folder.type === 'folder') {
      this.getFolders()
    }
    if (this.folder.type === 'typing') {
      this.getTypings()
    }
  },
  methods: {
    async getFolderInfo() {
      try {
        const folder = await this.folderRef.get()
        this.folder = folder.data()
      } catch (e) {
        console.log(e)
      }
    },
    finishFolderAdd() {
      this.getFolders()
      this.folderDialog = false
    },
    finishTyping() {
      this.getTypings()
      this.typingDialog = false
      this.typingEditDialog = false
    },
    async getFolders() {
      try {
        const foldersRef = this.$firestore.collection('folders')
        const querySnapshot = await foldersRef
          .where('parentId', '==', this.folderId)
          .get()
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
    },
    async getTypings() {
      try {
        const typingsRef = this.folderRef.collection('typings')
        const querySnapshot = await typingsRef.get()
        const typings = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          data.id = doc.id
          typings.push(data)
        })
        this.typings = typings
      } catch (e) {
        console.log(e)
      }
    },
    startSelect() {
      if (this.folder.type === 'folder') {
        this.folderDialog = true
      } else {
        this.selectDialog = true
      }
    },
    selectType(value) {
      const dialogs = {
        folder: 'folderDialog',
        typing: 'typingDialog',
        question: 'questionDialog'
      }
      const dialog = dialogs[value]
      this[dialog] = true
      this.selectDialog = false
    },
    startEditTyping(key) {
      this.selectedTypingKey = key
      this.typingEditDialog = true
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
