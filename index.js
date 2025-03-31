require("dotenv").config();
const { Client, GatewayIntentBits, Partials } = require("discord.js");

// Inicializa o bot com todas as intents necessárias
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers, // <- essa aqui precisa MESMO
    GatewayIntentBits.GuildMessages
  ],
  partials: [Partials.GuildMember]
});

const token = process.env.DISCORD_BOT_TOKEN;

client.once("ready", () => {
  console.log(`✅ Bot online como ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  try {
    console.log(`👤 Novo membro: ${member.user.tag}`);
    
    const canal = member.guild.systemChannel;
    if (canal) {
      canal.send(`Seja bem-vindo, ${member.user.toString()}! 💚`);
    }

    // Simulação (remova essa parte se já tiver a API funcionando)
    // await member.roles.add("ID_DO_CARGO");

  } catch (err) {
    console.error("Erro ao adicionar cargo ou enviar mensagem:", err);
  }
});

client.login(token);
