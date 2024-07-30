<script>
	import * as m from '$lib/paraglide/messages.js';

	const error_message = m.page_error_418___title().replace('Oups, ', '').replace('Oops, ', '');
	$: console.error(`[local] (Fake) Error: 418 - ${error_message}`);

	/**
	 * @type {any[]}
	 */
	let error_text = [];
	if (m.page_error_418___text() && m.page_error_418___text().includes('(n)')) {
		error_text = m.page_error_418___text().split('(n)');
	}
</script>

<section class="grid h-80 place-items-center text-center align-center">
	<div>
		<p class="text-xl">
			418 - {error_message}
		</p>
		<h1 class="text-4xl font-extrabold mb-5 md:text-4xl lg:text-5xl">
			{m.page_error_418___title()} <small class="text-sm">Fake</small>
		</h1>
		{#if error_text && error_text.length > 0}
			{#each Object.entries(error_text) as [id, text]}
				<p {id} class={id > '0' ? 'mt-5' : ''}>{text}</p>
			{/each}
		{:else}
			<p>{m.page_error_418___text().split('(n)')}</p>
		{/if}
	</div>
</section>
