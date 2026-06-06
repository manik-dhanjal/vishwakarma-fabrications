import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { Placeholder, StatBar, SectionTitle, CtaBand } from "../components/ui";
import site from "../data/site";

const MACHINES = [
  { title: "Slat moulding", tag: "moulding machine" },
  { title: "CNC cutting", tag: "cnc cutting" },
  { title: "Fabrication & welding", tag: "welding" },
];

const card =
  "flex flex-col bg-card border border-line rounded-md overflow-hidden shadow-card transition-[transform,box-shadow] duration-150 hover:-translate-y-[3px] hover:shadow-[0_12px_26px_rgba(30,34,39,0.1)]";

export default function AboutPage() {
  return (
    <Layout>
      <Seo
        title="About  35+ Years Building Shutters in Amroha"
        pathname="/about/"
      />

      <section className="py-14 max-[560px]:py-10">
        <div className="max-w-site mx-auto px-6 text-center flex flex-col items-center gap-[10px]">
          <div className="font-mono text-[12px] font-medium uppercase tracking-[0.24em] text-molten">
            Our story
          </div>
          <h1 className="text-[clamp(30px,5vw,52px)] font-black leading-[1.06] tracking-[-0.8px] max-w-[640px]">
            Building shutters in Amroha for 35+ years.
          </h1>
          <p className="text-steel text-[17px] max-w-[56ch] mb-0">
            A family business, run across three generations.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-site mx-auto px-6 grid grid-cols-2 gap-10 items-center max-[860px]:grid-cols-1">
          <Placeholder label="workshop / founder photo" height={260} />
          <div>
            <p className="text-steel text-[16px]">
              Founded in {site.founded}, our workshop on Joya Road has for more
              than thirty-five years built rolling shutters and gates sized
              exactly to each opening for shopfronts, godowns, factories and
              homes across Amroha and nearby. What began as a small fabrication
              shop is now a trusted local name, run by the second and third
              generation of the same family.
            </p>
            <p className="text-steel text-[16px]">
              We pair that hands-on experience with modern tooling
              state-of-the-art slat moulding and CNC cutting so every shutter is
              accurate, strong and finished to last. We measure, build and fit
              with our own team, and we service what we sell.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-site mx-auto px-6">
          <SectionTitle kicker="Who runs the shop" title="Our owners" />
          <div className="grid gap-4 grid-cols-3 max-[860px]:grid-cols-2 max-[560px]:grid-cols-1">
            {site.owners.map((o) => (
              <div className={card} key={o.name}>
                <Placeholder label="owner photo" height={120} />
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <div className="text-[18px] font-bold">{o.name}</div>
                  <div className="text-steel text-[14px]">{o.role}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-steel text-[16px] max-w-[620px] mt-[18px]">
            The shop is owned and run by Raju Singh Dhanjal and Vikram Singh
            Dhanjal, who lead the team and personally oversee measuring,
            building and fitting so every shutter meets the standard the family
            name has stood for since {site.founded}.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-site mx-auto px-6">
          <StatBar />
        </div>
      </section>

      <section className="py-14 max-[560px]:py-10">
        <div className="max-w-site mx-auto px-6">
          <SectionTitle
            kicker="Our workshop"
            title="Machines that do the work"
          />
          <div className="grid gap-4 grid-cols-3 max-[860px]:grid-cols-2 max-[560px]:grid-cols-1">
            {MACHINES.map((m) => (
              <div className={card} key={m.title}>
                <Placeholder label={m.tag} height={120} />
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <div className="text-[18px] font-bold">{m.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 max-[560px]:py-10">
        <div className="max-w-site mx-auto px-6">
          <CtaBand title="Visit our workshop in Amroha" />
        </div>
      </section>
    </Layout>
  );
}
