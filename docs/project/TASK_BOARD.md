# 📌 Restaurant Landing System Single Source of Truth: TASK BOARD

Dokumen ini adalah papan kendali operasional untuk perbaikan audit dan pengembangan Restaurant Landing System.
Task dikelompokkan berdasarkan **Milestone**. Seluruh pekerjaan mengacu pada [Project Principles](../00_STRATEGY/01_Project_Principles.md), [ROADMAP.md](../ROADMAP.md), dan [DEFINITION_OF_DONE.md](../DEFINITION_OF_DONE.md).

---

## 📊 Overall Progress: 21% (3/14 Tasks Completed)

- **M1 - Critical Bug Fixes & Reservation Flow:** 2/2 (DONE)
- **M2 - Accessibility & Semantic Structure:** 1/2
- **M3 - Performance & UX Optimization:** 0/4
- **M4 - SEO & Design Consistency:** 0/3
- **M5 - Architecture & Multi-Client Engine:** 0/2
- **M6 - Quality Assurance & CI/CD Pipeline:** 0/1

---

## 📋 BACKLOG & ACTIVE TASKS

---

## M1 - Critical Bug Fixes & Reservation Flow
*(Menangani celah kehilangan data reservasi dan validasi formulir)*

### [TASK-101] Reservation Date & Input Validation
- **Description:** Cegah pengiriman reservasi tanggal lampau dan tambahkan sanitasi input serta feedback form yang jelas.
- **Priority:** High
- **Status:** DONE
- **Dependencies:** None
- **Acceptance Criteria:** 
  1. Input tanggal memiliki atribut `min` diset ke hari ini (`new Date().toISOString().split('T')[0]`).
  2. Pengguna tidak dapat memilih tanggal di masa lalu.
  3. Validasi nomor telepon dan email berjalan sebelum status form berubah.
