import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

function ConsultPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    bestTime: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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
          subject: formData.subject,
          message: formData.message,
          best_time: formData.bestTime,
          _subject: `New Consult Request: ${formData.subject}`
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

  if (isSuccess) {
    return (
      <div className="relative min-h-screen bg-black text-white font-sans flex items-center justify-center">
        <div className="relative z-10 text-center p-8 max-w-md">
          {/* Background */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="ethereal-gradient absolute inset-0 opacity-20" />
          </div>

          <h1 className="text-4xl text-cyan mb-4">Request Sent</h1>
          <p className="text-white/60 mb-8">
            We have received your enquiry. A member of our team will contact you shortly.
          </p>
          <a href="/" className="text-xs uppercase tracking-widest border-b border-white/20 pb-1 hover:text-cyan hover:border-cyan transition-colors">
            Return Home
          </a>
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

        <main className="flex-1 w-full max-w-2xl mx-auto px-6 pt-32 pb-20">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-medium tracking-tighter mb-4">
              Book a <span className="text-cyan">Consult</span>
            </h1>
            <p className="text-white/60 font-light text-lg">
              Let’s define your next move.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-8 bg-white/[0.02] border border-white/10 p-8 sm:p-12 rounded-sm backdrop-blur-sm"
          >

            {/* Name & Email Row */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/40">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 py-2 text-white/90 focus:border-cyan focus:outline-none transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/40">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 py-2 text-white/90 focus:border-cyan focus:outline-none transition-colors"
                  placeholder="name@email.com"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/40">Subject / Topic</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 py-2 text-white/90 focus:border-cyan focus:outline-none transition-colors"
                placeholder="e.g. System Audit, Website Redesign..."
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/40">What you're looking for</label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 py-2 text-white/90 focus:border-cyan focus:outline-none transition-colors resize-none"
                placeholder="Briefly describe your goals or current bottlenecks..."
              />
            </div>

            {/* Best Time */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/40">Best time to contact</label>
              <select
                name="bestTime"
                value={formData.bestTime}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 py-2 text-white/90 focus:border-cyan focus:outline-none transition-colors appearance-none"
              >
                <option value="" disabled className="bg-black">Select a time...</option>
                <option value="Morning" className="bg-black text-white">Morning (9am - 12pm)</option>
                <option value="Afternoon" className="bg-black text-white">Afternoon (12pm - 5pm)</option>
                <option value="Evening" className="bg-black text-white">Evening (5pm - 8pm)</option>
                <option value="Anytime" className="bg-black text-white">Anytime</option>
              </select>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-white text-black py-4 uppercase tracking-[0.2em] font-medium transition-all duration-300 ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-cyan hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]"}`}
              >
                {isSubmitting ? "Sending..." : "Submit Request"}
              </button>
              <p className="text-center text-xs text-white/40 mt-4 font-light">
                Typical reply time within 45 minutes.
              </p>
            </div>

          </motion.form>

        </main>
      </div>
    </div>
  );
}

export default ConsultPage;
