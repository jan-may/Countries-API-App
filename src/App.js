import React, { useState } from "react";
import axios from "axios";
import { FcSearch } from "react-icons/fc";
import { FaMoon } from "react-icons/fa";
import Details from "./Details";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Loading from "./Loading";

function App() {
  const [countries, setCountries] = useState([]);
  const [initial, setInitial] = useState([]);
  const searchRef = React.useRef("");
  const selectRef = React.useRef("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [detailQuery, setDetailQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGetCountries = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("https://restcountries.eu/rest/v2/all");
      setCountries(res.data);
      setInitial(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchChange = (e) => {
    if (selectRef.current.value !== "") {
      setCountries(
        initial
          .filter((country) => {
            return country.name
              .toLowerCase()
              .includes(searchRef.current.value.toLowerCase());
          })
          .filter((country) => {
            return country.region === selectRef.current.value;
          })
      );
    } else {
      setCountries(
        initial.filter((country) => {
          return country.name
            .toLowerCase()
            .includes(searchRef.current.value.toLowerCase());
        })
      );
    }
  };

  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

  useState(() => {
    handleGetCountries();
  }, []);

  return (
    <>
      <body className={isDarkMode && "dark"}>
        <Router>
          <header className={isDarkMode && "dark-lighter"}>
            <Link to="/" className="no-deko">
              <h1
                className={isDarkMode && "dark-lighter"}
                onClick={() => setCountries(initial)}
              >
                Where in the world?
              </h1>
            </Link>

            <button
              className={isDarkMode && "dark-lighter"}
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              <FaMoon style={{ marginRight: "15px" }}></FaMoon>
              Dark Mode
            </button>
          </header>
          <Route exact path="/">
            <div
              className={isDarkMode ? "search-wrapper dark" : "search-wrapper"}
            >
              <form action="">
                <input
                  className={
                    isDarkMode ? "search-input dark-lighter" : "search-input"
                  }
                  type="text"
                  ref={searchRef}
                  onChange={handleSearchChange}
                  placeholder={"Search for a country..."}
                  value={
                    searchRef.current != null ? searchRef.current.value : ""
                  }
                />
                <FcSearch id="search-icon" size="20px" />
              </form>
              <form>
                <select
                  name="region"
                  className={isDarkMode ? "select-input-dark" : "select-input"}
                  onChange={handleSearchChange}
                  ref={selectRef}
                  label="query"
                >
                  <option
                    className={isDarkMode && "dark-lighter"}
                    value=""
                    disabled
                    selected
                    hidden
                  >
                    Filter by Region
                  </option>
                  <option className={isDarkMode && "dark-lighter"} value="">
                    no Filter
                  </option>
                  <option
                    className={isDarkMode && "dark-lighter"}
                    value="Europe"
                  >
                    Europe
                  </option>
                  <option className={isDarkMode && "dark-lighter"} value="Asia">
                    Asia
                  </option>
                  <option
                    className={isDarkMode && "dark-lighter"}
                    value="Polar"
                  >
                    Polar
                  </option>
                  <option
                    className={isDarkMode && "dark-lighter"}
                    value="Africa"
                  >
                    Africa
                  </option>
                  <option
                    className={isDarkMode && "dark-lighter"}
                    value="Americas"
                  >
                    Americas
                  </option>
                  <option
                    className={isDarkMode && "dark-lighter"}
                    value="Oceania"
                  >
                    Oceania
                  </option>
                </select>
              </form>
            </div>
            {isLoading ? (
              <Loading />
            ) : (
              <main className={countries.length <= 3 && "less-countries"}>
                {countries.map((country) => {
                  return (
                    <Link to={`/${country.alpha3Code}`} className="no-deko">
                      <article
                        onClick={() => setDetailQuery(country)}
                        className={isDarkMode && "dark-lighter"}
                      >
                        <div className="img-wrapper">
                          <img
                            src={country.flag}
                            alt={country.name + " flag"}
                          />
                        </div>
                        <div className="country-data">
                          <h3>{country.name}</h3>
                          <p>
                            Population:{" "}
                            <span>{formatNumber(country.population)}</span>
                          </p>
                          <p>
                            Region: <span>{country.region}</span>
                          </p>
                          <p>
                            Capital: <span>{country.capital}</span>
                          </p>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </main>
            )}
          </Route>

          <Route path={`/${detailQuery.alpha3Code}`}>
            <Details
              newCountry={detailQuery}
              isDarkMode={isDarkMode}
              initial={initial}
            />
          </Route>
        </Router>
      </body>
    </>
  );
}

export default App;
