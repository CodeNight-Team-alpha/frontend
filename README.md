# Cashback Battle Arena — Frontend

React + TypeScript frontend. Giriş (isim), dashboard, sıralama ve bildirim geçmişi sayfalarını içerir.

## Gereksinimler

- Node.js 18+
- Backend API'nin **http://localhost:8080** üzerinde çalışıyor olması

## Kurulum ve çalıştırma

```bash
npm install
npm run dev
```

Tarayıcıda http://localhost:5173 açılır. Backend farklı bir portta ise `.env` içinde `VITE_API_BASE_URL` değerini güncelleyin (örn. `http://localhost:8080`).

## Build

```bash
npm run build
npm run preview   # production önizleme
```

## Özellikler

- **Giriş:** Sadece isim (display name) ile giriş; backend'deki kullanıcı ile eşleşir.
- **Dashboard:** Metrikler (günlük haftalık harcama vb.), toplam puan, seçilen challenge, öne çıkan rozet (en yüksek threshold), bugünkü bildirimler.
- **Sıralama:** Leaderboard; kullanıcı başına en yüksek rozet gösterilir.
- **Bildirim geçmişi:** Tüm bildirimler tarih/sıra ile listelenir.

Mimari: `api/`, `services/`, `store/`, `types/`, `components/`, `pages/` (design.md ile uyumlu).
