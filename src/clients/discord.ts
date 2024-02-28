import {
  RESTPatchAPIChannelMessageFormDataBody,
  RESTPostAPIChannelMessageFormDataBody,
  RESTPostAPIChannelMessageJSONBody,
} from "discord-api-types/v10";
import FormData from "form-data";

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
    body,
  }: { channelId: string; body: RESTPostAPIChannelMessageJSONBody }) {
    const res = await fetch(`${this.BASE_URL}/channels/${channelId}/messages`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: this.config.headers,
    });
    if (!res.ok) {
      throw new Error(
        `Failed to send message: ${res.status} ${res.statusText}`,
      );
    }
  }

  async sendTextFile({
    channelId,
    file,
  }: {
    channelId: string;
    file: {
      content: string;
      name: string;
    };
  }) {
    const form = new FormData();
    form.append(
      "file",
      new Blob([file.content], { type: "text/plain" }),
      file.name,
    );

    const res = await fetch(`${this.BASE_URL}/channels/${channelId}/messages`, {
      method: "POST",
      body: form as unknown as BodyInit,
      headers: {
        Authorization: this.config.headers.Authorization,
      },
    });
    if (!res.ok) {
      throw new Error(
        `Failed to send message: ${res.status} ${res.statusText}`,
      );
    }
  }
}
