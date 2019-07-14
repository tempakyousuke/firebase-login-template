<template lang="pug">
TypingForm(@submit='addTyping($event)')
</template>
<script>
import TypingForm from '@//components/pages/admin/folder/_id/TypingForm.vue'

export default {
  components: { TypingForm },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    folderRef() {
      return this.$firestore.collection('folders').doc(this.id)
    }
  },
  methods: {
    async addTyping(value) {
      try {
        await this.folderRef.collection('typings').add(value)
        await this.folderRef
          .update({
            type: 'typing'
          })
          .catch((e) => {
            console.log(e)
          })
        this.$emit('finish')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
