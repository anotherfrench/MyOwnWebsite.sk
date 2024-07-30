import * as amp from '@sveltejs/amp';
import dropcss from 'dropcss';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }: { event: any; resolve: any }): Promise<any> {
	let buffer: string = '';

	return await resolve(event, {
		transformPageChunk: ({ html, done }: { html: string; done: boolean }) => {
			buffer += html;

			if (done) {
				let css: string = '';
				const markup = amp
					.transform(buffer)
					.replace('⚡', 'amp') // dropcss can't handle this character
					.replace(
						/<style amp-custom([^>]*?)>([^]+?)<\/style>/,
						(match: string, attributes: string, contents: string) => {
							css = contents;
							return `<style amp-custom${attributes}></style>`;
						}
					);

				css = dropcss({ css, html: markup }).css;
				return markup.replace('</style>', `${css}</style>`);
			}
		}
	});
}
