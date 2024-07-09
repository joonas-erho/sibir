import { SlashCommandBuilder } from "discord.js"

export class Command {
  constructor(
    name: string,
    execute: Function,
    slashCommand: SlashCommandBuilder
  ) {}
}