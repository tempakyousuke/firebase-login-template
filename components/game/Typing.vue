<template lang="pug">
v-flex(xs12 sm8 offset-sm2)
  v-card.mt-5
    v-card-title
    v-card-text
      v-flex.title(v-if='!hideTypeText', xs10 offset-xs1)
        span.firstText
          | {{typeTextFirst}}
        span(:class="{isMissing:isMissing}" )
          | {{typeTextSecond}}
      v-flex(xs10 offset-xs1)
        v-text-field(v-model='typedText', label='type above text')
      v-flex.mt-5(v-if='!hideDescription', xs12)
        h3 description
        highlight-code(v-if='typing.description', :lang='typing.lang', :code='typing.description')
        div.mt-3.title(v-if='typing.reference')
          | reference:&nbsp;
          a(:href='typing.reference', target='_blank') {{ typing.reference }}
    v-card-actions
      v-switch(v-if='textSwitch' v-model='hideTypeText', label = 'hide text')
      v-switch(v-if='descSwitch' v-model='hideDescription', label = 'hide about')
      v-spacer
      v-btn(@click="$emit('close')" large) close
</template>
<script>
export default {
  name: 'TypingGame',
  props: {
    typing: {
      type: Object,
      default: () => {}
    },
    textSwitch: {
      type: Boolean,
      default: false
    },
    descSwitch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      typedText: '',
      hideDescription: false,
      hideTypeText: false
    }
  },
  computed: {
    typingText() {
      return this.typing.text || ''
    },
    isMissing() {
      const re = new RegExp('^' + this.typedText)
      return !re.test(this.typingText)
    },
    typeTextFirst() {
      if (!this.isMissing) {
        return this.typedText
      }
      return ''
    },
    typeTextSecond() {
      if (!this.isMissing) {
        return this.typingText.replace(this.typedText, '')
      } else {
        return this.typingText
      }
    }
  },
  watch: {
    typedText(to) {
      if (to === this.typing.text) {
        this.$emit('ok')
        this.typedText = ''
      }
    }
  }
}
</script>
<style lang="sass">
.isMissing
  color: red
.firstText
  color: blue
</style>
