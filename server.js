const { Client } = require('discord.js-selfbot-v13');

// Token-ul contului
const TOKEN = "MTA3NTU0Njc4MzA4Nzg2MTg2Mg.Gdkhkc.im4YvJLgkYBzgGQO8zjyRQTtUVA9s_OmtQcs3g";
// ID-ul canalului unde se loghează DM-urile
const LOG_CHANNEL_ID = "1393724819216007310";

const client = new Client({
    checkUpdate: false
});

client.on('ready', () => {
    console.log(`${client.user.username} este online!`);
});

client.on('messageCreate', async (message) => {
    // Ignoră mesajele trimise de tine
    if (message.author.id === client.user.id) return;

    // Dacă e DM
    if (message.channel.type === "DM") {
        console.log(`DM de la ${message.author.tag}: ${message.content}`);

        // Răspunde automat
        try {
            await message.channel.send("Salut! Am primit mesajul tău.");
        } catch (err) {
            console.error("Eroare la trimiterea răspunsului:", err);
        }

        // Trimite mesajul în canalul de log
        const logChannel = client.channels.cache.get(LOG_CHANNEL_ID);
        if (logChannel) {
            logChannel.send(`📩 DM de la **${message.author.tag}**: ${message.content}`);
        }
    }
});

client.login(TOKEN);
