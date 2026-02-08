import { MongoClient, Db } from "mongodb"

const MONGODB_URI = process.env.DATABASE_URL

if (!MONGODB_URI) {
  throw new Error("Please add your MongoDB connection string as DATABASE_URL")
}

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  try {
    const client = new MongoClient(MONGODB_URI, {
      retryWrites: true,
      w: "majority",
    })

    await client.connect()
    const db = client.db("campusflow")

    cachedClient = client
    cachedDb = db

    console.log("[v0] Connected to MongoDB")
    return { client, db }
  } catch (error) {
    console.error("[v0] MongoDB connection error:", error)
    throw error
  }
}

export async function getDatabase() {
  const { db } = await connectToDatabase()
  return db
}
