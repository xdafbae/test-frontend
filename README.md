# SharingVision Frontend
> **Test Submission by Dafa Yudistira**

Dashboard manajemen artikel menggunakan **React + Vite** dan **Tailwind CSS**.

## Requirements
- Node.js 18+ atau 20+

## Setup & Menjalankan di Lokal

1. **Clone repo**
   ```bash
   git clone <repo-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan Backend (Golang)**
   Pastikan backend Go (API) sudah berjalan di `http://localhost:8080`.
   *(Jika URL backend berbeda, Anda bisa mengedit `API_BASE_URL` di `src/api/posts.js`)*

4. **Jalankan Frontend**
   ```bash
   npm run dev
   ```

5. Akses aplikasi di `http://localhost:5173`

## Fitur Tersedia
Sesuai dengan spesifikasi PRD:
- **All Posts:** Melihat daftar artikel berdasarkan status (Published, Draft, Trashed). Terdapat fitur edit dan move to trash.
- **Add New:** Form untuk menambah artikel baru (publish/draft) beserta validasi form.
- **Edit Post:** Mengubah artikel yang sudah ada.
- **Preview:** Tampilan blog cards khusus untuk artikel yang berstatus `publish`, dilengkapi dengan sistem pagination.

## Tech Stack
- React 18
- Vite
- React Router v6
- Axios (untuk HTTP client)
- Tailwind CSS (styling)
- Lucide React (ikon SVG)
