/**
 * Generates a WhatsApp URL with a pre-filled formatted message.
 * @param {string} phoneNumber - WhatsApp number with country code (e.g., "919876543210")
 * @param {Object} formData - Appointment form data
 * @returns {string} WhatsApp URL
 */
export function generateWhatsAppURL(phoneNumber, formData) {
  const { name, phone, email, date, time, problem } = formData;

  const message = `🏥 *New Appointment Request*
─────────────────────────
👤 *Name:* ${name}
📞 *Phone:* ${phone}
📧 *Email:* ${email}
📅 *Preferred Date:* ${date}
🕐 *Preferred Time:* ${time}
💬 *Problem / Concern:*
${problem}
─────────────────────────
_Sent via Apollo Heart Clinic Website_`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

/**
 * Opens WhatsApp with a generic greeting message
 * @param {string} phoneNumber
 */
export function openWhatsAppChat(phoneNumber) {
  const message = encodeURIComponent(
    "Hello Dr. Mehta's team! I'd like to inquire about a consultation. 🏥"
  );
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
}
