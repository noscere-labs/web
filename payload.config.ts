import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";

// Import collections
import { Categories } from "./src/collections/Categories";
import { Media } from "./src/collections/Media";
import { Pages } from "./src/collections/Pages";
import { Posts } from "./src/collections/Posts";
import { Services } from "./src/collections/Services";
import { Tags } from "./src/collections/Tags";
import { Team } from "./src/collections/Team";
import { Users } from "./src/collections/Users";

// Import globals
import { Settings } from "./src/globals/Settings";

export default buildConfig({
  admin: {
    user: "users",
    meta: {
      titleSuffix: "- Noscere CMS",
    },
  },
  collections: [Users, Media, Services, Posts, Categories, Tags, Pages, Team],
  globals: [Settings],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || "your-secret-key",
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL,
    },
  }),
  cors: [
    "http://localhost:3000",
    process.env.NEXT_PUBLIC_SERVER_URL || "",
  ].filter(Boolean),
  csrf: [
    "http://localhost:3000",
    process.env.NEXT_PUBLIC_SERVER_URL || "",
  ].filter(Boolean),
});
