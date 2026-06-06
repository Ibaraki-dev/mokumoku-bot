CREATE TABLE `tech_talk_speakers` (
	`id` integer PRIMARY KEY NOT NULL,
	`message_id` text NOT NULL,
	`discord_user_id` text NOT NULL,
	`display_name` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE INDEX `tech_talk_speakers_message_id_idx` ON `tech_talk_speakers` (`message_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `tech_talk_speakers_message_user_unique_idx` ON `tech_talk_speakers` (`message_id`,`discord_user_id`);