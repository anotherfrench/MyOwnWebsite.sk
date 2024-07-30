<script>
	import * as m from '$lib/paraglide/messages.js';
	import { page } from '$app/stores';
	$: console.error('[local] Error: ', $page);

	let error_message = $page.error?.message,
		status = $page.status,
		error_title = m.page_error___title_default(),
		error_text = m.page_error___text_default();
	if ($page.status === 404) {
		error_title = m.page_error_404___title();
		error_message = m.page_error_404___message();
		error_text = m.page_error_404___text();
	} else if ($page.status === 500) {
		error_title = m.page_error_500___title();
		error_message = m.page_error_500___message();
		error_text = m.page_error_500___text();
	}

	/**
	 * @type {any[]}
	 */
	let _error_text = [];
	if (error_text && error_text.includes('(n)')) {
		_error_text = error_text.split('(n)');
	}
</script>

<section class="grid h-80 place-items-center text-center align-center">
	<div>
		<p class="text-xl">
			{status} - {error_message}
		</p>
		<h1 class="text-4xl font-extrabold mb-5 md:text-4xl lg:text-5xl">
			{error_title}
		</h1>
		{#if _error_text && _error_text.length > 0}
			{#each Object.entries(_error_text) as [id, text]}
				<p {id}>{text}</p>
			{/each}
		{:else}
			<p>{error_text}</p>
		{/if}
	</div>
</section>
