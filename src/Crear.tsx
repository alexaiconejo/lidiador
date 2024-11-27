import FichaCrear from './FichaCrear';
import Fondo from './Fondo';

const Crear = () => {
  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {/* Fondo 3D */}
      <Fondo />

      {/* Ficha de Crear */}
      <FichaCrear />
    </div>
  );
};

export default Crear;
