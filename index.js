const Eris = require("eris");

const token = process.env.BOT_TOKEN; // Tokenul vine din Environment Variables
const spamChannelId = "ID_CANAL_SPAM";
const logChannelId = "ID_CANAL_LOG";

const respondedUsers = new Set();

const bot = new Eris(token, {
    autoreconnect: true
});

bot.on("ready", () => {
    console.log(`✅ Logat ca ${bot.user.username}#${bot.user.discriminator}`);

    setInterval(() => {
        const spamChannel = bot.getChannel(spamChannelId);
        if (spamChannel) {
            spamChannel.createMessage("# dm me for 50 skelys")
                .catch(console.error);
        } else {
            console.log("❌ Canalul de spam nu a fost găsit!");
        }
    }, 126000); // 126 secunde
});

bot.on("messageCreate", async (message) => {
    if (message.channel.type === 1 && message.author.id !== bot.user.id) {
        // DM = type 1 în Eris
        if (!respondedUsers.has(message.author.id)) {
            respondedUsers.add(message.author.id);

            const logChannel = bot.getChannel(logChannelId);
            if (logChannel) {
                logChannel.createMessage(`📨 ${message.author.username}#${message.author.discriminator} ți-a dat DM!`)
                    .catch(console.error);
            }

            setTimeout(() => {
                message.channel.createMessage(
                    "hi u was first create a ticket to claim : https://discord.gg/aGfP2gXm"
                ).catch(console.error);
            }, 9000);
        }
    }
});

bot.connect();

