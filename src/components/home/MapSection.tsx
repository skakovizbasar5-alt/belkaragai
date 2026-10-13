import SectionHeading from '../ui/SectionHeading';
import MapExplorer from '../map/MapExplorer';

export default function MapSection() {
  return (
    <section id="map" className="bg-cream-200/60 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Интерактивті туристік карта"
          title={
            <>
              Өлкенің барлық нысаны — <span className="text-brown-600 italic">бір картада</span>
            </>
          }
          lead="Нысандарды санат бойынша сүзіп, атауы бойынша іздеңіз. Тізімдегі «Картадан көрсету» батырмасы картадағы белгіні ашады, ал белгіні басқанда толық ақпараттық терезе шығады."
        />
        <div className="mt-10">
          <MapExplorer />
        </div>
      </div>
    </section>
  );
}
