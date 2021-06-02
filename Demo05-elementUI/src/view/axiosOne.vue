<template>
<div>
  <h1>axiosOne</h1>
  {{info}}
</div>
</template>

<script>
    export default {
        name: "axiosOne",
      //路由之前干的
      beforeRouteEnter:(to,from,next)=>{
        console.log("路由之  前    干的")
        //这里加载数据
        next(vm => {
         // vm表示的当前对象
         vm.axios.get("../static/json.json").then(
            response=>{vm.info = response.data}
          )
        })
      },
    //  路由之后干的
      beforeRouteLeave:(to,from,next)=>{
          console.log("路由之  后    干的")
        next()
      },
      data(){
          return{
            // 接受返回的json数据
            info:{
              // 这里需要注意的是需要书写json格式
              "name":null,
              "age":null,
              "address":{
                "one":null,
                "Two":null,
                "Three":null
              },
              "array":[
                {
                  "name":null,
                  "address":null
                },
                {
                  "name":null,
                  "adress":null
                }
              ]
            }
          }
      }
    }
</script>

<style scoped>

</style>
