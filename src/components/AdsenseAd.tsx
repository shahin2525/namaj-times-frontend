"use client";
import { useEffect } from "react";

export default function AdsenseAd({ adSlot }: { adSlot: string }) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window) (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div className="my-4">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
