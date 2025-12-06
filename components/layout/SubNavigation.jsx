// components/layout/SubNavigation.jsx
import Link from 'next/link';
import styles from './SubNavigation.module.css';

export default function SubNavigation({ temas, currentSlug }) {
  const otrosTemas = temas.filter(t => t.slug !== currentSlug);

  return (
    <nav className={styles.subnav}>
      <Link href="/" className={styles.homeLink}>
        Volver al Inicio
      </Link>
      <div className={styles.otrosTemas}>
        <span>Otros temas:</span>
        <ul>
          {otrosTemas.map((tema) => (
            <li key={tema.slug}>
              <Link href={`/temas/${tema.slug}`}>
                {tema.titulo}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
