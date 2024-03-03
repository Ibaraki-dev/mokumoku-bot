import { ConnpassClient } from "./clients/connpass";
import { DiscordClient } from "./clients/discord";
import { CheckinsRepository } from "./repositories/checkinsRepository";
import { EventsRepository } from "./repositories/eventsRepository";
import { EventsToCheckinsRepository } from "./repositories/eventsToCheckinsRepository";
import { UsersRepository } from "./repositories/usersRepository";

export type Repositories = {
  usersRepository: UsersRepository;
  checkinsRepository: CheckinsRepository;
  eventsRepository: EventsRepository;
  eventsToCheckinsRepository: EventsToCheckinsRepository;
};

export type Clients = {
  discordClient: DiscordClient;
  connpassClient: ConnpassClient;
};

export type Bindings = {
  DB: D1Database;
  DISCORD_TOKEN: string;
  MOKUMOKU_CHANNEL_ID: string;
};
