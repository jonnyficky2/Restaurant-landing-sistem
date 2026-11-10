# 📋 Restaurant Landing System: Repository Audit Report

Dokumen ini memuat hasil evaluasi dan audit komprehensif terhadap arsitektur, kualitas kode, aksesibilitas, performa, dan keselarasan dengan [Project Principles](./00_STRATEGY/01_Project_Principles.md).

---

## 1. Executive Summary

| Parameter | Status | Catatan |
|---|---|---|
| **Tech Stack** | Modern (React 19, Vite, Tailwind CSS v4, TS) | Build cepat (~190ms), dependencies mutakhir |
| **Visual & UI Quality** | Sangat Baik (Aesthetic Luxury Dining) | Tipografi Playfair Display & Inter serasi |
| **Functional Integrity** | Perlu Perbaikan (Kritis) | Data reservasi belum tersimpan/diteruskan |
| **Accessibility (a11y)** | Cukup (Butuh Peningkatan) | Heading tidak urut, gallery item butuh keyboard a11y |
| **Architecture (Multi-Client)**| Belum Terpisah | Data masih hardcoded di masing-masing TSX |
| **Testing & CI/CD** | Belum Ada | Belum ada unit test dan verifikasi lint di CI |

---

## 2. Detailed Findings

### A. Must Fix (Kritis)

#### 1. Data Reservasi Hilang Tanpa Pengiriman atau Penyimpanan
- **File:** `src/sections/ReservationCTA.tsx`
- **Deskripsi:** Form reservasi hanya menjalankan timer simulasi 1.5 detik (`setTimeout`) lalu menampilkan status sukses tanpa mengirimkan data ke backend, webhook, email, WhatsApp, ataupun menyimpannya ke LocalStorage.
- **Dampak:** Pengunjung riil mengira telah memesan meja, namun pihak restoran tidak pernah menerima data reservasi.
- **Rekomendasi:** Hubungkan dengan endpoint API, integrasikan direct dispatch ke WhatsApp / EmailJS, atau berikan disclaimer transparan.

#### 2. Tidak Ada Batasan Tanggal Reservasi (Bisa Memilih Masa Lalu)
- **File:** `src/sections/ReservationCTA.tsx`
- **Deskripsi:** Input `<input type="date">` tidak memiliki batasan nilai minimum (`min`).
- **Dampak:** Pengunjung dapat memilih tanggal kemarin atau tahun lalu dan form tetap menerima tanpa validasi.
- **Rekomendasi:** Tambahkan atribut `min={new Date().toISOString().split('T')[0]}`.

---

### B. Should Fix (Penting)

#### 3. Unthrottled Scroll Listener Memicu Forced Reflow
- **File:** `src/components/Navbar.tsx`
- **Deskripsi:** Event listener `scroll` memicu pembacaan `offsetTop` dan `offsetHeight` dari 7 elemen DOM pada setiap pixel scroll tanpa throttling atau observer.
- **Dampak:** Stuttering dan penurunan FPS pada perangkat mobile atau CPU berdaya rendah.
- **Rekomendasi:** Gunakan `IntersectionObserver` atau pasang `requestAnimationFrame` dengan `{ passive: true }`.

#### 4. Aksesibilitas Keyboard pada Elemen Interaktif (Gallery & Hero)
- **File:** `src/sections/Gallery.tsx`, `src/sections/Hero.tsx`
- **Deskripsi:** Kartu foto galeri dan tombol panah scroll hero menggunakan elemen `<div>` dengan event `onClick` tanpa `tabIndex`, `role="button"`, maupun handler tombol `Enter`/`Space`. Modal Lightbox juga belum mengunci scroll background.
- **Dampak:** Pengguna keyboard-only dan screen reader tidak dapat membuka gambar galeri.
- **Rekomendasi:** Gunakan elemen `<button type="button">` semantik, pasang atribut ARIA pada modal, dan aktifkan background scroll lock saat modal dibuka.

#### 5. Struktur Heading Terbalik (Pelanggaran Hierarki Semantik)
- **File:** `src/components/SectionTitle.tsx`
- **Deskripsi:** Subtitle menggunakan tag `<h3>` yang diletakkan tepat di atas judul section `<h2>`.
- **Dampak:** Membingungkan outline dokumen pada alat bantu aksesibilitas dan SEO crawler.
- **Rekomendasi:** Ubah subtitle menjadi elemen teks semantik `<p>` atau `<span>` dengan styling yang sama.

