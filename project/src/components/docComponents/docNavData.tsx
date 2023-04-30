//Each nav data component is used for storing navigation data for each user role.

import HomePage from "../uniComponents/Home";
import ViewAppointment from "../uniComponents/ViewAppointment";
import Registration from "../patComponents/Registration";

const docNavData = {
  headerLinks: ["/", "/reg", "/viewApp"], //This array contains the paths to elements
  headerLabels: ["Home", "Registration", "View and Cancel Appointments"],
  headerRoutes: [<HomePage />, <Registration />, <ViewAppointment />],
};

export default docNavData;
