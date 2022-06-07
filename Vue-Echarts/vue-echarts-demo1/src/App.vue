<template>
  <div id="app">
    <!--    echarts的容器默认宽高是0，不设置宽高是不显示的-->
    <div id="main"></div>
    <div id="two"></div>
    <div id="three"></div>
    <div id="four"></div>
    <div id="five"></div>
  </div>
</template>
<script>
export default {

  mounted() {
    this.demoOne()
    this.demoTwo()
    this.demoPie()
    this.demoLineTwo()
    this.demoLineThree()
  },
  methods: {
    demoOne() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('main'));
// 绘制图表
      myChart.setOption({
        title: {
          text: 'ECharts 入门示例',
          left: 'center',// textAlign: 'center' 这个好像不管用使用left为center替代了
          subtext: '副标题',//副标题的所有设置都是通过加sub前缀
          link: 'http://www.baidu.com',
          target: 'blank'
        },
        tooltip: {
          trigger: "item",
          axisPointer: {
            type: 'none'
          },
          backgroundColor: 'pink',
          borderColor: 'red',
          //有两种方式去实现提示自定义
          // formatter: '{b0}: {c0}'
          formatter(params) {
            // console.log(params);
            return "商品信息：" + params.name + "-->" + params.data + "RMB"//适用item的触发方式

            // for (let i = 0; i <params.length; i++) {//适用axis的触发方式
            //   return "商品信息：" + params[i].name + "-->" + params[i].data + "RMB"
            // }
          }
        },
        legend: {
          show: true,
          left: 'right',
          top: '20%',
          selected: {
            // 选中'系列1'
            '2022': true,
            // 不选中'系列2'
            '2021': false
          }
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        //系列是echarts中的一个重要的属性
        series: [
          {
            //给系列起一个名称
            name: '2022',
            //指定echarts渲染图表的类型
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          },
          {
            //给系列起一个名称
            name: '2021',
            //指定echarts渲染图表的类型
            type: 'bar',
            data: [6, 10, 30, 30, 20, 20]
          }
        ],
      });
    },

    demoTwo() {
      let charTow = this.$echarts.init(document.getElementById('two'));
      charTow.setOption({
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed']
        },
        series: [
          {
            data: [120, 200, 150],
            type: 'bar',
            barWidth: 20,//设置柱状图的宽度
            // color: "red",//设置柱状图的颜色

            itemStyle:{ //设置柱状图的颜色每一个都不同
              normal:{
                color:function (params){
                  let colorList = ["#c33444","#433333","#656564"]
                  return colorList[params.dataIndex]
                }
              }
            },

            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            },
            markPoint: {
              symbol: 'circle',
              symbolSize: 50,
              symbolOffset: [0, '-50%'],
              data: [
                {
                  name: '最大值',
                  type: 'max',
                  itemStyle: {
                    color: "red"
                  }
                }, {
                  name: '最小值',
                  type: 'min',
                  itemStyle: {}
                },

              ]
            },
            markLine: {
              data: [
                {
                  type: 'average',
                  name: "平均值"
                }
              ]
            }
          }


        ]
      })
    },

    demoPie(){
      let chartPie = this.$echarts.init(document.getElementById('three'))
      chartPie.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'right',
          orient:'verical'

        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            //饼状图设置内外半径成环状饼状图
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            // 标签设置
            label: {
              show: false,
              position: 'center'
            },
            //标签着重设置,就是选中之后会出现高亮的效果下面的折线图中会有应用
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            // 标签线
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ]
      })
    },

    demoLineTwo(){
      let line = this.$echarts.init(document.getElementById("four") )
      line.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            //设置折线图为平滑曲线图
            smooth: true,
            areaStyle:{},
            markPoint:{
              data:[
                {type:"max",name:"最大值"},
                {type:"min",name:"最小值"},
              ]
            }
          }
        ]
      })
    },

    demoLineThree(){
      let lineThree  = this.$echarts.init(document.getElementById("five"))
      lineThree.setOption({
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
        title: {
          text: 'Gradient Stacked Area Chart'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Line 1',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(128, 255, 165)'
                },
                {
                  offset: 1,
                  color: 'rgb(1, 191, 236)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [140, 232, 101, 264, 90, 340, 250]
          },
          {
            name: 'Line 2',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(0, 221, 255)'
                },
                {
                  offset: 1,
                  color: 'rgb(77, 119, 255)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [120, 282, 111, 234, 220, 340, 310]
          },
          {
            name: 'Line 3',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(55, 162, 255)'
                },
                {
                  offset: 1,
                  color: 'rgb(116, 21, 219)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [320, 132, 201, 334, 190, 130, 220]
          },
          {
            name: 'Line 4',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 0, 135)'
                },
                {
                  offset: 1,
                  color: 'rgb(135, 0, 157)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [220, 402, 231, 134, 190, 230, 120]
          },
          {
            name: 'Line 5',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            label: {
              show: true,
              position: 'top'
            },
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 191, 0)'
                },
                {
                  offset: 1,
                  color: 'rgb(224, 62, 76)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [220, 302, 181, 234, 210, 290, 150]
          }
        ]
      })
    }

  }
}
</script>

<style>


#main {
  width: 800px;
  height: 600px;
}

#two {
  width: 800px;
  height: 600px;
}
#three {
  width: 800px;
  height: 600px;
}
#four {
  width: 800px;
  height: 600px;
}
#five {
  width: 800px;
  height: 600px;
}
</style>
