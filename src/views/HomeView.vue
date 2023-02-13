<template>
	<div class="home">
		<header class="banner" id="banner" ref="banner" @mouseenter="dd" @mousemove="ff" @mouseleave="ee"
			style="z-index: 11;">
			<div class="view">
				<img src="../assets/images/bilibili-spring-view-1.png" data-move-multiple="16.395">
			</div>
			<div class="view">
				<img src="../assets/images/bilibili-spring-view-2.png" data-move-multiple="16.395">
			</div>
			<div class="view">
				<img src="../assets/images/bilibili-spring-view-3.png" data-move-multiple="12.145">
			</div>
			<div class="view">
				<img src="../assets/images/bilibili-spring-view-4.png" data-move-multiple="3.718">
			</div>
			<div class="view">
				<img src="../assets/images/bilibili-spring-view-5.png" data-move-multiple="14.573">
			</div>
			<div class="view">
				<img src="../assets/images/bilibili-spring-people-1.png" data-move-multiple="29.277"
					data-is-opacity="0">
			</div>
			<div class="view">
				<img src="../assets/images/bilibili-spring-view-6.png" data-move-multiple="2.342">
			</div>
			<div class="view">
				<img src="../assets/images/bilibili-spring-view-7.png" data-move-multiple="1.952">
			</div>
			<div class="view">
				<img src="../assets/images/bilibili-spring-people-2.png" data-move-multiple="4.098" data-is-opacity="1">
			</div>
			<div class="view">
				<img src="../assets/images/bilibili-spring-people-3.png" data-move-multiple="2.826" data-is-opacity="1">
			</div>
			<div class="view">
				<img src="../assets/images/bilibili-spring-view-8.png" data-move-multiple="1.457">
			</div>
			<div class="view">
				<img src="../assets/images/bilibili-spring-view-9.png" data-move-multiple="1.092">
			</div>
			<div class="view">
				<img src="../assets/images/bilibili-spring-people-4.png" data-move-multiple="1.104">
			</div>
			<div class="view">
				<img src="../assets/images/bilibili-spring-view-10.png" data-move-multiple="0.781">
			</div>
			<div class="view">
				<img src="../assets/images/bilibili-spring-view-11.png" data-move-multiple="0.546">
			</div>
			<canvas ref="canvas" id="canvas" width="1920" height="100"></canvas>
		</header>
		<router-link class="navv" to='/getall'>主页</router-link>
		<router-link class="navv" to='/Topbanana'>展示</router-link>
		<a class="navv" @click="togame">游戏</a>
		<main>
			<router-view></router-view>
		</main>
		<footer id="fish-container"></footer>
	</div>
</template>

