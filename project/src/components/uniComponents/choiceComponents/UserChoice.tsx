/*

The user choice component prompts the user to choose the 
interface they want to interact with, 
whether it be the doctor, admin or patient type.

*/

import UserButton from "./UserButton";
import "../../css/componentStyle.css";

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
    }
  };

  return (
    <>
      <main
        className="govuk-main-wrapper app-main-class"
        id="main-content"
        role="main"
      >
        {/* User choices: */}
        <table className="center">
          <tr>
            <th>
              <div data-type="Patient" onClick={handleClick}>
                <UserButton type="Patient" />
              </div>
            </th>
            <th>
              <div data-type="Doctor" onClick={handleClick}>
                <UserButton type="Doctor" />
              </div>
            </th>
            <th>
              <div data-type="Admin" onClick={handleClick}>
                <UserButton type="Admin" />
              </div>
            </th>
          </tr>
        </table>
      </main>
    </>
  );
};

export default UserChoice;
