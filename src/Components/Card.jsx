import styles from "./Card.module.css";
import { useTheme } from "../hooks/useTheme";

const Card = (props) => {
  const { theme } = useTheme()

  return (
    <>
      <div className={`card ${theme}`}>
        <img
          className="card-img-top"
          src="/images/doctor.jpg"
          alt="doctor placeholder"
        />
        <div className={`card-body ${styles.CardBody}`}>
          <a href={`/dentist/${props.containerData.matricula}`}>
            <h5 className={`card-title ${styles.title}`}>{props.containerData.nome}</h5>
          </a>
          <p>{props.containerData.usuario.username}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
