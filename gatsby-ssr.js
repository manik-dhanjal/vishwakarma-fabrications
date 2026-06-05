import React from "react";

/**
 * Inject Google Fonts (Archivo + JetBrains Mono) into <head> for every page.
 * Swap to self-hosted @fontsource later if you want zero third-party requests.
 */
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link key="gf-pre1" rel="preconnect" href="https://fonts.googleapis.com" />,
    <link
      key="gf-pre2"
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />,
    <link
      key="gf-css"
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
    />,
  ]);
};
