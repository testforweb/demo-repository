<template>
	<div>
		<canvas width="500" height="400" id="canvas-bar"></canvas>
	</div>
</template>

<script>
export default {
	name: 'fangweiwei',
	data() {
		return {
			//绘图配置
			options: {
				chartZone: [100, 50, 400, 300], //标识绘图区域 left, top length height
				yAxisLabel: ['0', '2000000', '4000000', '6000000', '8000000'], //标示Y轴坐标
				yMax: 8000000, //Y轴最大值
				xAxisLabel: ['案例总数', '死亡人数', '疫苗总给予量', '疫苗接种量'], //X轴坐标
				// 由于数据之间相差太大，修改至相同数量级，data[1]源数据：16292
				data: [1281551, 162920, 6723098, 2391439],
				barStyle: {
					width: 50, //柱状图宽度
					color: '#1abc9c', //柱状图颜色
				},
				axisArrow: {
					// x坐标箭头
					size: 2,
					color: '#DA5961',
				},
				yAxisArrow: {
					// y坐标箭头
					size: 2,
					color: '#DA5961',
				},
			},
		};
	},
	methods: {
		rend() {
			/**
			 * 获取canvas绘图上下文
			 */
			const canvas = document.getElementById('canvas-bar');
			const context = canvas.getContext('2d');

			/*Echarts使用时，会调用实例方法echartsInstance.setOptions(options)来启动绘图*/
			this.drawBarChart(this.options, context);
		},
		/**
		 * 绘制柱状图
		 */
		drawBarChart(options, context) {
			this.drawAxis(options, context); //绘制坐标轴
			this.drawYLabels(options, context); //绘制y轴坐标
			this.drawXLabels(options, context); //绘制x轴坐标
			this.drawYArrow(options, context); // 绘制y轴箭头
			this.drawArrow(options, context); // 绘制x坐标轴箭头
			//drawData(options);//绘制柱状图
			this.drawDataGradient(options, context); //绘制渐变色柱状图
		},
		/**
		 * y轴绘制箭头
		 */
		drawYArrow(options, context) {
			let factor = options.yAxisArrow.size; //获取箭头大小因子
			context.save(); //保存当前设置的绘图上下文
			context.translate(options.chartZone[0], options.chartZone[1]); //移动坐标系原点至y轴末端
			context.beginPath(); //开始绘制箭头
			context.moveTo(0, 0); //移动至新原点
			// context.lineTo(2 * factor, -3 * factor);
			// context.lineTo(10 * factor, 0);
			// context.lineTo(2 * factor, 3 * factor);
			context.lineTo(-3 * factor, -2 * factor); // 线段终点x,y坐标
			context.lineTo(0, -10 * factor);
			context.lineTo(3 * factor, -2 * factor);
			context.lineTo(0, 0);
			context.globalAlpha = 0.7; //设置填充色透明度
			context.fillStyle = options.yAxisArrow.color; //获取箭头颜色
			context.fill(); //填充箭头路径
			context.restore(); //恢复绘图上下文样式设置
		},

		/**
		 * x轴绘制箭头
		 */
		drawArrow(options, context) {
			let factor = options.axisArrow.size; //获取箭头大小因子
			context.save(); //保存当前设置的绘图上下文
			context.translate(options.chartZone[2], options.chartZone[3]); //移动坐标系原点至x轴末端
			context.beginPath(); //开始绘制箭头
			context.moveTo(0, 0); //移动至新原点
			context.lineTo(2 * factor, -3 * factor);
			context.lineTo(10 * factor, 0);
			context.lineTo(2 * factor, 3 * factor);
			context.lineTo(0, 0);
			context.globalAlpha = 0.7; //设置填充色透明度
			context.fillStyle = options.axisArrow.color; //获取箭头颜色
			context.fill(); //填充箭头路径
			context.restore(); //恢复绘图上下文样式设置
		},
		/**
		 * 绘制线性渐变色柱状图
		 */
		drawDataGradient(options, context) {
			let data = options.data;
			let xLength = (options.chartZone[2] - options.chartZone[0]) * 0.96;
			let yLength = (options.chartZone[3] - options.chartZone[1]) * 0.98;
			let gap = xLength / options.xAxisLabel.length;
			//创建渐变色
			let fillStyleGradient = context.createLinearGradient(50, 50, 50, 700);
			fillStyleGradient.addColorStop(0, options.barStyle.color);
			fillStyleGradient.addColorStop(1, 'rgba(1,176,241,0.6)');

			//绘制矩形
			data.forEach(function (item, index) {
				context.fillStyle = fillStyleGradient;
				let x0 = options.chartZone[0] + (index + 1) * gap - options.barStyle.width / 2 - options.offsetXLabel;
				let height = (item / options.yMax) * (options.chartZone[3] - options.chartZone[1]) * 0.98;
				let y0 = options.chartZone[3] - height;
				let width = options.barStyle.width;
				context.fillRect(x0, y0, width, height);
			});
		},
		/**
		 * 绘制数据
		 */
		drawData(options, context) {
			let data = options.data;
			let xLength = (options.chartZone[2] - options.chartZone[0]) * 0.96;
			let yLength = (options.chartZone[3] - options.chartZone[1]) * 0.98;
			let gap = xLength / options.xAxisLabel.length;

			//绘制矩形
			data.forEach(function (item, index) {
				context.fillStyle = options.barStyle.color || '#1abc9c'; //02BAD4
				let x0 = options.chartZone[0] + (index + 1) * gap - options.barStyle.width / 2 - options.offsetXLabel;
				let height = (item / options.yMax) * (options.chartZone[3] - options.chartZone[1]) * 0.98;
				let y0 = options.chartZone[3] - height;
				let width = options.barStyle.width;
				context.fillRect(x0, y0, width, height);
			});
		},
		/**
		 * 绘制x轴坐标
		 */
		drawXLabels(options, context) {
			let labels = options.xAxisLabel;
			let xLength = (options.chartZone[2] - options.chartZone[0]) * 0.96;
			let gap = xLength / labels.length;

			labels.forEach(function (label, index) {
				//绘制坐标文字
				let offset = context.measureText(label).width;
				context.strokeStyle = '#eaeaea';
				context.font = '18px';
				context.fillText(label, options.chartZone[0] + (index + 1) * gap - offset, options.chartZone[3] + 20);
				//绘制小间隔
				context.beginPath();
				context.strokeStyle = '#353535';
				context.moveTo(options.chartZone[0] + (index + 1) * gap - offset / 2, options.chartZone[3]);
				context.lineTo(options.chartZone[0] + (index + 1) * gap - offset / 2, options.chartZone[3] + 5);
				context.stroke();
				//存储偏移量
				options.offsetXLabel = offset / 2;
			});
		},
		/**
		 * 绘制y轴坐标
		 */
		drawYLabels(options, context) {
			let labels = options.yAxisLabel;
			let yLength = (options.chartZone[3] - options.chartZone[1]) * 0.98;
			let gap = yLength / (labels.length - 1);

			labels.forEach(function (label, index) {
				//绘制坐标文字
				let offset = context.measureText(label).width + 20;
				context.strokeStyle = '#eaeaea';
				context.font = '16px';
				context.fillText(label, options.chartZone[0] - offset, options.chartZone[3] - index * gap);
				//绘制小间隔
				context.beginPath();
				context.strokeStyle = '#353535';
				context.moveTo(options.chartZone[0] - 10, options.chartZone[3] - index * gap);
				context.lineTo(options.chartZone[0], options.chartZone[3] - index * gap);
				context.stroke();
				//绘制辅助线
				context.beginPath();
				context.strokeStyle = '#eaeaea';
				context.strokeWidth = 2;
				context.moveTo(options.chartZone[0], options.chartZone[3] - index * gap);
				context.lineTo(options.chartZone[2], options.chartZone[3] - index * gap);
				context.stroke();
			});
		},
		/**
		 * 绘制坐标轴
		 */
		drawAxis(options, context) {
			let chartZone = options.chartZone;
			context.strokeWidth = 4;
			context.strokeStyle = '#353535';
			context.moveTo(chartZone[0], chartZone[1]);
			context.lineTo(chartZone[0], chartZone[3]); //y轴总高从50到700
			context.lineTo(chartZone[2], chartZone[3]); //x轴总长从50到1000
			context.stroke();
		},
	},
	mounted() {
		this.rend();
	},
};
</script>

<style scoped>
#canvas-bar {
	display: block;
	margin: 0 auto;
	transform: translateY(25%);
}
</style>
