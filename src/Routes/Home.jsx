import { useState } from "react";
import { useEffect } from "react";
import Card from "../Components/Card";
import { useTheme } from "../hooks/useTheme";

const Home = () => {

  const [card, setCard] = useState([])
  const { theme } = useTheme()

  useEffect(() => {

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
      <h1 className={`h1-${theme}`}>Home</h1>
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
