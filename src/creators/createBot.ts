import { Bot } from '../classes/bot'
import { Command } from '../interfaces/command'

import * as fs from 'fs'
import * as url from 'url'
import * as path from 'path'

import { Client, GatewayIntentBits } from 'discord.js'

import { createRequire } from "module"
const require = createRequire(import.meta.url)
const { TOKEN } = require('../../config.json')

export function createBot(): Bot {
  const bot = new Bot(TOKEN, createClient(), createCommands())
  return bot
}

function createClient(): Client {
  const client: Client = new Client({
    intents: [GatewayIntentBits.Guilds]
  })

  return client
}

function createCommands(): Command[] {
  const commands: Command[] = []

  const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
  const commandsPath = path.join(__dirname, '../commands')
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'))

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const commandFile = require(filePath)
    
    const command: Command = {
      name: commandFile.data.name,
      execute: commandFile.data.execute
    }

    commands.push(command)
  }

  return commands
}