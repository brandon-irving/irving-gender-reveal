import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";

export default function useLoveName(): [
  (nameSuggestionId: string, userWhoLoved: string) => Promise<void>,
  boolean,
] {
  const [isLovingName, setIsLovingName] = useState(false);
  const createNameLove = useMutation(api.nameLoves.createNameLove);
  async function loveName(nameSuggestionId: string, userWhoLoved: string) {
    setIsLovingName(true);
    await createNameLove({
      nameSuggestionId,
      userWhoLoved,
    });
    setIsLovingName(false);
  }
  return [loveName, isLovingName];
}
