# Frontend Spec — Cashback Battle Arena React App

Bu klasör, **React frontend uygulamasını sıfırdan inşa etmek** için gereken tüm spesifikasyonu içerir. Yeni bir Cursor (veya IDE) projesi oluşturup bu dosyaları projeye kopyaladığınızda, bir AI asistanı **req.md → design.md → api.md → task.md** sırasıyla okuyup task.md’deki adımları uygulayarak tüm frontend’i bitirebilir.

## Dosyalar

| Dosya | Açıklama |
|-------|----------|
| **req.md** | İşlevsel gereksinimler: giriş (isim), dashboard, leaderboard (en yüksek rozet), bildirimler (bugün vs geçmiş). |
| **design.md** | Katmanlı mimari, klasör yapısı, routing, state, tech stack. |
| **api.md** | Backend endpoint’leri ve request/response şemaları; TypeScript tip örnekleri. |
| **task.md** | Sıralı implementasyon görevleri (Faz 1–8). Bu dosya takip edilerek uygulama baştan sona yazılır. |

## Kullanım

1. Yeni bir frontend projesi aç (boş klasör veya `npm create vite@latest` ile).
2. Bu `frontend-spec` klasörünü projeye kopyala veya içeriğini referans olarak kullan.
3. Cursor’da projeyi aç; prompt’ta şunu belirt:  
   *“docs/frontend-spec/req.md, design.md, api.md ve task.md dosyalarını oku. task.md’deki görevlere göre React frontend uygulamasını katmanlı mimari ile baştan sona oluştur.”*
4. Backend’in `http://localhost:8080` üzerinde çalıştığından emin ol.

## Backend

Frontend, aynı repo’daki backend API’yi kullanır. Login endpoint’i backend’e eklendi: **POST /api/v1/auth/login** (body: `{ "displayName": "..." }`).
