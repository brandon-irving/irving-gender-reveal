import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function useGetNameLoves() {
  const nameLoves = useQuery(api.nameLoves.getNameLoves);

  return { nameLoves, isLoading: nameLoves === undefined };
}