#### 6. Belum Ada Unit Test & Guardrail di CI Pipeline
- **File:** `package.json`, `.github/workflows/deploy.yml`
- **Deskripsi:** Tidak ada framework unit test (Vitest), dan GitHub Actions workflow langsung melakukan deploy tanpa mengecek `npm run lint` atau unit test terlebih dahulu.
- **Dampak:** Bug regresi pada form atau komponen dapat langsung ter-deploy ke produksi.
- **Rekomendasi:** Pasang Vitest + React Testing Library dan tambahkan step linter + test pada GitHub Actions.

#### 7. Metadata SEO & Social Media Share Masih Kosong
- **File:** `index.html`
- **Deskripsi:** Hanya terdapat `<title>`, tanpa `<meta name="description">`, Open Graph (`og:*`), dan Twitter Card.
- **Dampak:** Link yang dibagikan ke WhatsApp, Telegram, atau media sosial tidak memunculkan gambar dan deskripsi cuplikan.
- **Rekomendasi:** Tambahkan metadata lengkap pada `<head>`.

#### 8. Data Klien Masih Hardcoded (Bertentangan dengan Prinsip Multi-Client)
- **File:** `src/sections/*`, `src/components/Footer.tsx`
- **Deskripsi:** Prinsip proyek ke-5 dan ke-6 adalah "Multi Client" dan "Configuration over Modification". Namun saat ini seluruh nama restoran, menu, harga, jam buka, dan testimoni masih tertulis langsung di dalam komponen TSX, sementara folder `src/config/` kosong.
- **Dampak:** Setiap penggantian klien/rebranding membutuhkan perubahan kode di puluhan file komponen.
- **Rekomendasi:** Buat konfigurasi terpusat `src/config/restaurant.config.ts` dengan interface TypeScript yang jelas di `src/types/restaurant.ts`.

#### 9. Sisa Konfigurasi Usang & Dependensi Linter Berlebih
- **File:** `tailwind.config.js`, `.eslintrc.cjs`, `package.json`
- **Deskripsi:** Tailwind v4 sudah menggunakan `@theme` di dalam CSS sehingga `tailwind.config.js` tidak terpakai. Selain itu, proyek menggunakan `oxlint` tetapi masih menyimpan paket dependensi ESLint yang tidak dijalankan.
- **Dampak:** Menambah ukuran `node_modules` dan membingungkan developer mengenai tool styling/linting yang aktif.
- **Rekomendasi:** Hapus file legacy dan rapikan `devDependencies`.

---

### C. Nice to Have (Optimalisasi Ringan)

#### 10. External Font Menggunakan `@import` di CSS
- **File:** `src/index.css`
- **Deskripsi:** Mengimpor Google Fonts via `@import` di awal CSS memblokir proses rendering browser.
- **Rekomendasi:** Pindahkan ke tag `<link rel="preconnect">` pada `index.html`.

#### 11. Inkonsistensi Token Warna Aksen
- **File:** `src/components/SectionTitle.tsx`, `src/layouts/MainLayout.tsx`
- **Deskripsi:** Menggunakan `text-amber-500` alih-alih `text-gold-500`, dan `bg-gray-900` alih-alih `bg-zinc-950`.
- **Rekomendasi:** Seragamkan seluruh warna dengan palette `gold` dan `zinc`.

#### 12. Lazy Loading pada Gambar di Bawah Fold
- **File:** `src/sections/FeaturedMenu.tsx`, `src/sections/Gallery.tsx`
- **Deskripsi:** Gambar beresolusi tinggi belum memiliki atribut `loading="lazy"`.
- **Rekomendasi:** Tambahkan `loading="lazy"` dan `decoding="async"` untuk menghemat kuota mobile.

#### 13. Tautan Placeholder `#` Melompat ke Puncak Halaman
- **File:** `src/components/Footer.tsx`
- **Deskripsi:** Link sosial media dan kebijakan privasi menggunakan `href="#"`.
- **Rekomendasi:** Pasang tautan aman atau cegah default action navigasi.
