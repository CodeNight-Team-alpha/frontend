# Frontend Design (design.md)

React frontend için katmanlı mimari, klasör yapısı ve teknik kararlar.

---

## 1. Tech Stack

| Seçim        | Öneri |
|-------------|--------|
| Framework   | **React 18+** (Create React App veya Vite). |
| Dil         | TypeScript. |
| HTTP        | **fetch** veya **axios**; base URL env (örn. `VITE_API_BASE_URL`). |
| Routing     | **React Router v6**. |
| State       | **React Context** + **useState/useReducer** (auth + optional app state); sunucu verisi için **React Query (TanStack Query)** önerilir, isteğe bağlı. |
| UI          | CSS Modules veya Tailwind; bileşen kütüphanesi serbest (shadcn, MUI, vb.). |

---

## 2. Katmanlı Mimari (Klasör Yapısı)

```
src/
├── api/                    # Katman 1: Backend ile iletişim
│   ├── client.ts           # Axios/fetch instance, base URL
│   ├── auth.ts             # login(displayName)
│   ├── users.ts            # getSnapshot(userId, asOfDate?), getNotifications(userId), getChallengeAwards(userId)
│   └── leaderboard.ts      # getLeaderboard(asOfDate?)
├── services/               # Katman 2: İş mantığı (isteğe bağlı)
│   ├── authService.ts      # login, logout, getStoredUser
│   ├── snapshotService.ts  # dashboard verisi; bugünkü bildirimleri ayırma
│   └── badgeService.ts     # "en yüksek rozet" seçimi (max threshold)
├── store/                  # Katman 3: Global state (Context)
│   └── AuthContext.tsx     # user: { userId, displayName } | null, login, logout
├── types/                  # API response / request tipleri
│   └── index.ts            # Snapshot, LeaderboardEntry, BadgeInfo, Notification, vb.
├── components/             # Yeniden kullanılabilir UI
│   ├── Layout.tsx
│   ├── MetricCard.tsx
│   ├── BadgeDisplay.tsx    # Tek rozet veya "en yüksek" rozet
│   ├── NotificationList.tsx
│   └── ...
├── pages/
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── LeaderboardPage.tsx
│   └── NotificationHistoryPage.tsx
├── hooks/                  # Özel hook'lar (örn. useSnapshot, useLeaderboard)
│   └── ...
├── App.tsx
└── main.tsx
```

- **api/**: Sadece HTTP istekleri; DTO'ları olduğu gibi döndürür.
- **services/**: En yüksek rozet seçimi, bugünkü vs geçmiş bildirim ayrımı gibi kurallar.
- **store/**: Auth state; giriş yapmamışsa Login'e yönlendirme.
- **components/pages**: Sadece UI ve store/hooks kullanır; doğrudan api çağırmak yerine service veya hook tercih edilir.

---

## 3. Routing

| Path | Sayfa | Koruma |
|------|--------|--------|
| `/` | Login | Yok; zaten giriş yaptıysa Dashboard'a redirect. |
| `/dashboard` | Dashboard | Giriş gerekli. |
| `/leaderboard` | Leaderboard | Giriş gerekli. |
| `/notifications` | Bildirim geçmişi | Giriş gerekli. |

- Giriş yoksa `/dashboard`, `/leaderboard`, `/notifications` için Login'e yönlendir.
- Giriş varsa `/` isteğinde Dashboard'a yönlendir.

---

## 4. State ve Veri Akışı

- **Auth:** AuthContext. Login sonrası `userId` ve `displayName` saklanır (localStorage ile kalıcılık isteğe bağlı).
- **Dashboard:** `userId` ile snapshot alınır; metrics, challenge, points, badges, notifications kullanılır. Rozet için service: "en yüksek threshold" olan tek rozet.
- **Leaderboard:** API'den liste alınır; her satır için badges dizisinden max threshold'lu rozet alınır (service/hook içinde).
- **Bildirimler:** Snapshot'taki notifications veya `/users/:userId/notifications`. "Bugün" = asOfDate ile aynı gün veya son 1 gün; diğerleri geçmiş sayfada.

---

## 5. Önemli Kurallar (req.md ile Uyum)

1. **En yüksek rozet:** Bir kullanıcının birden fazla rozeti varsa `badges` listesinde `threshold` değeri en büyük olan tek rozet "öne çıkan" olarak kullanılır (dashboard ve leaderboard).
2. **Bugünkü bildirimler:** Snapshot'taki `notifications` veya notifications API cevabı, "bugün" ile sınırlanarak dashboard'da; tam liste bildirim geçmişi sayfasında.
3. **API base URL:** Ortam değişkeni (örn. `VITE_API_BASE_URL=http://localhost:8080`) ile ayarlanır.

---

## 6. Erişilebilirlik ve Responsive

- Form alanları label ile ilişkili; giriş hatası ekranda gösterilir.
- Mobil uyumlu (responsive) layout tercih edilir.
