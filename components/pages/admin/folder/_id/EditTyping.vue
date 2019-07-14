<template lang="pug">
TypingForm(:typing='typing' @submit='addTyping($event)' isEdit)
</template>
<script>
import TypingForm from '@//components/pages/admin/folder/_id/TypingForm.vue'

export default {
  components: { TypingForm },
  props: {
    id: {
      type: String,
      required: true
    },
    typing: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    folderRef() {
      return this.$firestore.collection('folders').doc(this.id)
    },
    typingRef() {
      return this.folderRef.collection('typings').doc(this.typing.id)
    }
  },
  methods: {
    async addTyping(value) {
      delete value.id
      try {
        await this.typingRef.update(value)
        this.$emit('finish')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
