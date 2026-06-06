/**
 * Single source of truth for contact details, navigation and social links.
 * Update the placeholder phone / WhatsApp / email / social URLs with the real
 * values before launch. These feed the Header, MobileMenu, Footer and Contact page.
 */
import type { SiteData } from "../types";

const site: SiteData = {
  name: "Vishwakarma Rolling Shutters",
  tagline: "Rolling shutter manufacturers · Amroha",

  // ---- Business ----
  founded: 1990,
  owners: [
    { name: "Vikram Singh Dhanjal", role: "Founder" },
    { name: "Raju Singh Dhanjal", role: "Owner" },
  ],

  // ---- Contact (REPLACE placeholders) ----
  phoneDisplay: "+91 98378 12111",
  phoneHref: "tel:+919837812111",
  whatsappHref: "https://wa.me/919837812111",
  email: "hello@vishwakarmafabrications.in",
  emailHref: "mailto:hello@vishwakarmafabrications.in",

  address: {
    line1: "T.P. Nagar Chowk, Joya Road",
    line2: "Amroha, Uttar Pradesh  244221",
    full: "T.P. Nagar Chowk, Joya Road, Amroha, Uttar Pradesh 244221, India",
    mapHref: "https://maps.app.goo.gl/QLJxFmhgzyLAUDxx9",
    // Replace with a real Google Maps embed src for the contact page iframe.
    mapEmbedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231.96653671313422!2d78.46945250061529!3d28.89409421139377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390b087389d4487b%3A0xb0adf2878233438f!2sVishwakarma%20Agriculture%20Works!5e1!3m2!1sen!2sin!4v1780690070197!5m2!1sen!2sin",
  },
  hours: "Daily · 9am - 7pm",

  // ---- Social (REPLACE / remove what you don't use) ----
  social: {
    instagram: "#",
    facebook: "#",
  },

  // ---- Stats shown on Home / About (REPLACE with real figures) ----
  stats: [
    { value: "35+", label: "years experience" },
    { value: "5000+", label: "shutters built" },
    { value: "1000+", label: "happy customers" },
    { value: "CNC", label: "cutting + moulding" },
  ],

  nav: [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products/" },
    { label: "About", path: "/about/" },
    { label: "Contact", path: "/contact/" },
  ],
};

export default site;
