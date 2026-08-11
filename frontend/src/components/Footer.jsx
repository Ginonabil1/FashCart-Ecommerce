import "./Footer.css";

const Footer = () => (
  <footer className="container site-footer">
    <div className="footer-grid">
      <div className="footer-about">
        <div className="footer-brand">
          <span className="brand-mark">
            <img src="/logo.png" alt="FashCart" />
          </span>
          <div>
            <h3>FashCart</h3>
            <p>Modern Store</p>
          </div>
        </div>
        <p>
          A MERN eCommerce store for curated sportswear, daily essentials, and
          clean checkout experiences.
        </p>
      </div>

      <div>
        <p className="footer-title">Navigate</p>
        <a href="/">Homepage</a>
        <a href="/products">All Products</a>
        <a href="/cart">Cart</a>
        <a href="/login">Sign In</a>
      </div>

      <div>
        <p className="footer-title">Support</p>
        <a href="mailto:support@fashcart.com">support@fashcart.com</a>
        <a href="/profile">Order History</a>
        <a href="/cart">Checkout</a>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© 2026 FashCart. All rights reserved.</p>
      <p>Developed by Georgino Nabil</p>
    </div>
  </footer>
);

export default Footer;
