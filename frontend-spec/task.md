# Frontend Implementation Tasks (task.md)

Bu dosya, React frontend projesini **baştan sona** inşa etmek için sıralı görev listesidir. Yeni bir Cursor projesinde bu spec klasörünü açıp task.md'yi takip ederek tüm uygulamayı bitirin.

**Ön koşul:** `req.md`, `design.md`, `api.md` okunmuş olmalı. Backend `http://localhost:8080` üzerinde çalışıyor olmalı.

---

## Faz 1: Proje Kurulumu

- [ ] **1.1** Yeni React + TypeScript projesi oluştur (Vite: `npm create vite@latest . -- --template react-ts` veya CRA).
- [ ] **1.2** Bağımlılıkları ekle: `react-router-dom`. İsteğe bağlı: `@tanstack/react-query`, `axios`.
- [ ] **1.3** `.env` (veya `.env.local`) içinde `VITE_API_BASE_URL=http://localhost:8080` tanımla.
- [ ] **1.4** `src/` altında `api/`, `services/`, `store/`, `types/`, `components/`, `pages/`, `hooks/` klasörlerini oluştur.

---

## Faz 2: Tipler ve API Katmanı

- [ ] **2.1** `api.md` içindeki TypeScript tiplerini `src/types/index.ts` (veya types/*.ts) içine yaz.
- [ ] **2.2** `src/api/client.ts`: base URL kullanarak fetch/axios instance oluştur.
- [ ] **2.3** `src/api/auth.ts`: `login(displayName: string)` → POST `/api/v1/auth/login`, body `{ displayName }`. 200 ise `LoginResponse` döndür; 401/400 için hata fırlat veya sonuç nesnesi ile döndür.
- [ ] **2.4** `src/api/users.ts`: `getSnapshot(userId, asOfDate?)`, `getNotifications(userId)` (GET `/api/v1/users/:userId/snapshot`, `.../notifications`).
- [ ] **2.5** `src/api/leaderboard.ts`: `getLeaderboard(asOfDate?)` (GET `/api/v1/leaderboard`).

---

## Faz 3: Auth ve Routing

- [ ] **3.1** `src/store/AuthContext.tsx`: Context + Provider. State: `user: { userId, displayName } | null`. `login(displayName)` api/auth çağırır; başarılıysa state günceller (isteğe bağlı localStorage). `logout()` state’i null yapar.
- [ ] **3.2** `App.tsx`: React Router kur (BrowserRouter, Routes, Route). Route’lar: `/` → LoginPage, `/dashboard` → DashboardPage, `/leaderboard` → LeaderboardPage, `/notifications` → NotificationHistoryPage.
- [ ] **3.3** Koruma: Giriş yoksa `/dashboard`, `/leaderboard`, `/notifications` için Login’e yönlendiren bir guard (ProtectedRoute veya Route içinde kontrol). Giriş varken `/` ise `/dashboard`’a redirect.

---

## Faz 4: Login ve Dashboard

- [ ] **4.1** `src/pages/LoginPage.tsx`: İsim girişi için form (input + buton). Submit’te AuthContext.login(displayName) çağır; 401 ise "Kullanıcı bulunamadı" mesajı göster; başarılıysa navigate to `/dashboard`.
- [ ] **4.2** `src/services/badgeService.ts`: `getHighestBadge(badges: BadgeDto[]): BadgeDto | null` — threshold’u en yüksek olan tek rozeti döndür.
- [ ] **4.3** `src/services/snapshotService.ts` (isteğe bağlı): Snapshot’tan “bugünkü” bildirimleri ayıran helper (asOfDate ile aynı gün veya createdAt bugün).
- [ ] **4.4** `src/pages/DashboardPage.tsx`: AuthContext’ten userId al. getSnapshot(userId) ile veri çek (useEffect veya React Query). Göster: metrics (MetricCard’lar), points.totalPoints, challenge (seçilen), **tek öne çıkan rozet** (badgeService.getHighestBadge(badges)), **bugünkü bildirimler** (NotificationList). Layout: `Layout` + içerik.

---

## Faz 5: Leaderboard

- [ ] **5.1** `src/pages/LeaderboardPage.tsx`: getLeaderboard() ile veri çek. Tablo veya kart listesi: rank, displayName, totalPoints. Her satırda **tek rozet**: badgeService.getHighestBadge(entry.badges) ile en yüksek threshold’lu rozet göster.

---

## Faz 6: Bildirimler

- [ ] **6.1** Dashboard’da bugünkü bildirimler zaten gösteriliyor (Faz 4). Bugünküleri “bugün” ile filtrele (asOfDate veya createdAt).
- [ ] **6.2** `src/pages/NotificationHistoryPage.tsx`: getNotifications(userId) ile tüm bildirimleri al; tarih/sıra ile listele (en yeni üstte). Aynı NotificationList veya basit liste bileşeni kullanılabilir.

---

## Faz 7: Bileşenler ve UI

- [ ] **7.1** `Layout.tsx`: Üst bar (logo/ad, çıkış butonu), altında `<Outlet />` veya children. Sadece giriş yapılmış sayfalarda kullan.
- [ ] **7.2** `MetricCard.tsx`: Başlık + değer (örn. "Günlük harcama", spendToday).
- [ ] **7.3** `BadgeDisplay.tsx`: Tek rozet (badgeName, threshold veya ikon); dashboard’da en yüksek rozet, leaderboard’da satır başına en yüksek rozet.
- [ ] **7.4** `NotificationList.tsx`: message, createdAt gösteren liste; dashboard ve NotificationHistory’de kullan.

---

## Faz 8: Son Kontroller

- [ ] **8.1** Tüm API çağrıları base URL’i env’den kullanıyor mu kontrol et.
- [ ] **8.2** 401/400 ve ağ hatalarında kullanıcıya anlamlı mesaj gösterildiğini doğrula.
- [ ] **8.3** req.md’deki kurallar: (1) İsim ile giriş, (2) Dashboard’da en yüksek rozet, (3) Leaderboard’da en yüksek rozet, (4) Bugünkü bildirimler dashboard’da, geçmiş ayrı sayfada.
- [ ] **8.4** README’ye çalıştırma talimatı ekle: `npm install`, `npm run dev`, backend’in 8080’de çalışması gerektiği.

---

Bu task listesi tamamlandığında: giriş sayfası, kendi metriklerini gören dashboard (en yüksek rozet + bugünkü bildirimler), leaderboard (en yüksek rozet ile), bildirim geçmişi sayfası ve katmanlı mimari ile React frontend uygulaması hazır olacaktır.
