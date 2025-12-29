import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useLocation, useNavigate, Link } from "react-router-dom";

// Simple mapping for estimates (could be imported from a shared constant file)
const ESTIMATES = {
  launch: "2-3 Weeks",
  signature: "4-6 Weeks",
  cinematic: "6-8 Weeks",
  os: "8-12 Weeks"
};

const PLAN_NAMES = {
  launch: "Launch Website",
  signature: "Signature Website",
  cinematic: "Cinematic Website",
  os: "Digital OS"
};

function RequestPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedPlan, selectedAddons, paymentMode } = location.state || {};

  // If no state, redirect back to builder (user accessed directly)
  useEffect(() => {
    if (!selectedPlan) {
      navigate('/builder');
    }
  }, [selectedPlan, navigate]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const planName = PLAN_NAMES[selectedPlan] || selectedPlan;
    const addonsList = selectedAddons && selectedAddons.length > 0 ? selectedAddons.join(", ") : "None";
    const estimate = ESTIMATES[selectedPlan] || "TBD";

    try {
      const response = await fetch("https://formsubmit.co/ajax/lwazislingile@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          business: formData.businessName,
          selected_plan: planName,
          addons: addonsList,
          payment_preference: paymentMode,
          estimated_timeline: estimate,
          _subject: `New Request: ${formData.businessName || formData.name}`
        })
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error sending request. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedPlan) return null;

  if (isSuccess) {
    return (
      <div className="relative min-h-screen bg-black text-white font-sans flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <h1 className="text-4xl text-cyan mb-4">Request Sent</h1>
          <p className="text-white/60 mb-8">
            We have received your details. A member of our team will contact you shortly at {formData.email}.
          </p>
          <Link to="/" className="text-xs uppercase tracking-widest border-b border-white/20 pb-1 hover:text-cyan hover:border-cyan transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-cyan-500/20 selection:text-cyan-200 font-sans">

      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="ethereal-gradient absolute inset-0 opacity-20" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-1 w-full max-w-4xl mx-auto px-6 pt-32 pb-20">

          <div className="grid md:grid-cols-2 gap-12 lg:gap-24">

            {/* Left Col: Summary & Estimate */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-4xl font-medium tracking-tighter mb-2">
                  Finalize <span className="text-cyan">Request</span>
                </h1>
                <p className="text-white/60 font-light text-lg">
                  You're one step away.
                </p>
              </div>

              <div className="p-6 rounded-sm bg-white/[0.03] border border-white/10 space-y-6">
                <div>
                  <span className="text-xs text-white/40 uppercase tracking-widest block mb-1">Selected Foundation</span>
                  <p className="text-xl font-light text-cyan">{PLAN_NAMES[selectedPlan]}</p>
                </div>

                {selectedAddons && selectedAddons.length > 0 && (
                  <div>
                    <span className="text-xs text-white/40 uppercase tracking-widest block mb-1">Add-ons Included</span>
                    <p className="text-white/80 font-light capitalize">{selectedAddons.join(", ")}</p>
                  </div>
                )}

                <div className="pt-6 border-t border-white/10">
                  <span className="text-xs text-white/40 uppercase tracking-widest block mb-1">Estimated Timeline</span>
                  <p className="text-2xl font-light text-white">{ESTIMATES[selectedPlan] || "Custom Timeline"}</p>
                </div>
              </div>

              <div className="hidden md:block">
                <p className="text-xs text-white/30 leading-relaxed">
                  *Timelines are estimates based on our standard process. Complex requirements may adjust this schedule. We will confirm the exact date on our call.
                </p>
              </div>
            </motion.div>

            {/* Right Col: Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-2 text-white/90 focus:border-cyan focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40">Business Name</label>
                  <input
                    type="text"
                    name="businessName"
                    required
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-2 text-white/90 focus:border-cyan focus:outline-none transition-colors"
                    placeholder="Company Ltd."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-2 text-white/90 focus:border-cyan focus:outline-none transition-colors"
                    placeholder="name@company.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-2 text-white/90 focus:border-cyan focus:outline-none transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="pt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-white text-black py-4 uppercase tracking-[0.2em] font-medium transition-all duration-300 ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-cyan hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]"}`}
                  >
                    {isSubmitting ? "Sending..." : "Confirm & Send"}
                  </button>
                  <p className="text-center text-xs text-white/40 mt-6 font-light leading-relaxed">
                    ByCreair will give you a call and we will contact you shortly to confirm details.
                  </p>
                </div>

              </form>
            </motion.div>

          </div>

        </main>
      </div>
    </div>
  );
}

export default RequestPage;
