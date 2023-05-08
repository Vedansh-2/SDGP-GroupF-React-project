/*

Authored by:
Osman
Diogo

The header link component is used to create links for the header component.

*/

import { Link } from "react-router-dom"; //Only link is required for this component
import BodyAnimation from "./BodyAnimation";
import { loginAni } from "./BodyAnimation";

//These props are carry a link and label for each 'HeaderLink' component
interface Props {
  link: string;
  label: string;
}

const HeaderLink = ({ link, label }: Props) => {
  return (
    <BodyAnimation animation={loginAni}>
      <Link to={link} className="govuk-header__link">
        {label}
      </Link>
    </BodyAnimation>
  );
};

export default HeaderLink;
