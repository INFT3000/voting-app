import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// A faulty API route to test Sentry's error monitoring
export function GET(): never {
  throw new Error("Oh no an error in Next backend 😭😭");
  // return NextResponse.json({ data: "Testing Sentry Error..." });
}
