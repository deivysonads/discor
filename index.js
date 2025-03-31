require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const token = process.env.DISCORD_BOT_TOKEN;
const guildId = process.env.DISCORD_GUILD_ID;
const roleId = process.env.DISCORD_ROLE_ID;
const channelId = process.env.DISCORD_WELCOME_CHANNEL_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages
  ]
});

client.once("ready", () => {
  console.log(`✅ Bot online como ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  console.log(`👤 Novo membro: ${member.user.tag}`);

  // Enviar mensagem de boas-vindas
  try {
    const welcomeChannel = await client.channels.fetch(channelId);
    if (welcomeChannel) {
      await welcomeChannel.send(`👋 Seja bem-vindo, ${member.user.toString()}! 💚`);
      console.log("📩 Mensagem de boas-vindas enviada.");
    }
  } catch (err) {
    console.error("Erro ao enviar mensagem:", err.message);
  }

  // Adicionar cargo
  try {
    await member.roles.add(roleId);
    console.log(`✅ Cargo adicionado para ${member.user.tag}`);
  } catch (err) {
    console.error("❌ Erro ao adicionar cargo:", err.message);
  }
});

client.login(token);
