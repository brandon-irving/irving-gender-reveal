import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function useGetNameSuggestions() {
  const nameSuggestions = useQuery(api.nameSuggestions.getNameSuggestions);
  return {
    nameSuggestions,
    isLoadingNameSuggestions: nameSuggestions === undefined,
  };
}
