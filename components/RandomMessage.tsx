"use client";

import { useEffect, useState } from "react";
import { chooseRandom } from "~/libs/util";

const messages = [
  "今日も生きててえらい！", // エライさんから引用 https://www.rinear.net/materials/marvelous
  "み　て　る　よ", // みてるよから引用 https://www.rinear.net/materials/eyes
  "それね、ちょっと分かる", // 創造主botから引用 https://github.com/approvers/king-server
  "れーざーびーむ！", // メイジシミュレータから引用 https://www.rinear.net/materials/mage-simulator
  "よく眠る。突然しゃべる。", // Riniaの自己紹介文から引用
  "遠くへ行こう", // RineaRの筏から引用 https://rineat.net/
  "nice security, isn't it? :D" // isOddAPIから引用 https://isoddapi.studio.site/
];

export const RandomMessage = () => {
  const [message, setMessage] = useState<string>("...");

  useEffect(() => {
    setMessage(chooseRandom(messages));
  }, []);

  return <>{message}</>;
};
