// eslint-disable
import { useEffect, useState } from "react";
import styles from "./ScheduleForm.module.css";
import React from "react";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useTheme } from "../hooks/useTheme";

const ScheduleForm = () => {

  const { theme } = useTheme()
  const [dentist, setDentist] = useState([])
  const [pacient, setPacient] = useState([])
  const [date, setDate] = useState([])
  const [token, setToken] = useState('');

  useEffect(() => {
    //Nesse useEffect, você vai fazer um fetch na api buscando TODOS os dentistas
    //e pacientes e carregar os dados em 2 estados diferentes
    setDate('')

    fetch('http://dhodonto.ctdprojetos.com.br/dentista').then(
      response => {
        response.json().then(
          data => {
            setDentist(data)
          }
        )
      }
    )

    fetch('http://dhodonto.ctdprojetos.com.br/paciente').then(
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

    setToken(localStorage.getItem('token'));

    if (dentist === '' || pacient === '' || date === '' || token === null || token === '') {

      toast.error('Um ou mais campos não preenchidos.')

    } else {

      const requestConfig = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(
          
        )
      }

      fetch('http://dhodonto.ctdprojetos.com.br/consulta', requestConfig)
        .then(
          response => {
            response.json().then(
              data => {
                console.log(data)

                toast.success('Consulta marcada com sucesso!');

                setDate('')

              })
              .catch(e => {
                toast.error('Error ao enviar a requisição.')
              })
          }
        )
    }


  }

  return (
    <>
      <ToastContainer />
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center container ${theme}`}
      >
        <form>
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
                        onChange={(e) => setTargetDentist(e.target.value)}
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
              className={`btn btn-${theme} ${styles.button}`}
              type="submit"
              onClick={handleSubmit}
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleForm;