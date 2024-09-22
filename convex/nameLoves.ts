import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getNameLoves = query({
  handler: async (ctx) => {
    const nameSuggestions = await ctx.db.query("nameLoves").collect();
    return nameSuggestions;
  },
});

export const createNameLove = mutation({
  args: {
    userWhoLoved: v.string(),
    nameSuggestionId: v.string(),
  },
  handler: async (ctx, args) => {
    const namesLovedByUser = await ctx.db
      .query("nameLoves")
      .filter((q) => q.eq(q.field("userWhoLoved"), args.userWhoLoved))
      .collect();
    const isLovedAlready = namesLovedByUser.find(
      (n) => n.nameSuggestionId === args.nameSuggestionId
    );

    if (!isLovedAlready?._id) {
      await ctx.db.insert("nameLoves", args);
    } else {
      await ctx.db.delete(isLovedAlready._id);
    }
    return true;
  },
});
