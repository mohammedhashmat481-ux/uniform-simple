# Apex Craft Uniforms | Production Business Website & Admin Portal

> **Tailored to Represent Excellence**  
> A luxury 5-page institutional uniform manufacturing business website with a full admin management panel built with **100% free and open-source software**.

---

## 📋 Table of Contents
1. [Business Overview](#-business-overview)
2. [Tech Stack (All Free)](#-tech-stack-all-free)
3. [Design System & Theme](#-design-system--theme)
4. [Pages & Features](#-pages--features)
5. [Local Development Setup](#-local-development-setup)
6. [Installing MongoDB Locally](#-installing-mongodb-locally)
7. [Database Seeding](#-database-seeding)
8. [Configuring Free Email SMTP](#-configuring-free-email-smtp)
9. [Customization Guide](#-customization-guide)
10. [VPS Production Deployment](#-vps-production-deployment)
11. [Automated Backup & Restore](#-automated-backup--restore)

---

## 🏢 Business Details
- **Company Name:** Apex Craft Uniforms
- **Tagline:** Tailored to Represent Excellence
- **Services:** Custom uniform manufacturing for schools, corporates, healthcare, hospitality, industrial/factory, security forces, and athletic sports teams.
- **Location:** Bangalore, Karnataka, India
- **Address:** 104, Industrial Suburb, Peenya Industrial Area 2nd Stage, Bengaluru, Karnataka 560058
- **Phone:** +91 98765 43210
- **WhatsApp:** 919876543210
- **Email:** contact@apexcraftuniforms.com
- **Working Hours:** Mon - Sat: 9:30 AM - 7:00 PM (Sunday Closed)
- **Stats:** 15+ years experience, 450+ corporate clients, 1.2M+ uniforms delivered, 35+ cities served.

---

## 🛠️ Tech Stack (All Free)

### Frontend
- **Framework:** React 18 + Vite
- **Routing:** React Router v6 (Route-level code splitting via `React.lazy`)
- **Styling:** Tailwind CSS + Custom SVG Icons
- **Typography:** Self-hosted `@fontsource/playfair-display` (headings) & `@fontsource/inter` (body)
- **Animations:** Framer Motion (respects `prefers-reduced-motion`)
- **SEO & Meta:** `react-helmet-async` with OpenGraph & LocalBusiness / FAQPage JSON-LD schema
- **Asset Handling:** Locally downloaded WebP images (zero hotlinking)

### Backend
- **Server:** Node.js + Express (in `/server`)
- **Database:** MongoDB Community Edition (running locally on port 27017)
- **ORM:** Mongoose
- **Security & Utilities:** Helmet, CORS, Compression, Morgan, Express Rate-Limit, Express-Validator, Cookie-Parser
- **Auth:** JWT (`httpOnly` cookie) + `bcryptjs`
- **Image Processing:** Multer + Sharp (auto WebP conversion & 400px thumbnail generation)
- **Email Engine:** Nodemailer (Gmail App Password or free SMTP)
- **Caching:** In-memory caching (`node-cache`, 5-minute TTL) for public API queries

---

## 🎨 Design System

- **Primary Deep Navy:** `#0B1B33`
- **Champagne Gold Accent:** `#C9A24B`
- **Warm Ivory Background:** `#FAF7F2`
- **Dark Charcoal:** `#12161C`
- **Headings Text:** `#1B1F24`
- **Body Text:** `#5A6270`

---

## 📄 Pages & Features

1. **Home (`/`)**: ~90vh Hero with navy gradient overlay, animated stat counters, 6 sector cards, why choose us icon features, 5-step crafting timeline, featured product grid, client review slider, CTA band.
2. **About Us (`/about`)**: Story with offset gold frame, mission/vision cards, 4 core values, manufacturing capability facts, leadership cards, zero-defect quality promise strip.
3. **Catalogue (`/catalogue`)**: Category filter tabs, instant search bar, 4-column responsive grid, product enquiry modal, direct WhatsApp click-to-chat, customization options, fabric & color swatches.
4. **FAQs (`/faqs`)**: Live search filter, category filter pills, keyboard-accessible accordion, "Still have questions?" WhatsApp CTA, embedded FAQPage JSON-LD schema.
5. **Contact Us (`/contact`)**: Contact details cards, direct WhatsApp button, interactive quote form, "What happens next" 3-step strip, plain full-width Google Map iframe (no API key).
6. **Admin Panel (`/admin`)**: Protected management portal for viewing enquiries, modifying product catalogues with WebP image uploads, CSV exports, editing FAQs and testimonials.

---

## 🚀 Local Development Setup

### 1. Prerequisites
- Node.js (v18 or higher)
- NPM (v9 or higher)
- Local MongoDB Community Edition running on port 27017

### 2. Installation
Clone the repository and install dependencies for both root (frontend) and `/server` (backend):

```bash
# Install frontend dependencies
npm install

# Install backend server dependencies
cd server
npm install
cd ..
```

### 3. Environment Variables
Create `.env` in the root directory:
```env
VITE_WHATSAPP_NUMBER=919876543210
VITE_API_URL=http://localhost:5000
```

Create `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/uniformdb
JWT_SECRET=super_secret_jwt_key_apex_craft_2026_luxury_tailoring
CLIENT_URL=http://localhost:3000
UPLOAD_DIR=./uploads

# Nodemailer SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contact@apexcraftuniforms.com
SMTP_PASS=your_gmail_app_password
OWNER_EMAIL=owner@apexcraftuniforms.com
```

### 4. Running Locally
Start both backend server and Vite frontend:

```bash
# Terminal 1: Start Backend Server
cd server
npm start

# Terminal 2: Start Frontend Development Server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🍃 Installing MongoDB Locally

### Windows:
1. Download MongoDB Community Server MSI from [mongodb.com](https://www.mongodb.com/try/download/community).
2. Install as a Windows Service (default port `27017`).
3. Verify connection in PowerShell: `mongosh "mongodb://127.0.0.1:27017"`.

### Ubuntu / Debian Linux:
```bash
sudo apt-get install -y gnupg curl
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl enable --now mongod
```

---

## 🌱 Database Seeding

To populate MongoDB with 16+ products, 16+ FAQs, 3 testimonials, and the first admin user:

```bash
cd server
npm run seed
```

### Seed Admin Login Credentials:
- **Email:** `admin@apexcraftuniforms.com`
- **Password:** `Admin@Apex2026`
- **Portal URL:** `http://localhost:3000/admin/login`

---

## 📧 Configuring Free Email SMTP

### Option A: Gmail App Password (Free)
1. Enable **2-Step Verification** in your Google Account.
2. Go to **Security > App Passwords**.
3. Generate an App Password for "Mail".
4. Update `server/.env`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=yourgmail@gmail.com
   SMTP_PASS=xxxx-xxxx-xxxx-xxxx
   ```

### Option B: Brevo Free SMTP (300 emails/day free)
1. Sign up for a free account at [brevo.com](https://www.brevo.com/).
2. Retrieve your SMTP host (`smtp-relay.brevo.com`), port (`587`), user, and key.
3. Update `server/.env` accordingly.

---

## ⚙️ Customization Guide

- **Business Details & Contact Info:** Edit `src/config/siteConfig.js`.
- **Theme Colors & Fonts:** Edit `tailwind.config.js` and `src/index.css`.
- **Local Images:** Replace WebP files inside `public/images/`.

---

## 🌐 VPS Production Deployment

### 1. Build Production Assets
```bash
npm run build
```

### 2. Start PM2 Process Manager
```bash
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 3. Configure Nginx & SSL
Copy `nginx.conf` to `/etc/nginx/sites-available/apexcraft.conf`:
```bash
sudo ln -s /etc/nginx/sites-available/apexcraft.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Issue free Let's Encrypt SSL Certificate:
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d apexcraftuniforms.com -d www.apexcraftuniforms.com
```

---

## 💾 Automated Backup & Restore

### Executing Backup:
```bash
chmod +x backup.sh
./backup.sh
```

### Daily Cron Example:
Add to `crontab -e`:
```cron
0 2 * * * /var/www/apexcraft/backup.sh >> /var/log/apexcraft_backup.log 2>&1
```

### Restoration Procedure:
```bash
# 1. Extract Archive
mkdir -p /tmp/restore
tar -xzf /var/backups/apexcraft/apexcraft_backup_YYYYMMDD_HHMMSS.tar.gz -C /tmp/restore

# 2. Restore MongoDB
mongorestore --db uniformdb /tmp/restore/db/uniformdb --drop

# 3. Restore Uploaded Media
cp -r /tmp/restore/uploads/* /var/www/apexcraft/server/uploads/
rm -rf /tmp/restore
```

---

*Designed & Developed by Apex Craft Tailoring Digital • Free & Open Source License*
