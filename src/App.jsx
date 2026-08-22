import { useEffect } from "react";
import "./App.css";
import counterStore, { MIN, MAX } from "./stores/counterStore";
import CountBox from "./components/CountBox";

function App() {
  // App도 props를 받지 않고 스토어에서 직접 꺼내 씁니다.
  // CountBox와 App이 같은 스토어를 보고 있으므로 값이 항상 같이 움직입니다.
  const count = counterStore((state) => state.count);
  const increase = counterStore((state) => state.increase);
  const increaseBy = counterStore((state) => state.increaseBy);
  const decrease = counterStore((state) => state.decrease);
  const decreaseBy = counterStore((state) => state.decreaseBy);
  const reset = counterStore((state) => state.reset);

  const atMax = count >= MAX;
  const atMin = count <= MIN;

  // 키보드로도 조작할 수 있게 (추가 기능)
  //  ↑ ↓ : 1씩,  Shift + ↑ ↓ : 10씩,  R : 초기화
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        e.shiftKey ? increaseBy(10) : increase();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        e.shiftKey ? decreaseBy(10) : decrease();
      } else if (e.key === "r" || e.key === "R") {
        reset();
      }
    };
    window.addEventListener("keydown", onKey);
    // 컴포넌트가 사라질 때 이벤트를 반드시 정리합니다.
    return () => window.removeEventListener("keydown", onKey);
  }, [increase, increaseBy, decrease, decreaseBy, reset]);

  return (
    <div className="stage">
      <div className="damier" aria-hidden="true" />

      <main className="frame">
        <header className="head">
          <p className="head__eyebrow">Maison du Compte</p>
          <h1 className="head__title">COMPTEUR</h1>
          <p className="head__sub">Édition {MIN}–{MAX}</p>
        </header>

        <section className="display">
          <p className="display__number" key={count}>
            {String(count).padStart(2, "0")}
          </p>
          <p className="display__note">
            {atMax ? "최댓값에 도달했습니다" : atMin ? "최솟값에 도달했습니다" : "\u00A0"}
          </p>
        </section>

        <div className="pads">
          {/* 감소 (Milestone 1) */}
          <div className="pad">
            <p className="pad__label">Diminuer</p>
            <div className="pad__row">
              <button className="key" onClick={() => decreaseBy(10)} disabled={atMin}>
                −10
              </button>
              <button className="key" onClick={decrease} disabled={atMin}>
                −1
              </button>
            </div>
          </div>

          {/* 증가 */}
          <div className="pad">
            <p className="pad__label">Augmenter</p>
            <div className="pad__row">
              <button className="key" onClick={increase} disabled={atMax}>
                +1
              </button>
              <button className="key" onClick={() => increaseBy(10)} disabled={atMax}>
                +10
              </button>
            </div>
          </div>
        </div>

        <button className="reset" onClick={reset}>
          초기화
        </button>

        <CountBox />

        <footer className="foot">
          ↑ ↓ 키로 1씩 · Shift + ↑ ↓ 로 10씩 · R 키로 초기화
        </footer>
      </main>
    </div>
  );
}

export default App;