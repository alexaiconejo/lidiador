import React, { useState } from 'react';
import Navbar from './Navbar';
import styles from './Crear.module.css';

const FichaCrear = () => {
  const [category, setCategory] = useState<string>('cine'); // Estado para la categoría seleccionada

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
  };

  return (
    <div className={styles.crear}>
      <Navbar onCategoryChange={handleCategoryChange} />

      <h2 className={styles.title}>Modo Crear - {category}</h2>

      <div className={styles.content}>
        {/* Aquí podrías mostrar contenido diferente según la categoría */}
        {category === 'cine' && <p>Contenido relacionado con Cine.</p>}
        {category === 'video' && <p>Contenido relacionado con Video.</p>}
        {category === 'musica' && <p>Contenido relacionado con Música.</p>}
        {/* Puedes agregar más categorías según sea necesario */}
      </div>
    </div>
  );
};

export default FichaCrear;
