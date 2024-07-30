var re = /^(anotherfrench\.(github)\.io|(localhost))$/;
if (!re.test(location.hostname)) {
	console.error(`[local] Connected via a unwhitelisted domain name: ${location.hostname}`);
	location.href = 'https://anotherfrench.github.io';
} else {
	console.info(`[local] Connected via a whitelisted domain name: ${location.hostname}`);
}
