import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const UsersTable = sqliteTable('users', {
	id: integer('id').primaryKey(), // 'id' is the column name
	fullName: text('full_name'),
});

export const ProjectsTable = sqliteTable('projects', {
	id: integer('id').primaryKey(), // 'id' is the column name
	name: text('name'),
	ownerId: integer('owner_id')
		.notNull()
		.references(() => UsersTable.id),
});
