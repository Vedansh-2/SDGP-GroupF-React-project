//Each nav data component is used for storing navigation data for each user role.

import HomePage from "../uniComponents/Home";
import ViewAppointment from "../uniComponents/ViewAppointment";
import CreateAppointment from "../patComponents/CreateAppointment";

const admNavData = {
  headerLinks: ["/", "/viewApp"], //This array contains the paths to elements
  headerLabels: ["Home", "View and Cancel Appointments"],
  headerRoutes: [<HomePage />, <ViewAppointment />, <CreateAppointment />],
};

export default admNavData;
