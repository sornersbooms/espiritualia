import styles from './Home.module.css';
import { temas } from '@/data/temas';
import ThemeCard from '@/components/ui/ThemeCard';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Espiritualia</h1>
        <p className={styles.subtitle}>Un viaje visual a través de principios espirituales.</p>
        <div className={styles.themesContainer}>
          {temas.map((tema) => (
            <ThemeCard key={tema.slug} tema={tema} />
          ))}
        </div>
      </div>
    </main>
  )
}
