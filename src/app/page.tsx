import { ClNavbar } from "@/components/convertlab/cl-navbar";
import { ClHero } from "@/components/convertlab/cl-hero";
import { ClProjects } from "@/components/convertlab/cl-projects";
import { ClHow } from "@/components/convertlab/cl-how";
import { ClDifferential } from "@/components/convertlab/cl-differential";
import { ClFaq } from "@/components/convertlab/cl-faq";
import { ClFooter } from "@/components/convertlab/cl-footer";

export default function Home() {
  return (
    <div className="theme-convertlab flex flex-1 flex-col">
      <ClNavbar />
      <main className="flex-1">
        <ClHero />
        <ClProjects />
        <ClHow />
        <ClDifferential />
        <ClFaq />
      </main>
      <ClFooter />
    </div>
  );
}