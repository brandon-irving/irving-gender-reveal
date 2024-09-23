import { api } from "@/convex/_generated/api";
import { User } from "@/lib/types";
import { useClerk } from "@clerk/clerk-react";
import { useQuery } from "convex/react";

export default function useUser(): [User | undefined | null, boolean] {
  const { user, loaded } = useClerk();
  const mainUser = useQuery(api.users.getUser, { clerkId: user?.id || "" });
  return [mainUser, !loaded];
}
