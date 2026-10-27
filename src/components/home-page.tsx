import { CredibilityStage } from "@/components/credibility-stage";
import { HeroSequence } from "@/components/hero-sequence";
import { LoadingScreen } from "@/components/loading-screen";
import { PolychromosTunnel } from "@/components/polychromos-tunnel";
import { ProjectsInMotion } from "@/components/projects-in-motion";
import { ServicesProof } from "@/components/services-proof";
import { SmoothScroll } from "@/components/smooth-scroll";

export function HomePage() {
  return (
    <>
      <LoadingScreen />
      <SmoothScroll />
      <main className="pt-16 lg:pt-20">
        <HeroSequence />
        <ProjectsInMotion />
        <PolychromosTunnel />
        <ServicesProof />
        <CredibilityStage />
      </main>
    </>
  );
}