<script>
	// @ is an alias to /src
	import HelloWorld from '@/components/HelloWorld.vue'
	export default {
		name: 'HomeView',
		components: {
			HelloWorld,
		},
		data() {
			return {
				tagname:'Topbanana',
				sideData: SideData.sideData,
				intX: 0,
				x: Math.random() * 1920,
				y: 0,
				speedX: 0,
				speedY: 0,
				scale: 0,
				width: 0,
				height: 0,
				img: null,
				flowers: [],
				ctx: {},
				scales: [0.03, 0.04, 0.05, 0.06, 0.07, 0.08],
				imgs: {},
				imgs_styles: {},
				imgs_opacitys: {}
			}
		},
		computed: {
			categoryList() {
				let list = []
				if (this.sideData && this.sideData.categoryList) {
					list = this.sideData.categoryList
				}
				return list
			}
		},
		mounted() {
			this.imgs = document.querySelectorAll('.view img')
			this.imgs = [...this.imgs]
			this.imgs_styles = this.imgs.map(el => {
				let s = window.getComputedStyle(el, null).getPropertyValue('transform')
				return `transform: ${s}`
			})
			this.imgs_opacitys = this.imgs.map(el => {
				let o = window.getComputedStyle(el, null).getPropertyValue('opacity')
				return `opacity: ${o}`
			})
			this.$refs.banner.addEventListener('mouseenter', (e) => {
				this.intX = e.x
			})
			this.$refs.banner.addEventListener('mousemove', (e) => {
				this.imgs.forEach((el, i) => {
					const dm = el.dataset.moveMultiple
					const dis = (this.intX - e.x) / Number(dm)
					const transform_arr = this.imgs_styles[i].split(',')
					let translate_x = Number(transform_arr[4])
					let new_translate_x = translate_x + dis
					transform_arr.splice(4, 1, String(new_translate_x))
					let transform_str = transform_arr.join(',')

					if (el.dataset.isOpacity) {
						const o_arr = this.imgs_opacitys[i].split(':')
						const o_value = Number(o_arr[1])
						let href_w = window.screen.width / 2

						const o_dis = Number(el.dataset.isOpacity) ? this.intX - e.x : e.x - this.intX

						let new_o_value = o_dis / href_w
						o_arr.splice(1, 1, new_o_value)
						let o_str = o_arr.join(':')
						transform_str += `; ${o_str}`
					}

					el.setAttribute('style', transform_str)
				})
			})
			this.$refs.banner.addEventListener('mouseleave', (e) => {
				this.imgs.forEach((el, i) => {
					el.setAttribute('style', this.imgs_styles[i])
				})
			})
			const c = document.getElementById('canvas')
			this.ctx = c.getContext('2d')

			this.start1()
			this.move1()

		},
		methods: {
			togame(){
				window.location.href="http://localhost:8080/game.html"
			},
			getTranslateVal(str) {
				let s = 'translate',
					e = ')'
				let si = str.indexOf(s)
				let ei
			},
			dd(e) {
				this.intX = e.x;
			},
			ff(e) {
				this.imgs.forEach((el, i) => {
					const dm = el.dataset.moveMultiple
					const dis = (intX - e.x) / Number(dm)
					const transform_arr = this.imgs_styles[i].split(',')
					let translate_x = Number(transform_arr[4])
					let new_translate_x = translate_x + dis
					transform_arr.splice(4, 1, String(new_translate_x))
					let transform_str = transform_arr.join(',')

					if (el.dataset.isOpacity) {
						const o_arr = this.imgs_opacitys[i].split(':')
						const o_value = Number(o_arr[1])
						let href_w = window.screen.width / 2

						const o_dis = Number(el.dataset.isOpacity) ? intX - e.x : e.x - intX

						let new_o_value = o_dis / href_w
						o_arr.splice(1, 1, new_o_value)
						let o_str = o_arr.join(':')
						transform_str += `; ${o_str}`
					}

					el.setAttribute('style', transform_str)
				})
			},
			ee(e) {
				this.imgs.forEach((el, i) => {
					el.setAttribute('style', this.imgs_styles[i])
				})
			},
			init() {
				this.img = new Image()
				const f = Math.random() * 10 > 5 ? 1 : 0
				const si = Math.floor(Math.random() * (this.scales.length - 1))
				this.speedX = Math.random() * 2
				this.speedY = Math.random() * 3
				this.scale = this.scales[si]
				this.width = this.height = 250 * this.scale
				const src = f ? "../assets/images/bilibili-spring-flow-1.png" :
					'../assets/images/bilibili-spring-flow-2.png';
				this.img.src = src
			},
			draw(ctx) {
				this.img.onload = () => {
					ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
				}
			},
			move(ctx) {
				this.x = this.x + this.speedX >= 1920 ? Math.random() * 1920 : this.x + this.speedX;
				this.y = this.y >= 180 ? 0 : this.y + this.speedY;
				ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
			},
			start1() {
				const max = 50;
				for (let i = 0; i < max; i++) {
					let f1 = {}
					f1.img = new Image()
					const f = Math.random() * 10 > 5 ? 1 : 0
					const si = Math.floor(Math.random() * (this.scales.length - 1))
					f1.speedX = Math.random() * 2
					f1.speedY = Math.random() * 3
					f1.scale = this.scales[si]
					f1.width = f1.height = 250 * f1.scale
					const src = f ? "../assets/images/bilibili-spring-flow-1.png" :
						'../assets/images/bilibili-spring-flow-2.png';
					f1.img.src = src
					f1 = draw(ctx)
					flowers.push(f1)
				}
			},
			move1() {
				ctx.clearRect(0, 0, 1920, 180)
				for (let i = 0; i < flowers.length; i++) {
					flowers[i].move(ctx)
				}
				window.requestAnimationFrame(move)
			}
		}
	}
