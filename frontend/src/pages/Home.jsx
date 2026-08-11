import ProductGrid from "../components/ProductGrid.jsx";
import "./Home.css";

const Home = () => (
  <div className="stack">
    <section className="featured-banner">
      <img src="/featured.png" alt="Featured fashion products" />
    </section>
    <ProductGrid
      eyebrow="Latest Collections"
      description="New products from t-shirts, jackets, shoes, and shorts..."
      limit={8}
      sort="newest"
    />
    <ProductGrid
      eyebrow="Best Sellers"
      description="A focused row of strong picks for a richer shopping experience."
      limit={4}
      sort="desc"
    />
  </div>
);

export default Home;
