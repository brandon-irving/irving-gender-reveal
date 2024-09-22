import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function useGetUsers(username?: string) {
  const users = useQuery(api.users.getUsers);
  const user = users?.find(
    (user) => user.name.toLocaleLowerCase() === username?.toLocaleLowerCase()
  );

  return { users, user, isLoading: users === undefined };
}
