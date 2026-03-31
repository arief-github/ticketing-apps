# UI & Component Pattern Specification

## 1. Arsitektur Frontend
Aplikasi ini menggunakan Next.js App Router dengan penekanan pada pemisahan antara Logika Bisnis (Business Logic) dan Presentasi (Presentation).

### 1.1. Server Actions & Mutations
- **Server Actions:** Digunakan untuk semua operasi mutasi data (Create, Update, Delete). Terletak di file seperti `actions.ts` dalam folder fitur masing-masing.
- **Data Fetching:** Dilakukan langsung di Server Components untuk data awal, dan menggunakan React Query di Client Components untuk interaksi asinkron yang lebih dinamis.

## 2. Pola Komponen (Component Pattern)
Direktori `src/components` dibagi menjadi beberapa lapisan tanggung jawab:

### 2.1. UI Layer (`/ui`)
- **Teknologi:** Radix UI (Primitives) + Tailwind CSS.
- **Karakteristik:** Komponen atomis yang tidak memiliki logika bisnis (Button, Input, Badge, Dialog, dll). Fokus pada aksesibilitas dan styling yang konsisten.

### 2.2. Shared Layer (`/shared`)
- **Karakteristik:** Komponen yang dapat digunakan kembali di berbagai fitur namun lebih kompleks daripada UI atomis (contoh: Navigation Bar, Sidebar, Empty State).

### 2.3. Composition Layer (`/composition`)
- **Karakteristik:** Pola desain di mana komponen UI digabungkan untuk membangun blok interface yang lebih besar secara deklaratif. Meminimalkan penggunaan "Prop Drilling".

### 2.4. Features Layer (`src/features/.../components`)
- **Karakteristik:** Komponen yang sangat spesifik untuk satu domain bisnis (contoh: `TicketCard`, `CommentList`). Komponen ini biasanya terhubung langsung dengan logika data domain tersebut.

## 3. Manajemen State & Sinkronisasi
- **Server State:** Dikelola sepenuhnya oleh `@tanstack/react-query`. Memberikan fitur caching, refetching on window focus, dan optimistic updates untuk UI yang lebih responsif.
- **URL State:** Menggunakan library `nuqs` untuk sinkronisasi state aplikasi (seperti filter pencarian, sorting, atau paginasi) langsung ke dalam query parameter URL. Ini memastikan state dapat dibagikan (shareable link) dan tetap ada setelah refresh halaman.
- **Form State:** Menggunakan `zod` untuk skema validasi yang konsisten antara sisi klien dan server.

## 4. Strategi Desain Sistem
- **Atomic Design Principles:** Meskipun tidak kaku, pembagian folder mengikuti prinsip dari atom (ui) ke organisme (features).
- **Responsive Design:** Menggunakan utilitas kelas Tailwind (sm:, md:, lg:) untuk memastikan interface optimal di berbagai ukuran layar.
- **Theming:** Mendukung Dark Mode dan Light Mode melalui `next-themes` dengan konfigurasi warna yang harmonis berbasis CSS Variables.

## 5. Data Flow / API Contract (Contoh: Create Ticket)

Proses pembuatan tiket melibatkan pertukaran data antara Client dan Server melalui Server Actions:

**Alur:**
1. **Client:** User mengisi form di `TicketForm` (Client Component).
2. **Validation:** Client memvalidasi data menggunakan skema `Zod`.
3. **Action Call:** Client memanggil `createTicketAction(formData)`.
4. **Server:** `createTicketAction` melakukan autentikasi sesi via `Lucia`.
5. **Database:** Prisma melakukan `db.ticket.create({...})` dengan context `organizationId` aktif.
6. **Revalidation:** Server memanggil `revalidatePath('/tickets')` untuk membersihkan cache halaman.
7. **Response:** Server mengembalikan objek `ActionState` (Success/Error).

**Struktur Data (API Contract):**
```typescript
// Request Payload (Zod Schema)
const TicketSchema = z.object({
  title: z.string().min(3),
  content: z.string().max(1024),
  bounty: z.number().nonnegative(),
  deadline: z.string()
});

// Response State
type ActionState = {
  status: "SUCCESS" | "ERROR";
  message: string;
  fieldErrors?: Record<string, string[]>;
};
```
