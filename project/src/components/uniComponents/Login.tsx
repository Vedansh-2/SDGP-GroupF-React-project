/*

The login component is used for logging into the system, it also sends valuable navigation data to the header.

*/

import docNavData from "../docComponents/docNavData";
import patNavData from "../patComponents/patNavData";
import admNavData from "../admComponents/admNavData";
//The above imports are components used to store navigation data.

interface Props {
  userType: string; //Used to determine user's type

  //These three pass props are used to pass information for creating navigation

  passLinks: (links: string[]) => void; //Used to pass links
  passLabels: (labels: string[]) => void; //Used to pass labels
  passRoutes: (routes: React.ReactElement[]) => void; //Used to pass routes
}

const Login = ({ userType, passLinks, passLabels, passRoutes }: Props) => {
  //Depending on user type, different navigation data is passed.
  //Triggered by clicking the submit button.
  const onClick = () => {
    if (userType == "Patient") {
      passLinks(patNavData.headerLinks);
      passLabels(patNavData.headerLabels);
      passRoutes(patNavData.headerRoutes);
      return <></>;
    } else if (userType == "Doctor") {
      passLinks(docNavData.headerLinks);
      passLabels(docNavData.headerLabels);
      passRoutes(docNavData.headerRoutes);
    } else if (userType == "Admin") {
      passLinks(admNavData.headerLinks);
      passLabels(admNavData.headerLabels);
      passRoutes(admNavData.headerRoutes);
    }

    //This should be dependent on login success, PHP to be added!
  };

  return (
    <main
      className="govuk-main-wrapper app-main-class"
      id="main-content"
      role="main"
    >
      <h1 className="govuk-heading-xl">{userType} Login Page</h1>

      <div className="govuk-form-group">
        <label className="govuk-label" htmlFor="nameLog">
          Name
        </label>
        <input
          className="govuk-input govuk-input--width-10"
          id="nameLog"
          name="nameLog"
          type="text"
        />
      </div>
      <div className="govuk-form-group">
        <label className="govuk-label" htmlFor="passwordLog">
          Password
        </label>
        <input
          className="govuk-input govuk-input--width-10"
          id="passwordLog"
          name="passwordLog"
          type="text"
        />
      </div>
      <button
        className="govuk-button"
        data-module="govuk-button"
        onClick={onClick}
      >
        Submit
      </button>
    </main>
  );
};

export default Login;
