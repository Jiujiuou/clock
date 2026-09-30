import styles from '@/components/DigitRoller/index.module.less'
import { NUMBER_SIZE } from '@/constants/digit'
import useClockStore from '@/store/useClockStore'

const DigitRoller = ({ numbers, currentIndex, digitSize = NUMBER_SIZE }) => {
  const easing = useClockStore((state) => state.easing)
  const offset = digitSize * currentIndex + digitSize / 2

  return (
    <div
      className={styles.root}
      style={{
        '--number-size': `${digitSize}px`,
        '--offset': `${offset}px`,
        '--easing': easing,
      }}
    >
      {numbers.map((number) => (
        <div
          key={number}
          className={`${styles.number}${number === currentIndex ? ` ${styles.active}` : ''}`}
        >
          {number}
        </div>
      ))}
    </div>
  )
}

export default DigitRoller
