import * as React from "react";
import Header from "./header";
import Footer from "./footer";
import ConsentBanner from "./consent-banner";

interface LayoutProps {
  children: React.ReactNode;
}

// Only show the consent banner when analytics is actually configured.
const analyticsEnabled = Boolean(process.env.GATSBY_GA_MEASUREMENT_ID);

/* Page shell  sticky header + content + footer. */
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      {analyticsEnabled && <ConsentBanner />}
    </>
  );
}
