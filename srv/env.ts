export const env = {
  secret: process.env.APP_SECRET || 'secret',
  events: {
    db: process.env.EVENTS_HOST || 'events.sqlite',
  },
}
