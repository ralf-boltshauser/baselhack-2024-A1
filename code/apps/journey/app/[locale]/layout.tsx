import "@repo/ui/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next";
import Navbar from "~/components/navbar";
import Providers from "~/components/providers";
import { I18nProviderClient } from "~/locales/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pax Journey",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}): JSX.Element {
  const { locale } = params;

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <I18nProviderClient locale={locale}>
          <NuqsAdapter>
            <Providers>
              <Navbar />
              <div className="mx-auto max-w-3xl px-5">{children}</div>
            </Providers>
          </NuqsAdapter>
        </I18nProviderClient>
      </body>
    </html>
  );
}
