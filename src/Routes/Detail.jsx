import { useEffect } from "react";
import { useState } from "react";
import DetailCard from "../Components/DetailCard";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams('')
  const [detail, setDetail] = useState([])

  useEffect(() => {

    

  }, []);

  return (
    <>
      
      {
          detail.map(
            detail => {
              return (
                <DetailCard 
                  containerData={detail}
                />
              )
            }
          )
        }

    </>
  )
}

export default Detail