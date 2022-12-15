import { useEffect } from "react";
import ScheduleFormModal from "./ScheduleFormModal";
import styles from "./DetailCard.module.css";
import { useTheme } from "../hooks/useTheme";
import { useState } from "react";
import { useParams } from "react-router-dom";

const DetailCard = () => {
  const { theme } = useTheme()
  const [detail, setDetail] = useState({})
  const [token, setToken] = useState('');
  const { id } = useParams('')

 
  useEffect(() => {
    //Nesse useEffect, você vai fazer um fetch na api passando o 
    //id do dentista que está vindo do react-router e carregar os dados em algum estado

    setToken(localStorage.getItem('token'));

    const requestConfig = {
      method: 'GET',
      headers: {
      'Authorization': `Bearer ${token}`,
      }
    }

    fetch(`http://dhodonto.ctdprojetos.com.br/dentista?matricula=${id}`, requestConfig)
    .then(
      response => {
         response.json().then(
          data => {
            setDetail(data)
          }
        )
      }
    )

  }, []);

  console.log(detail)

  return (
    //As instruções que estão com {''} precisam ser 
    //substituídas com as informações que vem da api
    <>
      <h1 className={`h1-${theme}`}>Detail about Dentist {detail.nome}</h1>
      <section className="card col-sm-12 col-lg-6 container">
        {/* //Na linha seguinte deverá ser feito um teste se a aplicação
          // está em dark mode e deverá utilizar o css correto */}
        <div
          className={`card-body row ${theme}`}
        >
          <div className="col-sm-12 col-lg-6">
            <img
              className="card-img-top"
              src="/images/doctor.jpg"
              alt="doctor placeholder"
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <ul className="list-group">
              <li className="list-group-item">Nome: {detail.nome} </li>
              <li className="list-group-item">
                Sobrenome: {detail.sobrenome}
              </li>
              <li className="list-group-item">
                Matricula: {detail.matricula}
              </li>
            </ul>
            <div className="text-center">
              {/* //Na linha seguinte deverá ser feito um teste se a aplicação
                // está em dark mode e deverá utilizado o css correto */}
              <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={`btn btn-${theme} ${styles.button}`}
              >
                Marcar consulta
              </button>
            </div>
          </div>
        </div>
      </section>
      <ScheduleFormModal />
    </>
  );
};

export default DetailCard;
