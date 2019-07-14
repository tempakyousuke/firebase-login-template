<template lang="pug">
v-layout(row wrap)
  TypingGame(:typing='nowTyping')
</template>
<script>
import TypingGame from '@/components/game/Typing'

export default {
  components: { TypingGame },
  data() {
    return {
      typings: [],
      nowTyping: {}
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
  async created() {
    await this.getTypings()
    this.startGame()
  },
  methods: {
    async getTypings() {
      try {
        const ref = this.folderRef.collection('typings')
        const querySnapshot = await ref.get()
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
    startGame() {
      this.nowTyping = this.typings[0]
    }
  }
}
</script>
