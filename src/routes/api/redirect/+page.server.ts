import { redirect } from '@sveltejs/kit';
import { PUBLIC_INFOS_NICKNAME } from '$env/static/public';

/** @type {import('./$types').PageLoad} */
export function load({ params, url }) {
	const lowerNickname = PUBLIC_INFOS_NICKNAME.toLowerCase();
	const repo = `https://github.com/${lowerNickname}/${lowerNickname}.github.io`;
	let goTo = url.searchParams.get('to');
	let githubPages = url.searchParams.get('gh');
	let githubCommits = url.searchParams.get('commit');

	switch (goTo) {
		case 'github':
			switch (githubPages) {
				case 'repository':
					redirect(302, repo);
				case 'commit':
					switch (githubCommits) {
						case githubCommits:
							redirect(302, `${repo}/commit/${githubCommits}`);
						default:
							redirect(302, `${repo}/commits?author=${lowerNickname}`);
					}
				default:
					redirect(302, `https://github.com/${lowerNickname}`);
			}
		default:
			redirect(302, `/`);
	}
}
