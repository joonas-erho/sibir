const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Makes the bot join the current voice channel.'),
  async execute(interaction) {
    await interaction.reply('Command works properly')
  }
}