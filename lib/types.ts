import { Id } from "@/convex/_generated/dataModel";

// type ConvexTypePrimitives = "id" | "creationTime";

// Define the dynamic part separately
// type ConvexFields = {
//   [K in `_${ConvexTypePrimitives}`]?: any;
// };

export type Gender = "Boy" | "Girl";
// Combine the dynamic part with the rest of the object
export type User = {
  _id?: Id<"users">;
  name: string;
  avatar?: string;
  love: number;
  vote?: Gender;
};

export type NameSuggestion = {
  _id?: Id<"nameSuggestions">;
  suggestion: string;
  userNameWhoSuggested: string;
  love: number;
};

export type NameLove = {
  _id?: Id<"nameLoves">;
  nameSuggestionId: string;
  userWhoLoved: string;
};
