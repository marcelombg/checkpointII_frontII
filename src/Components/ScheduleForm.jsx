import { useEffect, useInsertionEffect, useState } from "react";
import styles from "./ScheduleForm.module.css";
import React from "react";
import axios from "axios";
import { response } from "msw";

const ScheduleForm = () => {

  const [dentist, setDentist] = useState([])
  const [pacient, setPacient] = useState([])
  const [date, setDate] = useState([])
  const [formularioErro, setFormularioErro] = useState(false)
  const [authToken, setAuthToken] = useState('')

  const [post, setPost] = useState()
  const api = axios.create({
    baseURL: "http://dhodonto.ctdprojetos.com.br",
  });


  useEffect(() => {
    //Nesse useEffect, você vai fazer um fetch na api buscando TODOS os dentistas
    //e pacientes e carregar os dados em 2 estados diferentes
    setDate('')

    fetch('https://dhodonto.ctdprojetos.com.br/dentista').then(
      response => {
        response.json().then(
          data => {
            setDentist(data)
          }
        )
      }
    )
    
    fetch('https://dhodonto.ctdprojetos.com.br/paciente').then(
      response => {
        response.json().then(
          data => {
            setPacient(data.body)
          }
        )
      }
    )    

  }, []);

  // const de Post de envio de consulta
  const handleSubmit = (event) => {
    //Nesse handlesubmit você deverá usar o preventDefault,
    //obter os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que marca a consulta
    //lembre-se que essa rota precisa de um Bearer Token para funcionar.
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro

    event.preventDefault()
  
    if (dentist === '' || pacient === '' || date === '') {

      setFormularioErro(true)

    } else {
      setFormularioErro(false)

      setDate('')

      alert('Consulta marcada com sucesso!')

      if(authToken !== '') {
      
        api
        .post("/consulta",
        {
          pacient,
          dentist,
          date
        })
        .then((response) => setPost(response.data))
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
      }
    } 
    
  };

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center container}`
        }
      >
        <form onSubmit={handleSubmit} className={formularioErro ? 'form-error' : ''}>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="dentist" className="form-label">
                Dentist
              </label>
              <select className="form-select" name="dentist" id="dentist">

                {
                  dentist.map(dentistlist => {
                      return (
                        <option
                          key={dentistlist.matricula}
                          value={dentistlist.matricula}
                        >
                          {dentistlist.nome} {dentistlist.sobrenome}
                        </option>
                      )
                    }
                  )
                }

              </select>
            </div>

            <div className="col-sm-12 col-lg-6">
              <label htmlFor="patient" className="form-label">
                Patient
              </label>
              <select className="form-select" name="patient" id="patient">

                {
                    pacient.map(pacienteList => {
                      return (
                        <option
                          key={pacienteList.matricula}
                          value={pacienteList.matricula}
                        >
                          {pacienteList.nome} {pacienteList.sobrenome}
                        </option>
                      )
                    }
                  )
                }

              </select>
            </div>

          </div>

          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-12">
              <label htmlFor="appointmentDate" className="form-label">
                Date
              </label>
              <input
                className="form-control"
                id="appointmentDate"
                name="appointmentDate"
                type="datetime-local"
                value={date}
                onChange={event => setDate(event.target.value)}
              />
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
            <button
              className={`btn btn-light ${styles.button}`}
              type="submit"
              onSubmit={event => handleSubmit(event)}
            >
              Schedule
            </button>

            {
                formularioErro ? (
                    <span>Um ou mais campos não preenchidos</span>
                ) : null
            }

          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleForm;