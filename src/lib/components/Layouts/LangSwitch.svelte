<script>
	import { availableLanguageTags, languageTag } from '$lib/paraglide/runtime.js';
	import { i18n } from '$lib/i18n.js';
	import { page } from '$app/stores';
</script>

{#each availableLanguageTags as lang}
	<!-- the hreflang attribute decides which language the link points to -->
	<a
		href={i18n.route($page.url.pathname)}
		hreflang={lang}
		aria-current={lang === languageTag() ? 'page' : undefined}
	>
		{lang}
	</a>
{/each}
