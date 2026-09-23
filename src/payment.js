/*
 * -----------------------------------------------------------------------------
 * CODE REVIEW — Fitur Diskon SPP
 * -----------------------------------------------------------------------------
 * Kode awal yang direview (isi asli file ini):
 *
 *   function proses(d, s) {
 *     // cek jika data tidak kosong
 *     if (d != null) {
 *       if (d.status == 1) { // 1 artinya sudah lunas pendaftaran
 *         if (s > 0) {
 *           let tmp = s - (s * 0.05); // kurangi saldo
 *           return tmp;
 *         }
 *       } else {
 *         return s;
 *       }
 *     }
 *     return 0;
 *   }
 *
 * Temuan review:
 *   1. [Naming]  `proses`, `d`, `s`, dan `tmp` tidak deskriptif; tidak jelas
 *                bahwa `d` = data siswa dan `s` = biaya SPP.
 *   2. [Magic numbers] `0.05` (diskon 5%) dan `1` (status lunas) tanpa nama —
 *                ubah keduanya menjadi konstanta bernama.
 *   3. [Komentar] Komentar seperti "cek jika data tidak kosong" hanya mengulang
 *                kode; business rule yang penting ("diskon 5% karena pendaftaran
 *                lunas") justru tidak dijelaskan.
 *   4. [Struktur] Nested if 3 tingkat menyulitkan pembacaan — ganti dengan
 *                guard clauses (return lebih awal).
 *   5. [Konsistensi] `d != null` tidak menangkap `undefined`, dan loose `==`
 *                membuat tipe status tidak eksplisit — gunakan `===`.
 *   6. [Return] Terlalu banyak jalur return dengan makna berbeda (0 vs fee asli),
 *                sehingga konsumen fungsi sulit membedakan "tanpa diskon" dan
 *                "input tidak valid".
 *   7. [Dokumentasi] Tidak ada JSDoc padahal ini fungsi domain (uang).
 *   8. Catatan: fee <= 0 untuk siswa belum lunas tetap dikembalikan apa adanya
 *                (perilaku asli dipertahankan agar kontrak lama tidak berubah).
 *
 * Refactoring di bawah menerapkan seluruh perbaikan di atas.
 * -----------------------------------------------------------------------------
 */

/**
 * Modul perhitungan diskon SPP.
 *
 * Business rule: Siswa yang sudah melunasi biaya pendaftaran mendapat diskon
 * SPP sebesar 5%.
 */

const DISCOUNT_RATE = 0.05; // Diskon 5% untuk siswa yang lunas pendaftaran.
const STATUS_PAID_REGISTRATION = 1; // Status siswa yang sudah melunasi pendaftaran.

/**
 * Menghitung biaya SPP setelah diskon.
 *
 * - Jika data siswa tidak valid (null/undefined) -> 0.
 * - Jika biaya (fee) <= 0 -> 0 (tidak ada biaya yang perlu dihitung).
 * - Jika siswa belum lunas pendaftaran -> biaya dikembalikan tanpa diskon.
 * - Jika siswa sudah lunas pendaftaran -> biaya dikurangi diskon 5%.
 *
 * @param {{ status: number }} student Data siswa. Diharapkan memiliki properti status.
 * @param {number} fee Biaya SPP sebelum diskon.
 * @returns {number} Biaya SPP setelah diskon, atau 0 jika input tidak valid.
 */
function calculateDiscountedFee(student, fee) {
  if (student == null) {
    return 0;
  }

  if (fee <= 0) {
    return 0;
  }

  if (student.status !== STATUS_PAID_REGISTRATION) {
    return fee;
  }

  return applyDiscount(fee, DISCOUNT_RATE);
}

/**
 * Menerapkan persentase diskon terhadap sebuah nominal.
 *
 * @param {number} amount Nominal sebelum diskon.
 * @param {number} rate Persentase diskon (contoh: 0.05 untuk 5%).
 * @returns {number} Nominal setelah diskon.
 */
function applyDiscount(amount, rate) {
  return amount - amount * rate;
}

module.exports = { calculateDiscountedFee };