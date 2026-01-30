async function yesilButonAvcisi() {
    // --- AYARLAR ---
    const HIZ_LIMITI = 1500; // RT geri almak hızlıdır, çok beklemeye gerek yok
    const KAYDIRMA_PIXEL = 500;
    // ----------------

    console.log("🟢 Yeşil Buton (RT) Temizleyici Başlatılıyor...");
    const bekle = (ms) => new Promise(res => setTimeout(res, ms));
    
    let islemSayisi = 0;
    let bosGecmeSayisi = 0;

    while (true) {
        try {
            // 1. Sadece "unretweet" ID'sine sahip (yani Yeşil renkli, aktif) butonları bul
            // Bu ID sadece sen bir şeyi RT yaptıysan görünür.
            let yesilButonlar = document.querySelectorAll('[data-testid="unretweet"]:not([data-isleniyor="true"])');

            if (yesilButonlar.length === 0) {
                console.log(`⚠️ Görünürde yeşil RT butonu yok. Aşağı iniliyor... (${bosGecmeSayisi})`);
                window.scrollBy(0, KAYDIRMA_PIXEL);
                await bekle(2500); // Yüklenmesi için bekle
                bosGecmeSayisi++;
                
                if (bosGecmeSayisi > 10) {
                    console.log("🛑 Bayağıdır yeşil buton çıkmıyor. İşlem bitti sanırım.");
                    break;
                }
                continue;
            }

            bosGecmeSayisi = 0; // Buton bulduk, sayacı sıfırla
            let hedefButon = yesilButonlar[0];

            // 2. Bu butonu işaretle ki döngü buna takılıp kalmasın
            hedefButon.setAttribute("data-isleniyor", "true");

            // Görünür alana getir
            hedefButon.scrollIntoView({ behavior: 'smooth', block: 'center' });
            await bekle(500);
            
            // 3. YEŞİL BUTONA TIKLA
            console.log("🟢 Yeşil RT butonuna tıklanıyor...");
            hedefButon.click();
            await bekle(1000); // Küçük menünün (Dropdown) açılmasını bekle

            // 4. "Retweeti Geri Al" seçeneğine tıkla (Confirmation)
            // Açılan menüdeki onay butonu genellikle 'unretweetConfirm' ID'sine sahiptir.
            const onayButonu = document.querySelector('[data-testid="unretweetConfirm"]');
            
            if (onayButonu) {
                onayButonu.click();
                islemSayisi++;
                console.log(`✅ ${islemSayisi}. Retweet tarihe gömüldü.`);
                
                // Yeşil buton griye döneceği için DOM değişecek, biraz bekle
                await bekle(HIZ_LIMITI);
            } else {
                console.log("❌ Menü açıldı ama onay butonu bulunamadı. Garip.");
                // Menüyü kapatmak için boşluğa tıkla
                document.body.click();
            }

        } catch (e) {
            console.error("Hata:", e);
            await bekle(2000);
        }
    }
}

yesilButonAvcisi();