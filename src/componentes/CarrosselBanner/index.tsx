import Carousel from "nuka-carousel";
import styles from "./CarroselBanner.module.css";
import imagem1 from "./imagensBanner/imagem1.jpg";
import imagem2 from "./imagensBanner/Imagem2.jpg";
import imagem3 from "./imagensBanner/Imagem3.jpg";
import imagem4 from "./imagensBanner/Imagem4.jpg";
import imagem5 from "./imagensBanner/imagem5.jpg";

export default function CarrosselBanner() {
  return (
    <Carousel
      autoplay={true}
      pauseOnHover={false}
      autoplayInterval={2500}
      className={styles.carrossel}
      withoutControls={true}
      wrapAround={true}
      animation={"fade"}
      speed={1000}
    >
      <div>
        <img src={imagem1} alt="oculos" />
      </div>
      <div>
        <img src={imagem2} alt="oculos" />
      </div>
      <div>
        <img src={imagem3} alt="oculos" />
      </div>
      <div>
        <img src={imagem4} alt="oculos" />
      </div>
      <div>
        <img src={imagem5} alt="oculos" />
      </div>
    </Carousel>
  );
}
