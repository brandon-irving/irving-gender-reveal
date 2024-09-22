import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getNameSuggestions = query({
  handler: async (ctx) => {
    const nameSuggestions = await ctx.db.query("nameSuggestions").collect();
    return nameSuggestions;
  },
});

export const createNameSuggestions = mutation({
  args: {
    userNameWhoSuggested: v.string(),
    suggestion: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.insert("nameSuggestions", {
      ...args,
      love: 0,
    });
    return user;
  },
});
