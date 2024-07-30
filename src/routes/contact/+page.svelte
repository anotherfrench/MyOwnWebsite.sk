<script>
	// @ts-nocheck
	import { languageTag } from '$lib/paraglide/runtime.js';
	import * as m from '$lib/paraglide/messages.js';
	import { PUBLIC_INFOS_FIRSTNAME, PUBLIC_INFOS_NICKNAME } from '$env/static/public';
	import { PUBLIC_RECAPTCHA_SITE_KEY } from '$env/static/public';
	import { toast } from 'svoast';
	import { enhance } from '$app/forms';
	export let form;
	import { Button, Modal } from 'flowbite-svelte';
	let helpModal = false;

	import MetaData from '$lib/components/Pages/MetaData.svelte';
	import discordHelp_en from '$lib/assets/images/discord-webhooks/discord-help.en.png';
	import discordHelp_fr from '$lib/assets/images/discord-webhooks/discord-help.fr.png';

	const cssModal = {
		title: 'text-xl font-bold mb-3 text-gray-900 dark:text-white',
		p: 'text-base leading-relaxed text-gray-500 dark:text-gray-400',
		small: '-mt-2 text-sm text-gray-500 dark:text-gray-400',
		required: 'text-red-500',
		optional: 'text-gray-500'
	};

	const cssForm = {
		text: 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-neutral-200 focus:outline-none focus:ring-0 focus:border-neutral-700 peer',
		input:
			'peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-neutral-600 peer-focus:dark:text-neutral-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
	};

	$: if (form?.success) {
		toast.success(m.page_contact___text_toast_success({ nickname: PUBLIC_INFOS_NICKNAME }));
		console.log(form?.log);
	} else if (form?.errors) {
		switch (form?.errors) {
			case 'recaptcha':
				toast.error(form?.errors_data?.recaptcha);
				console.error(form?.log);
				break;
			case 'message_send_failed':
				toast.error(m.page_contact___text_toast_error_sending({ nickname: PUBLIC_INFOS_NICKNAME }));
				console.error(form?.log);
				break;
			default:
				toast.error(m.page_contact___text_toast_error_sending_interrupted());
				console.error(form?.log);
				break;
		}
	}
</script>

<MetaData title={m.meta_contact__title()} description={m.meta_contact__description()} />
<svelte:head>
	<script
		src="https://www.google.com/recaptcha/api.js?render={PUBLIC_RECAPTCHA_SITE_KEY}"
		async
		defer
	></script>
</svelte:head>

