import { Link } from 'react-router-dom';
import { FaFilm, FaCamera, FaMusic, FaLaptop, FaCameraRetro, FaBullhorn, FaPaintBrush } from 'react-icons/fa';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/crear/cine" className={styles.navLink}>
            <FaFilm className={styles.icon} />
            Cine
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/crear/video" className={styles.navLink}>
            <FaCamera className={styles.icon} />
            Video
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/crear/musica" className={styles.navLink}>
            <FaMusic className={styles.icon} />
            Música
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/crear/it" className={styles.navLink}>
            <FaLaptop className={styles.icon} />
            IT
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/crear/vj" className={styles.navLink}>
            <FaCameraRetro className={styles.icon} />
            VJ
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/crear/fotografia" className={styles.navLink}>
            <FaCamera className={styles.icon} />
            Fotografía
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/crear/politica" className={styles.navLink}>
            <FaBullhorn className={styles.icon} />
            Política
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/crear/ilustracion" className={styles.navLink}>
            <FaPaintBrush className={styles.icon} />
            Ilustración
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
