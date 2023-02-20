<template>
  <div>
    <div class="parent">
      <div class="slider">
        <div id="slide1" class="slide1 up1">
          新冠病毒的大流行，使得全球经济陷入1929年大萧条以来最严重的衰退。我们的生活和工作都受到了极大的影响，为了能够更直观地了解此次疫情对人们生活的影响，我们小组针对疫情期间的一些数据进行了调查和可视化。
        </div>
      </div>
    </div>
    <div>
      <h1 class="title">小组介绍</h1>
      <div class="members">
        <div>
          <div>
            <h3>李碧拓</h3>
            <p>组长</p>
          </div>
          <img src="../assets/images/li.jpg" alt="" />
        </div>
        <div>
          <div>
            <h3>方威威</h3>
            <p>热爱生活，相信自己，决定了就去做，管它结果如何</p>
          </div>
          <img src="../assets/images/fang.jpg" alt="" />
        </div>
        <div>
          <div>
            <h3>吴娇雅</h3>
            <p>放宽心，一切都在顺其自然</p>
          </div>
          <img src="../assets/images/wu.jpg" alt="" />
        </div>
        <div>
          <div>
            <h3>吴志浩</h3>
          </div>
          <img src="../assets/images/wu2.jpg" alt="" />
        </div>
        <div>
          <div>
            <h3>刘子璐</h3>
          </div>
          <img src="../assets/images/liu.jpg" alt="" />
        </div>
        <div>
          <div>
            <h3>谭凯</h3>
          </div>
          <img src="../assets/images/tan.jpg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'getall',
  data() {
    return {}
  },
  mounted() {}
}
</script>

<style>
.title {
  text-align: center;
}

.members {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 2em auto;
  max-width: 1200px;
}

.members > div {
  display: flex;
  margin: 1em;
  background: #fff;
  box-shadow: 0 0 2em rgba(100, 130, 150, 0.2);
  overflow: hidden;
  border-radius: 1em;
  transition: transform 0.4s;
}

.members > div > div {
  width: 12em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
}

.members > div:hover {
  transform: scale(1.05);
}
.members h3{
  position: absolute;
  top: 27%;
}
.members p {
  opacity: 0.6;
  font-size: 13px;
  padding: 1rem;
  position: absolute;
  bottom: 8%;
}

img {
  width: 120px;
  height: 120px;
}

.parent {
  margin: 2em auto 4em;
  width: 85vw;
  max-width: 720px;
  border-radius: 1em;
  overflow: hidden;
  box-shadow: 0 0 2em rgba(100, 130, 150, 0.8);
}

.slider {
  background-image: url('https://source.unsplash.com/a93v3R8nu-c');
  background-position: center;
  background-size: cover;
  overflow: hidden;
  transition: 1.4s;
}

.slide1 {
  background: rgba(49, 64, 78, 0.6);
  padding: 2em;
  color: rgb(247, 244, 245);
  font-size: 1.3em;
  text-align: center;
  line-height:30px;
}
</style>
