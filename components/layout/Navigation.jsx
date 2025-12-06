
import Link from 'next/link';
import styles from './Navigation.module.css';

const Navigation = ({ themes, onNavClick }) => {
  return (
    <nav className={styles.navigation}>
      <Link href="/" className={styles.homeLink} onClick={onNavClick}>
        ← Volver al inicio
      </Link>
      <div className={styles.otherThemes}>
        <h3>Temas</h3>
        <ul>
          {themes.map(theme => (
            <li key={theme.slug}>
              <Link href={`/temas/${theme.slug}`} className={styles.themeLink} onClick={onNavClick}>
                {theme.titulo}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
