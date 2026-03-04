import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

type AppTopNavSection = "artists" | "chat" | "account";

interface AppTopNavProps {
  active: AppTopNavSection;
}

export function AppTopNav({ active }: AppTopNavProps) {
  const { signOut } = useAuth();

  const navClass = (section: AppTopNavSection) =>
    active === section
      ? "bg-[#2F63FF] border-[#2F63FF] text-white hover:bg-[#3A6EFF]"
      : "border-[#27344D] text-[#CBD5E1] hover:bg-[#1A2436]";

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button asChild className={navClass("artists")}>
          <Link href="/app">Humoristes</Link>
        </Button>
        <Button
          asChild
          className={navClass("chat")}
        >
          <Link href="/app/chat/cathy-gauthier">Chat Cathy</Link>
        </Button>
        <Button asChild className={navClass("account")}>
          <Link href="/app/account">Espace utilisateur</Link>
        </Button>
      </div>

      <Button
        variant="outline"
        className="border-[#FF4D5E] text-[#FF4D5E] hover:bg-[#FF4D5E]/10"
        onClick={() => void signOut()}
      >
        Se déconnecter
      </Button>
    </div>
  );
}
