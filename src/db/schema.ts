import { integer, pgTable, pgSchema, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const comment = pgTable('comment', {
  id: serial('comment_id').primaryKey(),
  parentId: integer('parent_comment_id').references(() => comment.id),
  page: text('page').notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  message: text('message').notNull(),
});

export type InsertComment = typeof comment.$inferInsert
