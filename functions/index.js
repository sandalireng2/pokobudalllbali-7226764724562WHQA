const URL_INDONESIA = "https://www.youtube.com/";

const URL_LUAR = [
  "https://www.instagram.com/",
  "https://www.facebook.com/"
];

export async function onRequest(context) {
  const request = context.request;

  // Hanya menerima permintaan navigasi GET dan HEAD.
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { "Allow": "GET, HEAD" }
    });
  }

  // Negara berdasarkan IP yang dikenali Cloudflare.
  const country = request.cf?.country;

  let destination;

  // Prioritaskan Indonesia sebelum menjalankan random.
  if (country === "ID") {
    destination = URL_INDONESIA;
  } else if (country && country !== "XX") {
    // Untuk negara lain: peluang 50:50 pada setiap permintaan.
    const random = new Uint8Array(1);
    crypto.getRandomValues(random);
    destination = URL_LUAR[random[0] & 1];
  } else {
    // Lokasi tidak diketahui: jangan salah mengarahkan.
    return new Response(
      "Lokasi IP tidak dapat diverifikasi. Silakan coba kembali.",
      {
        status: 503,
        headers: {
          "Content-Type": "text/plain; charset=UTF-8",
          "Cache-Control": "no-store"
        }
      }
    );
  }

  return new Response(null, {
    status: 302,
    headers: {
      "Location": destination,
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      "Pragma": "no-cache",
      "Expires": "0"
    }
  });
}
