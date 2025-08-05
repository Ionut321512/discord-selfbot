const { Client } = require("discord.js-selfbot-v13");
const client = new Client();

const token = process.env.BOT_TOKEN; // tokenul vine din Environment Variables pe Render
const spamChannelId = "1086694868132311152";
const logChannelId = "1393724819216007310";

const respondedUsers = new Set();

client.on("ready", () => {
  console.log(`✅ Sunt logat ca ${client.user.tag}`);
  setInterval(() => {
    const spamChannel = client.channels.cache.get(spamChannelId);
    if (spamChannel)
      spamChannel.send("# dm me for 50 skelys").catch(console.error);
    else console.log("❌ Canalul de spam nu a fost găsit!");
  }, 126000);
});

client.on("messageCreate", (message) => {
  if (message.channel.type === "DM" && message.author.id !== client.user.id) {
    if (!respondedUsers.has(message.author.id)) {
      respondedUsers.add(message.author.id);

      const logChannel = client.channels.cache.get(logChannelId);
      if (logChannel)
        logChannel
          .send(`📨 ${message.author.tag} ți-a dat DM!`)
          .catch(console.error);

      setTimeout(() => {
        message.channel.send(
          "hi u was first create a ticket to claim : https://discord.gg/aGfP2gXm"
        );
      }, 9000);
    }
  }
});

client.login(token);
