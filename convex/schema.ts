import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export const userSchema = {
  clerkId: v.string(),
  name: v.string(),
  love: v.number(),
  vote: v.optional(v.union(v.literal("Boy"), v.literal("Girl"))),
  avatar: v.optional(v.string()),
};
export default defineSchema({
  users: defineTable(userSchema).index("by_love", ["love"]),

  nameSuggestions: defineTable({
    suggestion: v.string(),
    userNameWhoSuggested: v.string(),
    love: v.number(),
  }),

  nameLoves: defineTable({
    nameSuggestionId: v.string(),
    userWhoLoved: v.string(),
  }).index("userWhoLoved", ["userWhoLoved"]),

  rsvp: defineTable({
    response: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
  }).index("by_email", ["email"]),
});
