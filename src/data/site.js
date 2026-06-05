/**
 * Single source of truth for contact details, navigation and social links.
 * Update the placeholder phone / WhatsApp / email / social URLs with the real
 * values before launch. These feed the Header, MobileMenu, Footer and Contact page.
 */
const site = {
  name: "Vishwakarma Fabrications",
  tagline: "Rolling shutter manufacturers · Amroha",

  // ---- Contact (REPLACE placeholders) ----
  phoneDisplay: "+91 XXXXX XXXXX",
  phoneHref: "tel:+910000000000",
  whatsappHref: "https://wa.me/910000000000",
  email: "hello@vishwakarmafabrications.in",
  emailHref: "mailto:hello@vishwakarmafabrications.in",

  address: {
    line1: "T.P. Nagar Churaha, Joya Road",
    line2: "Amroha, Uttar Pradesh — 244221",
    full: "T.P. Nagar Churaha, Joya Road, Amroha, Uttar Pradesh 244221, India",
    mapHref: "https://maps.google.com/?q=Vishwakarma+Fabrications+Amroha",
    // Replace with a real Google Maps embed src for the contact page iframe.
    mapEmbedSrc: "",
  },
  hours: "Mon–Sat · 9am – 7pm",

  // ---- Social (REPLACE / remove what you don't use) ----
  social: {
    instagram: "#",
    facebook: "#",
  },

  // ---- Stats shown on Home / About (REPLACE with real figures) ----
  stats: [
    { value: "30+", label: "years experience" },
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

module.exports = site;
