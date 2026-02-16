# API Contract (api.md)

Backend base URL: `http://localhost:8080` (veya `VITE_API_BASE_URL`). Tüm tarihler ISO 8601 date: `YYYY-MM-DD`.

---

## 1. Auth

### POST /api/v1/auth/login

Giriş: display_name ile kullanıcı bulunur.

**Request body:**
```json
{ "displayName": "Ali" }
```

**Response 200:**
```json
{ "userId": "U2", "displayName": "Ali" }
```

**Response 401:** Kullanıcı bulunamadı (body boş).

**Response 400:** displayName boş veya yok.

---

## 2. User Snapshot (Dashboard)

### GET /api/v1/users/{userId}/snapshot?asOfDate=YYYY-MM-DD

- `asOfDate`: Opsiyonel. Verilmezse backend max transaction date veya bugünü kullanır.

**Response 200:**
```json
{
  "userId": "U1",
  "asOfDate": "2026-03-12",
  "metrics": {
    "spendToday": 481.00,
    "uniqueCategoriesToday": 1,
    "electronicsSpendToday": 481.00,
    "spend7d": 2865.00
  },
  "challenge": {
    "awardId": "AW-U1-2026-03-12",
    "challengeId": "C-04",
    "rewardPoints": 220,
    "triggeredChallengeIds": ["C-04", "C-03", "C-01"],
    "suppressedChallengeIds": ["C-03", "C-01"]
  },
  "points": { "totalPoints": 900.00 },
  "badges": [
    { "badgeId": "B-01", "badgeName": "Bronze", "threshold": 200 },
    { "badgeId": "B-02", "badgeName": "Silver", "threshold": 600 }
  ],
  "notifications": [
    { "id": 31, "sourceRef": "AW-U1-2026-03-12", "message": "Haftalık Aktif tamamlandı: +220 puan", "createdAt": "2026-02-16T22:02:40.217226Z" }
  ]
}
```

- `metrics`, `challenge`, `badges`, `notifications` null veya boş olabilir.

---

## 3. Leaderboard

### GET /api/v1/leaderboard?asOfDate=YYYY-MM-DD

- `asOfDate`: Opsiyonel.

**Response 200:**
```json
{
  "asOfDate": "2026-03-12",
  "top": [
    {
      "rank": 1,
      "userId": "U2",
      "displayName": "Ali",
      "totalPoints": 1340.00,
      "badges": [
        { "badgeId": "B-01", "badgeName": "Bronze", "threshold": 200 },
        { "badgeId": "B-02", "badgeName": "Silver", "threshold": 600 },
        { "badgeId": "B-03", "badgeName": "Gold", "threshold": 1000 }
      ]
    }
  ]
}
```

**Frontend kuralı:** Her entry için `badges` dizisinden **threshold değeri en yüksek** olan tek rozet kullanılacak (dashboard ve leaderboard gösterimi).

---

## 4. Notifications

### GET /api/v1/users/{userId}/notifications

Tüm bildirimler (tarih sırası backend’de). Bugünküleri ayırmak frontend’de (asOfDate veya createdAt ile).

**Response 200:** Array of:
```json
{
  "id": 31,
  "sourceRef": "AW-U1-2026-03-12",
  "message": "Haftalık Aktif tamamlandı: +220 puan",
  "createdAt": "2026-02-16T22:02:40.217226Z"
}
```

---

## 5. Challenge Awards (İsteğe bağlı)

### GET /api/v1/users/{userId}/challenge-awards

Kullanıcının tüm challenge ödülleri (tetiklenen / seçilen / bastırılan).

**Response 200:** Array of:
```json
{
  "awardId": "AW-U1-2026-03-12",
  "asOfDate": "2026-03-12",
  "triggeredChallengeIds": ["C-04", "C-03", "C-01"],
  "selectedChallengeId": "C-04",
  "suppressedChallengeIds": ["C-03", "C-01"],
  "rewardPoints": 220
}
```

---

## TypeScript Tip Örnekleri (Referans)

```ts
// types/index.ts
export interface LoginResponse { userId: string; displayName: string; }

export interface MetricsDto {
  spendToday: number | null;
  uniqueCategoriesToday: number | null;
  electronicsSpendToday: number | null;
  spend7d: number | null;
}

export interface ChallengeDto {
  awardId: string | null;
  challengeId: string | null;
  rewardPoints: number | null;
  triggeredChallengeIds?: string[];
  suppressedChallengeIds?: string[];
}

export interface BadgeDto { badgeId: string; badgeName: string; threshold: number; }

export interface NotificationDto {
  id: number;
  sourceRef: string;
  message: string;
  createdAt: string;
}

export interface UserSnapshotResponse {
  userId: string;
  asOfDate: string;
  metrics: MetricsDto | null;
  challenge: ChallengeDto | null;
  points: { totalPoints: number };
  badges: BadgeDto[];
  notifications: NotificationDto[];
}

export interface LeaderboardEntryDto {
  rank: number;
  userId: string;
  displayName: string;
  totalPoints: number;
  badges: { badgeId: string; badgeName: string; threshold: number }[];
}

export interface LeaderboardResponse {
  asOfDate: string;
  top: LeaderboardEntryDto[];
}
```
