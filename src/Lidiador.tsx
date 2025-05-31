import React, { useRef, useEffect, useState } from "react";
import santoDeLosSantos from "./SantoDeLosSantos.json";
import reyes from "./Reyes.json";
import rebeldes from "./Rebeldes.json";
import estrella from "./UnaEstrella.json";
import principes from "./Principes.json";
import azkenasies from "./Azkenasies.json";
import kalonymus from "./Kalonymus.json";
import sinay from "./Sinay.json";
import protagonistasData from "./Protagonistas.json";
import Protagonists from "./Protagonistas";


import styles from "./Timeline.module.css";

interface Event {
  name: string;
  text: string;
  cities: string[];
}

interface Year {
  year: string;
  events: Event[];
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

const Timeline: React.FC = () => {
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeEvent, setActiveEvent] = useState<{
    year: string;
    text: string;
    hakohenProtagonist: string;
    hakohenProtagonistFemale: string;
  } | null>(null);

  const chapters: Chapter[] = [
    santoDeLosSantos,
    reyes,
    rebeldes,
    estrella,
    principes,
    kalonymus,
    azkenasies,
    sinay,
  ];


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
    return protagonistasMap[year] || { male: "Desconocido", female: "Desconocida" };
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
  <h1>TECNOBIBLIA</h1>
  <h2>CREO QUE LAS BIBLIAS HABLAN SOBRE MÍ</h2>
  <h3>
    Siempre tuve la intuición que tenía que indagar en la historia del apellido Sinay, hasta me obsesioné.
    Mi chosno materno, Mordejai Reuben HaKoen Sinay, de un linaje santo judío, fue uno de los primeros rabinos en llegar a la Argentina,
    pero nunca sospeché que iba a encontrarme con este thriller profético policial y con una carga y un dolor tan difíciles de procesar.
  </h3>
  <h4>Lidiador Sinay</h4>
</section>

      <section className={styles.container}>
        {activeEvent && (
          <div className={styles.yearFixedLabel}>{activeEvent.year}</div>
        )}

        {chapters.map((chapter, cIdx) => (
          <div key={cIdx} className={styles.chapter}>
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
                                {event.cities.join(", ")}
                              </div>
                              <p className={styles.eventContentText}>{event.text}</p>
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

export default Timeline;