Ini adalah kode awal (*bad code*) yang harus diperiksa dan diperbaiki oleh siswa.

```javascript
// PR: Fitur Hitung Diskon SPP
// Siswa harus merefactor fungsi ini!

function proses(d, s) {
  // cek jika data tidak kosong
  if (d != null) {
    if (d.status == 1) { // 1 artinya sudah lunas pendaftaran
      if (s > 0) {
        let tmp = s - (s * 0.05); // kurangi saldo
        return tmp;
      }
    } else {
      return s;
    }
  }
  return 0;
}

module.exports = { proses };