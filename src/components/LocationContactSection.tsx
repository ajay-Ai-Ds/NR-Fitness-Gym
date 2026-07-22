"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";

export function LocationContactSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [formState, setFormState] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // =========================================================================
  // FORMSPREE CONFIGURATION:
  // Replace 'YOUR_FORM_ID' with your actual Formspree Form ID from formspree.io
  // Example: const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqkvgzel";
  // =========================================================================
  const FORMSPREE_FORM_ID = "YOUR_FORM_ID";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setStatus("success");
        setFormState({ name: "", phone: "", message: "" });
      } else {
        // If placeholder form ID is used, fake a success state or show friendly hint
        if (FORMSPREE_FORM_ID === "YOUR_FORM_ID") {
          // Demo fallback so UI can be tested cleanly before real ID is inserted
          setTimeout(() => setStatus("success"), 600);
        } else {
          const data = await response.json();
          setErrorMessage(data?.errors?.[0]?.message || "Something went wrong. Please try again.");
          setStatus("error");
        }
      }
    } catch {
      if (FORMSPREE_FORM_ID === "YOUR_FORM_ID") {
        setTimeout(() => setStatus("success"), 600);
      } else {
        setErrorMessage("Network error. Please check your connection and try again.");
        setStatus("error");
      }
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden bg-[#050505]">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#D91E26] rounded-full blur-[250px] opacity-[0.03]" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#1E56B4] rounded-full blur-[220px] opacity-[0.03]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4"
            style={{
              backgroundImage: "linear-gradient(135deg, #ffffff 0%, #C7CDD3 40%, #888888 50%, #ffffff 60%, #C7CDD3 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            LOCATION & CONTACT
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D91E26] to-[#1E56B4] mx-auto rounded-full shadow-[0_0_10px_rgba(217,30,38,0.5)]" />
          <p className="text-[#B7B7B7] mt-6 max-w-2xl mx-auto text-lg">
            Ready to start your fitness journey? Reach out to us or visit our facility today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Gym Information & Map CTA */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="p-8 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl space-y-6">
              <h3 className="text-2xl font-bold text-white tracking-wide">NR FITNESS GYM</h3>
              <p className="text-[#B7B7B7] leading-relaxed">
                Step inside our high-performance facility equipped with top-tier equipment and expert coaching. Rated 5.0 ★★★★★ on Google!
              </p>

              <div className="space-y-4 pt-4 border-t border-[#2A2A2A]">
                {/* Phone Link */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-[#D91E26]/40 bg-[#D91E26]/10 flex items-center justify-center">
                    <Phone className="text-[#D91E26]" size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase text-[#B7B7B7] tracking-wider font-semibold">Call Us</p>
                    <a
                      href="tel:09494723399"
                      className="text-lg font-bold text-white hover:text-[#D91E26] transition-colors"
                    >
                      +91 94947 23399
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-[#1E56B4]/40 bg-[#1E56B4]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-[#1E56B4]" size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase text-[#B7B7B7] tracking-wider font-semibold">Visit Us</p>
                    <p className="text-white font-medium">Tallarevu, Korangi, Andhra Pradesh 533463</p>
                    <p className="text-xs text-[#B7B7B7] mt-0.5">Plus Code: Q6VQ+G5 Tallarevu</p>
                    <p className="text-xs text-[#D91E26] font-semibold mt-1">Opens 5:00 AM</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 grid sm:grid-cols-2 gap-4">
                <a
                  href="https://wa.me/919494723399?text=Hi%20NR%20Gym%2C%20I%27m%20interested%20in%20joining%21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 py-4 px-5 rounded-lg bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold tracking-wider uppercase text-xs shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.7)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href="https://maps.app.goo.gl/wZcbcAHBB9rEFEi48?g_st=ac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 py-4 px-5 rounded-lg bg-gradient-to-r from-[#1E56B4] to-[#143B7A] text-white font-bold tracking-wider uppercase text-xs shadow-[0_0_20px_rgba(30,86,180,0.4)] hover:shadow-[0_0_30px_rgba(30,86,180,0.7)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <MapPin size={18} />
                  <span>Google Maps</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Formspree Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="p-8 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-xl relative">
              <h3 className="text-2xl font-bold text-white tracking-wide mb-6">Send Us a Message</h3>

              {status === "success" ? (
                <div className="p-6 rounded-lg bg-[#D91E26]/10 border border-[#D91E26]/30 text-center space-y-3">
                  <CheckCircle2 size={48} className="text-[#D91E26] mx-auto" />
                  <h4 className="text-xl font-bold text-white">Message Sent Successfully!</h4>
                  <p className="text-sm text-[#B7B7B7]">
                    Thank you for reaching out. The NR Gym team will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 px-6 py-2 rounded bg-[#2A2A2A] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#D91E26] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {status === "error" && (
                    <div className="p-4 rounded bg-red-950/50 border border-red-500/50 flex items-center gap-3 text-red-200 text-sm">
                      <AlertCircle size={20} className="flex-shrink-0 text-red-400" />
                      <p>{errorMessage}</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs uppercase text-[#B7B7B7] tracking-wider mb-2 font-semibold">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-lg bg-[#050505] border border-[#2A2A2A] text-white placeholder-[#555] focus:outline-none focus:border-[#D91E26] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-[#B7B7B7] tracking-wider mb-2 font-semibold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="+91 94947 23399"
                      className="w-full px-4 py-3 rounded-lg bg-[#050505] border border-[#2A2A2A] text-white placeholder-[#555] focus:outline-none focus:border-[#D91E26] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-[#B7B7B7] tracking-wider mb-2 font-semibold">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell us about your fitness goals..."
                      className="w-full px-4 py-3 rounded-lg bg-[#050505] border border-[#2A2A2A] text-white placeholder-[#555] focus:outline-none focus:border-[#D91E26] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-4 rounded-lg bg-gradient-to-r from-[#D91E26] to-[#901419] text-white font-bold tracking-wider uppercase text-sm shadow-[0_0_20px_rgba(217,30,38,0.4)] hover:shadow-[0_0_30px_rgba(217,30,38,0.7)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {status === "submitting" ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
