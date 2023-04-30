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
  if (type === "Doctor") {
    color = "#00b043";
  } else if (type === "Admin") {
    color = "#00a1b0";
  } else if (type === "Patient") {
    color = "#a6a6a6";
  }
  return (
    <>
      <Button buttonColour={color} start>
        {type} Page
      </Button>
    </>
  );
};

export default UserButton;
