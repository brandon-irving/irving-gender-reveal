import { api } from "@/convex/_generated/api";
import { User } from "@/lib/types";
import { useMutation } from "convex/react";
import { useState } from "react";

export default function useCreateUser(): [
  (user: User) => Promise<void>,
  boolean,
] {
  const [loading, setLoading] = useState(false);
  const createUser = useMutation(api.users.createUser);
  async function handleCreateUser(user: User) {
    setLoading(true);
    await createUser(user);
    setLoading(false);
  }
  return [handleCreateUser, loading];
}