</script>
<style scoped>
	html,
	body {
		margin: 0;
		height: 1000px;
	}

	/* 设置页眉部分 */
	header {
		height: 180px;
		position: relative;
		overflow: hidden;
		z-index: 0;
	}

	.view {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* :nth-of-type(n) 选择器匹配属于父元素的特定类型的第 N 个子元素的每个元素 */
	.view:nth-of-type(1)>img {
		width: 5612px;
		/* 宽度 */
		height: 209px;
		/* 高度 */
		transform: scale(1) translate(0px, -17.4194px) rotate(0deg);
		/* 缩放、平移、旋转 */
		opacity: 1;
	}

	.view:nth-of-type(2)>img {
		width: 5612px;
		height: 209px;
		transform: scale(1) translate(1277.42px, 0px) rotate(0deg);
		opacity: 1;
	}

	.view:nth-of-type(3)>img {
		width: 1841px;
		height: 188px;
		transform: scale(1) translate(783.871px, 0px) rotate(0deg);
		opacity: 1;
	}

	.view:nth-of-type(4)>img {
		width: 1671px;
		height: 204px;
		transform: scale(1) translate(-739.742px, 0px) rotate(0deg);
		opacity: 1;
	}

	.view:nth-of-type(5)>img {
		width: 290px;
		height: 72px;
		transform: scale(1) translate(705.484px, 52.2581px) rotate(0deg);
		opacity: 1;
	}

	.view:nth-of-type(6)>img {
		width: 238px;
		height: 98px;
		transform: scale(1) translate(292.645px, 42.271px) rotate(0deg);
		opacity: 0;
	}

	.view:nth-of-type(7)>img {
		width: 1428px;
		height: 146px;
		transform: scale(1) translate(130.065px, 16.2581px) rotate(0deg);
		opacity: 1;
	}

	.view:nth-of-type(8)>img {
		width: 1428px;
		height: 94px;
		transform: scale(1) translate(-406.452px, 56.9032px) rotate(0deg);
		opacity: 1;
	}

	.view:nth-of-type(9)>img {
		width: 230px;
		height: 160px;
		transform: scale(1) translate(-278.71px, 18.5806px) rotate(0deg);
		opacity: 0;
	}

	.view:nth-of-type(10)>img {
		width: 67px;
		height: 118px;
		transform: scale(1) translate(-394.839px, 37.1613px) rotate(0deg);
		opacity: 0;
	}

	.view:nth-of-type(11)>img {
		width: 314px;
		height: 132px;
		transform: scale(1) translate(-104.516px, 15.6774px) rotate(0deg);
		opacity: 1;
	}

	.view:nth-of-type(12)>img {
		width: 2483px;
		height: 209px;
		transform: scale(1) translate(116.129px, 0px) rotate(0deg);
		opacity: 1;
	}

	.view:nth-of-type(13)>img {
		width: 487px;
		height: 170px;
		transform: scale(1) translate(250.839px, 15.6774px) rotate(0deg);
		opacity: 1;
	}

	.view:nth-of-type(14)>img {
		width: 515px;
		height: 245px;
		transform: scale(1) translate(2438.71px, 0px) rotate(0deg);
		filter: blur(2px);
		opacity: 1;
	}

	.view:nth-of-type(15)>img {
		width: 1112px;
		height: 209px;
		transform: scale(1) translate(-1161.29px, 0px) rotate(0deg);
		filter: blur(1px);
		opacity: 1;
	}

	/* canvas 画布 */
	#canvas {
		position: absolute;
		top: 0;
		left: 0;
	}
	.navv{
		padding-left: 5px;
		display: block;
		width: 60px;
		font-size: 20px;
		text-decoration: none;
		background-color: aqua;
	}
	.navv:hover{
		background-color: rebeccapurple;
	}
</style>
