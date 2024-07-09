import { Command } from '../interfaces/command'

import { Client, Interaction } from 'discord.js'

export class Bot {
  constructor(
    private token: string,
    private client: Client,
    private commands: Command[],
  ) {}

  public async start(): Promise<void> {
    this.registerListeners()
    try {
      await this.client.login(this.token)
    } catch (e) {
      console.log(e)
      return
    }

    console.log(this.commands)
  }

  private registerListeners(): void {
    const c = this.client

    c.on('ready', () => this.onReady())
    c.on('interactionCreate', (i: Interaction) => this.onInteractionCreate(i))
  }

  private onReady(): void {
    console.log('Ready!')
  }

  private async onInteractionCreate(i: Interaction): Promise<void> {
    if (!i.isChatInputCommand()) {
      return
    }

    
  }
}