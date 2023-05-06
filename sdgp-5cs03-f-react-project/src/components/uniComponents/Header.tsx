/*

The header component displays at the top of the page, it is passed arrays that contain links and labels to be used to put navigation components directly in the header.

*/

import HeaderLink from "./HeaderLink";

//The links and labels arrays are passed to the header to be used in the header links.
interface Props {
  links: string[];
  labels: string[];
  reset: boolean;
  //routes: (pass: React.ReactElement[]) => [any]; //Used to pass if successful
}

//This variable stores navigation items
let results: React.ReactElement[] = [];

const Header = ({ links, labels, reset }: Props) => {
  if (reset == true) {
    results = [];
    if (results.length == 0) {
      //For loop creates each header link depending on the length of links array
      for (let i = 0; i < links.length; i++) {
        results.push(
          <li className="govuk-header__navigation-item">
            <HeaderLink
              link={links[i]}
              label={" " + labels[links.indexOf(links[i])]}
            ></HeaderLink>
          </li>
        );
        console.log(results);
      }
    }
  }

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
