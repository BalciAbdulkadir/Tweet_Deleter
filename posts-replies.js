async function temizlikZamaniV4() {
    // --- AYARLAR ---
    const ATLANACAK_ADET = 10; // Kaç tane tweet kalsın?
    const HIZ_LIMITI = 2500; // İki silme arası bekleme (ms)
    const SIL_TEXT = "Sil"; 
    const RT_GERI_AL_TEXT = "Retweeti Geri Al"; 
    const DAHA_FAZLA_TEXT = "Daha fazla"; // İngilizce ise "More"
    // ----------------

    console.log(`🛡️ V4 Başlatılıyor: İlk ${ATLANACAK_ADET} gönderi korunacak.`);
    const bekle = (ms) => new Promise(res => setTimeout(res, ms));
    
    // --- ADIM 1: KORUMA KALKANI ---
    // İlk N adet tweeti bul ve işaretle
    let korunanSayisi = 0;
    // Sayfa başındaki butonları al
    let baslangicButonlari = document.querySelectorAll(`[aria-label="${DAHA_FAZLA_TEXT}"], [aria-label="More"]`);
    
    for (let i = 0; i < baslangicButonlari.length && i < ATLANACAK_ADET; i++) {
        let buton = baslangicButonlari[i];
        buton.setAttribute("data-isleniyor", "true"); // KOD BU BUTONU ARTIK GÖRMEZ
        
        // Görsel geri bildirim verelim (Kırmızı çerçeve içine alalım ki hangileri korundu gör)
        if(buton.closest('article')) {
            buton.closest('article').style.border = "3px solid green";
            buton.closest('article').style.opacity = "0.5";
        }
        korunanSayisi++;
    }
    console.log(`🛡️ Toplam ${korunanSayisi} adet gönderi koruma altına alındı (Yeşil çerçeveli).`);
    console.log("🔥 Kalanlar için temizlik başlıyor...");
    await bekle(1000);

    // --- ADIM 2: TEMİZLİK DÖNGÜSÜ ---
    let islemSayisi = 0;
    let bosGecmeSayisi = 0;

    while (true) {
        try {
            // Sadece "data-isleniyor" etiketi OLMAYANLARI seç
            let butonlar = document.querySelectorAll(`[aria-label="${DAHA_FAZLA_TEXT}"]:not([data-isleniyor="true"]), [aria-label="More"]:not([data-isleniyor="true"])`);

            if (butonlar.length === 0) {
                console.log(`⚠️ Silinecek yeni aday aranıyor... Kaydırılıyor... (${bosGecmeSayisi})`);
                window.scrollBy(0, 500);
                await bekle(3000);
                bosGecmeSayisi++;
                
                if (bosGecmeSayisi > 5) {
                    console.log("🛑 Sayfa sonu veya limit. İşlem bitti.");
                    break;
                }
                continue;
            }

            bosGecmeSayisi = 0; 
            let hedefButon = butonlar[0];

            // İşaretle ve devam et
            hedefButon.setAttribute("data-isleniyor", "true");

            // Görünür alana getir
            hedefButon.scrollIntoView({ behavior: 'smooth', block: 'center' });
            await bekle(300);
            
            hedefButon.click();
            await bekle(1000); // Menü açılması

            // Menüyü analiz et
            const menuItems = document.querySelectorAll('[role="menuitem"]');
            let aksiyonButonu = null;
            let islemTipi = "";

            for (let item of menuItems) {
                let text = item.innerText;
                if (text.includes(SIL_TEXT)) {
                    aksiyonButonu = item;
                    islemTipi = "SIL";
                    break;
                } else if (text.includes(RT_GERI_AL_TEXT)) {
                    aksiyonButonu = item;
                    islemTipi = "UNRETWEET";
                    break;
                }
            }

            if (aksiyonButonu) {
                console.log(`Target Acquired: ${islemTipi}`);
                aksiyonButonu.click();
                await bekle(1000); // Onay penceresi

                const onayButonu = document.querySelector('[data-testid="confirmationSheetConfirm"]') || 
                                   document.querySelector('[data-testid="unretweetConfirm"]');
                
                if (onayButonu) {
                    onayButonu.click();
                    islemSayisi++;
                    console.log(`✅ ${islemSayisi}. gönderi imha edildi.`);
                    await bekle(HIZ_LIMITI);
                } else {
                    console.log("❌ Onay butonu yok. İptal.");
                    document.body.click(); 
                }
            } else {
                console.log("⏩ Silinebilir değil (Yabancı tweet/Reklam). Atlanıyor.");
                document.body.click();
                await bekle(500);
            }

        } catch (e) {
            console.error("Hata:", e);
            await bekle(2000);
        }
    }
}

temizlikZamaniV4();