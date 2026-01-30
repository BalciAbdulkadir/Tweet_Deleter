async function kalpKiranScript() {
    // --- AYARLAR ---
    const HIZ_LIMITI = 1000; // Beğeni çekmek hızlıdır, 1 saniye yeter. Çok hızlanırsan Twitter seni bot sanıp engeller.
    const KAYDIRMA_PIXEL = 600;
    // ----------------

    console.log("💔 Kalp Kırma Operasyonu Başlıyor...");
    const bekle = (ms) => new Promise(res => setTimeout(res, ms));
    
    let islemSayisi = 0;
    let bosGecmeSayisi = 0;

    while (true) {
        try {
            // 1. Sadece "unlike" ID'sine sahip (yani Kırmızı/Dolu) kalpleri bul
            // data-testid="like" olanlar zaten beğenilmemiştir, onlara dokunmuyoruz.
            let kirmiziKalpler = document.querySelectorAll('[data-testid="unlike"]:not([data-isleniyor="true"])');

            if (kirmiziKalpler.length === 0) {
                console.log(`⚠️ Görünürde kırmızı kalp kalmadı. Aşağı iniliyor... (${bosGecmeSayisi})`);
                window.scrollBy(0, KAYDIRMA_PIXEL);
                await bekle(2500); // Yükleme süresi
                bosGecmeSayisi++;
                
                                continue;
            }

            bosGecmeSayisi = 0; // Hedef bulduk
            let hedefButon = kirmiziKalpler[0];

            // 2. İşaretle
            hedefButon.setAttribute("data-isleniyor", "true");

            // Görünür alana getir
            hedefButon.scrollIntoView({ behavior: 'smooth', block: 'center' });
            await bekle(300);
            
            // 3. TIKLA (Onay penceresi yoktur, direkt söner)
            console.log("💔 Beğeni geri çekiliyor...");
            hedefButon.click();
            
            islemSayisi++;
            console.log(`✅ ${islemSayisi} beğeni silindi.`);
            
            await bekle(HIZ_LIMITI);

        } catch (e) {
            console.error("Hata:", e);
            await bekle(2000);
        }
    }
}

kalpKiranScript();