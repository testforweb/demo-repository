<template>
  <div id="wu-chart" height="400" width="500" style="margin:50px">
    <!--     <canvas id="chart" width="422.375" height="300"></canvas> -->
  </div>
</template>

<script>
export default {
  name: "Wuzhihao",
  data() {
    return {
      dataArr: [
        [1, 11], [2, 17], [3, 14], [5, 18], [7,11],
        [8, 6], [3, 4], [6, 9], [8, 7], [6, 5],
        [1, 5], [4, 3], [7, 6], [3, 12], [4, 8],
        [9, 3], [16, 4], [14, 5], [11, 5], [12, 2],
        [14, 8], [13, 4], [14, 9], [13, 12], [16, 5],
        [9, 8], [14, 9], [14, 7], [12, 4], [15, 8],
        [11, 7], [13, 8], [14, 7], [9, 5], [16, 5],
        [19, 7], [18, 9], [19, 5], [22, 2], [23, 4],
        [22, 4], [19, 4], [18, 7], [19, 1], [21, 6],
        [21, 7], [23, 3], [21, 1], [23, 5], [22, 7],
        [24, 1], [23, 7], [14, 3], [23, 6], [17, 6],
        [19, 4], [22, 4], [24, 5], [22, 2], [23, 4],
        [18, 7], [17, 4], [19, 5], [23, 2], [24, 4],
        [21, 3], [18, 1], [23, 7], [22, 2], [22, 2],
        [23, 7], [19, 4], [19, 5], [20, 6], [23, 4],
        [26, 6], [28, 5], [32, 2], [30, 3], [29, 4],
        [26, 4], [24, 12], [31, 5], [30, 5], [29, 2],
        [26, 5], [25, 3], [32, 3], [32, 5], [29, 1],
        [26, 6], [29, 3], [30, 3], [30, 4], [29, 6],
        [26, 7], [27, 4], [32, 15], [31, 5], [29, 3],
        [26, 6], [28, 2], [31, 5], [30, 5], [29, 5],
        [26, 3], [29, 5], [30, 5], [31, 3], [29, 2],
        [26, 4], [28, 7], [32, 7], [30, 1], [29, 1],
        [33, 6], [34, 7], [36, 9], [38, 5], [39, 7],
        [34, 1], [34, 9], [36, 7], [33, 6], [40, 9],
        [33, 6], [34, 7], [36, 5], [36, 8], [36, 5],
        [33, 2], [34, 3], [36, 9], [38, 13], [35, 4],
        [36, 6], [34, 7], [36, 8], [39, 7], [40, 5],
        [34, 3], [34, 2], [36, 9], [38, 12], [40, 2],
        [33, 6], [34, 6], [36, 6], [37, 10], [40, 4],
        [36, 2], [34, 7], [36, 9], [38, 11], [40, 5],
        [42, 7], [41, 4], [44, 16], [47, 14], [48, 6],
        [44, 12], [45, 7], [48, 13], [45, 10], [46, 12],
        [41, 8], [41, 9], [48, 6], [46, 9], [45, 9],
        [42, 4], [44, 4], [46, 5], [45, 10], [47, 11],
        [49, 8], [53, 8], [54, 10], [53, 15], [56, 8],
        [50, 2], [52, 9], [53, 3], [54, 13], [56, 8],
        [49, 9], [51, 5], [54, 4], [55, 10], [56, 7],
        [48, 7], [52, 7], [51, 8], [53, 15], [56, 8],
        [57, 12], [59, 13], [60, 13], [62, 10], [61, 14],
        [58, 11], [56, 15], [61, 14], [65, 13], [64, 11],
        [59, 13], [58, 7], [64, 10], [64, 12], [62, 10],
        [57, 9], [59, 9], [62, 9], [62, 11], [64, 9],
        [65, 12], [69, 13], [67, 13], [70, 14], [72, 15],
        [69, 14], [68, 11], [68, 11], [74, 16], [71, 14],
        [67, 11], [66, 9], [69, 9], [71, 13], [72, 17],
        [66, 8], [67, 14], [66, 12], [72, 14], [75, 16],
        [73, 6], [73, 14], [74, 13], [74, 9], [80, 18],
        [75, 9], [75, 15], [78, 12], [76, 7], [82, 12],
        [73, 7], [77, 7], [75, 15], [77, 6], [83, 15],
        ],
      canvas: null
    }
  },
  mounted() {
    this.goChart(document.getElementById("wu-chart"), this.dataArr, ["年龄", "痊愈时间 / 天"])
  },
  methods: {
    goChart(cBox, dataArr, textArr) {
      console.log("init canvas")
      let canvas, ctx;
      let cWidth, cHeight, cMargin, cSpace;
      let originX, originY;
      let bMargin, tobalBars, bWidth, maxXValue, maxYValue, minXValue, minYValue;
      let totalNomber;
      let yAverage, minTrueYValue, maxTrueYValue;
      let ctr, numctr, speed;
      let mousePosition = {};

      canvas = document.createElement("canvas");
      if (canvas && canvas.getContext) {
        ctx = canvas.getContext("2d");
      }

      canvas.innerHTML = "你的浏览器不支持HTML5 canvas";
      cBox.appendChild(canvas);

      initChart();
      drawLineLabelMarkers();
      drawChartAnimate();

      //检测鼠标移动
      let mouseTimer = null;
      canvas.addEventListener("mousemove", function (e) {
        e = e || window.event;
        if (e.offsetX || e.offsetX == 0) {
          mousePosition.x = e.offsetX;
          mousePosition.y = e.offsetY;
        } else if (e.layerX || e.layerX == 0) {
          mousePosition.x = e.layerX;
          mousePosition.y = e.layerY;
        }

        clearTimeout(mouseTimer);
        mouseTimer = setTimeout(function () {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          drawLineLabelMarkers();
          drawChartAnimate(true);
        }, 10);
      });

      // 点击刷新图表
      canvas.onclick = function () {
        initChart(); // 图表初始化
        drawLineLabelMarkers(); // 绘制图表轴、标签和标记
        drawChartAnimate(); // 绘制折线图的动画
      };


      // 图表初始化
      function initChart() {
        // 图表信息
        cMargin = 60;
        cSpace = 80;
        //将canvas扩大2倍，然后缩小，以适应高清屏幕
        canvas.width = cBox.getAttribute("width") * 2;
        canvas.height = cBox.getAttribute("height") * 2;
        canvas.style.height = canvas.height / 2 + "px";
        canvas.style.width = canvas.width / 2 + "px";
        cHeight = canvas.height - cMargin * 2 - cSpace;
        cWidth = canvas.width - cMargin * 2 - cSpace;
        originX = cMargin + cSpace;
        originY = cMargin + cHeight;

        // 柱状图信息
        bMargin = canvas.width / 40;
        tobalBars = dataArr.length;
        bWidth = parseInt(cWidth / tobalBars - bMargin);
        maxXValue = 0;
        maxYValue = 0;
        let xArr = [];
        let yArr = [];
        for (let i = 0; i < dataArr.length; i++) {
          xArr.push(dataArr[i][0]);
          yArr.push(dataArr[i][1]);
        }
        yAverage = (eval(yArr.join("+")) / yArr.length).toFixed(2);
        let addNb = parseInt(yAverage / 10);

        minXValue = Math.min.apply(null, xArr);
        minXValue = parseInt(Math.max(minXValue - addNb, 0));
        maxXValue = parseInt(Math.max.apply(null, xArr) + addNb);

        minYValue = minTrueYValue = Math.min.apply(null, yArr);
        minYValue = parseInt(Math.max(minYValue - addNb, 0));
        maxTrueYValue = Math.max.apply(null, yArr);
        maxYValue = parseInt(maxTrueYValue + addNb);

        totalNomber = 5;

        ctr = 1;
        numctr = 50;
        speed = 1.5;

      }

      // 绘制图表轴、标签和标记
      function drawLineLabelMarkers() {
        ctx.font = "24px Arial";
        ctx.lineWidth = 2;
        ctx.fillStyle = "#000";
        ctx.strokeStyle = "#000";
      
        drawLine(originX, originY, originX, cMargin);
        drawLine(originX, originY, originX + cWidth, originY);

        drawMarkers();
      }

      // 画线
      function drawLine(x, y, X, Y) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(X, Y);
        ctx.stroke();
        ctx.closePath();
      }

      // 绘制标记
      function drawMarkers() {
        ctx.strokeStyle = "#E0E0E0";
        // 绘制 y
        let oneYVal = (maxYValue - minYValue) / totalNomber;

        ctx.textAlign = "right";
        for (let i = 0; i <= totalNomber; i++) {
          let markerVal = parseInt(i * oneYVal + minYValue);
          let xMarker = originX - 10;
          let yMarker = parseInt(originY - cHeight * (markerVal - minYValue) / (maxYValue - minYValue));

          ctx.fillText(markerVal, xMarker, yMarker + 3, cSpace);

          if (i > 0) {
            drawLine(originX + 2, yMarker, originX + cWidth, yMarker);
          }
        }

        // 绘制 x
        let oneXVal = (maxXValue - minXValue) / totalNomber;
        ctx.textAlign = "center";
        for (let i = 0; i <= totalNomber; i++) {

          let markerVal = parseInt(i * oneXVal + minXValue);
          let xMarker = parseInt(originX + cWidth * (markerVal - minXValue) / (maxXValue - minXValue));
          let yMarker = originY + 30;
          ctx.fillText(markerVal, xMarker, yMarker, cSpace);

          if (i > 0) {
            drawLine(xMarker, cMargin, xMarker, originY - 2);
          }
        }

        // 绘制标题 y
        ctx.save();
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(textArr[1], -canvas.height / 2, cSpace - 10);
        ctx.restore();
        // 绘制标题 x
        ctx.fillText(textArr[0], originX + cWidth / 2, originY + cSpace / 2 + 30);
      };

      // 绘制动画图
      function drawChartAnimate(mouseMove) {

        let ifTip = false;
        let tipArr = null;

        for (let i = 0; i < dataArr.length; i++) {

          ctx.fillStyle = "rgba(46,199,201,0.5)";
          let oX = originX + cWidth * (dataArr[i][0] - minXValue) / (maxXValue - minXValue);
          let oY = originY - cHeight * (dataArr[i][1] - minYValue) / (maxYValue - minYValue);
          ctx.beginPath();

          ctx.arc(oX, oY, 10 * ctr / numctr, 0, Math.PI * 2, true);

          if (!ifTip && mouseMove && ctx.isPointInPath(mousePosition.x * 2, mousePosition.y * 2)) { // 如果是鼠标移动的到柱状图上，重新绘制图表
            ctx.fillStyle = "rgba(46,199,201,1)";
            // 是否绘制提示
            ifTip = true;
            tipArr = dataArr[i];
          } else {
            ctx.fillStyle = "rgba(46,199,201,0.5)";
          }
          ctx.fill();

        }

        // 绘制平均值线
        drawAverageLine();
        // 绘制提示
        ifTip && drawTips(mousePosition.x * 2, mousePosition.y * 2, tipArr[0], tipArr[1]);

        if (ctr < numctr) {
          ctr++;
          setTimeout(function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawLineLabelMarkers();
            drawChartAnimate();
          }, speed *= 1.08);
        }
      }

      // 绘制平均值线
      function drawAverageLine() {
        ctx.beginPath();
        let yNb = originY - cHeight * (yAverage - minYValue) / (maxYValue - minYValue);
        let xNb = originX + cWidth * ctr / numctr + cMargin / 2;
        ctx.moveTo(originX + 2, yNb);
        ctx.lineTo(xNb, yNb);

        // 设置虚线
        ctx.save();
        ctx.lineWidth = 4;
        ctx.strokeStyle = ctx.fillStyle = "#2ec7c9";
        ctx.setLineDash([10]);
        ctx.stroke();

        // 绘制三角
        ctx.beginPath();
        ctx.moveTo(xNb, yNb);
        ctx.lineTo(xNb - 5, yNb - 8);
        ctx.lineTo(xNb + 12, yNb);
        ctx.lineTo(xNb - 5, yNb + 8);
        ctx.fill();

        // 绘制文本
        ctx.font = "24px Arial";
        ctx.fillText(yAverage, xNb - 10, yNb - 10);
        // 还原
        ctx.restore();
      }

      // 绘制提示框
      function drawTips(oX, oY, xVal, yVal) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        let H = 100;
        roundedRect(ctx, oX + 10, oY - H / 2, 2 * H, H, 5);

        ctx.fillStyle = "#fff";
        ctx.fillText(textArr[1] + "：" + yVal, oX + H, oY - H / 10);
        ctx.fillText(textArr[0] + "：" + xVal, oX + H, oY + H / 4);
        ctx.restore();
      }

      // 绘制圆角矩形的方法
      function roundedRect(ctx, x, y, width, height, radius) {
        ctx.moveTo(x, x + radius);
        ctx.beginPath();
        ctx.lineTo(x, y + height - radius);
        ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
        ctx.lineTo(x + width - radius, y + height);
        ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
        ctx.lineTo(x + width, y + radius);
        ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
        ctx.lineTo(x + radius, y);
        ctx.quadraticCurveTo(x, y, x, y + radius);
        ctx.closePath();
        ctx.fill();
      }

    }
  }
}
</script>


<style scoped>
</style>

