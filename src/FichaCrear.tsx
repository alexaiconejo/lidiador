import { useParams } from 'react-router-dom';
import styles from './Crear.module.css';

const FichaCrear = () => {
  // Obtener 'category' de la URL
  const { category } = useParams<{ category: string }>();

  return (
    <div className={styles.crear}>
      {/* Aquí podés renderizar el Navbar sin pasar props */}
      {/* <Navbar /> */}

      <h2 className={styles.title}>Modo Crear - {category}</h2>

      <div className={styles.content}>
        {category === 'cine' && <p>Contenido relacionado con Cine.</p>}
        {category === 'video' && <p>Contenido relacionado con Video.</p>}
        {category === 'musica' && <p>Contenido relacionado con Música.</p>}
        {category === 'it' && <p>Contenido relacionado con IT.</p>}
        {category === 'vj' && <p>Contenido relacionado con VJ.</p>}
        {category === 'fotografia' && <p>Contenido relacionado con Fotografía.</p>}
        {category === 'politica' && <p>Contenido relacionado con Política.</p>}
        {category === 'ilustracion' && <p>Contenido relacionado con Ilustración.</p>}
        {!category && <p>Selecciona una categoría.</p>}
      </div>
    </div>
  );
};

export default FichaCrear;
