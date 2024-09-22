type ConvexTypePrimitives = "id" | "creationTime";

// Define the dynamic part separately
type ConvexFields = {
  [K in `_${ConvexTypePrimitives}`]?: any;
};

export type Gender = "Boy" | "Girl";
// Combine the dynamic part with the rest of the object
export type User = {
  name: string;
  avatar?: string;
  love: number;
  vote?: Gender;
} & ConvexFields;

export type NameSuggestion = {
  suggestion: string;
  userNameWhoSuggested: string;
  love: number;
} & ConvexFields;

export type NameLove = {
  nameSuggestionId: string;
  userWhoLoved: string;
} & ConvexFields;
