import counterStore, { MIN, MAX } from "../stores/counterStore";

// 이 컴포넌트는 props를 하나도 받지 않습니다.
// App에서 count를 넘겨주지 않아도, 스토어에서 직접 꺼내 씁니다.
// 이것이 props 드릴링을 없앤다는 말의 실제 의미입니다.
function CountBox() {
  const count = counterStore((state) => state.count);
  const history = counterStore((state) => state.history);

  // 0~20 중 지금 몇 %인지. 게이지 길이에 씁니다.
  const ratio = (count - MIN) / (MAX - MIN);

  return (
    <aside className="box">
      <p className="box__label">Registre</p>

      <div className="box__row">
        <span className="box__key">현재 값</span>
        <span className="box__value">{count}</span>
      </div>

      <div className="gauge" role="img" aria-label={`${MAX} 중 ${count}`}>
        <span className="gauge__fill" style={{ width: `${ratio * 100}%` }} />
      </div>

      <div className="box__scale">
        <span>{MIN}</span>
        <span>{MAX}</span>
      </div>

      <div className="box__row box__row--sub">
        <span className="box__key">남은 여유</span>
        <span>{MAX - count}</span>
      </div>

      <div className="log">
        <p className="box__label">Historique</p>
        {history.length === 0 ? (
          <p className="log__empty">아직 기록이 없습니다</p>
        ) : (
          <ul className="log__list">
            {history.map((h) => (
              <li key={h.id} className="log__item">
                <span className="log__op">{h.label}</span>
                <span className="log__result">→ {h.result}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}

export default CountBox;