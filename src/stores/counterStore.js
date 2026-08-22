import { create } from "zustand";

// 카운터가 움직일 수 있는 범위
export const MIN = 0;
export const MAX = 20;

// 범위를 벗어나지 않게 잘라주는 함수.
// 0보다 작아지거나 20보다 커지는 걸 막습니다.
const clamp = (n) => Math.min(MAX, Math.max(MIN, n));

// 기록을 남기는 도우미. 범위에 막혀 값이 그대로면 기록하지 않습니다.
function logChange(state, label, next) {
  if (next === state.count) return state.history;
  return [{ id: Date.now() + Math.random(), label, result: next }, ...state.history].slice(0, 5);
}

// ─────────────────────────────────────────────────────────
// Zustand 스토어
//
// create() 안에 콜백 함수를 "괄호로 감싸서" 넘깁니다 → create((set) => ({ ... }))
// 바깥 괄호가 없으면 { }를 함수 본문으로 해석해 아무것도 반환하지 않습니다.
//
// set은 create가 자동으로 넘겨주는 함수로, 상태를 바꿀 때 씁니다.
// set의 콜백이 받는 state에는 스토어에 저장된 모든 값이 들어 있습니다.
// ─────────────────────────────────────────────────────────
const counterStore = create((set) => ({
  count: 1,
  history: [], // 최근 조작 기록 (추가 기능)

  // 1씩 증가
  increase: () =>
    set((state) => {
      const next = clamp(state.count + 1);
      return { count: next, history: logChange(state, "+1", next) };
    }),

  // 매개변수로 받은 만큼 증가
  increaseBy: (value) =>
    set((state) => {
      const next = clamp(state.count + value);
      return { count: next, history: logChange(state, `+${value}`, next) };
    }),

  // 1씩 감소
  decrease: () =>
    set((state) => {
      const next = clamp(state.count - 1);
      return { count: next, history: logChange(state, "−1", next) };
    }),

  // 매개변수로 받은 만큼 감소
  decreaseBy: (value) =>
    set((state) => {
      const next = clamp(state.count - value);
      return { count: next, history: logChange(state, `−${value}`, next) };
    }),

  // 처음으로 되돌리기 (추가 기능)
  reset: () => set({ count: 1, history: [] }),
}));

export default counterStore;