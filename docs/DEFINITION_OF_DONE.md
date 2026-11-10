# ✅ Definition of Done (DoD)

Sebuah fitur atau perbaikan task **TIDAK BOLEH** dianggap selesai (DONE) apabila:
- Hanya berhasil di-compile atau build lokal saja.
- Menimbulkan regresi atau error visual di perangkat mobile.
- Mengabaikan pesan error atau warning linter.

---

Sebuah task dianggap **DONE** apabila memenuhi seluruh kriteria berikut:

1. **Berjalan Sesuai Kriteria Penerimaan (Acceptance Criteria):**
   - Fungsionalitas bekerja sesuai dengan deskripsi task pada `TASK_BOARD.md`.
2. **Kompilasi & Build Sukses:**
   - Perintah `npm run build` berjalan bersih tanpa error TypeScript maupun bundler Vite.
3. **Linter & Static Analysis Bersih:**
   - Perintah `npm run lint` selesai dengan status PASS (exit code 0).
4. **Semua Navigasi & Tombol Bekerja:**
   - Tidak ada link yang mengambang atau membuat halaman melompat tak terduga.
   - Smooth scroll bekerja dengan presisi pada desktop maupun mobile.
5. **Bebas Console Error:**
   - Pengujian browser tidak memunculkan runtime error atau React warning pada DevTools console.
6. **Desain & Responsivitas Teruji:**
   - Tampilan proporsional pada resolusi Mobile (375px - 414px), Tablet (768px), dan Desktop (>1024px).
   - Tipografi dan palet warna selaras dengan Design Token (`Playfair Display`, `Inter`, `gold-500`, `zinc-950`).
7. **Integritas Data & Konfigurasi:**
   - Tidak ada data penting yang hilang (seperti input formulir tamu).
   - Perubahan teks/konten mengutamakan konfigurasi terpusat (`Configuration over Modification`).
8. **Dokumentasi Terbarui:**
   - Status task pada `docs/project/TASK_BOARD.md` diperbarui beserta catatan implementasinya.
