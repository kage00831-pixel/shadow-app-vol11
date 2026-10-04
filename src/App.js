import React, { useState, useEffect } from "react";
import { Play, Square, CheckCircle2, RefreshCcw } from "lucide-react";

const PHRASES = [
  { ja: "まだ届いていない。", en: "It hasn't arrived yet.", point: "hasn't arrived yet" },
  { ja: "それはちょっと残念だ。", en: "That's a little disappointing.", point: "disappointing（残念な）" },
  { ja: "友達がいいコテージを予約してくれた。", en: "My friends booked a nice cottage.", point: "booked a nice cottage" },
  { ja: "仕事モードに戻るよ。", en: "I'll get back to work.", point: "get back to work（仕事に戻る）" },
  { ja: "食べる以外に何かした？", en: "Did you do anything else besides eating?", point: "besides ~（〜以外に）" },
  { ja: "何を食べたの？", en: "What did you have?", point: "have（食べる）" },
  { ja: "湖の周りを散歩した。", en: "We went for a walk around the lake.", point: "go for a walk（散歩に行く）" },
  { ja: "ほぼ毎日続けたい。", en: "I want to keep doing it almost every day.", point: "keep doing it（やり続ける）" },
  { ja: "雨が多かった。", en: "We had a lot of rain.", point: "had a lot of rain" },
  { ja: "雨で家から出られない。", en: "I'm stuck inside because of the rain.", point: "stuck inside（閉じ込められる）" },
  { ja: "YouTube以外には何か？", en: "Anything besides YouTube?", point: "besides（〜の他に）" },
  { ja: "最近ずっと天気が悪い。", en: "The weather has been bad lately.", point: "has been bad（ずっと悪い）" },
  { ja: "あまりストレスはない。", en: "I don't really have much stress.", point: "don't really have much ~" },
  { ja: "米国株式市場は今夜再開する。", en: "The U.S. stock market starts again tonight.", point: "starts again（再開する）" },
  { ja: "明日スムーズにいくように、今夜準備する。", en: "I'll prepare tonight so that tomorrow feels smooth.", point: "so that ~（〜するように）" },
  { ja: "渋滞を避けられるように早く出る。", en: "I'll leave early so that I can avoid traffic.", point: "avoid traffic（渋滞を避ける）" },
  { ja: "忘れないように書いておく。", en: "I'll write it down so that I don't forget.", point: "write it down（書き留める）" },
  { ja: "何がリラックスできた理由？", en: "What made it relaxing?", point: "What made it ~ ?（何が〜させた？）" },
  { ja: "ストレス具合はどう？", en: "How's your stress level?", point: "stress level" },
  { ja: "AIセクターを注視している。", en: "I'm keeping an eye on the AI sector.", point: "keep an eye on（注視する）" },
  { ja: "ほとんどの株はもう売ってある。", en: "I've already sold most of my stocks.", point: "have already sold（すでに売った）" },
  { ja: "自分にとっては普段のことじゃない。", en: "It's not usual for me.", point: "usual（いつもの、普通の）" },
  { ja: "それ、彼らしいね。", en: "That's typical of him.", point: "typical of ~（〜らしい、特有の）" },
  { ja: "それって普段からよくやるの？", en: "Is that typical for you?", point: "typical for you" },
  { ja: "レーバーデー明け初日だ。", en: "It's the first day after Labor Day.", point: "first day after ~" },
  { ja: "各セクターがどう動くか見る。", en: "I'll see how each sector moves.", point: "how each sector moves" },
  { ja: "金利を確認して、各セクターがどう動くか見る。", en: "I'll check the interest rates and see how each sector moves.", point: "interest rates（金利）" },
  { ja: "安くなれば、また買いやすくなる。", en: "If things get cheaper, it'll be easier to buy again.", point: "easier to buy（買いやすくなる）" },
  { ja: "今夜は米国株式市場が休場だ。", en: "The U.S. stock market is closed tonight.", point: "is closed（休場、閉まっている）" },
  { ja: "どうなったら「今夜うまくいった」と感じる？", en: "What would make you feel like tonight went smoothly?", point: "feel like ~（〜のように感じる）" },
  { ja: "次の試合を見るのが楽しみ。", en: "I'm excited to see his next fight.", point: "excited to see" },
  { ja: "彼のボクシングをもっと見たい。", en: "I want to see more boxing from him.", point: "see more ~ from him" },
  { ja: "観客が熱狂する。", en: "The crowd would go wild.", point: "go wild（熱狂する）" },
  { ja: "彼はMMAがそこまで好きじゃない。", en: "He doesn't like MMA that much.", point: "that much（そこまで）" },
  { ja: "しょっちゅう一緒に見る。", en: "We watch tennis and football together all the time.", point: "all the time（しょっちゅう、いつも）" },
  { ja: "機会があったら、いつか生で見に行く？", en: "Would you go see him live someday if you had the chance?", point: "if you had the chance（もし機会があったら）" },
  { ja: "きっと家族にとって特別だったんだろうね。", en: "It must have been really special for you and your family.", point: "must have been（〜だったに違いない）" },
  { ja: "久保のサインをもらった。", en: "I got Kubo's autograph.", point: "autograph（サイン）" },
  { ja: "何がそんなに特別だったの？", en: "What made it so special?", point: "What made it ~" },
  { ja: "話せてよかった。", en: "I'm glad we could talk about it.", point: "I'm glad ~（〜でよかった）" },
  { ja: "足がつった。", en: "My leg cramped up.", point: "cramp up（つる、痙攣する）" },
  { ja: "あまり長くウェイクボードできなかった。", en: "I couldn't go wakeboarding for very long.", point: "for very long（あまり長く）" },
  { ja: "友達に笑われた。", en: "My friends laughed at me.", point: "laugh at ~（〜を笑う）" },
  { ja: "結局、笑い話になった。", en: "It turned into a funny story.", point: "turn into（〜に変わる）" },
  { ja: "雨にはどう対処したの？", en: "How did you handle the rain?", point: "handle（対処する）" },
  { ja: "明日の準備をしている。", en: "I'm preparing for tomorrow.", point: "preparing for ~" },
  { ja: "それでもなお楽しめた。", en: "We still had fun.", point: "still（それでもなお）" },
  { ja: "また買いやすくなる。", en: "It'll be easier to buy again.", point: "easier to buy" },
  { ja: "悪天候でも、それでも楽しめた。", en: "We still had fun even with the bad weather.", point: "even with ~（〜があっても）" },
  { ja: "海外でプレーする日本人選手を主に見た。", en: "I mostly watched Japanese players playing abroad.", point: "mostly（主に） / abroad（海外で）" }
];

