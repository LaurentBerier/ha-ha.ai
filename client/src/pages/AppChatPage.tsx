import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AppTopNav } from "@/components/AppTopNav";
import { ChatSimulation } from "@/components/ChatSimulation";

export default function AppChatPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#090D16] text-[#F4F7FF] p-6">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#2F63FF]/25 blur-3xl" />
      <div className="pointer-events-none absolute top-12 -right-24 h-80 w-80 rounded-full bg-[#FF4D5E]/20 blur-3xl" />

      <div className="relative max-w-5xl mx-auto">
        <AppTopNav active="chat" />

        <div className="rounded-3xl border border-[#27344D] bg-[#121826] p-7 shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold tracking-[0.16em] uppercase text-[#94A3B8]">Cathy IA Gauthier</p>
              <h1 className="text-3xl font-extrabold leading-tight">Chat</h1>
            </div>
            <Button asChild variant="outline" className="border-[#27344D] text-[#CBD5E1] hover:bg-[#1A2436]">
              <Link href="/app">Changer d’humoriste</Link>
            </Button>
          </div>

          <div className="h-[640px] rounded-2xl border border-[#27344D] overflow-hidden">
            <ChatSimulation language="fr" />
          </div>
        </div>
      </div>
    </div>
  );
}
