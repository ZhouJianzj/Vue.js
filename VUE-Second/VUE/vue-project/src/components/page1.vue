<template>
    <div>page1的值是:{{number}}</div>
</template>

<script>
  //引入mixin.js
import {mixin} from "@/mixin/mixin"
export default {
  //这里注意：属性名为mixins，值为数组类型
  mixins:[mixin],
  data () {
    return {

    }
  },
}
</script>

<style scoped>

</style>
