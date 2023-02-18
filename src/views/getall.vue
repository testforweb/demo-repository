<template>
	<div>
		<div class='parent'>
			<div class='slider'>
				<div id='slide1' class='slide1 up1'>
					新冠病毒的大流行，使得全球经济陷入1929年大萧条以来最严重的衰退。尽管中国封城措施在新冠疫情初期遭到部分外国舆论的抨击，但是意大利、英国、日本等多个发达国家都在疫情恶化后采取了封城甚至关闭国境的措施。
				</div>
			</div>
		</div>
		<div>
			<h1 class="title">小组介绍</h1>
			<div class="members">
				<div>
					<div>
						<h3>李碧拓</h3>
					</div>
					<img src="../assets/images/li.jpg" alt="">
				</div>
				<div>
					<div>
						<h3>方威威</h3>
					</div>
					<img src="../assets/images/fang.jpg" alt="">
				</div>
				<div>
					<div>
						<h3>吴娇雅</h3>
					</div><img src="../assets/images/wu.jpg" alt="">
				</div>
				<div>
					<div>
						<h3>吴志浩</h3>
					</div><img src="../assets/images/wu2.jpg" alt="">
				</div>
				<div>
					<div>
						<h3>刘子璐</h3>
					</div><img src="../assets/images/liu.jpg" alt="">
				</div>
				<div>
					<div>
						<h3>谭凯</h3>
					</div><img src="../assets/images/tan.jpg" alt="">
				</div>
			</div>
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

	.members>div {
		display: flex;
		margin: 1em;
		background: #fff;
		box-shadow: 0 0 2em rgba(100, 130, 150, 0.2);
		overflow: hidden;
		border-radius: 1em;
		transition: transform .4s;
	}

	.members>div>div {
		width: 12em;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
	}

	.members>div:hover {
		transform: scale(1.05);
	}

	.members p{
		opacity: .6;
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
		background-image: url('../../public/images1/VCG41N1370730955.jpg');
		background-position: center;
		background-size: cover;
		overflow: hidden;
		transition: 1.4s;
	}

	.slide1 {
		background: rgba(60, 80, 100, 0.6);
		padding: 2em;
		color: #fff;
		font-size: 1.3em;
		text-align: center;
	}
</style>
