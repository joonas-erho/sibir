require('dotenv').config()

const fs = require('fs')
const path = require('path')

const { SlashCommandBuilder, Collection, Routes } = require('discord.js')
const { REST } = require('@discordjs/rest')

const commandsPath = path.join(__dirname, 'commands')

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

const commands = []
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command = require(filePath)

  commands.push(command.data.toJSON())
}

const rest = new REST({version: '10' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.APP_ID, process.env.GUILD_ID), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error)