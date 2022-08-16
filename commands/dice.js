const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dice')
    .setDescription('Throw some dice.')
    .addStringOption(option =>
      option.setName('dice')
        .setDescription('Select what amount of dice to throw and their sizes. For example: "1d4" or "2d6 3d20".')
        .setRequired(true)),
  async execute(interaction) {
    const input = interaction.options.getString('dice')
    const splitted = input.split(' ')

    if (splitted.length < 0) {
      await interaction.reply('Please give this command an input. Example: "2d4 3d6"')
      return
    }

    let totalAmount = 0
    let reply = ''
    for (let toss of splitted) {
      let amount = toss.split('d')[0]
      let size = ''
      try {
        size = toss.split('d')[1]
      }
      catch {
        await interaction.reply('Incorrect input.')
        return
      }

      if (checkViability(amount) || checkViability(size)) {
        await interaction.reply('Incorrect input.')
        return
      }

      for (let i = 0; i < amount; i++) {
        reply += `Dice throw #${++totalAmount} (d${size}): ${Math.ceil(Math.random() * size)}\n`
      }
    }

    if (totalAmount > 20) {
      await interaction.reply('Too many throws at once! The maximum amount is 20.')
      return
    }

    await interaction.reply(reply)
  }
}

function checkViability(num) {
  if (isNaN(num) || num.length === 0 || num < 1 || num > 10000) {
    return true
  }
  return false
}