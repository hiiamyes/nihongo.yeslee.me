import NextUIProvider from '@/src/libs/nextui/NextUIProvider';
import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  maximumScale: 1,
  userScalable: false,
};

const TITLE = 'Nihongo x Software';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'en' ? TITLE : TITLE;
  const description = locale === 'en' ? TITLE : TITLE;
  const url = `https://nihongo.yeslee.com/${locale}`;
  return {
    title,
    description,
    openGraph: {
      // https://nextjs.org/docs/app/api-reference/functions/generate-metadata#opengraph
      title,
      description,
      url,
      siteName: TITLE,
      images: [],
      locale,
      type: 'website',
    },
    alternates: {
      canonical: url,
      languages: {
        en: 'https://nihongo.yeslee.me/en',
        'zh-TW': 'https://nihongo.yeslee.me/zh-TW',
      },
    },
  };
}

const RootLayout = async ({
  children,
}: Readonly<{
  params: { locale: string };
  children: React.ReactNode;
}>) => {
  const isDark = false;
  return (
    <html lang="en" className={`${isDark ? 'dark' : ''}`}>
      {process.env.NEXT_PUBLIC_GTM_ID && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />}
      <body>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
};

export default RootLayout;
