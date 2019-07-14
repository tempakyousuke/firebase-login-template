<template lang="pug">
v-layout(row wrap)
  v-flex(v-for='value, key in folders' xs2 :key='key')
    v-btn(v-if='value.type === `folder`' :to='{path: `/folder/${ value.id }` }' fab large)
      v-icon folder
      br
      br
      | {{ value.name }}
    v-btn(v-else :to='{path: `/game/${ value.id }` }' fab large)
      v-icon folder
      br
      br
      | {{ value.name }}
</template>
<script>
export default {
  data() {
    return {
      folders: []
    }
  },
  computed: {
    folderId() {
      return this.$route.params.id
    },
    folderRef() {
      return this.$firestore.collection('folders').doc(this.folderId)
    }
  },
  created() {
    this.getFolders()
  },
  methods: {
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
    }
  }
}
</script>
