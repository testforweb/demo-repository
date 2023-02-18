<template>
  <div class="bb">
    <div class="carousel">
      <div class="carousel_nav">
        <span id="moveLeft" class="carousel_arrow">
          <svg class="carousel_icon" width="24" height="24" viewbox="0 0 24 24">
            <path
              d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"
            ></path>
          </svg>
        </span>
        <span id="moveRight" class="carousel_arrow">
          <svg class="carousel_icon" width="24" height="24" viewbox="0 0 24 24">
            <path
              d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
            ></path>
          </svg>
        </span>
      </div>
      <!-- 图片文章概述 -->
      <div class="carousel-item carousel-item--1">
        <div class="carousel-item_image">
          <drawmap></drawmap>
          <!-- <canvas id="radar-view" width="422.375" height="300"></canvas> -->
        </div>
        <div class="carousel-item_info">
          <div class="carousel-item_cantainer">
            <h2 class="carousel-item_subtitle">[200200] HTTP OKOK 队伍</h2>
            <h1 class="carousel-item_title">概述</h1>
            <p class="carousel-item_description">
              疫情期间，我们大部分时间是在家里度过的，那么，我们最应该做的事情是什么呢？利用疫情期间这段时间，静下心来好好想一想自己的职业规划，我们的生活一年又一年都在繁忙中度过，我相信大家今年应该是在家待时间最长的一年吧，奋斗好几年了，趁着这段时间回顾一下自己成绩，分析一下未来的发展趋势，为自己今后的的职业生涯做好规划，右边是我们统计的，在疫情期间大家的时间占比。
            </p>
          </div>
        </div>
      </div>

      <!-- <div class="carousel-item carousel-item--2">
        <div class="carousel-item_image"></div>
        <div class="carousel-item_info">
          <div class="carousel-item_container">
            <h2 class="carousel-item_subtitle"><aboutView></aboutView></h2>
            <h1 class="carousel-item_title">拉普兰</h1>
            <p class="carousel-item_description">
              拉普兰地处芬兰最北部。这是一片充满魔幻魅力的北极地带，各种反差十分强烈。事实上，拉普兰地区的主要魅力之一就是强烈的反差：从24小时日照不断的温暖夏季，到北极光辉映下的黑暗冬日。
            </p>
            <a href="#" class="carousel-item_btn">阅读文章</a>
          </div>
        </div>
      </div> -->

      <div class="carousel-item carousel-item--3">
        <div class="carousel-item_image"><Wuzhihao></Wuzhihao></div>
        <div class="carousel-item_info">
          <div class="carousel-item_container">
            <h2 class="carousel-item_subtitle">不同年龄人群的新冠痊愈时间</h2>
            <h1 class="carousel-item_title">散点图</h1>
            <p class="carousel-item_description">
              我们调查了人群中新冠的痊愈时间与年龄的关系，绘制成散点图。从图中的数据可以看出，平均痊愈时间是
              7.4
              天，儿童的痊愈时间较长，而青年以后随着年龄的增长，痊愈时间也是更长的。
            </p>
          </div>
        </div>
      </div>

      <div class="carousel-item carousel-item--4">
        <div class="carousel-item_image"><libituo></libituo></div>
        <div class="carousel-item_info">
          <div class="carousel-item_cantainer">
            <p class="carousel-item_description">
              疫情期间，我们大部分时间是在家里度过的，那么，我们最应该做的事情是什么呢？利用疫情期间这段时间，静下心来好好想一想自己的职业规划，我们的生活一年又一年都在繁忙中度过，我相信大家今年应该是在家待时间最长的一年吧，奋斗好几年了，趁着这段时间回顾一下自己成绩，分析一下未来的发展趋势，为自己今后的的职业生涯做好规划，右边是我们统计的，在疫情期间大家的时间占比。
            </p>
          </div>
        </div>
      </div>

      <div class="carousel-item carousel-item--5">
        <div class="carousel-item_image"><wujiaoya></wujiaoya></div>
        <div class="carousel-item_info">
          <div class="carousel-item_container">
            <h2 class="carousel-item_subtitle">按照地理位置统计新冠疫情人数</h2>
            <h1 class="carousel-item_title">饼图</h1>
            <p class="carousel-item_description">
              该数据主要是根据中国地区的地理位置统计的感染人数，并绘制成饼图，我们从图中可以直观地感受到，华南和华东地区感染人数较多，并结合实际情况，造成这样的原因主要在于华南和华东地区经济较发达，流动人口较多，感染风险也较大
            </p>
            <a href="#" class="carousel-item_btn"></a>
          </div>
        </div>
      </div>
      <div class="carousel-item carousel-item--6">
        <div class="carousel-item_image"><fangweiwei></fangweiwei></div>
        <div class="carousel-item_info">
          <div class="carousel-item_container">
            <h2 class="carousel-item_subtitle">柱状图</h2>
            <h1 class="carousel-item_title">奧克拉荷馬疫情</h1>
            <p class="carousel-item_description">
              图中主要展示了奧克拉荷馬州整个疫情期间的总数据（最新数据可能有更新）。2021年统计奧克拉荷馬州总人口数398.7万，通过图表可以发现，新冠感染人数高达1/3，虽然疫苗总接种计量达到了总人口数的2倍，但是完成整个接种程序的人却只有60%,
            </p>
            <a href="#" class="carousel-item_btn"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import aboutView from './AboutView.vue'
