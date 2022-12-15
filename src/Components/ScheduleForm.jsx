// eslint-disable
import { useEffect, useState } from "react";
import styles from "./ScheduleForm.module.css";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useTheme } from "../hooks/useTheme";

const ScheduleForm = () => {
  const { theme } = useTheme();
  const [dentist, setDentist] = useState([]);
  const [pacient, setPacient] = useState([]);
  const [matriculaPaciente, setMatriculaPaciente] = useState("");
  const [matriculaDentista, setMatriculaDentista] = useState("");
  const [date, setDate] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {

    setToken(localStorage.getItem("token"));

    fetch("http://dhodonto.ctdprojetos.com.br/dentista").then(
      async (response) => {
      await response.json().then((data) => {
        setDentist(data);
      });
    });

    fetch("http://dhodonto.ctdprojetos.com.br/paciente").then(
      async (response) => {
      await response.json().then((data) => {
        setPacient(data.body);
      });
    });

  }, []);

  const handleSubmit = (event) => {


    //Nesse handlesubmit você deverá usar o preventDefault,
    //obter os dados do formulário e enviá-los no corpo da requisição
    //para a rota da api que marca a consulta
    //lembre-se que essa rota precisa de um Bearer Token para funcionar.
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro

    event.preventDefault();


    if (token === "" || token === null){
      toast.error("Usuário não autorizado.");

    }

    if (matriculaPaciente === "" || matriculaDentista === "" || date === "") {

      toast.error("Um ou mais campos não preenchidos.");

    } else {

      const requestConfig = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          paciente: {
            matricula: `${matriculaPaciente}`,
          },
          dentista: {
            matricula: `${matriculaDentista}`,
          },
          dataHoraAgendamento: `${date}`,
        }),
      };

      fetch("http://dhodonto.ctdprojetos.com.br/consulta", requestConfig).then(
        async (response) => {
          await response
            .json()
            .then((data) => {
              console.log(data);

              toast.success("Consulta marcada com sucesso! Você será redirecionado para a Home.");

              setTimeout(
                () => window.location.href = "http://localhost:3000/home",
                4000
              );

            })
            .catch((e) => {
              toast.error("Erro ao enviar a requisição.");
            });
        }
      );
    }


  };

  return (
    <>
      <ToastContainer />
      <div className={`text-center container ${theme}`}>
        <form>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="dentist" className="form-label">
                Dentist
              </label>
              <select
                className="form-select"
                name="dentist"
                id="dentist"
                onChange={(e) => setMatriculaDentista(e.target.value)}
              >
                <option></option>
                {dentist.map((dentistlist) => {
                  return (
                    <option
                      key={dentistlist.matricula}
                      value={dentistlist.matricula}
                    >
                      {dentistlist.nome} {dentistlist.sobrenome}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="col-sm-12 col-lg-6">
              <label htmlFor="patient" className="form-label">
                Patient
              </label>
              <select
                className="form-select"
                name="patient"
                id="patient"
                onChange={(e) => setMatriculaPaciente(e.target.value)}
              >
                <option></option>
                {pacient.map((pacienteList) => {
                  return (
                    <option
                      key={pacienteList.matricula}
                      value={pacienteList.matricula}
                    >
                      {pacienteList.nome} {pacienteList.sobrenome}
                    </option>
                  );
                })}
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
                onChange={(event) => setDate(event.target.value)}
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
