import styles from '@/components/Switch/index.module.less'

const Switch = ({ options, value, onChange }) => {
  const activeIndex = options.findIndex((opt) => opt.value === value)

  const handleOptionClick = (e) => {
    onChange(e.currentTarget.dataset.value)
  }

  return (
    <div className={styles.root}>
      <div
        className={styles.indicator}
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`${styles.option}${opt.value === value ? ` ${styles.active}` : ''}`}
          data-value={opt.value}
          onClick={handleOptionClick}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export default Switch
