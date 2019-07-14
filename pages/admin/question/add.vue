<template lang="pug">
v-layout(row wrap)
  v-flex(xs12)
    v-textarea(label='question' v-model='question')
  v-flex.mt-5(v-for='value, key in choices' xs12 :key='`choice${key}`')
    v-layout(row wrap)
      v-flex(xs6)
        v-checkbox(v-model='value.isCorrect' label='is answer')
      v-flex(xs2 offset-xs4)
        v-btn(fab color='error' small @click='deleteChoice(key)') del
      v-flex(xs12)
        v-textarea(v-model='value.text' :label='`choice ${key + 1}`')
  v-flex(xs1 offset-xs10)
    v-btn(fab color='primary' @click='addChoice' large) add
  v-flex(xs6 offset-xs3)
    v-btn.mt-5(block color='success' @click='createQuestion' large) create question

</template>
<script>
export default {
  data() {
    return {
      question: '',
      choices: [{ text: '', isCorrect: false }]
    }
  },
  methods: {
    addChoice() {
      this.choices.push({ text: '', isCorrect: false })
    },
    deleteChoice(index) {
      this.choices.splice(index, 1)
    },
    createQuestion() {
      this.$firestore.collection('questions').add({
        question: this.question,
        choices: this.choices
      })
    }
  }
}
</script>
