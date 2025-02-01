CREATE TABLE `checkouts` (
	`id` integer PRIMARY KEY NOT NULL,
	`date` text DEFAULT CURRENT_DATE,
	`user_id` integer NOT NULL,
	`content` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `checkouts_userId_idx` ON `checkouts` (`user_id`);