<template>
  <div>
    <div id="pie-view"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    const pie = document.getElementById("pie-view");
    const notePieOption = {
      series: [
        {
          type: "rose",
          data: [
            { name: "华中地区", value: 17332 },
            { name: "华北地区", value: 25630 },
            { name: "华东地区", value: 36783 },
            { name: "华南地区", value: 48938 },
            { name: "西北地区", value: 14161 },
            { name: "东北地区", value: 20941 },
            { name: "西南地区", value: 18572 },
          ],
          roseType: "radius",
        },
      ],
    };

    const colorList = [
      "#5470c6",
      "#91cc75",
      "#fac858",
      "#ee6666",
      "#73c0de",
      "#3ba272",
      "#fc8452",
      "#9a60b4",
      "#ea7ccc",
    ];
    const colorHoverList = [
      "#5c7bd9",
      "#9fe080",
      "#ffdc60",
      "#ff7070",
      "#7ed3f4",
      "#7ed3f4",
      "#ff915a",
      "#a969c6",
      "#ff88e0",
    ];

    function getScroll() {
      return {
        left:
          window.pageXOffset ||
          document.documentElement.scrollLeft ||
          document.body.scrollLeft ||
          0,
        top:
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0,
      };
    }

    function getOffsetLeft(obj) {
      let tmp = obj.offsetLeft;
      let val = obj.offsetParent;
      while (val != null) {
        tmp += val.offsetLeft;
        val = val.offsetParent;
      }
      return tmp;
    }

    function getOffsetTop(obj) {
      var tmp = obj.offsetTop;
      var val = obj.offsetParent;
      while (val != null) {
        tmp += val.offsetTop;
        val = val.offsetParent;
      }
      return tmp;
    }

    class PieView {
      constructor(dom, option) {
        this.dom = dom;
        this.option = option;
      }

      // 渲染饼图
      render() {
        this.initCanvas();
        this.initData();
        this.drawLabelOut(this.fontSize);
        this.data.forEach((item, i) => {
          item.atimer = setInterval(() => {
            let ang = 0;
            this.data.forEach((item, idx) => {
              if (idx < i) {
                ang += item.angle;
              }
            });
            // 起始角度动画
            item.startAngle = Math.min(ang, item.STA);
            // 角度渐变动画
            if (item.angle < item.ANG) {
              item.angle = Math.min(item.angle + item.ANG / 40, item.ANG);
            }
            // 标签引线动画
            if (item.labelLength < item.labelMxLen) {
              // 用相对长度保证每个引线到达最终位置的时间相同
              item.labelLength += (item.labelMxLen - item.radius) / 20;
            } else if (item.hl < item.mxhl) {
              item.hl += 1;
            }
            // 标签颜色渐变动画
            if (item.fontOp < 255) {
              item.fontOp += 0.01;
            }
            this.repaint();
            if (
              item.angle >= item.ANG &&
              item.startAngle >= item.STA &&
              item.hl >= item.mxhl &&
              item.fontOp >= 255
            ) {
              clearInterval(item.atimer);
              item.atimer = null;
            }
          }, 20);
        });
      }

      repaint() {
        this.ctx.beginPath();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill();
        if (this.option.label !== false) {
          this.drawLabelOut(this.fontSize);
        }
        this.data.forEach((item) => {
          this.showItem(item);
        });
        this.ctx.closePath();
      }

      initCanvas() {
        this.canvas = document.createElement("canvas");
        const style = window.getComputedStyle(this.dom, "null");
        this.canvas.setAttribute("width", style.width);
        this.canvas.setAttribute("height", style.height);
        this.canvas.style.margin = "0";
        this.canvas.style.padding = "0";
        this.dom.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");
      }

      // 初始化，计算每个扇形的角度和颜色
      initData() {
        this.data = this.option.series[0].data;
        this.type = this.option.series[0].type;
        this.radius =
          Math.min(this.canvas.width, this.canvas.height) * 0.7 * 0.5;
        this.cx = this.canvas.width / 2;
        this.cy = this.canvas.height / 2;
        let total = 0;
        this.data.forEach((item) => {
          total += item.value;
        });
        let startAngle = 0;
        let mxValue = Math.max.apply(
          null,
          this.data.map((item) => {
            return item.value;
          })
        );
        this.fontSize = 14;
        this.data.forEach((item, i) => {
          item.color = colorList[i % colorList.length];
          item.startAngle = 0;
          item.angle = 0;
          item.STA = startAngle;
          item.ANG = (item.value / total) * Math.PI * 2;
          item.fontOp = 0;
          // 玫瑰图和饼图半径长度不一样
          if (this.type === "rose") {
            item.radius = (this.radius * item.value) / mxValue;
          } else {
            item.radius = this.radius;
          }
          item.labelLength = item.radius;
          item.labelMxLen = this.radius * 1.05; //最终标签引线长度
          item.hl = 0;
          item.mxhl = this.fontSize;
          item.timer = null;
          item.minRadius = item.radius;
          item.maxRadius = item.radius + 5;
          startAngle += item.ANG;
        });
        let that = this;
        // 添加鼠标滑动监听事件
        this.canvas.onmousemove = function (event) {
          let pos = {
            x: event.clientX + getScroll().left - getOffsetLeft(that.dom),
            y: event.clientY + getScroll().top - getOffsetTop(that.dom),
          };
          pos.len = Math.sqrt(
            (pos.x - that.cx) * (pos.x - that.cx) +
              (pos.y - that.cy) * (pos.y - that.cy)
          );
          pos.cos = (pos.x - that.cx) / pos.len;
          pos.sin = (pos.y - that.cy) / pos.len;
          if (pos.sin > 0) {
            pos.angle = Math.acos(pos.cos);
          } else {
            pos.angle = 2 * Math.PI - Math.acos(pos.cos);
          }
          let hoverPiece = null;
          // 鼠标经过半径逐渐变长
          that.data.forEach((item, i) => {
            if (
              pos.angle > item.startAngle &&
              pos.angle < item.startAngle + item.angle &&
              pos.len <= item.radius
            ) {
              item.color = colorHoverList[i];
              if (!item.timer && item.radius < item.maxRadius) {
                item.timer = setInterval(() => {
                  item.radius += 0.2;
                  that.repaint();
                  if (item.radius >= item.maxRadius) {
                    clearInterval(item.timer);
                    item.timer = null;
                  }
                }, 10);
              }
              hoverPiece = item;
            } else {
              item.color = colorList[i];
              if (!item.timer && item.radius > item.minRadius) {
                item.timer = setInterval(() => {
                  item.radius -= 0.2;
                  that.repaint();
                  if (item.radius <= item.minRadius) {
                    clearInterval(item.timer);
                    item.timer = null;
                  }
                }, 10);
              }
            }
          });
          if (hoverPiece !== null) {
            that.canvas.style.cursor = "pointer";
          } else {
            that.canvas.style.cursor = "default";
          }
        };
      }

      // 绘制每个子块
      showItem(item) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.cx, this.cy);
        this.ctx.arc(
          this.cx,
          this.cy,
          item.radius,
          item.startAngle,
          item.startAngle + item.angle
        );
        this.ctx.fillStyle = item.color;
        this.ctx.fill();
        this.ctx.closePath();
      }

      // 绘制标签（可选）
      drawLabelOut(fontSize) {
        this.data.forEach((item) => {
          this.ctx.beginPath(); //声明要开始绘制路径
          // 添加引线
          let midAngle = item.STA + item.ANG / 2;
          let dx = this.cx + Math.cos(midAngle) * item.labelLength;
          let tx = this.cx + Math.cos(midAngle) * item.labelMxLen;
          let dy = this.cy + Math.sin(midAngle) * item.labelLength;
          let ty = this.cy + Math.sin(midAngle) * item.labelMxLen;
          this.ctx.moveTo(
            this.cx + Math.cos(midAngle) * item.radius,
            this.cy + Math.sin(midAngle) * item.radius
          );
          this.ctx.lineTo(dx, dy);
          // 添加水平线
          this.ctx.moveTo(dx, dy);
          dx > this.cx ? (dx = dx + item.hl) : (dx = dx - item.hl);
          this.ctx.lineTo(dx, dy);
          dx > this.cx ? (tx = tx + item.mxhl) : (tx = tx - item.mxhl);
          tx > this.cx ? (tx = tx + 2) : (tx = tx - 2);
          // 添加文字
          this.ctx.strokeStyle = item.color;
          this.ctx.stroke();
          this.ctx.font = `${fontSize}px Arial`;
          this.ctx.textAlign = tx > this.cx ? "left" : "right";
          this.ctx.fillStyle = `rgba(0,0,0,${item.fontOp})`;
          this.ctx.fillText(item.name, tx, ty + fontSize / 2);
        });
      }
    }

    let pieView = new PieView(pie, notePieOption);
    pieView.render();
  },
};
</script>

<style>
#pie-view {
  width: 100%;
  height: 450px;
  margin: auto;
  background-color: #fff;
}
</style>