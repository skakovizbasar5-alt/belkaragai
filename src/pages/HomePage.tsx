import Hero from '../components/home/Hero';
import AboutSection from '../components/home/AboutSection';
import MapSection from '../components/home/MapSection';
import RoutesSection from '../components/home/RoutesSection';
import HistorySection from '../components/home/HistorySection';
import EcoSection from '../components/home/EcoSection';
import LocalSection from '../components/home/LocalSection';
import QrPromo from '../components/home/QrPromo';
import ResultsSection from '../components/home/ResultsSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <MapSection />
      <RoutesSection />
      <HistorySection />
      <EcoSection />
      <LocalSection />
      <QrPromo />
      <ResultsSection />
    </>
  );
}
