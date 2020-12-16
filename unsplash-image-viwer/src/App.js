import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [photosArray, setPhotosArray] = useState([]);
  const [loader, setLoader] = useState(false);
  const [userMessge, setuserMessge] = useState(false);
  const fetchPhotos = async () => {
    setPhotosArray([]);
    setLoader(true);
    let options = {
      method: "GET",
      url: "https://api.unsplash.com/search/photos/",
      params: {
        client_id: "F9hv6Qd2q9IS7QOI52xuxS6By1t_aQddptdLlMle1EI",
        query: searchValue,
        page: 50,
        per_page: 50,
      },
    };
    {
      await axios
        .request(options)
        .then((response) => {
          // console.log(response.data);

          if (response.data.results.length === 0) {
            setuserMessge(true);
            setLoader(false);
          } else {
            setPhotosArray(response.data.results);
            setLoader(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleSerachInput = (e) => {
    const {
      target: { value, name },
    } = e;
    setuserMessge(false);
    setSearchValue(value);
  };
  // console.log(photosArray, "photosArray");
  return (
    <>
      {loader ? (
        <div class="loader"></div>
      ) : (
        <div className="App">
          <div className="mydiv">
            <span>Search</span>
            <input
              type="text"
              value={searchValue}
              onChange={handleSerachInput}
            />
            <button onClick={fetchPhotos} disabled={searchValue ? false : true}>
              Search
            </button>
          </div>
          <div className="myphoto">
            {photosArray && photosArray.length > 0
              ? photosArray.map((item) => (
                  <img src={item.urls.regular} key={item.id} />
                ))
              : null}
            {userMessge ? (
              <p
                style={{ color: "red" }}
              >{`We're having trouble playing this ${searchValue} title right now.`}</p>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