- **Progress:** 100%
- **Related Docs:** [AUDIT_REPORT.md](../AUDIT_REPORT.md) (Finding #2)
- **Notes:** Diimplementasikan di `src/sections/ReservationCTA.tsx`. Ditambahkan inline error message berbasis ARIA, validasi tanggal minimum hari ini, serta sanitasi nama, email, dan nomor telepon.

### [TASK-102] Functional Reservation Handling & Confirmation Dispatch
- **Description:** Implementasikan alur reservasi fungsional agar data tamu tersimpan dan diteruskan (via WhatsApp Direct booking / Email dispatch / Webhook), serta sediakan status konfirmasi yang persisten di LocalStorage.
- **Priority:** High
- **Status:** DONE
- **Dependencies:** TASK-101
- **Acceptance Criteria:**
  1. Data formulir tidak hilang begitu saja saat disubmit.
  2. Sediakan opsi redirect konfirmasi langsung ke WhatsApp resmi restoran dengan pre-filled message atau integrasi API/webhook.
  3. Terdapat banner/disclaimer transparan bahwa pesanan telah tercatat atau dalam mode demo jika belum ada backend live.
- **Progress:** 100%
- **Related Docs:** [AUDIT_REPORT.md](../AUDIT_REPORT.md) (Finding #1)
- **Notes:** Diimplementasikan di `src/sections/ReservationCTA.tsx`. Booking otomatis menghasilkan kode referensi (`GS-XXXXX`), tersimpan persisten di `localStorage` (`gilded_spoon_reservations`), dan menyediakan tombol direct notification ke WhatsApp dengan detail lengkap pemesanan.

---

## M2 - Accessibility & Semantic Structure
*(Memenuhi standar Accessibility by Default - WCAG 2.1)*

### [TASK-201] Heading Level Hierarchy Alignment
- **Description:** Perbaiki struktur heading pada `SectionTitle` agar subtitle/eyebrow tidak merusak dokumen outline screen reader.
- **Priority:** Medium
- **Status:** TESTING
- **Dependencies:** None
- **Acceptance Criteria:**
  1. Eyebrow/subtitle diubah dari tag `<h3>` menjadi semantik `<p>` atau `<span>` dengan styling yang tetap identik.
  2. Judul section utama tetap menggunakan tag `<h2>` yang valid.
  3. Dokumen outline logis: `<h1>` (Hero) ➔ `<h2>` (Sections).
- **Progress:** 100%
- **Related Docs:** [AUDIT_REPORT.md](../AUDIT_REPORT.md) (Finding #5)
- **Notes:** `SectionTitle.tsx` sekarang merender subtitle sebagai `<p>` dengan class visual yang sama. Build/lint perlu diverifikasi; manual UAT responsive masih menunggu validasi pengguna.

### [TASK-202] Accessible Interactive Elements & Lightbox Modal Trap
- **Description:** Ubah seluruh elemen interaktif ber-klik menjadi tombol semantik atau tambahkan peran keyboard (`tabIndex`, `role="button"`, ARIA dialog, scroll lock).
- **Priority:** Medium
- **Status:** READY
- **Dependencies:** None
- **Acceptance Criteria:**
  1. Kartu gallery di `Gallery.tsx` dan indikator scroll di `Hero.tsx` dapat diakses dan diaktifkan via keyboard (Tab, Enter, Space).
  2. Lightbox modal memiliki atribut `role="dialog"`, `aria-modal="true"`.
  3. Saat lightbox atau mobile menu terbuka, scroll pada background (`body`) terkunci (`overflow: hidden`).
- **Progress:** 0%
- **Related Docs:** [AUDIT_REPORT.md](../AUDIT_REPORT.md) (Finding #4)
- **Notes:** Komponen target: `src/sections/Gallery.tsx`, `src/sections/Hero.tsx`, `src/components/Navbar.tsx`.

---

## M3 - Performance & UX Optimization
*(Memenuhi standar Performance Always & Mobile First)*

### [TASK-301] High-Performance Scroll Observer
- **Description:** Ganti event listener scroll yang memicu layout reflow di setiap pixel dengan throttling atau `IntersectionObserver`.
- **Priority:** Medium
- **Status:** READY
- **Dependencies:** None
- **Acceptance Criteria:**
  1. Tidak ada forced reflow dari pembacaan `offsetTop`/`offsetHeight` berulang setiap kali window scroll.
  2. Navigasi aktif tetap terdeteksi mulus saat pengguna berpindah section.
  3. Event listener pasif `{ passive: true }` terpasang.
- **Progress:** 0%
- **Related Docs:** [AUDIT_REPORT.md](../AUDIT_REPORT.md) (Finding #3)
- **Notes:** Komponen target: `src/components/Navbar.tsx`.

### [TASK-302] Non-Blocking Font Delivery
- **Description:** Pindahkan `@import` Google Fonts dari dalam file CSS ke dalam tag `<link rel="preconnect">` dan `<link rel="stylesheet">` di `index.html`.
- **Priority:** Medium
- **Status:** READY
- **Dependencies:** None
- **Acceptance Criteria:**
  1. File `src/index.css` bersih dari baris `@import url(...)`.
  2. Font "Playfair Display" dan "Inter" dimuat via tag `<link rel="preconnect">` di `index.html` dengan `display=swap`.
  3. Meningkatkan skor FCP dan LCP Lighthouse.
- **Progress:** 0%
- **Related Docs:** [AUDIT_REPORT.md](../AUDIT_REPORT.md) (Finding #10)
- **Notes:** Target: `src/index.css`, `index.html`.

### [TASK-303] Image Lazy Loading & Aspect Ratio Stabilization
- **Description:** Tambahkan atribut native lazy loading dan decoding async pada gambar di bawah viewport fold untuk mencegah Cumulative Layout Shift (CLS).
- **Priority:** Low
- **Status:** READY
- **Dependencies:** None
- **Acceptance Criteria:**
  1. Semua elemen `<img>` di bawah fold (Menu, Gallery, About) memiliki `loading="lazy"` dan `decoding="async"`.
  2. Hero background image tetap `eager` atau `fetchpriority="high"`.
  3. Aspek rasio gambar stabil saat loading.
- **Progress:** 0%
- **Related Docs:** [AUDIT_REPORT.md](../AUDIT_REPORT.md) (Finding #12)
- **Notes:** Target: `src/sections/FeaturedMenu.tsx`, `src/sections/Gallery.tsx`, `src/sections/About.tsx`.

### [TASK-304] Mobile Navigation Polish & Gap Fix
- **Description:** Rapikan drawer navigasi mobile agar offset tinggi sesuai dengan state navbar (`isScrolled`) dan mencegah tumpang tindih.
- **Priority:** Low
- **Status:** READY
- **Dependencies:** TASK-202
- **Acceptance Criteria:**
  1. Drawer menu mobile menempel presisi di bawah navbar saat di-scroll maupun saat di posisi puncak.
  2. Transisi buka-tutup drawer halus tanpa gap visual.
- **Progress:** 0%
- **Related Docs:** [AUDIT_REPORT.md](../AUDIT_REPORT.md)
- **Notes:** Target: `src/components/Navbar.tsx`.

---

## M4 - SEO & Design Consistency
*(Memenuhi standar SEO First & Design First)*

### [TASK-401] Comprehensive SEO & Open Graph Metadata
- **Description:** Lengkapi metadata dokumen HTML dengan description, keywords, Open Graph, Twitter Card, dan Canonical URL.
- **Priority:** Medium
- **Status:** READY
- **Dependencies:** None
- **Acceptance Criteria:**
  1. `index.html` memiliki `<meta name="description">` yang kaya kata kunci kuliner mewah.
  2. Memiliki tag `og:title`, `og:description`, `og:image`, `og:type`, dan Twitter card metadata.
  3. Link share di WhatsApp/iMessage/Slack menampilkan kartu preview gambar yang menarik.
- **Progress:** 0%
- **Related Docs:** [AUDIT_REPORT.md](../AUDIT_REPORT.md) (Finding #7)
- **Notes:** Target: `index.html`.

### [TASK-402] Design Token & Palette Harmonization
- **Description:** Selaraskan warna aksen dan background di seluruh komponen dengan token tema yang konsisten.
- **Priority:** Low
- **Status:** READY
- **Dependencies:** None
- **Acceptance Criteria:**
  1. Seluruh penggunaan `text-amber-500` diubah menjadi `text-gold-500` (primary brand gold).
  2. `MainLayout.tsx` diselaraskan menggunakan `bg-zinc-950` konsisten dengan `body`.
  3. Kontras warna teks memenuhi rasio WCAG AA.
- **Progress:** 0%
- **Related Docs:** [AUDIT_REPORT.md](../AUDIT_REPORT.md) (Finding #11)
- **Notes:** Target: `src/components/SectionTitle.tsx`, `src/layouts/MainLayout.tsx`.

### [TASK-403] Functional Footer Links & Safe Anchor Handling
- **Description:** Perbaiki anchor link placeholder `href="#"` pada footer agar tidak membuat halaman melompat ke atas saat diklik.
- **Priority:** Low
- **Status:** READY
- **Dependencies:** None
- **Acceptance Criteria:**
  1. Icon sosial media mengarah ke profil resmi atau link aman `rel="noopener noreferrer"`.
  2. Link kebijakan privasi & syarat ketentuan tidak menyebabkan loncatan viewport (`href="#"`).
- **Progress:** 0%
- **Related Docs:** [AUDIT_REPORT.md](../AUDIT_REPORT.md) (Finding #13)
- **Notes:** Target: `src/components/Footer.tsx`.

---

## M5 - Architecture & Multi-Client Engine
*(Memenuhi prinsip One Codebase, Multi Client, & Configuration over Modification)*

### [TASK-501] Centralized Restaurant Configuration File
- **Description:** Ekstrak seluruh konten hardcoded (nama restoran, tagline, jam operasional, alamat, menu makanan, testimoni, foto gallery) ke dalam file konfigurasi terpusat berbasis TypeScript.
- **Priority:** High
- **Status:** READY
- **Dependencies:** None
- **Acceptance Criteria:**
  1. File `src/config/restaurant.config.ts` dibuat dengan TypeScript type contract yang ketat di `src/types/restaurant.ts`.
  2. Seluruh komponen membaca data dari configuration store/object tanpa hardcoded strings.
  3. Mengganti identitas klien (nama restoran, menu, kontak) dapat dilakukan hanya dengan mengubah satu file konfigurasi.
- **Progress:** 0%
- **Related Docs:** [Project Principles](../00_STRATEGY/01_Project_Principles.md) (Principle #5 & #6), [AUDIT_REPORT.md](../AUDIT_REPORT.md) (Finding #8)
- **Notes:** Target: `src/config/`, `src/types/`, dan semua komponen `src/sections/`.

### [TASK-502] Repository Cleanup & Lean Dependencies
- **Description:** Hapus konfigurasi usang dan paket linter yang tidak digunakan demi kebersihan dan efisiensi repository.
- **Priority:** Low
- **Status:** READY
- **Dependencies:** None
- **Acceptance Criteria:**
  1. File `tailwind.config.js` (legacy Tailwind v3) dihapus karena Tailwind v4 menggunakan CSS `@theme`.
  2. Paket linter yang tidak digunakan (`eslint*`) dan `.eslintrc.cjs` dibersihkan, mengukuhkan `oxlint` sebagai fast linter resmi.
  3. Direktori kosong yang tidak terpakai dibersihkan atau diberi file nyata.
- **Progress:** 0%
- **Related Docs:** [AUDIT_REPORT.md](../AUDIT_REPORT.md) (Finding #9)
- **Notes:** Target: `package.json`, `.eslintrc.cjs`, `tailwind.config.js`.

---

## M6 - Quality Assurance & CI/CD Pipeline
*(Memenuhi prinsip Long Term Maintainability)*

### [TASK-601] Test Suite Foundation & CI Pipeline Verification
- **Description:** Pasang framework testing (Vitest + React Testing Library) dan perbarui GitHub Actions workflow untuk menjalankan linter dan test sebelum proses build & deploy.
- **Priority:** Medium
- **Status:** READY
- **Dependencies:** TASK-101, TASK-501
- **Acceptance Criteria:**
  1. `npm test` menjalankan unit test komponen (misal: validasi form reservasi dan kalkulasi config).
  2. `.github/workflows/deploy.yml` menjalankan `npm run lint` dan `npm test` sebelum langkah `npm run build`.
  3. Deploy ke GitHub Pages hanya berjalan bila test dan lint berstatus PASS.
- **Progress:** 0%
- **Related Docs:** [AUDIT_REPORT.md](../AUDIT_REPORT.md) (Finding #6)
- **Notes:** Target: `package.json`, `.github/workflows/deploy.yml`, `tests/`.

---

## 🏁 DEFINITION OF DONE (SOP PENYELESAIAN)
Suatu task hanya boleh diubah statusnya menjadi **DONE** jika memenuhi kriteria:
1. Kode berhasil dikompilasi (`npm run build` sukses).
2. Linter bersih tanpa error (`npm run lint` PASS).
3. Pengujian fungsional di browser lulus tanpa runtime/console error.
4. Tampilan responsif di layar mobile dan desktop.
5. Sesuai dengan [DEFINITION_OF_DONE.md](../DEFINITION_OF_DONE.md).
