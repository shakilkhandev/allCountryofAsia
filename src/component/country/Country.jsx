import React from "react";
import { useState, useEffect } from "react";


function Country() {
  const [countries, setCountries] = useState([]);
  const [i, setI] = useState(10);
  const [loadItem, setLoadItem] = useState(true);


  useEffect(() => {
    const data = fetch("https://restcountries.com/v3.1/region/asia");

    data
      .then((response) => {
        return response.json();
      })
      .then((item) => {
        const sortedItem =[...item].sort((a,b)=>a.name.common.localeCompare(b.name.common));
        setCountries(sortedItem);
      })
      .catch((error) => {
        console.log(error);
      });
     
  }, [ ]);

  
  function loadCountries() {

    if (i < countries.length-10) {
      setLoadItem(true);
      
    } else if (i >= countries.length-10) {
      setLoadItem(false);
    }
    loadItem ? setI(i + 10) : "";
   
    
    console.log(i);
    
  }

  function renderCountries() {
    return (
      <>
     
        <div className="parentContainer">
          <div className="flagContainer">
            {countries.slice(0, i).map((item, index) => {
              return (
                <div className="flag fade-in" key={index}>
                  <h1 key={index}>Country: {item.name.common} </h1>
                  <img width={200} height={100} src={item.flags.svg} alt="" />
                  <h3>Capital: {item.capital}</h3>
                  <p>Population: {item.population}</p>{" "}
                </div>
              );
            })}

            <div className="loadMore">
              <button
                className={loadItem ? "loadMoreBtn" : "loadMoreBtn disable"}
                onClick={() => loadCountries()}
              >
                Load More
              </button>

            </div>
          </div>
        </div>
      </>
    );
  }

  return renderCountries();
}

export default Country;
