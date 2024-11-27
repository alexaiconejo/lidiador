import MapGL, { NavigationControl } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import styles from './Mapa.module.css';


function Mapa() {
  const mapProps = {
    initialViewState: {
      longitude: 58.3816,
      latitude: -34.6037,
      zoom: 1.5,
      minZoom: 1,
      maxZoom: 25,
      maxBounds: [
        [-58.59, -34.8], // Límite inferior-izquierdo
        [-58.31, -34.478], // Límite superior-derecho
      ],
    },
    style: {
      width: "100vw",
      height: "100vh",
    },
  };



  return (
    <div className={styles.mapa}>
      <MapGL
        {...mapProps}
        style={{ width: "100vw", height: "100vh" }}
        mapLib={maplibregl}
        mapOptions={{
        }}
      >
        <NavigationControl position="top-right" />
      </MapGL>
    </div>
  );
}

export default Mapa;
