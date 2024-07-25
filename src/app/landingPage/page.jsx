import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return (
    <>
      {/*<div className="flex flex-col bg-base-200 min-h-screen">
        <Navbar />*/}
      <main className="flex-grow bg-base-200 p-4">
        <Hero />
      </main>
      {/* <Footer />
      </div>*/}
    </>
  );
}
