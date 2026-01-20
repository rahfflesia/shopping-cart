import "./HomeSection.css";

export default function HomeSection() {
  return (
    <main className="home-section-main-content">
      <section className="banner-section">
        <div className="image-banner-wrapper">
          <img
            src="https://cdn.mos.cms.futurecdn.net/vZNHYxRv7BLiLbveoqiP79.jpg"
            alt="home-section-banner"
          />
        </div>
        <div className="absolute-section">
          <div className="absolute-section-inner-content">
            <h1>The best clothing store</h1>
            <p className="paragraph">
              Get the best offers, clothes and latest trends of the fashion
              industry only with us
            </p>
            <div className="learn-more-wrapper">
              <button>Learn more</button>
            </div>
          </div>
        </div>
      </section>
      <section className="grid-section">
        <div className="grid-section-card">
          <h2>Shop with us</h2>
          <p>Get clothes of the best quality for the best price.</p>
        </div>
        <div className="grid-section-card">
          <h2>Get the latest trends</h2>
          <p>Buy the latest trends as soon as they are available.</p>
        </div>
        <div className="grid-section-card">
          <h2>Great offers</h2>
          <p>Great offers you will definitely not find anywhere else.</p>
        </div>
      </section>
      <footer>Regular store all rights reserved &copy; 2026</footer>
    </main>
  );
}
