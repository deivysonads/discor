# 🤖 Bot Validador de Alunos

Este é um bot para Discord que dá automaticamente o cargo de **Aluno** para novos membros, envia uma **mensagem de boas-vindas** e pode ser integrado com uma **API de validação** por CPF e e-mail.

---

## 🚀 Funcionalidades

- Detecta quando alguém entra no servidor
- Envia uma mensagem personalizada de boas-vindas
- Adiciona automaticamente um cargo (ex: `Aluno`)
- Pronto para integrar com API de validação externa

---

## 🧩 Variáveis de ambiente (Railway)

Você precisa configurar estas variáveis na aba **Variables** do Railway:

| Variável                      | Descrição                                 |
|------------------------------|-------------------------------------------|
| `DISCORD_BOT_TOKEN`          | Token do seu bot (gerado no Dev Portal)   |
| `DISCORD_GUILD_ID`           | ID do seu servidor no Discord             |
| `DISCORD_ROLE_ID`            | ID do cargo que será adicionado ao aluno  |
| `DISCORD_WELCOME_CHANNEL_ID` | ID do canal onde vai mandar a mensagem    |
| `VALIDATION_API_URL` _(opcional)_ | URL da API de validação de aluno   |

---

## 🛠 Permissões necessárias no bot

Quando adicionar o bot ao seu servidor, ele deve ter essas permissões:

- ✅ Gerenciar Cargos
- ✅ Ver Canais
- ✅ Enviar Mensagens
- ✅ Ler Histórico de Mensagens

Além disso, **o cargo do bot precisa estar acima do cargo que ele vai atribuir**.

---

## 💡 Exemplo de mensagem enviada

```
👋 Seja bem-vindo, @usuario! 💚
```

Você pode personalizar o conteúdo da mensagem no código.

---

## 🧠 Integração com API de validação

Você pode usar a variável `VALIDATION_API_URL` para conectar com seu backend e verificar CPF + email antes de liberar o cargo.

Exemplo esperado da API:

```json
POST /validar-aluno
{
  "email": "aluno@email.com",
  "cpf": "000.000.000-00"
}
```

A API deve retornar status `200` se o aluno for válido.

---

## 📦 Instalar localmente (opcional)

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
npm install
npm start
```

---

## 🙌 Feito por

Desenvolvido por [@deivyson.emp](https://instagram.com/deivyson.emp) 🚀  
Bot 100% integrado com WordPress, Supabase, Discord e +
