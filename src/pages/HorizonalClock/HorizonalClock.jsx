import { useEffect, useRef, useState } from 'react'

import { RingRoller } from '@/components'
import {
  ANGLE_STEP,
  DIGIT_COLUMN_COUNT,
  NUMBER_SIZE,
  RADIUS_RATIO,
  SEPARATOR_COUNT,
  TENS_2,
  TENS_5,
  UNITS,
  VISIBLE_DIGITS,
} from '@/constants/digit'
import styles from '@/pages/HorizonalClock/index.module.less'

// 圆环可见高度 = 2×radius×sin(可见半角) + digitSize，提取 digitSize 得到因子
const visibleAngle = ((VISIBLE_DIGITS - 1) / 2) * ANGLE_STEP * (Math.PI / 180)
const RING_HEIGHT_FACTOR = 2 * RADIUS_RATIO * Math.sin(visibleAngle) + 1

function HorizonalClock() {
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
      const widthSize = width / (DIGIT_COLUMN_COUNT + SEPARATOR_COUNT)
      const heightSize = height / RING_HEIGHT_FACTOR
      setDigitSize(Math.min(widthSize, heightSize))
    }

    const ro = new ResizeObserver(([entry]) => {
      updateSize(entry.contentRect.width, entry.contentRect.height)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const radius = digitSize * RADIUS_RATIO

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
        '--number-size': `${digitSize}px`,
        '--radius': `${radius}px`,
      }}
    >
      <div className={styles.group}>
        <div className={styles.roller}>
          <RingRoller
            numbers={TENS_2}
            currentIndex={digits.hourTens}
            digitSize={digitSize}
            radius={radius}
          />
        </div>
        <div className={styles.roller}>
          <RingRoller
            numbers={UNITS}
            currentIndex={digits.hourUnits}
            digitSize={digitSize}
            radius={radius}
          />
        </div>
      </div>
      <span className={styles.separator}>:</span>
      <div className={styles.group}>
        <div className={styles.roller}>
          <RingRoller
            numbers={TENS_5}
            currentIndex={digits.minuteTens}
            digitSize={digitSize}
            radius={radius}
          />
        </div>
        <div className={styles.roller}>
          <RingRoller
            numbers={UNITS}
            currentIndex={digits.minuteUnits}
            digitSize={digitSize}
            radius={radius}
          />
        </div>
      </div>
      <span className={styles.separator}>:</span>
      <div className={styles.group}>
        <div className={styles.roller}>
          <RingRoller
            numbers={TENS_5}
            currentIndex={digits.secondTens}
            digitSize={digitSize}
            radius={radius}
          />
        </div>
        <div className={styles.roller}>
          <RingRoller
            numbers={UNITS}
            currentIndex={digits.secondUnits}
            digitSize={digitSize}
            radius={radius}
          />
        </div>
      </div>
    </div>
  )
}

export default HorizonalClock