import libituo from '../components/libituo.vue'
import wujiaoya from '../components/wujiaoya.vue'
import Wuzhihao from '../components/Wuzhihao.vue'
import fangweiwei from '../components/fangweiwei.vue'
import drawmap from '@/components/drawMap.vue'

export default {
  name: 'Topbanana',
  components: {
    aboutView,
    libituo,
    wujiaoya,
    Wuzhihao,
    fangweiwei,
    drawmap
  },
  data() {
    return {
      carouselitem: [],
      total: 0,
      current: 0
    }
  },
  mounted() {
    this.carouselitem = document.querySelectorAll('.carousel-item')
    this.carouselitem[0].classList.add('active')
    this.total = this.carouselitem.length

    let s = document.querySelector('#moveRight')
    let ss = document.querySelector('#moveLeft')
    s.addEventListener('click', () => {
      let next = this.current
      this.current = this.current + 1
      this.setSlide(next, this.current)
    })
    ss.addEventListener('click', () => {
      let prev = this.current
      this.current = this.current - 1
      this.setSlide(prev, this.current)
    })
  },
  methods: {
    setSlide(prev, next) {
      let slide = this.current
      if (next > this.total - 1) {
        slide = 0
        this.current = 0
      }
      if (next < 0) {
        slide = this.total - 1
        this.current = this.total - 1
      }
      this.carouselitem[prev].classList.remove('active')
      this.carouselitem[slide].classList.add('active')
      setTimeout(function () {}, 800)
    }
  }
}
</script>

<style>
#radar-view {
  position: absolute;
  left: 20%;
  top: 16%;
}

.dd {
  width: 100%;
  position: relative;
}

.carousel {
  width: 100%;
  height: 100%;
  display: flex;
  max-width: 1300px;
  max-height: 550px;
  overflow: hidden;
  position: absolute;
  top: 29%;
  left: 20%;
}

.carousel-item {
  visibility: visible;
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
}

.carousel-item_info {
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  margin: auto;
  padding: 0 40px;
  width: 40%;
}

.carousel-item_image {
  /* background-color: aqua; */
  width: 60%;
  height: 100%;
  order: 2;
  align-self: flex-end;
  flex-basis: 60%;
  position: relative;
  transform: translateX(100%);
  transition: 0.6s all ease-in-out;
}

.carousel-item_subtitle {
  letter-spacing: 3px;
  font-size: 10px;
  text-transform: uppercase;
  margin: 0;
  color: #7e7e7e;
  font-weight: 700;
  transform: translateY(25%);
  opacity: 0;
  visibility: hidden;
  transition: 0.4s all ease-in-out;
}

.carousel-item_title {
  margin: 15px 0 0 0;
  font-family: 'Playfair Display', serif;
  font-size: 44px;
  line-height: 45px;
  letter-spacing: 3px;
  font-weight: 700;
  color: #2c2c2c;
  transform: translateY(25%);
  opacity: 0;
  visibility: hidden;
  transition: 0.6s all ease-in-out;
}

.carousel-item_description {
  transform: translateY(25%);
  opacity: 0;
  visibility: hidden;
  transition: 0.6s all ease-in-out;
  margin-top: 35px;
  font-family: 'Open Sans', sans-serif;
  font-size: 13px;
  color: #7e7e7e;
  line-height: 22px;
  margin-bottom: 35px;
}

.carousel-item_btn {
  width: 35%;
  color: #2c2c2c;
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 3px;
  font-size: 11px;
  text-transform: uppercase;
  margin: 0;
  width: 35%;
  font-weight: 700;
  text-decoration: none;
  transform: translateY(25%);
  opacity: 0;
  visibility: hidden;
  transition: 0.6s all ease-in-out;
}

.carousel_nav {
  position: absolute;
  top: 90%;
  left: 40%;
  width: 100px;
  height: 40px;
  z-index: 2;
  /* background-color: cyan; */
  bottom: 0;
}

.carousel_icon {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  fill: #5d5d5d;
}

.carousel_arrow {
  cursor: pointer;
  display: inline-block;
  padding: 11px 15px;
  position: relative;
}

.carousel_arrow:nth-child(1):after {
  content: '';
  right: -3px;
  position: absolute;
  width: 1px;
  background-color: #b0b0b0;
  height: 14px;
  top: 50%;
  margin-top: -7px;
}

.active {
  z-index: 1;
  display: flex;
  visibility: visible;
}

.active .carousel-item_subtitle,
.active .carousel-item_title,
.active .carousel-item_description,
.active .carousel-item_btn {
  transform: translateY(0);
  opacity: 1;
  transition: 0.6s all ease-in-out;
  visibility: visible;
}

.active .carousel-item_image {
  transition: 0.6s all ease-in-out;
  transform: translateX(0);
}
</style>
