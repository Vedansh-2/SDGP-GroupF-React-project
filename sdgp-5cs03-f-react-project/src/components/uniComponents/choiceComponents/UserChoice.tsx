/*

Authored by:
Sayhan
Khalid

The user choice component prompts the user to choose the 
interface they want to interact with, 
whether it be the doctor, admin or patient type.

They can choose to either login or register for each type.

*/

import UserButton from "./UserButton";
import "../../css/componentStyle.css";
import BodyAnimation from "../BodyAnimation";
import { userAni } from "../BodyAnimation";
import { userTran } from "../BodyAnimation";

//onButClick passes the choice data from this component to main
interface Props {
  onButClick: (data: string) => void;
}

const UserChoice = (props: Props) => {
  /*
    This function checks the ‘data-type’ attribute of all divisions 
    around each button, these data-types each contain a type of 
    user and depending on which one is clicked, a different 
    user type is passed to main. 
  */
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.currentTarget.getAttribute("data-type") === "Patient") {
      const data = "Patient";
      props.onButClick(data);
    } else if (event.currentTarget.getAttribute("data-type") === "Doctor") {
      const data = "Doctor";
      props.onButClick(data);
    } else if (event.currentTarget.getAttribute("data-type") === "Admin") {
      const data = "Admin";
      props.onButClick(data);
    } else if (
      event.currentTarget.getAttribute("data-type") === "Patient Register"
    ) {
      const data = "Patient Register";
      props.onButClick(data);
    } else if (
      event.currentTarget.getAttribute("data-type") === "Doctor Register"
    ) {
      const data = "Doctor Register";
      props.onButClick(data);
    } else if (
      event.currentTarget.getAttribute("data-type") === "Admin Register"
    ) {
      const data = "Admin Register";
      props.onButClick(data);
    } else if (
      event.currentTarget.getAttribute("data-type") ===
      "Patient Register Existing"
    ) {
      const data = "Patient Register Existing";
      props.onButClick(data);
    }
  };

  return (
    <>
      <main
        className="govuk-main-wrapper app-main-class"
        id="main-content"
        role="main"
      >
        <div className="govuk-grid-row">
          <div className="govuk-main-wrapper  govuk-grid-column-full"></div>
        </div>
        <BodyAnimation animation={userAni} transition={userTran}>
          {/* User choices: */}
          <table className="center">
            <thead></thead>
            <tbody>
              <tr>
                <th>
                  <div data-type="Patient" onClick={handleClick}>
                    <UserButton type="Patient Login" />
                  </div>
                  <div data-type="Patient Register" onClick={handleClick}>
                    <UserButton type="Patient Register" />
                  </div>
                  <div
                    data-type="Patient Register Existing"
                    onClick={handleClick}
                  >
                    <UserButton type="Patient Register Existing" />
                  </div>
                  <div data-type="Doctor" onClick={handleClick}>
                    <UserButton type="Doctor Login" />
                  </div>
                  <div data-type="Doctor Register" onClick={handleClick}>
                    <UserButton type="Doctor Register" />
                  </div>
                  <div data-type="Admin" onClick={handleClick}>
                    <UserButton type="Admin Login" />
                  </div>
                  <div data-type="Admin Register" onClick={handleClick}>
                    <UserButton type="Admin Register" />
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </BodyAnimation>
        <div className="govuk-grid-row">
          <div className="govuk-main-wrapper  govuk-grid-column-full"></div>
        </div>
      </main>
    </>
  );
};

export default UserChoice;
