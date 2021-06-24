import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function Details({ newCountry, isDarkMode, initial }) {
  const [country, setCountry] = React.useState(newCountry);
  let history = useHistory();
  let borders = [];
  const [counter, setCounter] = React.useState(1);

  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

  for (let i = 0; i < country.borders.length; i++) {
    borders.push(
      initial.filter((border) => border.alpha3Code === country.borders[i])
    );
  }

  const handleClick = (test) => {
    setCountry(test);
    setCounter(counter + 1);
  };
  const handleBack = () => {
    for (let i = 0; i < counter; i++) {
      history.goBack();
    }
  };

  return (
    <body className={isDarkMode && "dark"}>
      <Router>
        <div className="search-wrapper-details">
          <button
            className={"back-btn"}
            onClick={handleBack}
            id={isDarkMode && "dark-lighter"}
          >
            <AiOutlineArrowLeft
              style={{ marginRight: "15px", alignSelf: "flex-end" }}
            />
            Back
          </button>
        </div>
        <Route to={`/${country.alpha3Code}`}>
          <div className="details-wrapper">
            <img src={country.flag} alt={country.flag + " flag"} />

            <div
              className={isDarkMode ? "details-right dark" : "details-right"}
            >
              <h3>{country.name}</h3>
              <div className="details-infos-wrapper">
                <ul className="no-deko" id="ul1">
                  <li>
                    <b>Native Name: </b>
                    {country.nativeName}
                  </li>
                  <li>
                    <b>Population: </b> {formatNumber(country.population)}
                  </li>
                  <li>
                    <b>Region: </b>
                    {country.region}
                  </li>
                  <li>
                    <b>Sub Region: </b>
                    {country.subregion}
                  </li>
                  <li>
                    <b>Capital:</b>
                    {country.capital}
                  </li>
                </ul>
                <ul className="no-deko">
                  <li>
                    <b>Top Level Domain:</b>{" "}
                    {country.topLevelDomain.map((domain) => domain).join(",")}
                  </li>
                  <li>
                    <b>Currenies: </b>
                    {country.currencies
                      .map((currency) => currency.name)
                      .join(",")}
                  </li>
                  <li>
                    <b>Languages: </b>
                    {country.languages.map((lang) => lang.name).join(",")}
                  </li>
                </ul>
              </div>
              <div className="border-countries-wrapper">
                <p>
                  <b>Border Countries: </b>
                </p>
                <div className="border-countries">
                  {borders.flat().map((b) => (
                    <Link to={`/${b.alpha3Code}`} className="no-deko">
                      <button
                        className={
                          isDarkMode ? "border-btn dark-lighter" : "border-btn"
                        }
                        id={isDarkMode && "dark-lighter"}
                        onClick={() => handleClick(b)}
                      >
                        {b.name}
                      </button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Route>
      </Router>
    </body>
  );
}
