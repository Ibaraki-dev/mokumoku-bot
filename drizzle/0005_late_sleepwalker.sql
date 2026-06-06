CREATE TABLE `mokumoku_start_formats` (
	`id` integer PRIMARY KEY NOT NULL,
	`content_template` text NOT NULL,
	`schedule` text NOT NULL,
	`checkin_command` text NOT NULL,
	`checkout_command` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
