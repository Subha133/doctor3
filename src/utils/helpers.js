/**
 * Renders star rating as an array
 * @param {number} rating - 1 to 5
 * @returns {Array}
 */
export function getStars(rating) {
  return Array.from({ length: 5 }, (_, i) => i < rating);
}

/**
 * Truncates text to a max length
 */
export function truncate(text, maxLength = 160) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

/**
 * Smooth scroll to a section by ID
 */
export function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/**
 * Format today's date as YYYY-MM-DD for date input min attribute
 */
export function getTodayString() {
  return new Date().toISOString().split("T")[0];
}
