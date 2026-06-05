import React from "react";
import Header from "./header";
import Footer from "./footer";

/* Page shell — sticky header + content + footer. */
export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
