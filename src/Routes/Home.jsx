import { useState } from "react";
import { useEffect } from "react";
import Card from "../Components/Card";

const Home = () => {

  const [card, setCard] = useState([])

  useEffect(() => {
    //Nesse useEffect, deverá ser obtido todos os dentistas da API
    //Armazena-los em um estado para posteriormente fazer um map
    //Usando o componente <Card />

    fetch('https://dhodonto.ctdprojetos.com.br/dentista').then(
      response => {
        response.json().then(
          data => {
            setCard(data)
          }
        )
      }
    )

  }, []);

  return (
    <>
      <h1>Home</h1>
      <div className="card-grid container">

        {
          card.map(
            container => {
              return (
                <Card 
                  containerData={container}
                />
              )
            }
          )
        }

      </div>
    </>
  );
};

export default Home;
