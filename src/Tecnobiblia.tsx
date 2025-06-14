import React, { useRef, useEffect, useState } from "react";
import santoDeLosSantos from "./SantoDeLosSantos.json";
import reyes from "./Reyes.json";
import rebeldes from "./Rebeldes.json";
import estrella from "./UnaEstrella.json";
import principes from "./Principes.json";
import azkenasies from "./Azkenasies.json";
import kalonymus from "./Kalonymus.json";
import litvak from "./Litvak.json";
import sinay from "./Sinay.json";
import protagonistasData from "./Protagonistas.json";
import Protagonists from "./Protagonistas.js";
import abominable from "./Abominable.json";
import reconstruccion from "./Reconstruccion.json";
import impuros from "./Impuros.json";
import madre from "./LaMadre.json";
import indeseables from "./Indeseables.json";
import Logo from "./Logo.tsx";

import {
  FaCrown,
  FaStarOfDavid,
  FaRebel,
  FaScroll,
  FaChessKing,
  FaBookDead,
  FaMountain,
  FaEye,
  FaFlag,
  FaPaw,
  FaTractor,
  FaRecycle,
  FaSkullCrossbones
} from "react-icons/fa";

import styles from "./Timeline.module.css";

interface Event {
  name: string;
  text: string;
  cities?: string[];
}

interface Year {
  year: string;
  events: Event[];
  backgroundUrl?: string; // opcional si no todos los años la tienen
}

interface Chapter {
  title: string;
  duration: string;
  years: Year[];
}

interface ProtagonistEntry {
  year: string;
  male: string;
  female: string;
}

const Tecnobiblia: React.FC = () => {
const eventRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeEvent, setActiveEvent] = useState<{
    year: string;
    text: string;
    hakohenProtagonist: string;
    hakohenProtagonistFemale: string;
  } | null>(null);

  const chapters: Chapter[] = [
   madre, santoDeLosSantos,
    reyes,
    rebeldes,
    estrella,
    principes,
    kalonymus,
    azkenasies,
    sinay,
  litvak,
indeseables,
impuros, reconstruccion, abominable];

const chapterIcons = [
    <FaStarOfDavid />,   // Madre
  <FaStarOfDavid />,   // Santo de los Santos
  <FaCrown />,         // Reyes
  <FaRebel />,         // Rebeldes
  <FaEye />,           // Una Estrella
  <FaChessKing />,     // Príncipes
  <FaScroll />,        // Kalonymus
  <FaBookDead />,      // Azkenasies
  <FaMountain />,      // Sinaí
  <FaFlag />,          // Litvak (Lituania)
  <FaPaw />,          // Impuros (León)
  <FaTractor />,       // Indeseables (Revolución Agrícola)
  <FaRecycle />,       // Reconstrucción
  <FaSkullCrossbones />// Abominable
];



