import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {EffectFade, Navigation} from 'swiper';

SwiperCore.use([EffectFade, Navigation]);

const PageIntro = () => {

  return (
    <section className="page-intro">
      <Swiper navigation effect="fade" className="swiper-wrapper">
        <SwiperSlide>
          <div className="page-intro__slide" style={{ backgroundImage: "url('/images/slide-2.jpg')" }}>
            <div className="container">
              <div className="page-intro__slide__content">
                <h2>Experience the thrill of a Porsche</h2>
                <a href="/products" className="btn-shop"><i className="icon-right"></i>Explore Models</a>
              </div>
            </div>
          </div>
        </SwiperSlide>
  
        <SwiperSlide>
          <div className="page-intro__slide" style={{ backgroundImage: "url('/images/slide-1.jpg')" }}>
            <div className="container">
              <div className="page-intro__slide__content">
                <h2>Discover our latest sports cars</h2>
                <a href="/products" className="btn-shop"><i className="icon-right"></i>Shop now</a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
  
      <div className="shop-data">
        <div className="container">
          <ul className="shop-data__items">
            <li>
              <i className="icon-delivery-fast"></i>
              <div className="data-item__content">
                <h4>Unmatched Performance</h4>
                <p>Feel the power of German engineering</p>
              </div>
            </li>
            
            <li>
              <i className="icon-happy"></i>
              <div className="data-item__content">
                <h4>World-Class Design</h4>
                <p>Drive in style with award-winning aesthetics</p>
              </div>
            </li>
            
            <li>
              <i className="icon-cash"></i>
              <div className="data-item__content">
                <h4>Assured Quality</h4>
                <p>Enjoy peace of mind with our comprehensive warranty</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
  
};

export default PageIntro