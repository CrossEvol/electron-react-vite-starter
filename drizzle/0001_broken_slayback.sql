CREATE TABLE `comments` (
	`id` integer PRIMARY KEY NOT NULL,
	`text` text,
	`post_id` integer NOT NULL,
	FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text,
	`content` text
);
--> statement-breakpoint
DROP TABLE `projects`;--> statement-breakpoint
DROP TABLE `users`;