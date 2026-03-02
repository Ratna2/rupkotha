import Hero from "../components/Hero"
import Categories from "../components/Categories"
import FeaturedCollections from "../components/FeaturedCollection"
import OurStory from "../components/OurStory"
import Testimonials from "../components/Testimonials"

function Home() {
  return (
    <>
      <Hero />
      <Categories/>
      <FeaturedCollections/>
      <OurStory/>
      <Testimonials/>
    </>
  )
}

export default Home