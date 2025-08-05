const { Client } = require("discord.js-selfbot-v13");

// Datele tale (direct în cod, fără environment variables)
const TOKEN = "MTA3NTU0Njc4MzA4Nzg2MTg2Mg.G2QvYi.g3sJiQ-kKYZ_DBw7cXSmU5JYxuyG2FoIO52Xto";
const LOG_CHANNEL_ID = "1393724819216007310"; // Canalul unde loghează DM-urile
const SPAM_CHANNEL_ID = "1086694868132311152"; // Canalul unde trimite spam
const SPAM_MESSAGE = "# Dm me for 50 skelys";
const SPAM_INTERVAL = 126000; // 2 minute și 6 secunde (în milisecunde)

const client = new Client({
    checkUpdate: false
});

client.on("ready", () => {
    console.log(`✅ Autentificat ca ${client.user.tag}`);

    // Spam în canal
    const spamChannel = client.channels.cache.get(SPAM_CHANNEL_ID);
    if (spamChannel) {
        setInterval(() => {
            spamChannel.send(SPAM_MESSAGE).catch(console.error);
        }, SPAM_INTERVAL);
    }
});

// Răspuns automat și log la DM-uri
client.on("messageCreate", async (message) => {
    if (message.channel.type === "DM" && !message.author.bot) {
        // Log în canal
        const logChannel = client.channels.cache.get(LOG_CHANNEL_ID);
        if (logChannel) {
            logChannel.send(`📩 DM de la **${message.author.tag}**: ${message.content}`);
        }

        // Răspuns la DM
        message.channel.send("Salut! Ce vrei?");
    }
});

client.login(TOKEN);
