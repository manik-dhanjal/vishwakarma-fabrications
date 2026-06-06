import * as React from "react";
import type { GatsbySSR } from "gatsby";

/**
 * Inject the favicon and Google Fonts (Archivo + JetBrains Mono) into <head>
 * for every page. Swap fonts to self-hosted @fontsource later if you want zero
 * third-party requests.
 */
export const onRenderBody: GatsbySSR["onRenderBody"] = ({
  setHeadComponents,
}) => {
  setHeadComponents([
    <link key="favicon" rel="icon" type="image/svg+xml" href="/favicon.svg" />,
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

/**
 * Google Consent Mode v2: default analytics (and ads) storage to "denied" so
 * gtag withholds cookies/data until the visitor accepts via the consent banner.
 * Must run BEFORE gatsby-plugin-google-gtag's config script, so we prepend it
 * to the head. Only injected when GA is configured.
 */
const consentDefaultScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{
  ad_storage:'denied',
  ad_user_data:'denied',
  ad_personalization:'denied',
  analytics_storage:'denied',
  wait_for_update:500
});
try{if(localStorage.getItem('va_consent')==='granted'){gtag('consent','update',{analytics_storage:'granted'});}}catch(e){}
`.trim();

export const onPreRenderHTML: GatsbySSR["onPreRenderHTML"] = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  if (!process.env.GATSBY_GA_MEASUREMENT_ID) return;
  const head = getHeadComponents();
  replaceHeadComponents([
    <script
      key="consent-default"
      dangerouslySetInnerHTML={{ __html: consentDefaultScript }}
    />,
    ...head,
  ]);
};
