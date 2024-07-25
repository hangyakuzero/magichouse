import React from "react";
import Hero from "@/components/Hero";
import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/landingPage");
  return (
    <>
      <LoginForm />
      {/*<div className="bg-base-200">
        <Hero />
      </div>*/}
    </>
  );
}
