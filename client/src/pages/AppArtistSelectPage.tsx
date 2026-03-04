import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AppTopNav } from "@/components/AppTopNav";
import cathyImage from "@assets/image_1769047292790.png";

export default function AppArtistSelectPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#090D16] text-[#F4F7FF] p-6">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#2F63FF]/25 blur-3xl" />
      <div className="pointer-events-none absolute top-12 -right-24 h-80 w-80 rounded-full bg-[#FF4D5E]/20 blur-3xl" />

      <div className="relative max-w-5xl mx-auto">
        <AppTopNav active="artists" />

        <div className="rounded-3xl border border-[#27344D] bg-[#121826] p-7 shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
          <p className="mb-2 text-sm font-semibold tracking-[0.16em] uppercase text-[#94A3B8]">Ha-Ha.ai</p>
          <h1 className="text-4xl font-extrabold leading-tight">Choisis ton humoriste</h1>
          <p className="mt-3 text-[#CBD5E1]">
            Cathy est déjà disponible. Clique sur sa carte pour ouvrir le chat.
          </p>

          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-[#27344D] bg-[#0B1220] overflow-hidden">
              <img src={cathyImage} alt="Cathy Gauthier" className="h-72 w-full object-cover object-top" />
              <div className="p-5">
                <h2 className="text-2xl font-bold">Cathy IA Gauthier</h2>
                <p className="mt-2 text-sm text-[#CBD5E1]">Humour franc, direct et sans filtre.</p>
                <Button asChild className="mt-4 bg-[#FF4D5E] border border-[#FF4D5E] text-white hover:bg-[#ff5e75]">
                  <Link href="/app/chat/cathy-gauthier">Ouvrir le chat</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-[#27344D] bg-[#0B1220]/60 p-6">
              <h3 className="text-xl font-semibold text-[#CBD5E1]">D’autres humoristes arrivent</h3>
              <p className="mt-3 text-sm text-[#94A3B8]">
                Tu pourras en sélectionner plusieurs ici au fur et à mesure des sorties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
