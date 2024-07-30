<script>
	import * as m from '$lib/paraglide/messages.js';
	import MetaData from '$lib/components/Pages/MetaData.svelte';
	import SolarSystem from '$lib/components/Pages/SolarSystem.svelte';
</script>

<MetaData title={m.meta_home__title()} description={m.meta_home__description()} />

<section class="flex h-screen justify-center items-center">
	<SolarSystem />

	<div class="mt-20">
		<a
			href="/profiles"
			rel="noopener"
			title={m.page_home___text_button_profiles()}
			class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium dark:text-neutral-200 text-neutral-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
		>
			<span
				class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-neutral-200 dark:bg-neutral-900 rounded-md group-hover:bg-opacity-0"
			>
				{m.page_home___text_button_profiles()}
			</span>
		</a>
	</div>
</section>
