<template>
  <div>
    <canvas id="container"></canvas>
  </div>
</template>

<script>
import { mapData } from '@/assets/mapData.js'

let min = 2000
let max = 100000
export default {
  name: 'Canvas',
  data() {
    return {
      inRange: {
        // prettier-ignore
        inRangecolor: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
      },
      people: [
        { name: '安徽省', value: 2275, color: '' },
        { name: '北京市', value: 40774, color: '' },
        { name: '重庆市', value: 1471, color: '' },
        { name: '福建省', value: 17122, color: '' },
        { name: '甘肃省', value: 1742, color: '' },
        { name: '广东省', value: 103248, color: '' },
        { name: '广西壮族自治区', value: 2457, color: '' },
        { name: '贵州省', value: 2534, color: '' },
        { name: '海南省', value: 10483, color: '' },
        { name: '河北省', value: 3292, color: '' },
        { name: '黑龙江省', value: 6603, color: '' },
        { name: '河南省', value: 9948, color: '' },
        { name: '湖北省', value: 72131, color: '' },
        { name: '湖南省', value: 7437, color: '' },
        { name: '内蒙古自治区', value: 8847, color: '' },
        { name: '江苏省', value: 5075, color: '' },
        { name: '江西省', value: 3423, color: '' },
        { name: '吉林省', value: 40764, color: '' },
        { name: '辽宁省', value: 3574, color: '' },
        { name: '宁夏回族自治区', value: 1276, color: '' },
        { name: '青海省', value: 728, color: '' },
        { name: '陕西省', value: 7326, color: '' },
        { name: '山东省', value: 5880, color: '' },
        { name: '上海市', value: 67040, color: '' },
        { name: '山西省', value: 7167, color: '' },
        { name: '四川省', value: 14567, color: '' },
        { name: '天津巿', value: 4392, color: '' },
        { name: '西藏自治区', value: 1515, color: '' },
        { name: '新疆维吾尔自治区', value: 3089, color: '' },
        { name: '云南省', value: 9743, color: '' },
        { name: '浙江省', value: 11848, color: '' },
        { name: '台湾省', value: 24680, color: '' },
        { name: '香港特别行政区', value: 41154, color: '' },
        { name: '澳门特别行政区', value: 1596, color: '' }
      ]
    }
  },
  methods: {
    //将数据进行排序
    dataSort() {
      this.people.sort(function (a, b) {
        return a.value - b.value
      })
    },
    color(people) {
      let group = (max - min) / this.inRange.inRangecolor.length

      for (let i = 0; i < this.inRange.inRangecolor.length; i++) {
        let minValue = group * (i - 1) + min
        let maxValue = group * i + min
        for (let item of this.people) {
          if (
            (item.value <= maxValue && item.value >= minValue) ||
            item.value > max
          ) {
            item.color = this.inRange.inRangecolor[i]
          }
        }
      }
      return this.people
    }
  },
  mounted() {
    let canvas = document.querySelector('#container')
    let canvasW = (canvas.width =
      document.getElementById('container').offsetWidth)
    let canvasH = (canvas.height =
      document.getElementById('container').offsetHeight)
    let geoCenterX = 0,
      geoCenterY = 0 // 地图区域的经纬度中心点
    let scale = 1 // 地图缩放系数

    let geoData = []
    let offsetX = 0,
      offsetY = 0 // 鼠标事件的位置信息
    let eventType = '' // 事件类型
    let ctx = canvas.getContext('2d')
    this.dataSort()

    let people = this.color(this.people)

    // 地图绘制入口方法
    function init() {
      let request = new XMLHttpRequest()
      request.open(
        'get',
        'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json'
      )
      //request.open('get', './henan.json')
      request.send()
      request.onload = function () {
        if (request.status === 200) {
          geoData = JSON.parse(request.responseText)
          getBoxArea()
          drawMap()
        }
      }
    }

    // 分三步，清空画布、绘制地图各子区域、标注城市名称
    function drawMap() {
      ctx.clearRect(0, 0, canvasW, canvasH)
      // 画布背景
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvasW, canvasH)
      drawArea()
      drawText()
    }

    // 绘制地图各子区域
    function drawArea() {
      let dataArr = geoData.features
      let cursorFlag = false
      console.log(dataArr)
      for (let i = 0; i < dataArr.length; i++) {
        let centerX = canvasW / 2
        let centerY = canvasH / 2
        dataArr[i].geometry.coordinates.forEach((area) => {
          ctx.save()
          ctx.beginPath()
          ctx.translate(centerX, centerY)
          area[0].forEach((elem, index) => {
            let position = toScreenPosition(elem[0], elem[1])
            if (index === 0) {
              ctx.moveTo(position.x, position.y)
            } else {
              ctx.lineTo(position.x, position.y)
            }
          })
          ctx.closePath()
          ctx.strokeStyle = '#000'

          ctx.lineWidth = 0.5
          // 将鼠标悬浮的区域设置为橘黄色
          if (ctx.isPointInPath(offsetX, offsetY)) {
            cursorFlag = true
            ctx.fillStyle = 'yellow'
          } else {
            for (let item of people) {
              if (item.name === dataArr[i].properties.name) {
                ctx.fillStyle = item.color
              }
            }
            //ctx.fillStyle = '#fff'
          }
          ctx.fill()
          ctx.stroke()
          ctx.restore()
        })
        // 动态设置鼠标样式
        if (cursorFlag) {
          canvas.style.cursor = 'pointer'
        } else {
          canvas.style.cursor = 'default'
        }
      }
    }
    // 标注地图上的城市名称
    function drawText() {
      let centerX = canvasW / 2
      let centerY = canvasH / 2
      geoData.features.forEach((item) => {
        ctx.save()
        ctx.beginPath()
        ctx.translate(centerX, centerY) // 将画笔移至画布的中心
        ctx.fillStyle = '#000'
        ctx.font = '12px Microsoft YaHei'
        ctx.textAlign = 'center'
        ctx.textBaseLine = 'center'
        let x = 0,
          y = 0
        //  因不同的geojson文件中中心点属性信息不同，这里需要做兼容性处理
        if (item.properties.cp) {
          x = item.properties.cp[0]
          y = item.properties.cp[1]
        } else if (item.properties.centroid) {
          x = item.properties.centroid[0]
          y = item.properties.centroid[1]
        } else if (item.properties.center) {
          x = item.properties.center[0]
          y = item.properties.center[1]
        }
        let position = toScreenPosition(x, y)
        ctx.fillText(item.properties.name, position.x, position.y)
        ctx.restore()
      })
    }

    // 将经纬度坐标转换为屏幕坐标
    function toScreenPosition(horizontal, vertical) {
      return {
        x: (horizontal - geoCenterX) * scale,
        y: (geoCenterY - vertical) * scale
      }
    }

    // 获取包围盒范围，计算包围盒中心经纬度坐标，计算地图缩放系数
    function getBoxArea() {
      let N = -90,
        S = 90,
        W = 180,
        E = -180
      geoData.features.forEach((item) => {
        // 将MultiPolygon和Polygon格式的地图处理成统一数据格式
        if (item.geometry.type === 'Polygon') {
          item.geometry.coordinates = [item.geometry.coordinates]
        }
        // 取四个方向的极值
        item.geometry.coordinates.forEach((area) => {
          area[0].forEach((elem) => {
            if (elem[0] < W) {
              W = elem[0]
            }
            if (elem[0] > E) {
              E = elem[0]
            }
            if (elem[1] > N) {
              N = elem[1]
            }
            if (elem[1] < S) {
              S = elem[1]
            }
          })
        })
      })
      // 计算包围盒的宽高
      let wScale = canvasW / Math.abs(E - W)
      let hScale = canvasH / Math.abs(N - S)
      // 计算地图缩放系数
      scale = wScale > hScale ? hScale : wScale
      // 获取包围盒中心经纬度坐标

      geoCenterX = (E + W) / 2
      geoCenterY = (N + S) / 2
    }

    // 滚轮缩放事件
    canvas.addEventListener('mousewheel', function (event) {
      if (event.deltaY > 0) {
        if (scale > 10) {
          scale -= 10
        }
      } else {
        scale += 10
      }
      eventType = 'mousewheel'
      drawMap()
    })

    // 鼠标移动事件
    canvas.addEventListener('mousemove', function (event) {
      offsetX = event.offsetX
      offsetY = event.offsetY
      eventType = 'mousemove'
      drawMap()
    })

    // 鼠标点击事件
    canvas.addEventListener('click', function (event) {
      offsetX = event.offsetX
      offsetY = event.offsetY
      eventType = 'click'
      drawMap()
    })

    init()
  }
}
</script>

<style>
/* canvas {
  display: flex;
  width: 100%;
  height: 100%;
} */
#container {
  width: 600px;
  height: 600px;
}
</style>
