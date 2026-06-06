import React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { Placeholder, StatBar, SectionTitle, CtaBand } from "../components/ui";
import site from "../data/site";

const MACHINES = [
  { title: "Slat moulding", tag: "moulding machine" },
  { title: "CNC cutting", tag: "cnc cutting" },
  { title: "Fabrication & welding", tag: "welding" },
];

export default function AboutPage() {
  return (
    <Layout>
      <Seo
        title="About  35+ Years Building Shutters in Amroha"
        pathname="/about/"
      />

      <section className="section">
        <div
          className="container center"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div className="eyebrow">Our story</div>
          <h1 className="h1" style={{ maxWidth: 640 }}>
            Building shutters in Amroha for 35+ years.
          </h1>
          <p className="lead" style={{ color: "var(--steel)" }}>
            A family business, run across three generations.
          </p>
        </div>
      </section>

      <section className="section--tight">
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
            alignItems: "center",
          }}
        >
          <Placeholder label="workshop / founder photo" height={260} />
          <div>
            <p style={{ color: "var(--steel)", fontSize: 16 }}>
              Founded in {site.founded}, our workshop on Joya Road has for more
              than thirty-five years built rolling shutters and gates sized
              exactly to each opening for shopfronts, godowns, factories and
              homes across Amroha and nearby. What began as a small fabrication
              shop is now a trusted local name, run by the second and third
              generation of the same family.
            </p>
            <p style={{ color: "var(--steel)", fontSize: 16 }}>
              We pair that hands-on experience with modern tooling
              state-of-the-art slat moulding and CNC cutting so every shutter is
              accurate, strong and finished to last. We measure, build and fit
              with our own team, and we service what we sell.
            </p>
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <SectionTitle kicker="Who runs the shop" title="Our owners" />
          <div className="grid grid--3">
            {site.owners.map((o) => (
              <div className="pcard" key={o.name}>
                <Placeholder label="owner photo" height={120} />
                <div className="pcard__body">
                  <div className="pcard__title">{o.name}</div>
                  <div style={{ color: "var(--steel)", fontSize: 14 }}>
                    {o.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p
            style={{
              color: "var(--steel)",
              fontSize: 16,
              maxWidth: 620,
              marginTop: 18,
            }}
          >
            The shop is owned and run by Raju Singh Dhanjal and Vikram Singh
            Dhanjal, who lead the team and personally oversee measuring,
            building and fitting so every shutter meets the standard the family
            name has stood for since {site.founded}.
          </p>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <StatBar />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            kicker="Our workshop"
            title="Machines that do the work"
          />
          <div className="grid grid--3">
            {MACHINES.map((m) => (
              <div className="pcard" key={m.title}>
                <Placeholder label={m.tag} height={120} />
                <div className="pcard__body">
                  <div className="pcard__title">{m.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <CtaBand title="Visit our workshop in Amroha" />
        </div>
      </section>
    </Layout>
  );
}
