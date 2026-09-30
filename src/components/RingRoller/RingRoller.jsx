import styles from '@/components/RingRoller/index.module.less'
import { ANGLE_STEP, NUMBER_SIZE, RING_RADIUS } from '@/constants/digit'
import useClockStore from '@/store/useClockStore'

const RingRoller = ({ numbers, currentIndex, digitSize = NUMBER_SIZE, radius = RING_RADIUS }) => {
  const easing = useClockStore((state) => state.easing)

  return (
    <div
      className={styles.root}
      style={{
        '--number-size': `${digitSize}px`,
        '--radius': `${radius}px`,
        '--easing': easing,
      }}
    >
      {numbers.map((number, index) => {
        // 激活数字(index === currentIndex)角度为 0，位于 3 点钟方向
        // 其余数字沿圆弧上下分布，相邻间隔 ANGLE_STEP 度
        const angle = (index - currentIndex) * ANGLE_STEP
        return (
          <div
            key={number}
            className={`${styles.number}${number === currentIndex ? ` ${styles.active}` : ''}`}
            style={{
              transform: `rotate(${angle}deg) translate(var(--radius))`,
            }}
          >
            {number}
          </div>
        )
      })}
    </div>
  )
}

export default RingRoller
