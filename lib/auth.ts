import { PrismaAdapter } from "@auth/prisma-adapter"
import type { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { db } from "./db"

// Allow any .edu email
const ALLOW_ANY_EDU = true

// Or whitelist specific domains
const ALLOWED_DOMAINS = [
  "ucla.edu",
  "usc.edu",
  "berkeley.edu",
  "ucsd.edu",
  "ucsb.edu",
  "fullerton.edu",
  "csuf.edu"
]

export function isAllowedEmail(email: string) {
  const domain = email.split("@")[1]?.toLowerCase()
  if (!domain) return false
  if (ALLOW_ANY_EDU && domain.endsWith(".edu")) return true
  return ALLOWED_DOMAINS.includes(domain)
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as any,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST!,
        port: Number(process.env.EMAIL_SERVER_PORT!),
        auth: {
          user: process.env.EMAIL_SERVER_USER!,
          pass: process.env.EMAIL_SERVER_PASSWORD!,
        },
      },
      from: process.env.EMAIL_FROM!,
      async sendVerificationRequest({ identifier, url, provider }) {
        // Block non-.edu before sending emails
        if (!isAllowedEmail(identifier)) {
          throw new Error("Email must be a verified .edu address")
        }

        // Dev mode: no SMTP configured -> just log the magic link
        if (!process.env.EMAIL_SERVER_HOST) {
          console.log("\n🔗 Magic link for", identifier)
          console.log("→", url)
          console.log("(Copy this URL to sign in)\n")
          return
        }

        // Production: send real email via nodemailer
        const { createTransport } = await import("nodemailer")
        const transport = createTransport(provider.server as any)
        await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: "Sign in to Parqlo",
          text: `Sign in to Parqlo: ${url}\n\nThis link will expire soon.`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Sign in to Parqlo</h2>
              <p>Click the button below to sign in to your account:</p>
              <a href="${url}" style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 16px 0;">Sign in</a>
              <p style="color: #666; font-size: 14px;">This link will expire in 24 hours.</p>
              <p style="color: #999; font-size: 12px;">If you didn't request this email, you can safely ignore it.</p>
            </div>
          `,
        })
      },
    }),
  ],
  session: { strategy: "database" },
  pages: {
    signIn: "/signin",
    verifyRequest: "/verify",
    error: "/signin",
  },
  callbacks: {
    async signIn({ user }) {
      // Double-check on callback
      if (!user.email || !isAllowedEmail(user.email)) {
        return false
      }
      return true
    },
  },
}
