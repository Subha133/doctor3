# 🏥 Doctor Portfolio – Dr. Arjun Mehta

A **premium, fully responsive** doctor portfolio website built with **React + Vite + TailwindCSS**.

## ✨ Features

- 🎨 Premium blue/teal medical design with Playfair Display + DM Sans typography
- 📱 Fully mobile-first responsive layout
- 💬 WhatsApp appointment booking (no backend needed)
- 🎠 Swiper coverflow carousel for clinic gallery
- 🎞️ Framer Motion animations throughout
- 🔒 Full form validation with custom hook
- 🧩 All content driven from a single `doctorData.json` file
- ♿ Accessible labels, proper heading hierarchy, SEO meta tags
- 🌊 Smooth scroll navigation

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/       → Navbar, Footer
│   ├── hero/         → Hero, VideoCarousel
│   ├── sections/     → About, Services, Testimonials, AppointmentForm
│   └── common/       → FloatingWhatsApp, SectionTitle
├── data/
│   └── doctorData.json   ← ALL CONTENT HERE
├── hooks/
│   └── useFormValidation.js
├── pages/
│   └── Home.jsx
├── utils/
│   ├── whatsapp.js
│   └── helpers.js
├── App.jsx
├── main.jsx
└── index.css
```

## ⚙️ Customisation

All website content is in **`src/data/doctorData.json`**. Edit:

| Field | Description |
|---|---|
| `doctor.name` | Doctor's full name |
| `doctor.whatsapp` | WhatsApp number (with country code, no +) |
| `doctor.photo` | Path to doctor photo (place in `/public/`) |
| `clinic.name` | Clinic name |
| `clinic.workingHours` | Array of `{ day, time }` objects |
| `services.list` | Array of service cards |
| `testimonials.list` | Array of patient testimonials |
| `videos.items` | Gallery images/videos |

## 📸 Doctor Photo

Place your doctor's photo at `/public/doctor-photo.jpg`.

Recommended size: **600×750px** (portrait orientation).

## 📦 Build for Production

```bash
npm run build
```

Output is in the `dist/` folder. Deploy to Vercel, Netlify, or any static host.

## 🛠️ Tech Stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- [TailwindCSS 3](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Swiper.js](https://swiperjs.com/)

---

Built with ❤️ for better cardiac health.
