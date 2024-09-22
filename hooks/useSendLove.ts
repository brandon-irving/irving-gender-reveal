import { api } from "@/convex/_generated/api";
import { User } from "@/lib/types";
import { useMutation } from "convex/react";
import { useState } from "react";

export default function useSendLove(): [
  (user: User, loveCount: number) => Promise<void>,
  boolean,
] {
  const [loading, setLoading] = useState(false);
  const updateUser = useMutation(api.users.updateUser);
  async function sendLove(user: User, loveCount: number) {
    if (!user._id) return;
    setLoading(true);
    await updateUser({ _id: user._id, love: loveCount + user.love });
    setLoading(false);
  }
  return [sendLove, loading];
}
