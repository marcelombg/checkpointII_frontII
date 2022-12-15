import { useState } from "react";
import DetailCard from "../Components/DetailCard";

const Detail = () => {
  const [detail] = useState([])

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