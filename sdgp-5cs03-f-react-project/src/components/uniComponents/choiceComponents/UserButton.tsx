/*

The user button component is used in combination with the 
user choice component to prompt the user 
to state their permission.

*/

import { Button } from "govuk-react";

//Can be passed type, which determines the button string and name
interface Props {
  type: string;
}

//Depending on 'type' prop, color is modified
let color = "";

//This button is used to choose which user is using the site
const UserButton = ({ type }: Props) => {
  if (type === "Doctor Login") {
    color = "#00b043";
  } else if (type === "Admin Login") {
    color = "#00a1b0";
  } else if (type === "Patient Login") {
    color = "#a6a6a6";
  } else if (type === "Doctor Register") {
    color = "#00b043";
  } else if (type === "Admin Register") {
    color = "#00a1b0";
  } else if (type === "Patient Register") {
    color = "#a6a6a6";
  }
  return (
    <>
      <Button buttonColour={color} start>
        {type}
      </Button>
    </>
  );
};

export default UserButton;
