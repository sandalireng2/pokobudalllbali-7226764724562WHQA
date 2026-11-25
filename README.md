# Cloudflare Pages Geo Redirect

HTTP 302 redirect menggunakan Cloudflare Pages Functions.

## Aturan tujuan

- Indonesia (`ID`): YouTube
- Negara lain yang terdeteksi: Instagram atau Facebook, dipilih acak
- Negara tidak diketahui (`undefined`, kosong, atau `XX`): HTTP 503

## Distribusi acak

Untuk setiap permintaan dari negara selain Indonesia:
- Instagram: peluang 50%
- Facebook: peluang 50%

Persentase adalah peluang per permintaan, bukan jaminan jumlah pengunjung akhir tepat sama.

## Fitur

- Pemeriksaan negara dilakukan di server melalui `request.cf.country`
- Tidak memerlukan JavaScript di browser
- Pemilihan acak menggunakan `crypto.getRandomValues`
- Redirect sementara HTTP 302
- Header no-cache pada respons redirect

## Struktur

```text
repository/
├── index.html
├── README.md
└── functions/
    └── index.js
```

## Deployment Cloudflare Pages

Hubungkan repository GitHub ini ke Cloudflare Pages.

- Framework preset: None
- Root directory: `/` (root repository)
- Build command: kosongkan
- Build output directory: `/` (root repository)

Pastikan folder `functions` berada langsung di root repository agar Cloudflare Pages mengenalinya.

## Catatan pengujian

Hasil deteksi negara bergantung pada geolokasi IP Cloudflare. VPN, proxy, dan basis data geolokasi yang tidak akurat dapat menghasilkan klasifikasi negara yang keliru. Lokasi yang tidak tersedia menghasilkan 503, bukan dialihkan ke tujuan luar.