const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
const scrollToChapter = (index: number) => {
  const chapterEl = chapterRefs.current[index];
  if (chapterEl) {
    chapterEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const speakText = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-AR'; // o 'en-US', según el contenido
  speechSynthesis.speak(utterance);
};


const [showTitle, setShowTitle] = useState(true);

useEffect(() => {
  const onScroll = () => {
    setShowTitle(window.scrollY < 50);
  };
  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);

  const scrollToTimeline = () => {
    const timelineSection = document.getElementById("timeline-section");
    if (timelineSection) {
      timelineSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const protagonistasMap: Record<string, { male: string; female: string }> = {};
  (protagonistasData as ProtagonistEntry[]).forEach(({ year, male, female }) => {
    protagonistasMap[year] = { male, female };
  });

  const getHakohenProtagonists = (year: string) => {
  const years = Object.keys(protagonistasMap).sort(); // ordena años en orden ascendente
  let closestYear: string | null = null;

  for (let i = 0; i < years.length; i++) {
    if (years[i] <= year) {
      closestYear = years[i];
    } else {
      break;
    }
  }

  return closestYear ? protagonistasMap[closestYear] : { male: "Desconocido", female: "Desconocida" };
};


  const allEvents = chapters.flatMap((chapter) =>
    chapter.years.flatMap((year) =>
      year.events.map((event) => ({
        ...event,
        year: year.year,
        chapterTitle: chapter.title,
      }))
    )
  );

  useEffect(() => {
    const handleScroll = () => {
      const offsets = eventRefs.current.map((ref) =>
        ref ? Math.abs(ref.getBoundingClientRect().top - window.innerHeight / 2) : Infinity
      );
      const minOffset = Math.min(...offsets);
      const idx = offsets.indexOf(minOffset);
      if (allEvents[idx]) {
        const protagonists = getHakohenProtagonists(allEvents[idx].year);
        setActiveEvent({
          year: allEvents[idx].year,
          text: allEvents[idx].text,
          hakohenProtagonist: protagonists.male,
          hakohenProtagonistFemale: protagonists.female,
        });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [allEvents]);

  let eventIndex = 0;
  const activeBackgroundUrl = chapters
  .flatMap((ch) => ch.years)
  .find((y) => y.year === activeEvent?.year)?.backgroundUrl;


  return (
    <section>
   <section
  className={styles.titleSection}
  style={{ display: showTitle ? "flex" : "none" }}
  onClick={scrollToTimeline}
  role="button"
  tabIndex={0}
  onKeyDown={(e) => { if (e.key === 'Enter') scrollToTimeline(); }}
>
  <Logo/>
  <h1>TECNOBIBLIA</h1>
  <h2>CREO QUE LAS BIBLIAS HABLAN SOBRE MÍ</h2>
  <h3>
    Siempre tuve la intuición que tenía que indagar en la historia del apellido Sinay, hasta me obsesioné.
    Mi chosno materno, Mordejai Reuben HaKoen Sinay, de un linaje santo judío, fue uno de los primeros rabinos en llegar a la Argentina,
    pero nunca sospeché que iba a encontrarme con este thriller profético policial y con una carga y un dolor tan difíciles de procesar.
  </h3>
  <h4>Lidiador Sinay</h4>
</section>
<section className={styles.SecondSection}>
  <h3>LA PALABRA</h3>
  <h4>#Hakohen #TrataDePersonas #León #Sionismo #AMIA #IdishColonizationAsossiation #LaVarsovia #ZwiMigdal #Inteligencia #Jueces #Policía #MapaDelPoderEconomico #Argentina #MoisesVille #Rosario #Dinastia #Astrología #ÁrbolGenealógico #ConstelaciónFamiliar #Reiki #Talmud #Piratas</h4>
</section>
<div className={styles.sidebarNav}>
{chapters.map((_, idx) => (
  <button
    key={idx}
    onClick={() => scrollToChapter(idx)}
    className={styles.navButton}
    title={chapters[idx].title} // para mostrar el nombre al hacer hover
  >
    {chapterIcons[idx]}
  </button>
))}


</div>


     <section
  className={styles.container}
  style={{
    backgroundImage: activeBackgroundUrl ? `url(${activeBackgroundUrl})` : undefined,
backgroundSize: "contain",
backgroundRepeat: "repeat",
    backgroundPosition: "center",
    transition: "background-image 0.5s ease-in-out"
  }}
>

        {activeEvent && (
          <div className={styles.yearFixedLabel}>{activeEvent.year}</div>
        )}

       {chapters.map((chapter, cIdx) => (
  <div
    key={cIdx}
    ref={(el) => (chapterRefs.current[cIdx] = el)}
    className={styles.chapter}
  >
            <h2 className={styles.chapterTitle}>
              {chapter.title}{" "}
              <span className={styles.chapterDuration}>({chapter.duration})</span>
            </h2>

            {chapter.years.map((yearItem, yIdx) => {
              const isActive = activeEvent?.year === yearItem.year;

              return (
                <div
                  key={yIdx}
                  className={`${styles.yearSection} ${isActive ? styles.yearSectionActive : ""}`}
                >
                  <h3 className={styles.yearTitle}>{yearItem.year}</h3>

                  <ul className={`${styles.eventsList} ${isActive ? styles.eventsListActive : ""}`}>
                    {yearItem.events.map((event, eIdx) => {
                      const isEventActive =
                        activeEvent &&
                        activeEvent.year === yearItem.year &&
                        activeEvent.text === event.text;
                      const refIndex = eventIndex++;
                      return (
                        <li
                          key={eIdx}
                          ref={(el) => (eventRefs.current[refIndex] = el)}
                          className={`${styles.eventItem} ${isEventActive ? styles.eventItemActive : ""}`}
                        >
                          <div style={{ display: "flex", alignItems: "flex-start" }}>
                            <span
                              className={`${styles.eventBullet} ${isEventActive ? styles.eventBulletActive : ""}`}
                            />
                            <div>
                              <strong className={styles.eventContentStrong}>{event.name}</strong>
                             <div className={styles.eventContentCities}>
  {Array.isArray(event.cities) ? event.cities.join(", ") : ""}
</div>

                              <p className={styles.eventContentText}>{event.text}</p>
                              <button onClick={() => speakText(event.text)}>🔊 Escuchar</button>

                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        ))}

        <div className={styles.timelineLine} />
      </section>

      {/* Componente Protagonists fuera de la caja principal */}
      {activeEvent && (
        <Protagonists
          year={activeEvent.year}
          male={activeEvent.hakohenProtagonist}
          female={activeEvent.hakohenProtagonistFemale}
        />
      )}
    </section>
  );
};

export default Tecnobiblia;