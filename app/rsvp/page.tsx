import RSVP from "@/components/rsvp";
import Layout from "@/components/ui/layout";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Layout>Loading...</Layout>}>
      <RSVP />
    </Suspense>
  );
}
