<script>
	import * as m from '$lib/paraglide/messages.js';
	import { i18n } from '$lib/i18n.js';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import icon from '$lib/assets/images/logo.png';
	import { page } from '$app/stores';
	import { PUBLIC_INFOS_NICKNAME } from '$env/static/public';

	const navClass = {
		NavHamburger: `focus:outline-none whitespace-normal m-0.5 rounded-lg focus:ring-2 p-1.5 dark:focus:ring-neutral-900 dark:hover:bg-neutral-900 
			dark:hover:bg-neutral-700 focus:ring-neutral-200 hover:bg-neutral-200 hover:bg-neutral-400 ms-3 md:hidden`,
		NavUl: {
			ulClass: `bg-neutral-200 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 rounded-lg border border-neutral-200 dark:border-neutral-900 
			divide-neutral-100 dark:divide-neutral-800 flex flex-col p-4 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium`
		},
		NavLi: {
			activeClass: 'dark:active:text-neutral-100 active:text-black',
			aClass: `block py-2 pe-4 ps-3 md:p-0 rounded hover:bg-neutral-100 md:hover:bg-transparent md:border-0 md:hover:text-neutral-700 
			md:dark:hover:text-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100 md:dark:hover:bg-transparent dark:text-neutral-200 text-neutral-900`
		}
	};

	const urls = [
		{ href: '/', title: m.header__home(), target: '_self' },
		{ href: '/profiles', title: m.header__profiles(), target: '_self' },
		{ href: '/contact', title: m.header__contact(), target: '_self' }
	];
</script>

<Navbar
	class="dark:bg-neutral-900 dark:text-neutral-200 bg-neutral-200 text-neutral-800"
	let:hidden
	let:toggle
>
	<NavBrand href={urls[0].href} title={urls[0].title} rel="noopener">
		<img
			src={icon}
			class="mr-3 h-6 sm:h-9"
			alt={`${PUBLIC_INFOS_NICKNAME} Logo`}
			draggable="false"
		/>
	</NavBrand>
	<NavHamburger on:click={toggle} class={navClass.NavHamburger} />
	<NavUl {hidden} ulClass={navClass.NavUl.ulClass}>
		{#each urls as link}
			<NavLi
				href={link.href}
				title={link.title}
				target={link.target === '_self' ? null : link.target}
				rel="noopener"
				class={i18n.route($page.url.pathname) === link.href
					? `${navClass.NavLi.aClass} dark:text-neutral-100 text-neutral-900`
					: `${navClass.NavLi.aClass} dark:text-neutral-400 text-neutral-600`}
				activeClass={navClass.NavLi.activeClass}
			>
				{link.title}
			</NavLi>
		{/each}
	</NavUl>
</Navbar>
