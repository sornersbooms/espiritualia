import Link from 'next/link';
import styles from './ThemeCard.module.css';

export default function ThemeCard({ tema }) {
  // Find the first image in the sequence to use as cover
  const coverImage = tema.secuencia.find(item => item.tipo === 'imagen')?.src;

  return (
    <Link href={`/temas/${tema.slug}`} className={styles.card}>
      <div
        className={styles.cardImage}
        style={coverImage ? { backgroundImage: `url(${coverImage})` } : { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      />
      <div className={styles.cardContent}>
        <h3 className={styles.title}>{tema.titulo}</h3>
        <p className={styles.description}>{tema.descripcion}</p>
        <div className={styles.cta}>
          Iniciar Viaje &rarr;
        </div>
      </div>
    </Link>
  );
}
