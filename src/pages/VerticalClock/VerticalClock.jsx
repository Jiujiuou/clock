import { useEffect, useRef, useState } from 'react'

import styles from '@/pages/VerticalClock/index.module.less'

import { DigitRoller } from '@/components'
import {
  DIGIT_COLUMN_COUNT,
  GAP_COUNT,
  GROUP_GAP,
  NUMBER_SIZE,
  SEPARATOR_COUNT,
  VISIBLE_DIGITS,
} from '@/constants/digit'

const TENS_5 = [0, 1, 2, 3, 4, 5]
const TENS_2 = [0, 1, 2]
const UNITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

function VerticalClock() {
  const containerRef = useRef(null)
  const [now, setNow] = useState(() => new Date())
  const [digitSize, setDigitSize] = useState(NUMBER_SIZE)

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const updateSize = (width, height) => {
      const widthSize = (width - GAP_COUNT * GROUP_GAP) / (DIGIT_COLUMN_COUNT + SEPARATOR_COUNT)
      const heightSize = height / VISIBLE_DIGITS
      setDigitSize(Math.min(widthSize, heightSize))
    }

    const ro = new ResizeObserver(([entry]) => {
      updateSize(entry.contentRect.width, entry.contentRect.height)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const h = now.getHours()
  const m = now.getMinutes()
  const s = now.getSeconds()
  const digits = {
    hourTens: Math.floor(h / 10),
    hourUnits: h % 10,
    minuteTens: Math.floor(m / 10),
    minuteUnits: m % 10,
    secondTens: Math.floor(s / 10),
    secondUnits: s % 10,
  }

  return (
    <div
      ref={containerRef}
      className={styles.root}
      style={{
        '--group-gap': `${GROUP_GAP}px`,
        '--number-size': `${digitSize}px`,
      }}
    >
      <div className={styles.group}>
        <DigitRoller numbers={TENS_2} currentIndex={digits.hourTens} digitSize={digitSize} />
        <DigitRoller numbers={UNITS} currentIndex={digits.hourUnits} digitSize={digitSize} />
      </div>
      <span className={styles.separator}>:</span>
      <div className={styles.group}>
        <DigitRoller numbers={TENS_5} currentIndex={digits.minuteTens} digitSize={digitSize} />
        <DigitRoller numbers={UNITS} currentIndex={digits.minuteUnits} digitSize={digitSize} />
      </div>
      <span className={styles.separator}>:</span>
      <div className={styles.group}>
        <DigitRoller numbers={TENS_5} currentIndex={digits.secondTens} digitSize={digitSize} />
        <DigitRoller numbers={UNITS} currentIndex={digits.secondUnits} digitSize={digitSize} />
      </div>
    </div>
  )
}

export default VerticalClock
