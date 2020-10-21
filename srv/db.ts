import * as knex from 'knex'
import { env } from './env'
import { migrate } from 'evtstore/provider/knex'

export { db }

const db = knex({
  client: 'sqlite3',
  connection: env.events.db,
})

export const schema = {
  events: db.table('events'),
  bookmarks: db.table('bookmarks'),
}

export async function migrateEvents() {
  await migrate({
    client: db,
    events: 'events',
    bookmarks: 'bookmarks',
  })
}
