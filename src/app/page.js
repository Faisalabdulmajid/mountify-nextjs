import HeaderWithNavbar from "@/components/layout/HeaderWithNavbar";
import IntroSection from "@/components/home/IntroSection";
import AnnouncementSection from "@/components/home/AnnouncementSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <HeaderWithNavbar />
      <IntroSection />
      <AnnouncementSection />
      <Footer />
    </>
  );
}
