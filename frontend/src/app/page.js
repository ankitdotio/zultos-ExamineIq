import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductProof from '@/components/ProductProof';
import ExamDiscovery from '@/components/ExamDiscovery';
import ProductExperience from '@/components/ProductExperience';
import Recognition from '@/components/Recognition';
import Trust from '@/components/Trust';
import FAQPreview from '@/components/FAQPreview';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="font-body text-navy bg-white min-h-screen">
      <a href="#main-content" className="absolute -left-[9999px] bg-navy text-white px-4 py-2.5 rounded-lg text-sm z-[100] focus:left-4 focus:top-4">
        Skip to content
      </a>
      <Header />
      <Hero />
      <ProductProof />
      <ExamDiscovery />
      <ProductExperience />
      <Recognition />
      <Trust />
      <FAQPreview />
      <FinalCTA />
      <Footer />
    </div>
  );
}
