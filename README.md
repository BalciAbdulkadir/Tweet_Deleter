# 🧹 Twitter (X) Mass Cleanup Scripts

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Platform](https://img.shields.io/badge/Platform-Browser%20Console-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)
![Maintenance](https://img.shields.io/badge/Maintenance-Active-green?style=for-the-badge)

**No API keys. No expensive subscriptions. No password sharing.** Just pure, browser-based DOM manipulation to wipe your Twitter (X) history clean.

---

### 🌍 Language / Dil
[🇺🇸 **English**](#-english) | [🇹🇷 **Türkçe**](#-türkçe)

---

<a name="-english"></a>
## 🇺🇸 English

This repository contains advanced cleanup tools that run directly via your browser's developer console. It allows you to wipe your history without sharing your credentials with third-party apps or hitting "paywalls" on commercial tools.

### ⚠️ Disclaimer
> **Use at your own risk.** These scripts interact directly with the Twitter DOM. If Twitter updates its UI class names, these scripts might break. Performing actions too quickly may trigger temporary **Rate Limits** (you might be blocked from liking/deleting for 24h).

### 🛠️ The Scripts

| File Name | Function | Description |
| :--- | :--- | :--- |
| **`tweet-delete.js`** | **Delete Tweets & Replies** | Deletes posts from your profile. Includes a **"Safety Shield"** to protect your recent $N$ tweets. |
| **`repost.js`** | **Undo Retweets** | Targets only green (active) RT buttons. Keeps your original thoughts, removes the noise. |
| **`unlike.js`** | **Unlike Posts** | Rapidly unlikes posts you've previously liked. Fast execution. |

### ⚙️ Configuration & Features

#### 1. Tweet & Reply Deleter (`tweet-delete.js`)
* **Safety Shield:** Skips the first `N` tweets so your profile doesn't look empty.
* **Smart Scroll:** Automatically scrolls down when it runs out of tweets.
* **Config:** Change `const ATLANACAK_ADET = 10;` in the code to set how many tweets to keep.
* **Language Support:** If your Twitter UI is in English, ensure `const SIL_TEXT = "Delete";` is set correctly.

#### 2. Retweet Undoer (`repost.js`)
* **Precision:** Targets `data-testid="unretweet"`. It won't touch your own tweets.
* **Mechanism:** Simulates a user click on the green RT button and confirms "Undo Retweet".

#### 3. Unlike Tool (`unlike.js`)
* **Target:** Finds `data-testid="unlike"` (Red hearts).
* **Speed:** Direct click action, no confirmation dialogs needed.

### 🚀 How to Use

1.  Open **Twitter (X)** on a desktop browser (Chrome, Firefox, Edge, Brave).
    * *To delete Tweets:* Go to **Profile > Replies**.
    * *To undo RTs:* Go to **Profile**.
    * *To unlike:* Go to **Profile > Likes**.
2.  Press <kbd>F12</kbd> or right-click anywhere and select **Inspect**.
3.  Go to the **Console** tab.
4.  Copy the raw code from the relevant `.js` file in this repo.
5.  Paste it into the console and hit <kbd>Enter</kbd>.

> **💡 Pro Tip:** To stop the script at any time, simply **refresh the page** (F5).

---

<a name="-türkçe"></a>
## 🇹🇷 Türkçe

Bu depo, Twitter (X) API'sine ihtiyaç duymadan, doğrudan tarayıcı konsolu üzerinden çalışan gelişmiş temizlik araçlarını içerir. Paranızı ve şifrenizi üçüncü parti uygulamalara kaptırmadan geçmişinizi temizleyin.

### ⚠️ Önemli Uyarı
> **Sorumluluk size aittir.** Bu kodlar Twitter arayüzü (DOM) ile etkileşime girer. Twitter tasarım değiştirirse kodlar çalışmayabilir. Ayrıca çok hızlı işlem yapmak hesabınızın geçici olarak kısıtlanmasına (**Rate Limit**) neden olabilir.

### 🛠️ İçerikteki Araçlar

| Dosya Adı | Görev | Açıklama |
| :--- | :--- | :--- |
| **`tweet-delete.js`** | **Tweet ve Yanıt Silici** | Profilinizdeki gönderileri siler. **"Koruma Kalkanı"** sayesinde son paylaşımlarınız kalır. |
| **`repost.js`** | **RT Geri Alıcı** | Sadece Retweet'leri hedef alır. Kendi yazdıklarınıza dokunmaz. |
| **`unlike.js`** | **Beğeni Sıfırlayıcı** | Beğendiğiniz gönderileri (Like) seri şekilde geri çeker. |

### ⚙️ Ayarlar ve Özellikler

#### 1. Tweet ve Yanıt Silici (`tweet-delete.js`)
* **Koruma Kalkanı:** En son attığınız `N` adet tweeti pas geçer, eskileri siler.
* **Akıllı Kaydırma:** Sayfa sonuna gelince otomatik aşağı kaydırır ve yeni tweet arar.
* **Ayar:** Kodun başındaki `const ATLANACAK_ADET = 10;` satırını değiştirerek kaç tweetin silinmeyeceğini seçebilirsiniz.

#### 2. Retweet Geri Alıcı (`repost.js`)
* **Hedef:** Sadece yeşil renkli (aktif) RT butonlarını (`data-testid="unretweet"`) görür.
* **Mekanizma:** Yeşil butona tıklar ve açılan menüden "Retweeti Geri Al" onayını verir.

#### 3. Beğeni Sıfırlayıcı (`unlike.js`)
* **Hedef:** Kırmızı kalpleri (`data-testid="unlike"`) bulur ve söndürür.
* **Hız:** Onay penceresiyle uğraşmaz, doğrudan tıklar ve geçer.

### 🚀 Nasıl Kullanılır?

1.  Bilgisayardan (Chrome, Firefox, Edge vb.) **Twitter (X)** profilinize girin.
    * *Tweet silmek için:* **Profil > Yanıtlar** sekmesine gidin.
    * *RT silmek için:* **Profil** ana sekmesine gidin.
    * *Beğeni silmek için:* **Profil > Beğeniler** sekmesine gidin.
2.  Klavyeden <kbd>F12</kbd> tuşuna basın veya sağ tık yapıp **İncele (Inspect)** deyin.
3.  Açılan panelden **Console** (Konsol) sekmesine tıklayın.
4.  İlgili `.js` dosyasındaki kodu kopyalayın ve konsola yapıştırın.
5.  <kbd>Enter</kbd> tuşuna basın ve yaslanın.

> **💡 İpucu:** Scripti durdurmak isterseniz sayfayı yenilemeniz (F5) yeterlidir.

---
<div align="center">

*Made with AI* <sub>Bu araçlar açık kaynaklıdır ve geliştirilmeye açıktır.</sub>

</div>