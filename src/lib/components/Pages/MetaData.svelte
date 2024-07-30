<script>
	import { availableLanguageTags, languageTag } from '$lib/paraglide/runtime.js';
	import { page } from '$app/stores';
	import { i18n } from '$lib/i18n';
	import { PUBLIC_INFOS_FIRSTNAME, PUBLIC_INFOS_NICKNAME } from '$env/static/public';

	/**
	 * @type {string}
	 * @default undefined
	 * @required
	 */
	export let title;

	/**
	 * @type {string}
	 * @default undefined
	 * @required
	 */
	export let description;

	/**
	 * @type {any}
	 * @default null
	 * @optional
	 */
	export let image = null;

	/**
	 * @type {any}
	 * @default null
	 * @optional
	 */
	export let imageAlt = null;

	/**
	 * @type {any}
	 * @default null
	 * @optional
	 */
	export let twitterCard = null;

	let url = `${$page.url.protocol}//${$page.url.hostname}`;
</script>

<svelte:head>
	<title>{`${title} - ${PUBLIC_INFOS_NICKNAME}`}</title>
	<meta name="title" content={`${title} - ${PUBLIC_INFOS_NICKNAME}`} />
	<meta property="og:title" content={`${title} - ${PUBLIC_INFOS_NICKNAME}`} />
	<meta property="twitter:title" content={`${title} - ${PUBLIC_INFOS_NICKNAME}`} />
	<meta name="description" content={description} />
	<meta property="og:description" content={description} />
	<meta property="twitter:description" content={description} />
	<meta name="apple-mobile-web-app-title" content={PUBLIC_INFOS_NICKNAME} />
	<meta name="application-name" content={PUBLIC_INFOS_NICKNAME} />
	<meta name="author" content={`${PUBLIC_INFOS_FIRSTNAME} (@${PUBLIC_INFOS_NICKNAME})`} />
	<meta property="og:site_name" content={PUBLIC_INFOS_NICKNAME} />
	{#if availableLanguageTags.includes(languageTag())}
		<meta property="og:url" content={url + i18n.resolveRoute(i18n.route($page.url.pathname))} />
		<meta
			property="twitter:url"
			content={url + i18n.resolveRoute(i18n.route($page.url.pathname))}
		/>
		{#each availableLanguageTags as lang}
			{#if lang != languageTag()}
				<link
					rel="alternate"
					href={url + i18n.resolveRoute(i18n.route($page.url.pathname), lang)}
					hreflang={lang}
					id={`lang-${lang}`}
				/>
			{/if}
		{/each}
	{/if}
	{#if image}
		<meta property="og:image" content={image} />
		<meta property="twitter:image" content={image} />
	{/if}
	{#if imageAlt}
		<meta property="og:image:alt" content={imageAlt} />
		<meta property="twitter:image:alt" content={imageAlt} />
	{/if}
	{#if twitterCard}
		<meta property="twitter:card" content={twitterCard} />
	{:else}
		<meta property="twitter:card" content="summary_large_image" />
	{/if}
</svelte:head>
