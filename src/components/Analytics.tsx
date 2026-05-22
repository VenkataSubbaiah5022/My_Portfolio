import Script from "next/script";
import {
  CLARITY_PROJECT_ID,
  GA_MEASUREMENT_ID,
  isAnalyticsEnabled,
} from "@/lib/analytics";

export function Analytics() {
  if (!isAnalyticsEnabled) {
    return null;
  }

  return (
    <>
      {GA_MEASUREMENT_ID ? (
        <>
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="beforeInteractive"
          />
          <Script id="google-analytics" strategy="beforeInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      ) : null}
      {CLARITY_PROJECT_ID ? (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
          `}
        </Script>
      ) : null}
    </>
  );
}
