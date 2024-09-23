import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function useGetUsers(clerkId?: string) {
  const users = useQuery(api.users.getUsers);
  const user = users?.find(
    (user) => user.clerkId.toLocaleLowerCase() === clerkId?.toLocaleLowerCase()
  );

  return { users, user, isLoading: users === undefined };
}
