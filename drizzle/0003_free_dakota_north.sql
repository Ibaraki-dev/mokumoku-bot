CREATE TABLE `events_to_checkins` (
	`event_id` integer NOT NULL,
	`checkin_id` integer NOT NULL,
	PRIMARY KEY(`checkin_id`, `event_id`),
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`checkin_id`) REFERENCES `checkins`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP TABLE `events_to_checkin`;