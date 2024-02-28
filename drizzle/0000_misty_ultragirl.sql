CREATE TABLE `checkins` (
	`id` integer PRIMARY KEY NOT NULL,
	`date` text DEFAULT CURRENT_DATE,
	`user_id` integer NOT NULL,
	`profile` text NOT NULL,
	`todo` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`discord_user_id` text NOT NULL,
	`name` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE INDEX `userId_idx` ON `checkins` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_discord_user_id_unique` ON `users` (`discord_user_id`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `users` (`name`);--> statement-breakpoint
CREATE INDEX `discordUserId_idx` ON `users` (`discord_user_id`);
