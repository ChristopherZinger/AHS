import { createClient } from 'redis'

export const redis = createClient({
  url: 'redis://:secret@localhost:6379'
})

redis.on('error', (err) => console.log('Redis connection error', err))

redis.connect().then(async () => {
  console.log('connected to redis')
})
