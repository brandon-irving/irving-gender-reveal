import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUser = query({
  args: {
    clerkId: v.string(),
  },

  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();
    return user;
  },
});
export const getUsers = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users;
  },
});

export const createUser = mutation({
  args: {
    clerkId: v.string(),
    avatar: v.optional(v.string()),
    name: v.string(),
    love: v.number(),
  },
  handler: async (ctx, args) => {
    const isALreadyUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .collect();
    if (isALreadyUser.length) return isALreadyUser[0];
    const user = await ctx.db.insert("users", args);
    return user;
  },
});

export const updateUser = mutation({
  args: {
    love: v.optional(v.number()),
    avatar: v.optional(v.string()),
    vote: v.optional(v.union(v.literal("Boy"), v.literal("Girl"))),
    name: v.optional(v.string()),
    _id: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.patch(args._id, args);
    return user;
  },
});
