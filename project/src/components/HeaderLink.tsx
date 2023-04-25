import { BrowserRouter, Route, Link, Routes } from "react-router-dom";

interface Props {
  link: string;
  label: string;
}

const HeaderLink = ({ link, label }: Props) => {
  return (
    <Link to={link} className="govuk-header__link">
      {label}
    </Link>
  );
};

export default HeaderLink;
