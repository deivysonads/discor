require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const fetch = require("node-fetch");

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = process.env.DISCORD_GUILD_ID;
const CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;
const STUDENT_ROLE_ID = process.env.DISCORD_STUDENT_ROLE_ID;
const VALIDATION_API_URL = process.env.VALIDATION_API_URL;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`✅ Bot online como ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  try {
    const email = "sem@email.com"; // não dá pra pegar automático
    const cpf = "000.000.000-00"; // idem

    // Valida aluno
    const response = await fetch(VALIDATION_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, cpf }),
    });

    if (!response.ok) {
      console.log("❌ Aluno não validado.");
      return;
    }

    // Adiciona cargo
    await member.roles.add(STUDENT_ROLE_ID);
    console.log(`✅ Cargo de aluno adicionado para ${member.user.tag}`);

    // Envia mensagem de boas-vindas
    const channel = await member.guild.channels.fetch(CHANNEL_ID);
    if (channel) {
      channel.send(`🎉 Seja bem-vindo(a), ${member}! 💚`);
    }

  } catch (err) {
    console.error("Erro ao adicionar cargo ou mandar mensagem:", err);
  }
});

client.login(DISCORD_BOT_TOKEN);
