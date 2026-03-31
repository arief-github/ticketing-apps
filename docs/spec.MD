# Spesifikasi Aplikasi dan Library

## 1. Identitas Aplikasi
- **Nama Aplikasi:** Ticketing Apps (Ticket Management Apps)
- **Tujuan Utama:** Aplikasi manajemen tiket/tugas kolaboratif ini dibangun untuk memudahkan organisasi dalam melacak, mengelola, dan mendiskusikan berbagai masalah atau pekerjaan. Aplikasi ini dilengkapi dengan sistem _bounty_ (hadiah) dan tenggat waktu (deadline) untuk memotivasi penyelesaian tiket.
- **Target Pengguna:** Tim pengembang, manajer proyek, atau kelompok kerja dalam suatu sistem organisasi/perusahaan yang membutuhkan pelacakan isu/tugas kolaboratif.

## 2. Tech Stack & Arsitektur Utama
Aplikasi ini dibangun dengan menggunakan ekosistem modern JavaScript/TypeScript:
- **Framework Utama:** Next.js (App Router, versi 14.x)
- **Bahasa Pemrograman:** TypeScript
- **Styling:** Tailwind CSS (dengan `tailwind-merge` dan `clsx`), menggunakan Next Themes untuk _Dark/Light Mode_.
- **Database ORM:** Prisma Client
- **Database Relasional:** PostgreSQL

## 3. Libraries dan Tools Utama

### 3.1. Frontend & UI
- **Radix UI Primitives:** Digunakan secara ekstensif (Dialog, Avatar, Dropdown, Tabs, Popover, Select, dll.) untuk komponen dasar yang aksesibel (Headless UI).
- **React Query (`@tanstack/react-query`):** Digunakan untuk manajemen state asinkron di sisi klien (fetching, caching, sinkronisasi data).
- **Lucide React:** Pustaka ikon standar yang digunakan di antarmuka web.
- **Nuqs:** Untuk manajemen state berbasis URL (Query State).
- **Sonner:** Digunakan untuk notifikasi _toast_.
- **React Day Picker:** Digunakan untuk komponen kalender/date-picker di dalam aplikasi.

### 3.2. Backend & Infrastruktur
- **Lucia Auth (`lucia`):** Digunakan untuk sistem autentikasi, mengelola session, _cookie_, dan integrasi langsung dengan Prisma (`@lucia-auth/adapter-prisma`).
- **Kriptografi & Encoding:** Memanfaatkan `@node-rs/argon2` untuk hashing password, dan `@oslojs/crypto` / `@oslojs/encoding` untuk pengelolaan token/kriptografi asinkron.
- **Zod:** Digunakan untuk validasi data (skema payload request/response).
- **Inngest:** Digunakan sebagai _Background Jobs_ atau _Message Queue_ untuk menangani proses berat di belakang layar (seperti pengiriman email asinkron).
- **Resend & React Email:** Digunakan untuk pengiriman email transaksional (seperti verifikasi email, reset password, atau undangan ke organisasi/workspace).

## 4. Struktur Direktori Utama (`/src`)
- `app/`: Routing aplikasi menggunakan Next.js App Router. Terdapat folder spesifik untuk autentikasi (`sign-in`, `sign-up`, dsb) dan _protected route_ (`(authenticated)`).
- `features/`: Pemisahan modular berdasarkan domain bisnis fitur (contoh: `auth`, `ticket`, `organization`, `comment`, `invitations`, `memberships`).
- `components/`: Komponen UI _reusable_ yang terbagi kembali ke dalam `ui/`, `shared/`, `composition/`, dan `theme/`.
- `lib/` & `utils/`: Fungsi-fungsi bantuan (helpers) dan inisialisasi library (seperti Prisma Client instance).
- `types/`: Definisi global type TypeScript.
