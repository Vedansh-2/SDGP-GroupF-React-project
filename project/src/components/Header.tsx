import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import HeaderLink from "./HeaderLink";

interface Props {
  links: string[];
  labels: string[];
}

//This variable stores navigation items
let results: React.ReactElement[] = [];

const Header = ({ links, labels }: Props) => {
  //This code is used to store the navigation items:
  if (results.length == 0)
    //This if statement makes sure it doesn't render twice in Strict Mode
    links.forEach((link) => {
      results.push(
        <li className="govuk-header__navigation-item">
          <HeaderLink
            link={link}
            label={" " + labels[links.indexOf(link)]}
          ></HeaderLink>
        </li>
      );
    });

  return (
    <header className="govuk-header " role="banner" data-module="govuk-header">
      <div className="govuk-header__container govuk-width-container">
        <div className="govuk-header__logo">
          <a
            href="#"
            className="govuk-header__link govuk-header__link--homepage"
          >
            <span className="govuk-header__logotype">
              <span className="govuk-header__logotype-text">GOV.UK</span>
            </span>
          </a>
        </div>
        <div className="govuk-header__content">
          <a href="#" className="govuk-header__link govuk-header__service-name">
            Web-based GP Service
          </a>
          <nav aria-label="Menu" className="govuk-header__navigation ">
            <button
              type="button"
              className="govuk-header__menu-button govuk-js-header-toggle"
              aria-controls="navigation"
              aria-label="Show or hide menu"
              hidden
            >
              Menu
            </button>
            <ul id="navigation" className="govuk-header__navigation-list">
              {results /* This creates all navigational buttons*/}
              {/* 
              To do for Osman:

              Make it so the selected item has the active attribute class:

              'govuk-header__navigation-item--active'
              
              */}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