export default function ShadowingApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completed, setCompleted] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("shadowing-progress-vol11");
    if (saved) setCompleted(JSON.parse(saved));
    window.speechSynthesis.getVoices();
  }, []);

  const saveProgress = (newCompleted) => {
    setCompleted(newCompleted);
    localStorage.setItem("shadowing-progress-vol11", JSON.stringify(newCompleted));
  };

  const toggleComplete = (index) => {
    const newCompleted = { ...completed, [index]: !completed[index] };
    saveProgress(newCompleted);
  };

  useEffect(() => {
    let isCancelled = false;
    const playSequence = async () => {
      if (!isPlaying) return;
      window.speechSynthesis.cancel();
      const currentPhrase = PHRASES[currentIndex];

      window.speechSynthesis.speak(new SpeechSynthesisUtterance(" "));
      await new Promise(resolve => setTimeout(resolve, 500));

      await new Promise((resolve) => {
        const utJa = new SpeechSynthesisUtterance(currentPhrase.ja);
        utJa.lang = "ja-JP";
        utJa.onend = resolve;
        utJa.onerror = resolve;
        if (!isCancelled) window.speechSynthesis.speak(utJa);
      });

      if (isCancelled) return;
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (isCancelled) return;

      window.speechSynthesis.speak(new SpeechSynthesisUtterance(" "));
      await new Promise(resolve => setTimeout(resolve, 500));

      await new Promise((resolve) => {
        const utEn = new SpeechSynthesisUtterance(currentPhrase.en);
        const voices = window.speechSynthesis.getVoices();
        const bestVoice = voices.find(v => v.name.includes("Samantha")) || voices.find(v => v.lang === "en-US");
        if (bestVoice) utEn.voice = bestVoice;
        utEn.lang = "en-US";
        utEn.rate = 0.85;
        utEn.onend = resolve;
        utEn.onerror = resolve;
        if (!isCancelled) window.speechSynthesis.speak(utEn);
      });

      if (isCancelled) return;
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (isCancelled) return;

      if (currentIndex < PHRASES.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsPlaying(false);
      }
    };

    if (isPlaying) playSequence();
    else window.speechSynthesis.cancel();

    return () => { isCancelled = true; window.speechSynthesis.cancel(); };
  }, [currentIndex, isPlaying]);

  return (
    <div className="min-h-screen bg-gray-50 pb-36 font-sans">
      <div className="bg-white border-b sticky top-0 z-10 p-4 shadow-sm text-center">
        <h1 className="text-xl font-bold text-blue-600">SHADOWING VOL.11</h1>
        <div className="text-xs text-gray-500 mt-1">
          Progress: {Object.values(completed).filter(Boolean).length} / {PHRASES.length}
        </div>
      </div>
      <div className="max-w-md mx-auto p-4 space-y-4">
        {PHRASES.map((phrase, index) => (
          <div key={index} onClick={() => { setCurrentIndex(index); setIsPlaying(true); }}
            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${currentIndex === index ? "border-blue-500 bg-blue-50" : "border-white bg-white shadow-sm"}`}>
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-blue-400">#{index + 1}</span>
              <button onClick={(e) => { e.stopPropagation(); toggleComplete(index); }} className={completed[index] ? "text-green-500" : "text-gray-300"}>
                <CheckCircle2 size={24} />
              </button>
            </div>
            <p className="text-gray-600 text-sm mb-1">{phrase.ja}</p>
            <p className="text-lg font-bold text-gray-900 leading-tight">{phrase.en}</p>
            {phrase.point && <p className="text-xs text-blue-500 mt-2 font-semibold">💡 {phrase.point}</p>}
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t p-6 flex flex-col items-center shadow-2xl">
        <div className="flex items-center gap-8 mb-4">
          <button onClick={() => { setCurrentIndex(0); setIsPlaying(false); }} className="text-gray-400 hover:text-gray-600 transition-colors">
            <RefreshCcw size={28} />
          </button>
          <button onClick={() => setIsPlaying(true)} className="w-16 h-16 rounded-full flex items-center justify-center transition-all bg-blue-600 text-white shadow-blue-200 shadow-lg hover:bg-blue-700">
            <Play size={32} fill="white" className="ml-1" />
          </button>
          <button onClick={() => setIsPlaying(false)} className="w-16 h-16 rounded-full flex items-center justify-center transition-all bg-red-500 text-white shadow-red-200 shadow-lg hover:bg-red-600">
            <Square size={32} fill="white" />
          </button>
        </div>
      </div>
    </div>
  );
}
