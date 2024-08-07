import React, { useState, useEffect, useCallback, useRef } from 'react';

const speakNumber = (num: number) => {
  const utterance = new SpeechSynthesisUtterance(num.toString());
  utterance.lang = 'ja-JP';
  window.speechSynthesis.speak(utterance);
};

const getNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

interface Props {
  locale: string;
}

const JapaneseNumberPractice = (props: Props) => {
  const { locale } = props;

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const number = useRef(getNumber(min, max));
  const incorrectCount = useRef(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [incorrect, setIncorrect] = useState('');
  const [correct, setCorrect] = useState('');

  const replayNumber = useCallback(() => {
    speakNumber(number.current);
  }, [number]);

  const checkAnswer = useCallback(() => {
    if (parseInt(userAnswer, 10) === number.current) {
      setCorrect(`Correct~! ${number.current}`);
      setTimeout(() => {
        setCorrect('');
      }, 1000);
      const randomNum = getNumber(min, max);
      number.current = randomNum;
      speakNumber(randomNum);
      setUserAnswer('');
      incorrectCount.current = 0;
      setIncorrect('');
    } else {
      incorrectCount.current += 1;
      speakNumber(number.current);
      setUserAnswer('');
      if (incorrectCount.current >= 3) {
        setIncorrect(`Incorrect! ${number.current}`);
      } else {
        setIncorrect(`Incorrect!`);
      }
    }
  }, [userAnswer, number, min, max]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'g') {
        getRandomNumber();
      } else if (event.key === 'r') {
        replayNumber();
      } else if (event.key === 'Enter') {
        checkAnswer();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [replayNumber, checkAnswer]);

  const getRandomNumber = () => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    number.current = randomNum;
    setUserAnswer('');
    speakNumber(randomNum);
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setUserAnswer(e.target.value);
  };

  return (
    <div className="grid justify-center gap-2 p-4">
      <h1 className="text-center text-3xl">{locale === 'en' ? 'Japanese Number Practice' : '日文數字聽力練習'}</h1>

      {/* <button onClick={getRandomNumber}>Generate Random Number (g)</button> */}
      <div className="flex items-center gap-2">
        <input
          className="rounded border border-black p-2 text-center"
          type="number"
          value={min}
          onChange={(e) => {
            setMin(+e.target.value);
          }}
          placeholder={locale === 'en' ? 'Min' : '最小'}
        />
        <span>~</span>
        <input
          className="rounded border border-black p-2 text-center"
          type="number"
          value={max}
          onChange={(e) => setMax(+e.target.value)}
          placeholder={locale === 'en' ? 'Max' : '最大'}
        />
      </div>
      <input
        className="rounded border border-black p-2 text-center"
        autoFocus
        type="number"
        value={userAnswer}
        onChange={handleInputChange}
        placeholder={locale === 'en' ? 'Enter the number' : '輸入數字'}
      />
      <div className="flex justify-center gap-2">
        <button className="flex-1" onClick={checkAnswer}>
          {locale === 'en' ? 'Submit (enter)' : '確認（Enter）'}
        </button>
        <button className="flex-1" onClick={replayNumber}>
          {locale === 'en' ? 'Replay (r)' : '重播（R）'}
        </button>
      </div>
      {correct && <div className="text-center text-2xl text-green-500">{correct}</div>}
      {incorrect && <div className="text-center text-2xl text-red-500">{incorrect}</div>}
    </div>
  );
};

export default JapaneseNumberPractice;
