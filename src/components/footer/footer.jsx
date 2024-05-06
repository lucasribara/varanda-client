import "./footer.css";
import logo from "../../assets/varanda-logov2.png"

const Footer = () => {
  return (
    <div className="footer">
      <div className="information">
        <div className="title">Temos vaga para auxiliar de cozinha com experiência</div>
        <div className="text">
          <span>Horario das 8h as 16h20min</span>
          <span>Terça a domingo e feriados</span>
          <span>Trabalha 2 domingos e folga no 3º.</span>
          <span>Salário compativel</span>
          <span>Mais insalubridade, VT, alimentação no local</span>
        </div>
        <div>Enviar curriculo para varandabec@gmail.com</div>
      </div>
      <div className="information">
        <div className="title">HORÁRIO DE FUNCIONAMENTO</div>
        <div className="woring-schedule">
          <span className="subtitle">Terça a Domingo</span>
          <span className="subtitle">Almoço</span>
          <span className="info">Das 11h as 14h00</span>
          <span className="subtitle">Café e Jantar</span>
          <span className="info">Das 14h as 21h</span>
        </div>
      </div>
      <div className="footer-logo"> 
      </div>
    </div>
  );

}

export default Footer;