export const csr: boolean = true;
import * as m from '$lib/paraglide/messages.js';
import {
	PRIVATE_INFOS_FIRSTNAME,
	PRIVATE_DISCORD_USER_ID,
	PRIVATE_DISCORD_CHANNEL_CONTACT_ID,
	PRIVATE_DISCORD_WEBHOOKS_CONTACT,
	PRIVATE_RECAPTCHA_SECRET_KEY
} from '$env/static/private';
import { PUBLIC_INFOS_NICKNAME } from '$env/static/public';

interface Errors {
	email: string;
	nickname: string;
	discord: string;
	message: string;
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, url }: { request: any; url: any }) => {
		const errors: Errors = { email: '', nickname: '', discord: '', message: '' };
		const formData = await request.formData();
		const email: string | null = formData.get('email');
		const nickname: string | null = formData.get('nickname');
		const discord: string | null =
			formData.get('discord') || m.page_contact___text_webhooks__no_discord();
		const message: string | null = formData.get('message');
		const token: any = formData.get('token');
		const language: string = formData.get('language');

		const postData = new URLSearchParams();
		postData.append('secret', PRIVATE_RECAPTCHA_SECRET_KEY);
		postData.append('response', token);

		const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: postData
		});
		const captchaData = await response.json();

		const isDevelopment: boolean = process.env.NODE_ENV === 'development';
		if (captchaData.hostname === 'localhost' && !isDevelopment) {
			return {
				errors: true,
				errors_data: { recaptcha: m.page_contact___text_form___errors_recaptcha_localhost() },
				name: 'recaptcha',
				log: '[API](Recaptcha): Operation not permitted for localhost in production.'
			};
		}

		if (captchaData.success && captchaData.score > 0.5 && captchaData.action === 'submit') {
			const allowedEmailDomains: string[] = [
				'gmail.com',
				'googlemail.com',
				'live.com',
				'outlook.com',
				'outlook.fr',
				'yahoo.com',
				'yahoo.fr',
				'myyahoo.com',
				'msn.com',
				'tuta.io',
				'proton.me',
				'protonmail.com',
				'gmx.de',
				'yandex.com',
				'aol.com',
				'icloud.com',
				!isDevelopment ? 'mail.contact' : captchaData.hostname === 'localhost' ? 'mail.contact' : ''
			];

			const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
			if (typeof email !== 'string' || email.length < 3 || email.length > 64) {
				errors.email += m.page_contact___text_form___errors_email_none();
			} else {
				if (!emailRegex.test(email)) {
					errors.email += m.page_contact___text_form___errors_email_invalid();
				} else {
					const emailDomain = email.split('@')[1];
					if (!allowedEmailDomains.includes(emailDomain)) {
						errors.email += m.page_contact___text_form___errors_email_invalid_domain({
							btn_help: m.page_contact___text_form___button_help()
						});
					}
				}
			}

			const nicknameRegex: RegExp = /^[a-zA-Z0-9-_]+$/;
			if (typeof nickname !== 'string' || nickname.length < 2 || nickname.length > 32) {
				errors.nickname += m.page_contact___text_form___errors_nickname();
			} else {
				if (!nicknameRegex.test(nickname)) {
					errors.nickname += m.page_contact___text_form___errors_nickname_invalid();
				}
			}

			const discordRegex: RegExp = /^[a-zA-Z0-9._-]{2,32}$/;
			if (discord != m.page_contact___text_webhooks__no_discord()) {
				if (typeof discord !== 'string' || discord.length < 2 || discord.length > 32) {
					errors.discord += m.page_contact___text_form___errors_discord_none();
				} else {
					if (!discordRegex.test(discord)) {
						errors.discord += m.page_contact___text_form___errors_discord_invalid();
					}
				}
			}

			if (typeof message !== 'string' || message.length < 100 || message.length > 1024) {
				errors.message += m.page_contact___text_form___errors_message_invalid();
			}

			const hasErrors: boolean = Object.values(errors).some((msg) => msg);
			if (!hasErrors) {
				const colorRandom: number = Math.floor(Math.random() * 16777215);

				function ifDiscord(discord: any | null): any {
					if (discord !== m.page_contact___text_webhooks__no_discord()) {
						return discord;
					}
					return m.page_contact___text_webhooks__no_discord();
				}

				function getAvatarId(max: number): string {
					const number = Math.floor(Math.random() * max);
					return number < 10 ? `0${number}` : number.toString();
				}

				function getCurrentLang(lang: string): string {
					let language = lang;
					if (lang === 'en') {
						language = 'usa';
					}

					return `${url.protocol}//${url.host}/assets/images/discord-webhooks/flags/${language}.png`;
				}

				var currentAvatarId: string = `${url.protocol}//${url.host}/assets/images/discord-webhooks/logos/${getAvatarId(11)}.jpg`;
				const webhookBody = {
					username: `[${PRIVATE_INFOS_FIRSTNAME}] Contact`,
					content: m.page_contact___text_webhooks__content({
						channel_id: `<#${PRIVATE_DISCORD_CHANNEL_CONTACT_ID}>`,
						user_id: `<@${PRIVATE_DISCORD_USER_ID}>`
					}),
					embeds: [
						{
							title: m.page_contact___text_webhooks__title({ url: 'contact' }),
							url: url.href,
							author: {
								name: nickname,
								url: `https://google.com/search?q=${nickname}`,
								icon_url: `https://ui-avatars.com/api/?name=${nickname}&length=2&bold=true&uppercase=true&background=${colorRandom.toString(16).padStart(6, '0')}&color=fff`
							},
							thumbnail: {
								url: currentAvatarId
							},
							fields: [
								{ name: m.page_contact___text_form__email(), value: email, inline: false },
								{ name: m.page_contact___text_form__nickname(), value: nickname, inline: true },
								{
									name: m.page_contact___text_form__discord(),
									value:
										ifDiscord(discord) != m.page_contact___text_webhooks__no_discord()
											? `[${discord}](https://discords.com/bio/p/${discord})`
											: ifDiscord(discord),
									inline: true
								},
								{ name: m.page_contact___text_webhooks__message(), value: message, inline: false }
							],
							color: colorRandom,
							footer: {
								text: m.page_contact___text_webhooks__footer({
									author: PRIVATE_INFOS_FIRSTNAME,
									discord_username: PUBLIC_INFOS_NICKNAME
								}),
								icon_url: getCurrentLang(language)
							},
							timestamp: new Date()
						}
					]
				};

				const response = await fetch(PRIVATE_DISCORD_WEBHOOKS_CONTACT, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(webhookBody)
				});

				if (response.ok) {
					return {
						success: true,
						success_data: { nickname: nickname, discord: ifDiscord(discord) },
						name: 'message_send_success',
						log: '[API](Discord Webhooks): I have received your message!'
					};
				} else {
					return {
						errors: true,
						errors_data: errors,
						name: 'message_send_failed',
						log: '[API](Discord Webhooks): Message send failed.'
					};
				}
			} else {
				return {
					errors: true,
					errors_data: errors,
					name: 'has_errors',
					log: '[API](Error): Sending interrupted due to error in form fields.'
				};
			}
		}

		return {
			errors: true,
			errors_data: { recaptcha: m.page_contact___text_form___errors_recaptcha_failed() },
			name: 'recaptcha',
			log: '[API](ReCaptcha): ReCaptcha verification failed.'
		};
	}
};
