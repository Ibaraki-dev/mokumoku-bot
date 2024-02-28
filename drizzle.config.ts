import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./drizzle",
  driver: "d1",
  dbCredentials: {
    wranglerConfigPath: "wrangler.toml",
    dbName: "prod-mokumoku-bot",
  },
})
