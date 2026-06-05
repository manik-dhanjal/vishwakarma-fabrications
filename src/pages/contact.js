import React, { useState } from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { Placeholder } from "../components/ui";
import { Phone, Whatsapp, Mail, MapPin, Clock } from "../components/icons";
import products from "../data/products.json";
import site from "../data/site";

const encode = (data) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");

export default function ContactPage() {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    product: "",
    message: "",
    "bot-field": "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const set = (e) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const validate = () => {
    const er = {};
    if (!values.name.trim()) er.name = "Please enter your name.";
    if (!/^[0-9+\-\s]{7,15}$/.test(values.phone.trim()))
      er.phone = "Please enter a valid phone number.";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "enquiry", ...values }),
    })
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  };

  return (
    <Layout>
      <Seo
        title="Contact  Call, WhatsApp or Visit Us in Amroha"
        pathname="/contact/"
      />
      <section className="section">
        <div className="container contact">
          {/* Details */}
          <div className="contact__details">
            <h1 className="h1" style={{ fontSize: "clamp(28px,4vw,40px)" }}>
              Get in touch
            </h1>
            <p className="lead">
              The fastest way to a quote is a quick call tell us your opening
              size and what it’s for.
            </p>
            {site.address.mapEmbedSrc ? (
              <iframe
                title="Map"
                src={site.address.mapEmbedSrc}
                style={{
                  border: 0,
                  width: "100%",
                  height: 200,
                  borderRadius: 12,
                  marginTop: 8,
                }}
                loading="lazy"
              />
            ) : (
              <Placeholder
                label="Google Map embed  add mapEmbedSrc in src/data/site.js"
                height={200}
                style={{ marginTop: 8 }}
              />
            )}
            <a
              className="btn btn--amber btn--full"
              href={site.phoneHref}
              style={{ justifyContent: "flex-start" }}
            >
              <Phone size={18} /> {site.phoneDisplay}
            </a>
            <a
              className="btn btn--outline btn--full"
              href={site.whatsappHref}
              style={{ justifyContent: "flex-start" }}
            >
              <Whatsapp size={18} /> WhatsApp us
            </a>

            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
                color: "var(--steel)",
                marginTop: 8,
              }}
            >
              <MapPin size={18} />
              <span>
                {site.address.line1}
                <br />
                {site.address.line2}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                color: "var(--steel)",
              }}
            >
              <Mail size={18} />
              <a href={site.emailHref} style={{ color: "var(--steel)" }}>
                {site.email}
              </a>
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                color: "var(--steel)",
              }}
            >
              <Clock size={18} />
              <span>{site.hours}</span>
            </div>
          </div>

          {/* Form */}
          <form
            className="form"
            name="enquiry"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={onSubmit}
          >
            <input type="hidden" name="form-name" value="enquiry" />
            <p className="hp">
              <label>
                Don’t fill this out: <input name="bot-field" onChange={set} />
              </label>
            </p>

            {status === "success" ? (
              <div className="form__success">
                Thank you we’ve received your enquiry and will call you back
                shortly.
              </div>
            ) : (
              <>
                <h2 className="h2" style={{ fontSize: 22 }}>
                  Send an enquiry
                </h2>
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={set}
                    required
                  />
                  {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={values.phone}
                    onChange={set}
                    required
                  />
                  {errors.phone && (
                    <span className="error">{errors.phone}</span>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="product">Product / service</label>
                  <select
                    id="product"
                    name="product"
                    value={values.product}
                    onChange={set}
                  >
                    <option value="">Select…</option>
                    {products.map((p) => (
                      <option key={p.slug} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={values.message}
                    onChange={set}
                  />
                </div>
                <button
                  className="btn btn--amber btn--full"
                  type="submit"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Sending…" : "Send enquiry"}
                </button>
                {status === "error" && (
                  <span className="error">
                    Something went wrong. Please call us instead.
                  </span>
                )}
              </>
            )}
          </form>
        </div>
      </section>
    </Layout>
  );
}
