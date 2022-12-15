import { useEffect } from "react";
import { useState } from "react";
import DetailCard from "../Components/DetailCard";

const Detail = () => {
  const [detail, setDetail] = useState([])

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