<script>
	import { PUBLIC_INFOS_NICKNAME } from '$env/static/public';

	const nickname = PUBLIC_INFOS_NICKNAME.toLowerCase();
	const urls = [
		{
			href: `https://github.com/${nickname}`,
			title: 'GitHub',
			class: 'github',
			icon: 'fa-brands fa-github'
		}
	];
</script>

<div class="icon-bar opacity-35 hover:opacity-100">
	{#each urls as link}
		<a href={link.href} target="_blank" title={link.title} class={link.class} rel="noopener">
			<i class={link.icon}></i>
		</a>
	{/each}
</div>

<style lang="postcss">
	.icon-bar {
		position: fixed;
		top: 50%;
		-webkit-transform: translateY(-50%);
		-ms-transform: translateY(-50%);
		transform: translateY(-50%);
	}

	.icon-bar a {
		display: block;
		text-align: center;
		padding: 16px;
		transition: all 0.3s ease;
		color: white;
		font-size: 20px;
	}

	.x-twitter {
		background: #000000;
		color: white;
	}

	.instagram {
		background: radial-gradient(
			circle at 30% 107%,
			#fdf497 0%,
			#fdf497 5%,
			#fd5949 45%,
			#d6249f 60%,
			#285aeb 90%
		);
		color: white;
	}

	.github {
		background: #333;
		color: white;
	}

	.twitch {
		background: #9146ff;
		color: white;
	}

	.youtube {
		background: #ff0000;
		color: white;
	}
</style>
