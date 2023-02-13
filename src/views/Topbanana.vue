<template>
	<div class="bb">
		<div class="carousel">
			<div class="carousel_nav">
				<span id="moveLeft" class="carousel_arrow">
					<svg class="carousel_icon" width="24" height="24" viewbox="0 0 24 24">
						<path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path>
					</svg>
				</span>
				<span id="moveRight" class="carousel_arrow">
					<svg class="carousel_icon" width="24" height="24" viewbox="0 0 24 24">
						<path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
					</svg>
				</span>
			</div>
			<!-- 图片文章概述 -->
			<div class="carousel-item carousel-item--1">
				<canvas class="carousel-item_image"></canvas>
				<div class="carousel-item_info">
					<div class="carousel-item_cantainer">
						<h2 class="carousel-item_subtitle">Dixie National Forest</h2>
						<h1 class="carousel-item_title">迪克西国家森林公园</h1>
						<p class="carousel-item_description">
							位于犹他州的南部，是从锡安公园走Highway89公路前往布莱斯峡谷的必经之路，占地将近200万英亩，横跨犹他州南部约170英里以及更广泛的地区，是大盆地和科罗拉多河之间的鸿沟。
						</p>
						<a href="#" class="carousel-item_btn">阅读文章</a>
					</div>
				</div>
			</div>

			<div class="carousel-item carousel-item--2">
				<div class="carousel-item_image"></div>
				<div class="carousel-item_info">
					<div class="carousel-item_container">
						<h2 class="carousel-item_subtitle">Bernina Alps</h2>
						<h1 class="carousel-item_title">伯尔尼纳山</h1>
						<p class="carousel-item_description">瑞士东部沿著意大利边境伸展的雷蒂亚阿尔卑斯山脉(Rhaetian
							Alps)的一部分，景色秀丽，伯尔尼纳峰高达4,049公尺(13,284尺)。</p>
						<a href="#" class="carousel-item_btn">阅读文章</a>
					</div>
				</div>
			</div>

			<div class="carousel-item carousel-item--3">
				<div class="carousel-item_image"></div>
				<div class="carousel-item_info">
					<div class="carousel-item_container">
						<h2 class="carousel-item_subtitle">Lappland</h2>
						<h1 class="carousel-item_title">拉普兰</h1>
						<p class="carousel-item_description">
							拉普兰地处芬兰最北部。这是一片充满魔幻魅力的北极地带，各种反差十分强烈。事实上，拉普兰地区的主要魅力之一就是强烈的反差：从24小时日照不断的温暖夏季，到北极光辉映下的黑暗冬日。</p>
						<a href="#" class="carousel-item_btn">阅读文章</a>
					</div>
				</div>
			</div>

			<div class="carousel-item carousel-item--4">
				<div class="carousel-item_image"></div>
				<div class="carousel-item_info">
					<div class="carousel-item_container">
						<h2 class="carousel-item_subtitle">Palawan island</h2>
						<h1 class="carousel-item_title">巴拉望岛</h1>
						<p class="carousel-item_description">
							巴拉望岛是菲律宾西部岛屿，地势狭长，面积1.1785万平方公里，人口31.1548万，巴拉望岛和周围数千个小岛仍是原始的自然生态，因此被称为“海上的乌托邦”。</p>
						<a href="#" class="carousel-item_btn">阅读文章</a>
					</div>
				</div>
			</div>

			<div class="carousel-item carousel-item--5">
				<div class="carousel-item_image"></div>
				<div class="carousel-item_info">
					<div class="carousel-item_container">
						<h2 class="carousel-item_subtitle">Grand Bazaar, Tehran</h2>
						<h1 class="carousel-item_title">德黑兰大市集</h1>
						<p class="carousel-item_description">德黑兰大市集是当地最大的市集, 货品包罗万有, 如果慢慢逛, 应该可以流年数小时, 但需要留意市集内很容易迷路,
							价格比其他伊朗城市高，特别是一些纪念品。</p>
						<a href="#" class="carousel-item_btn">阅读文章</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Topbanana',
		data() {
			return {
				carouselitem: [],
				total: 0,
				current: 0,

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
					slide = 0;
					this.current = 0;
				}
				if (next < 0) {
					slide = this.total - 1;
					this.current = this.total - 1;
				}
				this.carouselitem[prev].classList.remove('active')
				this.carouselitem[slide].classList.add('active')
				setTimeout(function() {}, 800);
			}
		}
	}
</script>

<style>

.dd{
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
		left: 4%;
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
		background-color: #2C2C2C;
		margin: auto;
		padding: 0 40px;
		width: 40%;

	}

	.carousel-item_image {
		background-color: aqua;
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
		font-family: 'Open Sans', sans-serif;
		letter-spacing: 3px;
		font-size: 10px;
		text-transform: uppercase;
		margin: 0;
		color: #7E7E7E;
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
		color: #2C2C2C;
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
		color: #2C2C2C;
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
		left: 70%;
		width: 100px;
		height: 40px;
		z-index: 2;
		background-color: cyan;
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
