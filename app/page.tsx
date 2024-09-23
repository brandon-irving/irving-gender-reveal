"use client";
import { LandingPage } from "@/components/landing-page";
import useCreateUser from "@/hooks/useCreateUser";
import useConvexUser from "@/hooks/useUser";
import { useUser } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { user } = useUser();
  const [convexUser, isLoadingC] = useConvexUser();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [handleCreateUser, isCreating] = useCreateUser();
  const router = useRouter();
  async function handleCreateUserAndRedirect(clerkUser: typeof user) {
    if (!clerkUser) return;
    await handleCreateUser({
      clerkId: clerkUser.id,
      avatar: clerkUser.imageUrl,
      love: 0,
      name: clerkUser.username || clerkUser.fullName || "",
    });
  }
  useEffect(() => {
    if (
      isAuthenticated &&
      !isLoading &&
      user &&
      !isLoadingC &&
      !isCreating &&
      convexUser?._id
    ) {
      handleCreateUserAndRedirect(user);
    }
  }, [isLoading, isAuthenticated, user, isLoadingC]);

  if (isLoading || isCreating) return null;
  if (!isAuthenticated) return router.replace("/sign-in");
  return <LandingPage />;
}
