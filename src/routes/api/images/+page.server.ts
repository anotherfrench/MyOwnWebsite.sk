import { redirect } from '@sveltejs/kit';
import { PRIVATE_GITHUB_USER_ID } from '$env/static/private';

/** @type {import('./$types').PageLoad} */
export function load({ params, url }) {
	let view = url.searchParams.get('is');
	switch (view) {
		case 'github-avatar':
			redirect(302, `https://avatars.githubusercontent.com/u/${PRIVATE_GITHUB_USER_ID}`);
		default:
			redirect(302, `/`);
	}
}
