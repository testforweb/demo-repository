<template>
	<div>
		<canvas id="radar-view1" width="422.375" height="300"></canvas>
	</div>
	
</template>

<script>
	export default{
		name:'libituo',
		data() {
			return {
				data1: [],
				cx: null,
				cy: null,
				indicator: [],
				fontSize: 14,
				radius: Math.min(530, 550) * 0.75 * 0.5,
				canvas:null,
				ctx:null,
				colorList : ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
				option: {
					aria: {
						show: false
					},
					radar: {
						indicator: [{
								text: '学习',
								max: 100
							},
							{
								text: '阅读',
								max: 100
							},
							{
								text: '睡眠',
								max: 100
							},
							{
								text: '饮食',
								max: 100
							},
							{
								text: '运动',
								max: 100
							},
							{
								text: '其他',
								max: 100
							},
						],
					},
					series: [{
						name: '计划分布',
						type: 'radar',
						itemStyle: {
							normal: {
								areaStyle: {
									type: 'default'
								}
							}
						},
						data: [{
							value: [54, 60, 70, 1, 50, 68],
							name: '各项指标'
						}, ],
					}]
				}
		
			}
		},
		mounted() {
			this.initData()
			this.initCancas()
			this.data1.forEach((dt) => {
			  dt.points.forEach((t, i) => {
			    t.timer = setInterval(() => {
			      t.len += t.mxlen / 40;
			      t.x = this.cx + t.len * Math.cos(this.indicator[i].angle);
			      t.y = this.cy + t.len * Math.sin(this.indicator[i].angle);
			      this.repaint();
			      if (t.len >= t.mxlen) {
			        clearInterval(t.timer);
			        t.timer = null;
			      }
			    }, 10)
			  })
			})
			
			
		},
		methods: {
			initCancas() {
				console.log("初始化canvas")
				this.canvas = document.getElementById('radar-view1');
				this.ctx = this.canvas.getContext('2d');
			},
			initData() {
				this.indicator = this.option.radar.indicator;
				this.data1 = this.option.series[0].data;
				this.radius = Math.min(422.375, 300) * 0.75 * 0.5;
				this.cx = 422.375 / 2;
				this.cy = 300 / 2;
				this.fontSize = 14;
				let angle = Math.PI * 2 / this.indicator.length;
				let startAngle = Math.PI / 2;
				this.indicator.forEach((item) => {
				  item.angle = startAngle;
				  item.x = this.cx + Math.cos(item.angle) * this.radius;
				  item.y = this.cy + Math.sin(item.angle) * this.radius;
				  startAngle = startAngle + angle;
				})
				this.data1.forEach((dt, idx) => {
				  dt.points = [];
				  dt.color = this.colorList[idx % this.colorList.length];
				  dt.value.forEach((item, i) => {
				    let t = {};
				    t.len = 0;
				    t.mxlen = item / this.indicator[i].max * this.radius;
				    t.x = this.cx + t.len * Math.cos(this.indicator[i].angle);
				    t.mx = this.cx + t.mxlen * Math.cos(this.indicator[i].angle);
				    t.y = this.cy + t.len * Math.sin(this.indicator[i].angle);
				    t.my = this.cy + t.mxlen * Math.sin(this.indicator[i].angle);
				    dt.points.push(t);
				  })
				})
			},
			repaint() {
			  this.ctx.clearRect(0, 0, 422.375, 300);
			  // 绘制标签
			  this.drawLabelOut(this.fontSize);
			  // 绘制多边形层次背景
			  for (let i = 0; i < 5; i++) {
			    this.ctx.beginPath();
			    let r = (5 - i) / 5 * this.radius;
			    let x1 = this.cx + r * Math.cos(this.indicator[0].angle);
			    let y1 = this.cy + r * Math.sin(this.indicator[0].angle);
			    this.ctx.moveTo(x1, y1);
			    this.ctx.fillStyle = i % 2 === 0 ? '#ffffff' : 'rgba(114,172,209,0.2)';
			    this.ctx.strokeStyle = 'rgba(114,172,209,0.5)';
			    this.indicator.forEach((item) => {
			      let x = this.cx + r * Math.cos(item.angle);
			      let y = this.cy + r * Math.sin(item.angle);
			      this.ctx.lineTo(x, y);
			    })
			    this.ctx.lineTo(x1, y1);
			    this.ctx.fill();
			    this.ctx.stroke();
			    // 绘制中心到边界的线
			    this.ctx.beginPath();
			    this.indicator.forEach((item) => {
			      this.ctx.strokeStyle = '#ddd';
			      this.ctx.moveTo(this.cx, this.cy);
			      this.ctx.lineTo(item.x, item.y);
			      this.ctx.stroke();
			    })
			  }
			  this.data1.forEach((dt) => {
			    this.ctx.beginPath();
			    dt.points.forEach((item) => {
			      this.ctx.lineTo(item.x, item.y);
			    })
			    this.ctx.lineTo(dt.points[0].x, dt.points[0].y);
			    this.ctx.fillStyle = dt.color + 'aa';
			    this.ctx.strokeStyle = dt.color;
			    this.ctx.lineWidth = 2;
			    this.ctx.fill();
			    this.ctx.stroke();
			    this.ctx.fillStyle = dt.color;
			    dt.points.forEach((item) => {
			      this.ctx.beginPath();
			      this.ctx.arc(item.mx, item.my, 5, 0, 2 * Math.PI);
			      this.ctx.fill();
			    })
			  })
			},
			drawLabelOut(fontSize) {
			  this.indicator.forEach((item) => {
			    this.ctx.font = `${fontSize}px Arial`;
			    this.ctx.textAlign = item.x > this.cx ? 'left' : 'right';
			    let lx = this.cx + this.radius * Math.cos(item.angle) * 1.1;
			    let ly = this.cy + this.radius * Math.sin(item.angle) * 1.1;
			    // 如果是竖直方向则标签位于正中间
			    if (Math.abs(Math.sin(item.angle)) === 1) {
			      if (Math.sin(item.angle) === 1) {
			        ly += this.radius * 0.05;
			      }
			      this.ctx.textAlign = 'center';
			    }
			    // 如果位于水平方向则标签应垂直居中
			    if (Math.abs(Math.cos(item.angle)) === 1) {
			      ly += fontSize / 2;
			    }
			    this.ctx.fillStyle = '#999';
			    this.ctx.fillText(item.text, lx, ly);
			  })
			}
		}
	}
</script>

<style>
	#radar-view1{
		position: absolute;
		left: 20%;
		top: 16%;
	}
</style>