// Environment variables schema
export const envVariables = {
  // MongoDB
  MONGODB_URI: process.env.MONGODB_URI,

  // NextAuth
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,

  // GitHub OAuth
  GITHUB_ID: process.env.GITHUB_ID,
  GITHUB_SECRET: process.env.GITHUB_SECRET,

  // Razorpay
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,

  // YouTube API
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
}

// Validate required environment variables
export function validateEnv() {
  const missingVars = []

  if (!envVariables.MONGODB_URI) missingVars.push("MONGODB_URI")
  if (!envVariables.NEXTAUTH_SECRET) missingVars.push("NEXTAUTH_SECRET")

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(", ")}`)
  }

  return envVariables
}
