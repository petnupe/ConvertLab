import { ClNavbar } from "@/components/convertscale/cl-navbar";
import { ClHero } from "@/components/convertscale/cl-hero";
import { ClProjects } from "@/components/convertscale/cl-projects";
import { ClHow } from "@/components/convertscale/cl-how";
import { ClDifferential } from "@/components/convertscale/cl-differential";
import { ClFaq } from "@/components/convertscale/cl-faq";
import { ClFooter } from "@/components/convertscale/cl-footer";

export default function Home() {
  return (
    <div className="theme-convertscale flex flex-1 flex-col">
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