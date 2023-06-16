import LinkEstilizado from "componentes/LinkEstilizado";
import styles from "./Rodape.module.css";
import logo from "./imagens/logo-good-eyewear.svg";
import iconeEmail from "./imagens/envelope.png";
import iconefacebook from "./imagens/facebook.png";
import iconeInsta from "./imagens/instagram.png";
import iconeTel from "./imagens/phone.png";
import iconeTwitter from "./imagens/twitter.png";
import iconeWhats from "./imagens/whatsapp.png";

export default function Rodape() {
  return (
    <footer className={styles.footerPin}>
      <div className={styles.rodape}>
        <img className={styles.logoImg} src={logo} alt="Logo do Good WearEye" />
        <div className={styles.rodapeInfos}>
          <div>
            <h3>Fale Conosco</h3>
            <span>
              <img src={iconeTel} alt="icone telefone" /> (11) 2222-2222
            </span>
            <span>
              <img src={iconeWhats} alt="icone whatsapp" /> (11) 92222-2222
            </span>
            <span>
              <img src={iconeEmail} alt="icone envelope" />{" "}
              sac@goodeyewear.com.br
            </span>
          </div>

          <div>
            <h3>Horário de Atendimento</h3>
            <span>Segunda à sexta: </span>
            <span>9:00 as 17:00 </span>
            <span>Sábado e Domingo: </span>
            <span>09:00 as 15:00</span>
          </div>

          <div>
            <h3>Nossas Redes</h3>
            <LinkEstilizado
              style={styles.link}
              target="_blank"
              url="http://instagram.com.br"
            >
              <span>
                <img src={iconeInsta} alt="icone instagram" /> good-eyewear
              </span>
            </LinkEstilizado>

            <LinkEstilizado
              style={styles.link}
              target="_blank"
              url="http://twitter.com"
            >
              <span>
                <img src={iconeTwitter} alt="icone twitter" /> good_eyewear
              </span>
            </LinkEstilizado>
            <LinkEstilizado
              style={styles.link}
              target="_blank"
              url="http://facebook.com.br"
            >
              <span>
                <img src={iconefacebook} alt="icone facebook" /> goodeyewear
              </span>
            </LinkEstilizado>
          </div>
        </div>
      </div>
      <div className={styles.dev}>
        Desenvolvido por{" "}
        <LinkEstilizado
          style={styles.link}
          url="https://github.com/mtavidal/desafio-final-grupo01-front"
          target="_blank"
        >
          Grupo 01
        </LinkEstilizado>{" "}
        | Desafio Final Gama Academy XP49
      </div>
    </footer>
  );
}
