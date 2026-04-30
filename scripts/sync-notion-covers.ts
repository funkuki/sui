import { config } from 'dotenv'
config({ path: '.env.local' })

import { syncAllCovers } from '../lib/sync-notion-covers'

syncAllCovers(console.log).catch((e) => {
  console.error(e)
  process.exit(1)
})
