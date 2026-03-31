# Business Flow (Alur Bisnis)

## 1. Executive Summary
**Ticketing Apps** adalah solusi manajemen tugas yang dirancang untuk meningkatkan transparansi dan produktivitas dalam tim atau organisasi. Fokus utamanya adalah pada pelacakan isu/tugas yang terorganisir, di mana setiap tugas (tiket) dapat memiliki nilai insentif (_bounty_) dan tenggat waktu yang jelas. Aplikasi ini memecahkan masalah koordinasi tim yang sering tercecer dalam spreadsheet atau pesan singkat dengan menyediakan tempat tunggal untuk kolaborasi, diskusi, dan penyelesaian tugas.

## 2. User Personas (Aktor)
- **Super Administrator (Owner):** Orang yang membuat organisasi, mengelola keanggotaan, dan memiliki kontrol penuh atas seluruh tiket di organisasi tersebut.
- **Organization Admin:** Anggota yang memiliki hak akses untuk mengelola tugas dan mengundang anggota baru.
- **Member:** Pengguna umum yang berpartisipasi dalam pengerjaan tiket, memberikan komentar, dan memperbarui status tugas mereka sendiri.
- **Guest/New User:** Pengguna yang belum bergabung dengan organisasi manapun dan perlu mendaftar atau menerima undangan.

## 3. User Journey / Alur Bisnis Utama

### 3.1. Alur Onboarding & Autentikasi
1. **Registrasi:** Pengguna membuat akun menggunakan email dan username.
2. **Verifikasi:** Pengguna menerima kode verifikasi di email untuk mengaktifkan akun.
3. **Setup Organisasi:** Setelah masuk, pengguna dapat membuat organisasi baru atau menunggu undangan dari organisasi yang sudah ada.

### 3.2. Manajemen Organisasi & Keanggotaan
1. **Undangan:** Admin mengirimkan email undangan kepada calon anggota.
2. **Penerimaan:** Calon anggota menerima email, mengklik tautan, dan secara otomatis bergabung ke dalam organisasi.
3. **Manajemen Peran:** Admin dapat mengubah izin anggota (misal: izin menghapus tiket).

### 3.3. Siklus Hidup Tiket (Ticket Lifecycle)
1. **Penciptaan:** Pengguna membuat tiket baru dengan mengisi judul, deskripsi, nilai _bounty_, dan tanggal _deadline_.
2. **Diskusi:** Anggota lain memberikan komentar pada tiket untuk klarifikasi atau pembaruan progres.
3. **Pengerjaan:** Status tiket diubah dari `OPEN` menjadi `IN_PROGRESS`.
4. **Penyelesaian:** Setelah selesai, status diubah menjadi `DONE`.

## 4. Activity Diagram (Business Logic Flow)

```mermaid
activityDiagram
    start
    :User Sign-in;
    if (Has Organization?) then (No)
        :Create Organization;
    else (Yes)
        :Select Organization;
    endif
    
    partition "Ticket Management" {
        :Create Ticket;
        :Add Bounty & Deadline;
        :Publish Ticket;
        fork
            :Comment on Ticket;
        fork again
            :Update Status (OPEN -> IN_PROGRESS);
        end fork
        :Mark as DONE;
    }
    stop
```

Note: Diagram di atas merepresentasikan bagaimana alur kerja pengguna dari masuk aplikasi hingga menyelesaikan tugas utama.
