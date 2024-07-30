<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import { navigating } from '$app/stores';
	import { ModeWatcher } from 'mode-watcher';
	import { Toasts } from 'svoast';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { i18n } from '$lib/i18n';
	import { loading } from '$lib/stores/loading';
	import '$lib/assets/css/tailwind.css';
	import '$lib/assets/css/layout.css';
	// import '$lib/assets/test-log.js'; // works !

	import Header from '$lib/components/Layouts/Nav/Header.svelte';
	import Footer from '$lib/components/Layouts/Footer.svelte';
	import Loader from '$lib/components/Layouts/Loader.svelte';
	import IconBar from '$lib/components/Layouts/Nav/IconBar.svelte';
	// import LangSwitch from '$lib/components/Layouts/LangSwitch.svelte';

	$: if ($loading.status === 'NAVIGATING') {
		setTimeout(() => {
			if ($loading.status === 'NAVIGATING') {
				$loading.status = 'LOADING';
			}
		}, 500);
	}
</script>

<ParaglideJS {i18n}>
	<ModeWatcher defaultMode="system" />
	<Toasts position="top-center" />
	<div class="app">
		{#if $loading.status === 'LOADING' || $loading.status === 'NAVIGATING' || $navigating}
			<Loader />
		{:else if $loading.status === 'IDLE'}
			<header>
				<Header />
				<!--<LangSwitch />-->
				<IconBar />
			</header>
			<main>
				<div class="container">
					<slot />
				</div>
			</main>
			<Footer commitSha={data.GitHub_Commits_Sha} />
		{:else}
			<Loader />
			{console.log(`[local] Error in loading... ${$loading.status}`)}
		{/if}
	</div>
</ParaglideJS>
