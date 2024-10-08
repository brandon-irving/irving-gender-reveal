import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getRsvp = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const currentRsvp = await ctx.db
      .query("rsvp")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    return currentRsvp;
  },
});

export const addRsvp = mutation({
  args: {
    response: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const currentRsvp = await ctx.db
      .query("rsvp")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (currentRsvp && !currentRsvp.name && args.name) {
      await ctx.db.patch(currentRsvp._id, { name: args.name });
    } else if (!currentRsvp) {
      await ctx.db.insert("rsvp", {
        response: args.response,
        email: args.email,
        name: args.name,
      });
    }
  },
});
export const updateRsvp = mutation({
  args: {
    response: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const currentRsvp = await ctx.db
      .query("rsvp")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
    if (currentRsvp) {
      await ctx.db.patch(currentRsvp._id, args);
    }
  },
});
