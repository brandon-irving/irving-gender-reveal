import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";

export default function useAddNameSuggestion(): [
  (nameSuggestion: {
    suggestion: string;
    userNameWhoSuggested: string;
  }) => Promise<void>,
  boolean,
] {
  const [loading, setLoading] = useState(false);
  const createNameSuggestions = useMutation(
    api.nameSuggestions.createNameSuggestions
  );
  async function addNameSuggestion(nameSuggestion: {
    suggestion: string;
    userNameWhoSuggested: string;
  }) {
    setLoading(true);
    await createNameSuggestions(nameSuggestion);
    setLoading(false);
  }
  return [addNameSuggestion, loading];
}
