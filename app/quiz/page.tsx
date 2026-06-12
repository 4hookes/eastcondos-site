"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// The readiness quiz is retired — the Safety Meter does this job with real
// numbers. Route kept so old links and bookmarks land somewhere useful.
export default function QuizPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/safety-meter");
  }, [router]);

  return null;
}
