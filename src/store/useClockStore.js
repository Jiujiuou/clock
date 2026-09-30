import { create } from 'zustand'

export const EASING = {
  smooth: 'linear',
  jumping: 'cubic-bezier(0.4, 0, 0.2, 1)',
}

export const CLOCK_TYPE = {
  VERTICAL: 'VerticalClock',
  HORIZONTAL: 'HorizonalClock',
}

const useClockStore = create((set) => ({
  currentClock: CLOCK_TYPE.VERTICAL,
  setCurrentClock: (clock) => set({ currentClock: clock }),

  easing: EASING.jumping,
  setEasing: (easing) => set({ easing }),

  // 预留：12 / 24 小时制
  hourFormat: '24',
  setHourFormat: (format) => set({ hourFormat: format }),
}))

export default useClockStore
