const describe = {
  title: "Vue3 demo",
  cover: "vue3.jpeg",
  subhead: "Redux demo",
  date: "2022/4/3",
  tags: "vue"
}
  
const getReactCode = () => {
  let a = 
  `<template>
    <div class='title'>{{ title }}</div>
    <div class='info'>{{ info }}</div>
    <input v-model="msg">
</template>

<script setup>
import { ref } from 'vue'

const title = ref("Hello Moderate, let's play!")
const info = ref("This is Vue3 demo.")
const msg = ref("123")
</script>

<style lang="less">
h1 {
    color: red;
}
.title{
  color: red;
  font-weight:bold;
  font-size:50px;
  font-family: system-ui;
}
.info{
color: rgba(0, 0, 0, 0.85);
font-weight: 400;
font-size: 2em;
margin-bottom: 30px;
}
</style>  
            `;
  return a;
};
const config = {
  describe,
  template: {
    languageType:"vue3",
    vue: getReactCode(),
    
  },
  resources: {
    js: [
      {
        name: "vue3",
        url: "https://cdn.bootcdn.net/ajax/libs/vue/3.2.0-beta.7/vue.global.js",
      },
    ],
  },
};

module.exports = config
