"use client";

import QiblaDirection from "@/components/qibla/QiblaDirection";
import Head from "next/head";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Qibla");

  return (
    <div>
      <Head>
        <title>{t("title")}</title>
      </Head>

      <QiblaDirection />
    </div>
  );
}
