<script>
	import { PUBLIC_INFOS_NICKNAME } from '$env/static/public';
	import * as m from '$lib/paraglide/messages.js';
	export let commitSha;
</script>

<footer class="fixed bottom-[0] right-[0]">
	<div
		class="flex relative no-underline text-[14px] px-[8px] py-[0] border-t-[1px_solid_#808080] border-l-[1px_solid_#808080] rounded-tl-[5px] [transition:0.2s] hover:bg-[#333] hover:border-t-[1px_solid_#878787] hover:border-l-[1px_solid_#878787]"
	>
		<img
			src="/api/images?is=github-avatar"
			alt="Icon"
			class="absolute -top-[10px] -left-[30px] w-[42px] h-[42px] align-middle ml-[0] mr-[2px] my-[0] rounded-[50%]"
			draggable="false"
		/>

		<div class="font-[var(--font-main)] mx-[0] my-[6px] pl-[10px] text-decoration-none">
			<a
				href="/api/redirect?to=github"
				title={m.components_footer___text_view_profile({ website: 'GitHub' })}
				rel="noopener"
				target="_blank"
			>
				{m.footer__coded_by({ author: PUBLIC_INFOS_NICKNAME })}
			</a>
			- ver.
			<a
				href={`/api/redirect?to=github&gh=commit&sha=${commitSha}`}
				title={m.components_footer___text_view_github_version()}
				rel="noopener"
				target="_blank"
			>
				{commitSha.slice(0, 6)}
			</a>
		</div>
	</div>
</footer>
