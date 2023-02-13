<template>
	<div>
		<div class='parent'>
			<div class='slider'>
				<div id='slide1' class='slide1 up1'>
					新冠病毒的大流行，使得全球经济陷入1929年大萧条以来最严重的衰退。尽管中国封城措施在新冠疫情初期遭到部分外国舆论的抨击，但是意大利、英国、日本等多个发达国家都在疫情恶化后采取了封城甚至关闭国境的措施。
				</div>
			</div>
		</div>
		<div style="position: absolute;top: 700px;">
			<h1 style="padding-left: 600px;">小组介绍</h1>
			<ul style="display: flex;justify-content: center;">
				<li style="padding-left: 50px;">
					<h2>李碧拓</h2>
					<h3>sdasd</h3><img src="../assets/images/li.jpg" alt="">
				</li>
				<li>
					<h2>方威威</h2>
					<h3>sdasd</h3><img src="../assets/images/fang.jpg" alt="">
				</li>
				<li>
					<h2>吴娇雅</h2>
					<h3>sdasd</h3><img src="../assets/images/wu.jpg" alt="">
				</li>
				<li>
					<h2>吴志浩</h2>
					<h3>sdasd</h3><img src="../assets/images/wu2.jpg" alt="">
				</li>
				<li>
					<h2>刘子璐</h2>
					<h3>sdasd</h3><img src="../assets/images/liu.jpg" alt="">
				</li>
				<li>
					<h2>谭凯</h2>
					<h3>sdasd</h3><img src="../assets/images/tan.jpg" alt="">
				</li>
			</ul>
		</div>

	</div>

</template>

<script>
	export default {
		name: 'getall',
		data() {
			return {
			}
		},
		mounted() {
			
		},
	}
</script>
<style>
	li {
		list-style-type: none;
		margin-top: 30px;
		flex: auto;
		width: 200px;
		text-align: center;
	}

	h3 {
		margin-top: 10px;
	}

	img {
		width: 120px;
		height: 120px;
	}

	.parent {

		width: 681px;
		height: 384px;
		top: 20%;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto auto;
		overflow: hidden;
		position: absolute;
		border-radius: 16px;
		-webkit-box-shadow: 0 0 88px 5px rgba(0, 0, 0, 0.75);
		-moz-box-shadow: 0 0 88px 5px rgba(0, 0, 0, 0.75);
		box-shadow: 0 0 88px 5px rgba(0, 0, 0, 0.75);
	}
	.slide1 {
		background-image: url("https://source.unsplash.com/a93v3R8nu-c");
	}
	.slider {
		position: absolute;
		width: 400%;
		height: 100%;
		background: #000;
		display: inline-flex;
		overflow: hidden;
	}

	.slide1{
		position: absolute;
		background-position: center;
		background-size: cover;
		color: #fff;
		font-size: 20px;
		padding-top: 138px;
		font-weight: 800;
		font-family: "Heebo", sans-serif;
		text-align: center;
		width: 25%;
		height: 100%;
		z-index: 10;
		transition: 1.4s;
	}
</style>
