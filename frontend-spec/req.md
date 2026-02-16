# Frontend Requirements (req.md)

Bu doküman, Cashback Battle Arena React frontend uygulamasının işlevsel gereksinimlerini tanımlar. Backend (Case 5 / REQUIREMENTS.md) ile uyumludur.

---

## 1. Giriş (Login)

| ID   | Gereksinim |
|------|------------|
| R1-1 | Kullanıcı **sadece isim (display name)** ile giriş yapacak; şifre yok. |
| R1-2 | Giriş, backend'deki `users` tablosunda `display_name` ile eşleşen kullanıcıyı bulur. |
| R1-3 | Eşleşme bulunamazsa hata mesajı gösterilir (401). |
| R1-4 | Giriş başarılı olunca kullanıcı bilgisi (userId, displayName) saklanır ve dashboard'a yönlendirilir. |

---

## 2. Dashboard (Kullanıcı Özeti)

| ID   | Gereksinim |
|------|------------|
| R2-1 | Giriş yapan kullanıcının **kendi metriklerini** göster: spendToday, uniqueCategoriesToday, electronicsSpendToday, spend7d. |
| R2-2 | **Toplam puan** (totalPoints) gösterilsin. |
| R2-3 | **Seçilen challenge** (o gün için): challengeId, rewardPoints; tetiklenen/bastırılan listeleri isteğe bağlı gösterilebilir. |
| R2-4 | **Rozetler**: Kullanıcının kazandığı tüm rozetler listelensin. **ÖNEMLİ:** Leaderboard'da birden fazla rozet geliyorsa, **en yüksek threshold değerine sahip tek rozet** "öne çıkan rozet" olarak dashboard'da kabul edilip gösterilsin (örn. Bronze + Silver + Gold varsa sadece Gold). |
| R2-5 | **Bildirimler (bugün):** Sadece bugüne ait bildirimler dashboard'da "bildirim" alanında gösterilsin (asOfDate = bugün veya son snapshot tarihi ile eşleşen sourceRef'ler). |
| R2-6 | asOfDate isteğe bağlı; verilmezse backend max transaction date veya bugünü kullanır. |

---

## 3. Leaderboard

| ID   | Gereksinim |
|------|------------|
| R3-1 | Mevcut **leaderboard API** kullanılsın: sıralama, userId, displayName, totalPoints, **rozet listesi (badges)**. |
| R3-2 | **ÖNEMLİ:** Response'ta bir kullanıcıda birden fazla rozet olabilir. Listede her kullanıcı için **en yüksek (max threshold) rozet** kabul edilip tek rozet gibi gösterilsin (örn. Bronze, Silver, Gold varsa sadece Gold göster). |
| R3-3 | asOfDate query param ile isteğe bağlı filtreleme. |

---

## 4. Bildirimler (Challenges → Notifications)

| ID   | Gereksinim |
|------|------------|
| R4-1 | **Bugünkü challenge bildirimleri** ana ekranda (dashboard veya ayrı bir "bildirimler" bileşeni) bildirim olarak gösterilsin. |
| R4-2 | Eski bildirimler **bildirim geçmişi** sayfasında listelensin (tarih/sıra ile). |
| R4-3 | Bildirim mesajları backend'de Türkçe (örn. "Günlük Harcama tamamlandı: +60 puan"); aynen gösterilsin. |

---

## 5. Genel Akış (Backend / Case Uyumu)

| ID   | Gereksinim |
|------|------------|
| R5-1 | Tüm veri backend API'den alınacak; backend projesi ve REQUIREMENTS.md / Case 5 ile uyumlu davranılacak. |
| R5-2 | Dashboard içeriği: FR-16 ile uyumlu (metrikler, challenge, puan, leaderboard özeti, rozetler, bildirimler). |
| R5-3 | Engine çalıştırma (admin) frontend kapsamı dışında; veri backend'de hazır kabul edilir. |

---

## 6. Kabul Kriterleri (Özet)

- Kullanıcı isim ile giriş yapabilir.
- Dashboard'da kendi metrikleri, puanı, (en yüksek) rozeti ve bugünkü bildirimler görünür.
- Leaderboard'da sıralama ve kullanıcı başına en yüksek rozet gösterilir.
- Bugünkü bildirimler ekranda, geçmiş bildirimler ayrı sayfada listelenir.
- Katmanlı mimari (api, services, state, components, pages) kullanılır.
