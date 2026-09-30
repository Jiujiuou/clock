import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react'

import styles from '@/Layout/index.module.less'
import VerticalClock from '@/pages/VerticalClock/VerticalClock'
import HorizonalClock from '@/pages/HorizonalClock/HorizonalClock'
import useClockStore, { CLOCK_TYPE, EASING } from '@/store/useClockStore'
import { Switch } from '@/components'
import { IDLE_TIMEOUT } from '@/constants/layout'

function Layout() {
  const currentClock = useClockStore((state) => state.currentClock)
  const setCurrentClock = useClockStore((state) => state.setCurrentClock)
  const easing = useClockStore((state) => state.easing)
  const setEasing = useClockStore((state) => state.setEasing)
  const [isControlOpen, setIsControlOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isBtnVisible, setIsBtnVisible] = useState(true)
  const idleTimerRef = useRef(null)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  useEffect(() => {
    const resetIdleTimer = () => {
      setIsBtnVisible(true)
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
      idleTimerRef.current = setTimeout(() => setIsBtnVisible(false), IDLE_TIMEOUT)
    }

    resetIdleTimer()
    document.addEventListener('mousemove', resetIdleTimer)
    document.addEventListener('click', resetIdleTimer)
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
      document.removeEventListener('mousemove', resetIdleTimer)
      document.removeEventListener('click', resetIdleTimer)
    }
  }, [])

  const handleToggleControl = () => setIsControlOpen((prev) => !prev)

  const handleStageClick = () => setIsControlOpen(false)

  const handleToggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen()
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.stage} onClick={handleStageClick}>
        {currentClock === CLOCK_TYPE.VERTICAL ? <VerticalClock /> : <HorizonalClock />}
        <button
          className={`${styles.fullscreenBtn}${isBtnVisible ? '' : ` ${styles.faded}`}`}
          onClick={handleToggleFullscreen}
        >
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>
      </div>

      <aside className={`${styles.control}${isControlOpen ? ` ${styles.open}` : ''}`}>
        <button
          className={`${styles.toggle}${isBtnVisible ? '' : ` ${styles.faded}`}`}
          onClick={handleToggleControl}
        >
          {isControlOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
        <div className={styles.content}>
          <div className={styles.group}>
            <span className={styles.label}>时钟</span>
            <Switch
              options={[
                { label: 'Vertical', value: CLOCK_TYPE.VERTICAL },
                { label: 'Horizontal', value: CLOCK_TYPE.HORIZONTAL },
              ]}
              value={currentClock}
              onChange={setCurrentClock}
            />
          </div>
          <div className={styles.group}>
            <span className={styles.label}>动效</span>
            <Switch
              options={[
                { label: '丝滑', value: EASING.smooth },
                { label: '跳动', value: EASING.jumping },
              ]}
              value={easing}
              onChange={setEasing}
            />
          </div>
        </div>
      </aside>
    </div>
  )
}

export default Layout
