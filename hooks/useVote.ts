import { api } from "@/convex/_generated/api";
import { Gender, User } from "@/lib/types";
import { useMutation } from "convex/react";
import { useState } from "react";

export default function useVote(): [
  (user: User, vote: Gender) => Promise<void>,
  boolean,
] {
  const [loading, setLoading] = useState(false);
  const updateUser = useMutation(api.users.updateUser);

  async function vote(user: User, vote: Gender) {
    setLoading(true);
    await updateUser({ _id: user._id, vote });
    setLoading(false);
  }
  return [vote, loading];
}
