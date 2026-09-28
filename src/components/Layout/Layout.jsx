import styles from '@/components/Layout/index.module.less'

function Layout() {
  return (
    <div className={styles.root}>
      <header className={styles.header} />
      <main className={styles.body}>
        <section className={styles.stage} />
        <aside className={styles.control} />
      </main>
    </div>
  )
}

export default Layout
