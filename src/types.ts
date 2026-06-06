import type { ConnpassClient } from "./clients/connpass";
import type { DiscordClient } from "./clients/discord";
import type { CheckinsRepository } from "./repositories/checkinsRepository";
import type { CheckoutsRepository } from "./repositories/checkout";
import type { EventsRepository } from "./repositories/eventsRepository";
import type { EventsToCheckinsRepository } from "./repositories/eventsToCheckinsRepository";
import type { MokumokuStartFormatsRepository } from "./repositories/mokumokuStartFormatsRepository";
import type { TechTalkSpeakersRepository } from "./repositories/techTalkSpeakersRepository";
import type { UsersRepository } from "./repositories/usersRepository";

export type Repositories = {
  usersRepository: UsersRepository;
  checkinsRepository: CheckinsRepository;
  eventsRepository: EventsRepository;
  eventsToCheckinsRepository: EventsToCheckinsRepository;
  checkoutsRepository: CheckoutsRepository;
  mokumokuStartFormatsRepository: MokumokuStartFormatsRepository;
  techTalkSpeakersRepository: TechTalkSpeakersRepository;
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
