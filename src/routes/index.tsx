import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "@/components/site/Navigation";
import { ProductScrollHero } from "@/components/site/ProductScrollHero";
import {
  ProductIntro,
  IngredientStory,
  Experience,
  Menu,
  BrandStory,
  Locations,
  CrownBearers,
  AppSection,
  Sustainability,
  Franchising,
  News,
  Newsletter,
  Footer,
} from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Barista Sri Lanka — Plant-Based Almond Milk Cappuccino" },
      {
        name: "description",
        content:
          "Bold espresso, silky plant-based foam and a naturally nutty finish. Explore Barista's new Plant-Based Collection, cafés and Crown Bearers rewards.",
      },
      { property: "og:title", content: "Barista Sri Lanka — Plant-Based Almond Milk Cappuccino" },
      {
        property: "og:description",
        content: "Cinematic coffee storytelling from Barista Sri Lanka.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  return (
    <main className="bg-ink text-white">
      <Navigation />
      <ProductScrollHero />
      <ProductIntro />
      <IngredientStory />
      <Experience />
      <Menu />
      <BrandStory />
      <Locations />
      <CrownBearers />
      <AppSection />
      <Sustainability />
      <Franchising />
      <News />
      <Newsletter />
      <Footer />
    </main>
  );
}
