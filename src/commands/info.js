const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Information about this server'),
  async execute(interaction) {
    await interaction.reply(`${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`)
  }
}