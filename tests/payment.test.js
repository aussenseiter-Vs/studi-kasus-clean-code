const { proses } = require("../src/payment");
// Jika ingin mengetes hasil refactoring, ganti import di atas menjadi:
// const { calculateDiscountedFee: proses } = require('../src/payment.refactored');

describe("Pengujian Logika Modul Pembayaran", () => {
  test("Harus mengembalikan 0 jika data siswa null", () => {
    expect(proses(null, 100000)).toBe(0);
  });

  test("Harus mengembalikan 0 jika saldo/fee <= 0", () => {
    expect(proses({ status: 1 }, 0)).toBe(0);
    expect(proses({ status: 1 }, -50000)).toBe(0);
  });

  test("Harus tidak memberikan diskon jika siswa belum lunas (status 0)", () => {
    expect(proses({ status: 0 }, 100000)).toBe(100000);
  });

  test("Harus memberikan diskon 5% jika siswa lunas (status 1)", () => {
    // 100.000 - 5% = 95.000
    expect(proses({ status: 1 }, 100000)).toBe(95000);
  });
});
