import * as React from "react";
import { useState } from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { Placeholder, btnAmber, btnOutline } from "../components/ui";
import { Phone, Whatsapp, Mail, MapPin, Clock } from "../components/icons";
import products from "../data/products";
import site from "../data/site";

const inputClass =
  "w-full font-display text-[15px] px-3 py-[10px] border border-line rounded-sm bg-white text-graphite focus:outline focus:outline-2 focus:outline-forge focus:border-forge";

interface FormValues {
  name: string;
  phone: string;
  product: string;
  message: string;
  "bot-field": string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

type FormErrors = {
  name?: string;
  phone?: string;
};

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");

export default function ContactPage() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    phone: "",
    product: "",
    message: "",
    "bot-field": "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const set = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const validate = () => {
    const er: FormErrors = {};
    if (!values.name.trim()) er.name = "Please enter your name.";
    if (!/^[0-9+\-\s]{7,15}$/.test(values.phone.trim()))
      er.phone = "Please enter a valid phone number.";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
      <section className="py-14 max-[560px]:py-10">
        <div className="max-w-site mx-auto px-6 grid grid-cols-2 gap-10 items-start max-[860px]:grid-cols-1">
          {/* Details */}
          <div className="flex flex-col gap-3">
            <h1 className="text-[clamp(28px,4vw,40px)] font-black leading-[1.06] tracking-[-0.8px]">
              Get in touch
            </h1>
            <p className="text-steel text-[17px] max-w-[56ch] mb-0">
              The fastest way to a quote is a quick call tell us your opening
              size and what it’s for.
            </p>
            {site.address.mapEmbedSrc ? (
              <iframe
                title="Map"
                src={site.address.mapEmbedSrc}
                className="w-full h-[200px] rounded-md border-0 mt-2"
                loading="lazy"
              />
            ) : (
              <Placeholder
                label="Google Map embed  add mapEmbedSrc in src/data/site.ts"
                height={200}
                style={{ marginTop: 8 }}
              />
            )}
            <a
              className={`${btnAmber} w-full`}
              href={site.phoneHref}
              style={{ justifyContent: "flex-start" }}
            >
              <Phone size={18} /> {site.phoneDisplay}
            </a>
            <a
              className={`${btnOutline} w-full`}
              href={site.whatsappHref}
              style={{ justifyContent: "flex-start" }}
            >
              <Whatsapp size={18} /> WhatsApp us
            </a>

            <div className="flex gap-[10px] items-start text-steel mt-2">
              <MapPin size={18} />
              <span>
                {site.address.line1}
                <br />
                {site.address.line2}
              </span>
            </div>
            <div className="flex gap-[10px] items-center text-steel">
              <Mail size={18} />
              <a href={site.emailHref} className="text-steel">
                {site.email}
              </a>
            </div>
            <div className="flex gap-[10px] items-center text-steel">
              <Clock size={18} />
              <span>{site.hours}</span>
            </div>
          </div>

          {/* Form */}
          <form
            className="bg-card border border-line rounded-md p-6 flex flex-col gap-3 shadow-card"
            name="enquiry"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={onSubmit}
          >
            <input type="hidden" name="form-name" value="enquiry" />
            <p className="absolute left-[-9999px]">
              <label>
                Don’t fill this out: <input name="bot-field" onChange={set} />
              </label>
            </p>

            {status === "success" ? (
              <div className="bg-[#eaf6ee] border border-[#bfe2cd] text-[#1f6b3a] rounded-sm p-4 font-semibold">
                Thank you we’ve received your enquiry and will call you back
                shortly.
              </div>
            ) : (
              <>
                <h2 className="text-[22px] font-extrabold tracking-[-0.4px]">
                  Send an enquiry
                </h2>
                <div className="flex flex-col gap-[5px]">
                  <label htmlFor="name" className="text-[13px] font-semibold text-steel">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    className={inputClass}
                    value={values.name}
                    onChange={set}
                    required
                  />
                  {errors.name && (
                    <span className="text-molten text-[12px]">{errors.name}</span>
                  )}
                </div>
                <div className="flex flex-col gap-[5px]">
                  <label htmlFor="phone" className="text-[13px] font-semibold text-steel">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className={inputClass}
                    value={values.phone}
                    onChange={set}
                    required
                  />
                  {errors.phone && (
                    <span className="text-molten text-[12px]">{errors.phone}</span>
                  )}
                </div>
                <div className="flex flex-col gap-[5px]">
                  <label htmlFor="product" className="text-[13px] font-semibold text-steel">
                    Product / service
                  </label>
                  <select
                    id="product"
                    name="product"
                    className={inputClass}
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
                <div className="flex flex-col gap-[5px]">
                  <label htmlFor="message" className="text-[13px] font-semibold text-steel">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className={inputClass}
                    value={values.message}
                    onChange={set}
                  />
                </div>
                <button
                  className={`${btnAmber} w-full`}
                  type="submit"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Sending…" : "Send enquiry"}
                </button>
                {status === "error" && (
                  <span className="text-molten text-[12px]">
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
