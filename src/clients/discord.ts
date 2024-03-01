export class DiscordClient {
  private BASE_URL = "https://discord.com/api/v10/";
  private config: { headers: Record<string, string> };

  constructor(botToken: string) {
    this.config = {
      headers: {
        Authorization: `Bot ${botToken}`,
        "Content-Type": "application/json",
      },
    };
  }

  async sendMessage({
    channelId,
    content,
  }: { channelId: string; content: string }) {
    await fetch(`${this.BASE_URL}/channels/${channelId}/messages`, {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: this.config.headers,
    });
  }
}
