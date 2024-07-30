import { PUBLIC_INFOS_NICKNAME } from '$env/static/public';
export const csr: boolean = true;

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
	const nickname = PUBLIC_INFOS_NICKNAME.toLowerCase();
	const GitHubCommits = await fetch(
		`https://api.github.com/repos/${nickname}/MyOwnWebsite.sk/commits`
	);
	const GHCJson = await GitHubCommits.json();

	return {
		GitHub_Commits_Sha: GHCJson[0].sha
	};
}
