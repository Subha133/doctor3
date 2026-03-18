import { useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../common/SectionTitle";
import doctorData from "../../data/doctorData.json";
import { useFormValidation } from "../../hooks/useFormValidation";
import { generateWhatsAppURL } from "../../utils/whatsapp";
import { getTodayString } from "../../utils/helpers";

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM",
];

const initialState = { name: "", phone: "", email: "", date: "", time: "", problem: "" };

export default function AppointmentForm() {
  const { appointment, doctor, clinic } = doctorData;
  const { values, errors, touched, handleChange, handleBlur, isValid, reset } = useFormValidation(initialState);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid()) return;

    setLoading(true);
    setTimeout(() => {
      const url = generateWhatsAppURL(doctor.whatsapp, values);
      window.open(url, "_blank");
      setLoading(false);
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 6000);
    }, 800);
  };

  const InputWrapper = ({ children, label, htmlFor, error, touched: t }) => (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-slate-700 mb-1.5">
        {label} <span className="text-red-400">*</span>
      </label>
      {children}
      {t && error && <p className="error-text">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </p>}
    </div>
  );

  return (
    <section id="appointment" className="section-padding bg-gradient-to-br from-slate-50 to-primary-50/30" aria-labelledby="appointment-heading">
      <div className="container-max mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* Left Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <SectionTitle
              tag="Schedule a Visit"
              title={appointment.heading}
              subtitle={appointment.subtitle}
            />

            {/* Clinic info cards */}
            <div className="space-y-4 mt-8">
              <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-card">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{doctorData.clinic.name}</p>
                  <a href={doctorData.clinic.mapLink} target="_blank" rel="noreferrer"
                    className="text-slate-500 text-xs leading-relaxed hover:text-primary-600 transition-colors">
                    {doctorData.clinic.address}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-card">
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 text-sm mb-2">Working Hours</p>
                  {doctorData.clinic.workingHours.map((h, i) => (
                    <div key={i} className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500">{h.day}</span>
                      <span className={`font-semibold ${h.time === "Emergency Only" ? "text-red-500" : "text-slate-700"}`}>
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-card">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">WhatsApp / Direct Call</p>
                  <a href={`tel:${doctor.phone}`} className="font-bold text-slate-800 hover:text-primary-600 transition-colors">
                    {doctor.phone}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl shadow-card p-8 lg:p-10">
              <h3 className="font-display text-2xl font-bold text-slate-900 mb-1">Request an Appointment</h3>
              <p className="text-slate-400 text-sm mb-8">Fill in the form below. We'll confirm via WhatsApp within 2 hours.</p>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded-2xl flex items-start gap-3"
                >
                  <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-teal-800 text-sm">{appointment.confirmationMessage}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name & Phone row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <InputWrapper label="Full Name" htmlFor="name" error={errors.name} touched={touched.name}>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Dr. referred by..."
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`input-field ${touched.name && errors.name ? "input-error" : ""}`}
                      autoComplete="name"
                    />
                  </InputWrapper>

                  <InputWrapper label="Phone Number" htmlFor="phone" error={errors.phone} touched={touched.phone}>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`input-field ${touched.phone && errors.phone ? "input-error" : ""}`}
                      autoComplete="tel"
                    />
                  </InputWrapper>
                </div>

                {/* Email */}
                <InputWrapper label="Email Address" htmlFor="email" error={errors.email} touched={touched.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input-field ${touched.email && errors.email ? "input-error" : ""}`}
                    autoComplete="email"
                  />
                </InputWrapper>

                {/* Date & Time row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <InputWrapper label="Preferred Date" htmlFor="date" error={errors.date} touched={touched.date}>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      min={getTodayString()}
                      value={values.date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`input-field ${touched.date && errors.date ? "input-error" : ""}`}
                    />
                  </InputWrapper>

                  <InputWrapper label="Preferred Time" htmlFor="time" error={errors.time} touched={touched.time}>
                    <select
                      id="time"
                      name="time"
                      value={values.time}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`input-field ${touched.time && errors.time ? "input-error" : ""}`}
                    >
                      <option value="">Select a time slot</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </InputWrapper>
                </div>

                {/* Problem */}
                <InputWrapper label="Describe Your Problem / Concern" htmlFor="problem" error={errors.problem} touched={touched.problem}>
                  <textarea
                    id="problem"
                    name="problem"
                    rows={4}
                    placeholder="Please describe your symptoms, medical history, or any specific concerns..."
                    value={values.problem}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input-field resize-none ${touched.problem && errors.problem ? "input-error" : ""}`}
                  />
                </InputWrapper>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary justify-center py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending via WhatsApp...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Book via WhatsApp
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-400">
                  By submitting, you'll be redirected to WhatsApp to send your request. No spam, ever.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
