<script>
	import * as m from '$lib/paraglide/messages.js';
	import { setMode, mode } from 'mode-watcher';

	function handleModeChange() {
		if ($mode === 'light') {
			setMode('dark');
		} else {
			setMode('light');
		}
	}

	var titleModeChange = m.page_home___title_button_solar_system({
		theme:
			$mode === 'dark' ? m.themes__text_light().toLowerCase() : m.themes__text_dark().toLowerCase()
	});
</script>

<div class="solar-system-container">
	<div class="solar-system-content">
		<button class="dark:block hidden" on:click={handleModeChange} title={titleModeChange}>
			<div class="dark-sun"></div>
			<div class="dark-earth">
				<div class="dark-moon"></div>
			</div>
		</button>

		<button class="block dark:hidden" on:click={handleModeChange} title={titleModeChange}>
			<div class="light-sun"></div>
			<div class="light-earth">
				<div class="light-moon"></div>
			</div>
		</button>
	</div>
</div>

<style lang="postcss">
	.solar-system-container {
		position: absolute;
		left: 50%;
		top: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}

	.solar-system-content {
		font-size: 10px;
		width: 40em;
		height: 40em;
		position: relative;
	}

	.dark-sun {
		position: absolute;
		top: 15em;
		left: 15em;
		width: 10em;
		height: 10em;
		background-color: #fcd34d;
		border-radius: 50%;
		box-shadow: 0 0 3em #f5f5f5;
	}
	.light-sun {
		position: absolute;
		top: 15em;
		left: 15em;
		width: 10em;
		height: 10em;
		background-color: #eab308;
		border-radius: 50%;
		box-shadow: 0 0 3em #171717;
	}

	.dark-earth,
	.dark-moon {
		position: absolute;
		border-style: solid;
		border-color: #f5f5f5 transparent transparent transparent;
		border-width: 0.1em 0.1em 0 0;
		border-radius: 50%;
	}
	.light-earth,
	.light-moon {
		position: absolute;
		border-style: solid;
		border-color: #171717 transparent transparent transparent;
		border-width: 0.1em 0.1em 0 0;
		border-radius: 50%;
	}

	.dark-earth,
	.light-earth {
		top: 5em;
		left: 5em;
		width: 30em;
		height: 30em;
		animation: orbit 36.5s linear infinite;
	}

	.dark-moon,
	.light-moon {
		top: 0;
		right: 0;
		width: 8em;
		height: 8em;
		animation: orbit 2.7s linear infinite;
	}

	.dark-earth::before,
	.dark-moon::before,
	.light-earth::before,
	.light-moon::before {
		content: '';
		position: absolute;
		border-radius: 50%;
	}

	.dark-earth::before {
		top: 2.8em;
		right: 2.8em;
		width: 3em;
		height: 3em;
		background-color: #67e8f9;
	}
	.light-earth::before {
		top: 2.8em;
		right: 2.8em;
		width: 3em;
		height: 3em;
		background-color: #0891b2;
	}

	.dark-moon::before {
		top: 0.8em;
		right: 0.2em;
		width: 1.2em;
		height: 1.2em;
		background-color: #e5e5e5;
	}
	.light-moon::before {
		top: 0.8em;
		right: 0.2em;
		width: 1.2em;
		height: 1.2em;
		background-color: #a3a3a3;
	}

	@keyframes orbit {
		to {
			transform: rotate(360deg);
		}
	}
</style>
