import { Command } from "../interfaces/command"
import { CommandInteraction, SlashCommandBuilder } from "discord.js"

export const command = new Command(
  'info',
  async function test(i: CommandInteraction) {
    await i.reply(`${i.guild!.name}\nTotal members: ${i.guild!.memberCount}`)
  },
  new SlashCommandBuilder()
    .setName('info')
    .setDescription('Information about this server')
)