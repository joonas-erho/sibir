import { Bot } from './classes/bot'
import { setCommands } from './tools/setCommands'
import { createBot } from './creators/createBot'

// If this file is called with the '[i]nit' argument, also initializes commands.
if (process.argv[2] === 'init') {
  setCommands()
}

const bot: Bot = createBot()
bot.start()