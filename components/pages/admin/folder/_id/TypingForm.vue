<template lang="pug">
v-flex
  v-flex(offset-xs2 xs8)
    v-text-field(label='typing text' v-model='data.text')
  v-flex(offset-xs2 xs8)
    v-text-field(label='description' v-model='data.description')
  v-flex(offset-xs2 xs8)
    v-select(label='language' v-model='data.lang' :items='langOption')
  v-flex(xs6 offset-xs3)
    v-btn.mt-5(block color='success' @click='submit' large) {{ submitText }}
</template>
<script>
const langOption = [
  {
    value: '',
    text: ''
  },
  {
    value: 'js',
    text: 'JavaScript'
  },
  {
    value: 'php',
    text: 'PHP'
  }
]

const defaultData = {
  text: '',
  description: '',
  lang: ''
}

export default {
  props: {
    typing: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: {
        text: '',
        description: '',
        lang: ''
      },
      langOption: langOption
    }
  },
  computed: {
    submitText() {
      if (this.isEdit) {
        return 'update'
      } else {
        return 'add'
      }
    }
  },
  watch: {
    typing(val) {
      this.data = Object.assign({}, val)
    }
  },
  methods: {
    submit() {
      this.$emit('submit', this.data)
      this.data = Object.assign({}, defaultData)
    }
  }
}
</script>
