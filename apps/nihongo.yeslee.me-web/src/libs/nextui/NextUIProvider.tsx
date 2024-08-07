'use client';

import { useRouter } from 'next/navigation';
import { NextUIProvider } from '@nextui-org/system';

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  return <NextUIProvider navigate={router.push}>{children}</NextUIProvider>;
};

export default Provider;
