'use client';

import { usePathname } from 'next/navigation';
import JapaneseNumberPractice from './JapaneseNumberPractice';

interface Props {
  params: { locale: string };
}

const HomePage = (props: Props) => {
  const pathname = usePathname();

  const {
    params: { locale },
  } = props;

  const laguageSelectOptions =
    locale === 'en'
      ? [
          { text: 'Chinese', locale: 'zh-TW' },
          { text: 'English', locale: 'en' },
        ]
      : [
          { text: '中文', locale: 'zh-TW' },
          { text: '英文', locale: 'en' },
        ];

  return (
    <div className="p-4">
      <header className="flex justify-center gap-2">
        {laguageSelectOptions.map((option) => {
          return (
            <a
              className={`${locale === option.locale ? 'underline' : ''} text-sm underline-offset-4`}
              key={option.locale}
              href={`/${option.locale}${pathname.replace(`/${locale}`, '')}`}
            >
              {option.text}
            </a>
          );
        })}
      </header>
      <JapaneseNumberPractice locale={locale} />
      <footer className="fixed bottom-2 left-0 flex w-full items-center justify-center gap-2">
        <p>&copy; 2024 Made by </p>
        <a className="underline" href="https://yeslee.me" target="_blank" rel="noopener noreferrer">
          Yes Lee
        </a>
        <a href="https://github.com/hiiamyes/higongo.yeslee.me" target="_blank" rel="noopener noreferrer">
          <img
            className="h-5"
            src="https://res.cloudinary.com/dsxispofm/image/upload/f_auto,q_auto,h_64/v1713779246/icons/github_eokz2j.svg"
            alt="GitHub"
          />
        </a>
      </footer>
    </div>
  );
};

export default HomePage;
