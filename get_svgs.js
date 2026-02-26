const https = require('https');
const icons = ['openai', 'anthropic', 'googlegemini', 'x', 'perplexity'];

icons.forEach(icon => {
    https.get(`https://unpkg.com/simple-icons/icons/${icon}.svg`, res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => console.log(`\n--- ${icon}.svg ---\n` + data));
    });
});
