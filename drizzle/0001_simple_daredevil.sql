CREATE TABLE `coverage_gaps` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`run_id` text NOT NULL,
	`dimension` text NOT NULL,
	`scope` text NOT NULL,
	`reason` text NOT NULL,
	`impact` text NOT NULL,
	`manual_task` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `discovery_runs` (
	`id` text PRIMARY KEY NOT NULL,
	`actor` text DEFAULT '' NOT NULL,
	`editorial_brief` text DEFAULT '' NOT NULL,
	`status` text NOT NULL,
	`candidate_count` integer DEFAULT 0 NOT NULL,
	`recommended_count` integer DEFAULT 0 NOT NULL,
	`started_at` text NOT NULL,
	`completed_at` text
);
--> statement-breakpoint
CREATE TABLE `evidence_items` (
	`id` text PRIMARY KEY NOT NULL,
	`run_id` text NOT NULL,
	`provider` text NOT NULL,
	`dataset` text NOT NULL,
	`source_type` text NOT NULL,
	`author` text DEFAULT '' NOT NULL,
	`url` text NOT NULL,
	`title` text NOT NULL,
	`excerpt` text DEFAULT '' NOT NULL,
	`published_at` text NOT NULL,
	`captured_at` text NOT NULL,
	`engagement_json` text DEFAULT '{}' NOT NULL,
	`content_hash` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `provider_attempts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`run_id` text NOT NULL,
	`provider` text NOT NULL,
	`outcome` text NOT NULL,
	`item_count` integer DEFAULT 0 NOT NULL,
	`reason` text DEFAULT '' NOT NULL,
	`started_at` text NOT NULL,
	`ended_at` text NOT NULL
);
