<script>
	import * as m from '$lib/paraglide/messages.js';
</script>

<div
	class="fixed top-0 dark:bg-neutral-900 bg-neutral-200 dark:text-neutral-200 text-neutral-900 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden flex flex-col items-center justify-center"
>
	<div
		class="loader dark:border-t-indigo-400 border-t-indigo-600 ease-linear rounded-full border-4 border-t-4 dark:border-neutral-200 border-neutral-900 h-12 w-12 mb-4"
	></div>
	<h2 class="text-center text-xl font-semibold">{m.components_loader___text_initialization()}</h2>
	<p class="w-1/3 text-center">
		{m.components_loader___text_few_secondes()} <br />
		{m.components_loader___text_not_close()}
	</p>
</div>

<style lang="postcss">
	.loader {
		-webkit-animation: spinner 1.5s linear infinite;
		animation: spinner 1.5s linear infinite;
	}

	@-webkit-keyframes spinner {
		0% {
			-webkit-transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
		}
	}

	@keyframes spinner {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
