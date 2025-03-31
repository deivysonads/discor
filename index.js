require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const token = process.env.DISCORD_BOT_TOKEN;
const roleId = process.env.DISCORD_STUDENT_ROLE_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers, // isso é essencial pra ver quem entra
  ]
});

client.once("ready", () => {
  console.log(`✅ Bot online como ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  try {
    const role = member.guild.roles.cache.get(roleId);
    if (!role) return console.log("❌ Cargo não encontrado!");

    await member.roles.add(role);
    console.log(`✅ Cargo de aluno adicionado para ${member.user.tag}`);
  } catch (err) {
    console.error("Erro ao adicionar cargo:", err);
  }
});

client.login(token);
