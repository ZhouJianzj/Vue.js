<template>
  <div id="app">
    <!--    echarts的容器默认宽高是0，不设置宽高是不显示的-->
    <div id="main"></div>
    <div id="two"></div>
    <div id="three"></div>
    <div id="four"></div>
    <div id="five"></div>
    <div ref="scatter" id="scatter"></div>
    <div id="candlestick"></div>
    <div id="radar"></div>
    <div id="funnel"></div>
    <div id="gauge"></div>
    <div id="graph"></div>
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
    this.demoScatterOne()
    this.demoCandlestick()
    this.demoRadar()
    this.demoFunnel()
    this.demoGauge()
    this.demoGraph()
  },
  data() {
    return {
      kData: [
        [20, 34, 10, 38],
        [40, 35, 30, 50],
        [31, 38, 33, 44],
        [38, 15, 5, 42]
      ]
    }
  },
  // 计算属性
  computed: {
    newKData() {
      // let arr = []
      // for (let i = 0; i <this.kData.length; i++) {
      //   arr.push(this.kData[i][0])
      // }
      let arr = this.kData.map(V => V[0]);
      return arr
    }
  }
  ,
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

            itemStyle: { //设置柱状图的颜色每一个都不同
              normal: {
                color: function (params) {
                  let colorList = ["#c33444", "#433333", "#656564"]
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

    demoPie() {
      let chartPie = this.$echarts.init(document.getElementById('three'))
      chartPie.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'right',
          orient: 'verical'

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
              {value: 1048, name: 'Search Engine'},
              {value: 735, name: 'Direct'},
              {value: 580, name: 'Email'},
              {value: 484, name: 'Union Ads'},
              {value: 300, name: 'Video Ads'}
            ]
          }
        ]
      })
    },

    demoLineTwo() {
      let line = this.$echarts.init(document.getElementById("four"))
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
            areaStyle: {},
            markPoint: {
              data: [
                {type: "max", name: "最大值"},
                {type: "min", name: "最小值"},
              ]
            }
          }
        ]
      })
    },

    demoLineThree() {
      let lineThree = this.$echarts.init(document.getElementById("five"))
      lineThree.setOption({
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
        title: {
          text: 'Gradient'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            //坐标轴上的标签颜色
            label: {
              backgroundColor: '#0836d4'
            }
          }
        },
        legend: {
          data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5'],
          left: "center",
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        //图标离div之间的间距，上下左右
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
            //多个折现的时候使用堆叠的时候需要有一样的stack，这里都是total
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
              focus: 'series',
              scale: true
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
    },

    demoScatterOne() {
      let scatter = this.$echarts.init(this.$refs.scatter)
      scatter.setOption({
        xAxis: {},
        yAxis: {},
        tooltip: {},
        //渐变色
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'red' // 0% 处的颜色
          }, {
            offset: 1, color: 'blue' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        },
        series: [
          {
            symbolSize: 20,
            data: [
              [10.0, 8.04],
              [8.07, 6.95],
              [13.0, 7.58],
              [9.05, 8.81],
              [11.0, 8.33],
              [14.0, 7.66],
              [13.4, 6.81],
              [10.0, 6.33],
              [14.0, 8.96],
              [12.5, 6.82],
              [9.15, 7.2],
              [11.5, 7.2],
              [3.03, 4.23],
              [12.2, 7.83],
              [2.02, 4.47],
              [1.05, 3.33],
              [4.05, 4.96],
              [6.03, 7.24],
              [12.0, 6.26],
              [12.0, 8.84],
              [7.08, 5.82],
              [5.02, 5.68]
            ],
            type: 'scatter',
            emphasis: {
              focus: 'series',
              itemStyle: {
                borderColor: 'green',
                borderWidth: 10
              }
            },

          }
        ]
      })
    },

    demoCandlestick() {
      let candlestick = this.$echarts.init(document.getElementById("candlestick"))
      let option = {
        xAxis: {
          data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27']
        },
        yAxis: {},
        series: [
          {
            type: 'candlestick',
            data: this.kData
          },
          {
            type: "line",
            smooth: true,
            data: this.newKData
          }

        ],
        tooltip: {}
      }
      candlestick.setOption(option)
    },

    demoRadar() {
      let radar = this.$echarts.init(document.getElementById("radar"))
      let option = {
        title: {
          text: 'Basic Radar Chart'
        },
        legend: {
          data: ['Allocated Budget', 'Actual Spending']
        },
        tooltip: {},
        //设置雷达图坐标系的
        radar: {
          // shape: 'circle',
          indicator: [
            {name: 'Sales', max: 6500},
            {name: 'Administration', max: 16000},
            {name: 'Information Technology', max: 30000},
            {name: 'Customer Support', max: 38000},
            {name: 'Development', max: 52000},
            {name: 'Marketing', max: 25000}
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: 'Allocated Budget'
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: 'Actual Spending'
              }
            ]
          }
        ]
      };
      radar.setOption(option)
    },

    demoFunnel() {
      let funnel = this.$echarts.init(document.getElementById("funnel"))
      let option = {
        title: {
          text: 'Funnel'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          data: ['Show', 'Click', 'Visit', 'Inquiry', 'Order']
        },
        series: [
          {
            name: 'Funnel',
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'inside'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#decaca',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 70
              }
            },
            data: [
              {value: 60, name: 'Visit'},
              {value: 40, name: 'Inquiry'},
              {value: 20, name: 'Order'},
              {value: 80, name: 'Click'},
              {value: 100, name: 'Show'}
            ]
          }
        ]
      };
      funnel.setOption(option)
    },

    demoGauge() {
      let gauge = this.$echarts.init(document.getElementById("gauge"))
      let option = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: 'Pressure',
            type: 'gauge',
            //显示仪表盘上的进度条的
            progress: {
              show: true
            },
            //数字标签的动画
            detail: {
              valueAnimation: true,
              formatter: '{value}'
            },
            data: [
              {
                value: 50,
                name: 'SCORE'
              }
            ]
          }
        ]
      };
      gauge.setOption(option)
    },

    demoGraph() {
      let graph = this.$echarts.init(document.getElementById("graph"))
      let option = {
        title: {
          text: 'Basic Graph'
        },
        tooltip: {},
        //数据更新动画
        animationDurationUpdate: 1500,
        //数据更新动画的缓动效果。
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'none',
            symbolSize: 50,
            //是否开启鼠标缩放和平移漫游
            roam: true,
            label: {
              show: true,
              position:"outside"
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 20
            },
            data: [
              {
                name: 'Node 1',
                x: 300,
                y: 300
              },
              {
                name: 'Node 2',
                x: 800,
                y: 300
              },
              {
                name: 'Node 3',
                x: 550,
                y: 100
              },
              {
                name: 'Node 4',
                x: 550,
                y: 500
              }
            ],

            // links: [],
            links: [
              {
                source: 0,
                target: 1,
                //'circle', 'arrow'的大小也就是边的两端图标大小
                symbolSize: [10, 30],
                label: {
                  show: true
                },
                lineStyle: {
                  width: 5,
                  curveness: 0.2
                }
              },
              {
                source: 'Node 2',
                target: 'Node 1',
                label: {
                  show: true
                },
                lineStyle: {
                  curveness: 0.2
                }
              },
              {
                source: 'Node 1',
                target: 'Node 3'
              },
              {
                source: 'Node 2',
                target: 'Node 3'
              },
              {
                source: 'Node 2',
                target: 'Node 4'
              },
              {
                source: 'Node 1',
                target: 'Node 4'
              }
            ],
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0
            }
          }
        ]
      };
      graph.setOption(option)
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

#scatter {
  width: 800px;
  height: 600px;
}

#candlestick {
  width: 800px;
  height: 600px;
}

#radar {
  width: 800px;
  height: 600px;
}

#funnel {
  width: 800px;
  height: 600px;
}

#gauge {
  width: 800px;
  height: 600px;
}

#graph {
  width: 800px;
  height: 600px;
}
</style>
