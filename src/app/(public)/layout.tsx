// src/app/(public)/layout.tsx
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaperBackground from "@/components/PaperBackground";
import { getSettings } from "@/lib/settings";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const s = await getSettings();
  return (
    <>
      <PaperBackground />
      <TopBar />
      <Header siteName={s.siteName} />
      <main className="flex-1">{children}</main>
      <Footer settings={s} />
    </>
  );
}