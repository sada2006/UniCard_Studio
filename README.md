# 🎴 UniCard Studio

> **Enterprise Digital Campus Credential & Smart ID Card Generation Suite**  
> Built with React 18, Vite, Tailwind CSS, and Web Audio API.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🌟 Key Features

### 1. 🎴 Dynamic 3D Interactive Card Engine
- **Orientation Modes:** Switch seamlessly between ISO CR-80 Standard **Portrait** (54 × 86 mm) and **Landscape** (86 × 54 mm).
- **Dual-Sided Simulation:** Smooth 3D perspective flip between **Front Identity** and **Reverse Security & Emergency Info**.
- **Physics Tilt:** Realistic mouse-tracking specular reflections and micro-holographic security foil animations.
- **Academic Branch Color Schemes:** Instant departmental theming (CSE, AI & DS, ECE, Mechanical, Civil, BioTech) + full 360° hex color spectrum picker.

### 2. 🚇 Metro-Style Contactless NFC Turnstile Simulator
- **Hardware Simulation:** Interactive contactless card reader terminal with authentic **Web Audio API synthesizer** chimes (`*BEEP*`).
- **Physical Gate Tracking:** Live terminal logging with entrance location timestamps (`GATE-04 NORTH ENTRANCE`).
- **🚨 Interactive Fraud / Proxy Demo:** Real-time **Anti-Passback** fraud detection that prevents multiple entries on the same badge with a 15-minute lockout simulation.

### 3. 🛡️ Biometric 1:N Facial Deduplication
- Prevents malicious users or impersonators from registering duplicate student IDs under different names or registration numbers with the same photo.
- Automatic image hash fingerprinting with instant security warning banners.

### 4. 📸 Live Webcam Biometric Capture
- In-browser camera integration with an optical face guide oval.
- Integrated local photo upload + on-demand randomized avatar generator for immediate testing.

### 5. 🎓 Multi-Tier Campus Roles
- Tailored design badges, security clearance levels, and authentic authority signatures for:
  - **Student** (Dean of Academic Affairs)
  - **Faculty** (Director of Academic Affairs)
  - **Research Scholar** (Dean of Research & Innovation)
  - **Trainee / Intern** (Campus Program Coordinator)
  - **Administrative Staff** (Registrar & Chief Administrator)

### 6. 🗂️ University Central Registry (Admin Portal)
- **Central Database:** Comprehensive auditing database for all issued campus credentials.
- **Multi-Field Live Search:** Query instantly across Name, Roll/ID, Department, Designation, Phone, or Blood Group.
- **Multi-Category Dropdown Filters:** Filter by campus role and academic branch.
- **Active 3D Synchronization:** Load any database record directly into the 3D viewer, or jump straight into the editor with **`✏️ Edit`**.
- **Auto-Switching Display:** Automatically advances the 3D card display to the next candidate upon credential revocation.

### 7. 📁 Cohort Batch CSV Engine
- Bulk roster processing with automated departmental color routing.
- Includes a downloadable CSV template (`sample_cohort.csv`) and on-demand cohort demonstration.

### 8. 🖨️ High-Precision Color Print Sheet
- True-to-scale ISO CR-80 print template (`print-color-adjust: exact`).
- Separate dashed scissor cut markings (`✂`) for both front and reverse sides.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Local Development

```bash
# 1. Clone the repository
git clone https://github.com/sada2006/UniCard_Studio.git

# 2. Navigate to project directory
cd UniCard_Studio

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Visit `http://localhost:5173` to explore UniCard Studio.

---

## 🏗️ Production Build

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🔐 Administrative SSO Credentials (Demo)

| Field | Value |
| :--- | :--- |
| **Portal** | Apex Institutional Central SSO |
| **Email** | `admin@apex.edu` |
| **Password** | `admin123` |
| **Shortcut** | Click **`⚡ Auto-Fill Demo`** in the authentication modal |

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
