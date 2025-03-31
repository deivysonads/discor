require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const fetch = require("node-fetch");

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = process.env.DISCORD_GUILD_ID;
const CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;
const STUDENT_ROLE_ID = process.env.DISCORD_STUDENT_ROLE_ID;
const VALIDATION_API_URL = process.env.VALIDATION_API_URL; // agora é variável também

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages
  ]
});

client.once("ready", () => {
  console.log(`🤖 Bot logado como ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  try {
    // email do usuário não vem no Discord por padrão (precisa de OAuth), então você pode usar um fixo
    const email = "aluno@dominio.com"; // placeholder
    const cpf = "000.000.000-00";      // placeholder

    const response = await fetch(VALIDATION_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, cpf }),
    });

    if (!response.ok) {
      console.log("❌ Aluno não validado.");
      return;
    }

    await member.roles.add(STUDENT_ROLE_ID);
    console.log(`✅ Cargo de aluno adicionado para ${member.user.tag}`);
  } catch (err) {
    console.error("Erro ao adicionar cargo:", err);
  }
});

client.login(DISCORD_BOT_TOKEN);
