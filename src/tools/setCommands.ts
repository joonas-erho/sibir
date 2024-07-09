// Node tools
import * as fs from 'fs'
import * as url from 'url'
import * as path from 'path'

import { Routes } from 'discord.js'
import { REST } from '@discordjs/rest'

import { createRequire } from "module"
const require = createRequire(import.meta.url)
const { TOKEN, APP_ID, GUILD_ID } = require('../../config.json')

export function setCommands() {
  // Get command files.
  const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
  const commandsPath = path.join(__dirname, '../commands')
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'))

  // Push command data to array.
  const commands = []
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)

    commands.push(command.data.toJSON())
  }

  // Push the commands through Discord's API.
  const rest = new REST({ version: '10' }).setToken(TOKEN);
  rest.put(Routes.applicationGuildCommands(APP_ID, GUILD_ID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error)
}