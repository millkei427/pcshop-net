// PC Shop 第三方追蹤代碼設定檔
// 請將下方的 placeholder 替換為實際 ID，然後重新部署網站。

(function () {
  // ===== Meta Pixel =====
  // 替換 META_PIXEL_ID 為你的 Facebook / Meta Pixel ID
  var META_PIXEL_ID = 'REPLACE_META_PIXEL_ID';

  if (META_PIXEL_ID && META_PIXEL_ID.indexOf('REPLACE') === -1) {
    !function(f,b,e,v,n,t,s){
      if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', META_PIXEL_ID);
    fbq('track', 'PageView');
  }

  // ===== Google Ads Remarketing =====
  // 替換 GOOGLE_ADS_ID 為你的 Google Ads Conversion ID（格式如 AW-123456789）
  var GOOGLE_ADS_ID = 'REPLACE_GOOGLE_ADS_ID';

  if (GOOGLE_ADS_ID && GOOGLE_ADS_ID.indexOf('REPLACE') === -1) {
    var gas = document.createElement('script');
    gas.async = true;
    gas.src = 'https://www.googletagmanager.com/gtag/js?id=' + GOOGLE_ADS_ID;
    document.head.appendChild(gas);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GOOGLE_ADS_ID);
  }
})();