<section class="grid h-80 place-items-center">
	<div>
		<p class="text-xl text-center align-center">
			{PUBLIC_INFOS_NICKNAME}
		</p>
		<h1
			class="mb-7 text-4xl font-extrabold leading-none tracking-tight text-neutral-950 dark:text-neutral-100 md:text-4xl lg:text-5xl text-center align-center"
		>
			<span
				class="underline underline-offset-3 decoration-8 decoration-neutral-800 dark:decoration-neutral-200"
			>
				{m.page_contact___text_h1()}
			</span>
		</h1>
		<div class="form-discord-webhooks-contact">
			<!-- svelte-ignore missing-declaration -->
			<form
				method="POST"
				use:enhance={async ({ formData }) => {
					toast.info('Loading...');
					await new Promise((resolve) => {
						grecaptcha.ready(resolve);
					});

					const token = await grecaptcha.execute(PUBLIC_RECAPTCHA_SITE_KEY, { action: 'submit' });
					formData.append('token', token);
				}}
				class="max-w-md mx-auto"
			>
				<div
					class="text-sm mb-5 text-center {form?.success
						? 'text-green-500 dark:text-green-300'
						: 'text-red-500 dark:text-red-300'}"
					id="status-{form?.success ? 'success' : form?.errors ? 'error' : 'unfilled'}"
				>
					{#if form?.errors}
						{#if form?.errors_data?.recaptcha}
							<p>{form?.errors_data?.recaptcha}</p>
						{/if}
						{#if form?.errors_data?.email}
							<p>{form?.errors_data?.email}</p>
						{/if}
						{#if form?.errors_data?.nickname}
							<p>{form?.errors_data?.nickname}</p>
						{/if}
						{#if form?.errors_data?.message}
							<p>{form?.errors_data?.message}</p>
						{/if}
						{#if form?.errors_data?.discord}
							<p>{form?.errors_data?.discord}</p>
						{/if}
					{:else if form?.success}
						{#if form?.success_data.nickname}
							<p>
								{`${form?.success_data.nickname[0].toUpperCase()}${form?.success_data.nickname.slice(1)}`}
								{#if form?.success_data.discord != m.page_contact___text_webhooks__no_discord()}
									(@{form?.success_data.discord})
								{/if}
								{m.page_contact___text_form___success({ nickname: PUBLIC_INFOS_NICKNAME })}
							</p>
						{:else}
							<p>
								{m.page_contact___text_form___success_alt({ nickname: PUBLIC_INFOS_NICKNAME })}
							</p>
						{/if}
					{/if}
				</div>
				<div class="relative z-0 w-full mb-5 group">
					<input
						type="email"
						name="email"
						id="email"
						autocomplete="email"
						class={cssForm.text}
						placeholder="example@gmail.com"
						minlength="3"
						maxlength="64"
						required
					/>
					<label for="email" class={cssForm.input}>{m.page_contact___text_form__email()}*</label>
				</div>
				<div class="grid md:grid-cols-2 md:gap-6">
					<div class="relative z-0 w-full mb-5 group">
						<input
							type="text"
							name="nickname"
							id="nickname"
							class={cssForm.text}
							placeholder="Example"
							minlength="2"
							maxlength="32"
							required
						/>
						<label for="nickname" class={cssForm.input}
							>{m.page_contact___text_form__nickname()}*</label
						>
					</div>
					<div class="relative z-0 w-full mb-5 group">
						<input
							type="text"
							name="discord"
							id="discord"
							class={cssForm.text}
							placeholder="example"
							minlength="2"
							maxlength="32"
						/>
						<label for="discord" class={cssForm.input}
							>@{m.page_contact___text_form__discord()}</label
						>
					</div>
				</div>
				<div class="relative z-0 w-full mb-5 group">
					<textarea
						id="message"
						rows="4"
						name="message"
						autocomplete="off"
						class={cssForm.text}
						placeholder={m.page_contact___text_form__mesage_placeholder()}
						minlength="100"
						maxlength="1024"
						required
					></textarea>
					<label for="message" class={cssForm.input}>{m.page_contact___text_form__message()}*</label
					>
				</div>
				<div class="hidden absolute -mt-[100rem]">
					<input
						type="hidden"
						id="language"
						name="language"
						value={languageTag()}
						autocomplete="off"
						minlength="2"
						maxlength="2"
						required
					/>
				</div>
				<p class="text-sm mb-5 text-gray-500 dark:text-gray-400">
					{m.page_contact___text_form__info({ nickname: PUBLIC_INFOS_NICKNAME })}
				</p>
				<button
					type="submit"
					class="text-neutral-200 hover:text-neutral-100 dark:text-neutral-900 bg-neutral-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-200 dark:focus:ring-indigo-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-neutral-100 dark:hover:bg-indigo-300"
				>
					{m.page_contact___text_form___button_submit()}
				</button>
				<span class="modal-button">
					<Button
						class="text-neutral-900 dark:text-neutral-200 bg-transparent hover:bg-transparent focus:ring-1 focus:outline-none focus:ring-neutral-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-transparent dark:hover:bg-transparent dark:focus:ring-neutral-900"
						on:click={() => (helpModal = true)}
						type="button"
					>
						{m.page_contact___text_form___button_help()}
					</Button>
				</span>
			</form>
			<span class="modal-content">
				<Modal
					color="neutral"
					class="text-neutral-900 bg-neutral-200 dark:text-neutral-200 dark:bg-neutral-900"
					headerClass="text-neutral-900 bg-neutral-200 dark:text-neutral-200 dark:bg-neutral-900 flex justify-between items-center p-4 md:p-5 rounded-t-lg"
					backdropClass="fixed inset-0 z-40 bg-neutral-900 bg-opacity-50 dark:bg-opacity-80"
					title={m.page_contact___text_modal_help__title()}
					bind:open={helpModal}
					autoclose
					outsideclose
				>
					<h1 class={cssModal.title}>
						{m.page_contact___text_form__email()}
						<small class={cssModal.required}>
							({m.page_contact___text_modal_help__required()})
						</small> <br />
						<small class={cssModal.small}>
							{m.page_contact___text_modal_help__limit({ min: 3, max: 64 })}
						</small>
					</h1>
					<p class={cssModal.p}>
						{m.page_contact___text_modal_help___content_email___part1()}
					</p>
					<p class={cssModal.p}>
						<b>{m.page_contact___text_modal_help___content_email___part2()}</b>: "gmail.com",
						"googlemail.com", "live.com", "outlook.com", "outlook.fr", "yahoo.com", "yahoo.fr",
						"myyahoo.com", "msn.com", "tuta.io", "proton.me", "protonmail.com", "gmx.de",
						"yandex.com", "aol.com"
					</p>
					<h1 class={cssModal.title}>
						{m.page_contact___text_form__nickname()}
						<small class={cssModal.required}>
							({m.page_contact___text_modal_help__required()})
						</small> <br />
						<small class={cssModal.small}>
							{m.page_contact___text_modal_help__limit({ min: 2, max: 32 })}
						</small>
					</h1>
					<p class={cssModal.p}>
						{m.page_contact___text_modal_help___content_nickname({
							nickname: PUBLIC_INFOS_NICKNAME,
							first_name: PUBLIC_INFOS_FIRSTNAME
						})}
					</p>
					<h1 class={cssModal.title}>
						{m.page_contact___text_form__discord()}
						<small class={cssModal.optional}>
							({m.page_contact___text_modal_help__optional()})
						</small> <br />
						<small class={cssModal.small}>
							{m.page_contact___text_modal_help__limit({ min: 2, max: 32 })}
						</small>
					</h1>
					<p class={cssModal.p}>
						{m.page_contact___text_modal_help___content_discord()}
					</p>
					<div class="flex justify-center items-center">
						{#if languageTag()}
							<img
								src={languageTag() === 'fr' ? discordHelp_fr : discordHelp_en}
								alt="discord help"
								draggable="false"
								width="450"
							/>
						{:else}
							<img src={discordHelp_en} alt="discord help" draggable="false" width="450" />
						{/if}
					</div>
					<h1 class={cssModal.title}>
						{m.page_contact___text_form__message()}
						<small class={cssModal.required}>
							({m.page_contact___text_modal_help__required()})
						</small> <br />
						<small class={cssModal.small}>
							{m.page_contact___text_modal_help__limit({ min: 100, max: 1024 })}
						</small>
					</h1>
					<p class={cssModal.p}>
						{m.page_contact___text_modal_help___content_message()}
					</p>
				</Modal>
			</span>
		</div>
	</div>
</section>

<style>
	.-mt-contact {
		margin-top: -8rem;
	}

	@media (max-width: 1023px) {
		.-mt-contact {
			margin-top: -7rem !important;
		}
	}

	@media (max-width: 375px) {
		.-mt-contact {
			margin-top: -4rem !important;
		}
	}

	::-webkit-input-placeholder {
		/* WebKit browsers */
		color: transparent !important;
	}

	:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: transparent !important;
	}

	::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: transparent !important;
	}

	:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: transparent !important;
	}

	input::placeholder {
		color: transparent !important;
	}

	textarea::-webkit-input-placeholder {
		/* WebKit browsers */
		color: transparent !important;
	}

	textarea:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: transparent !important;
	}

	textarea::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: transparent !important;
	}

	textarea:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: transparent !important;
	}

	textarea::placeholder {
		color: transparent !important;
	}
</style>
