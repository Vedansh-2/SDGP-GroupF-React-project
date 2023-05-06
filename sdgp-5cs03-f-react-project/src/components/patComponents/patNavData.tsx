//Each nav data component is used for storing navigation data for each user role.

import HomePage from "../uniComponents/Home";
import ViewAppointment from "../uniComponents/ViewAppointment";
import Registration from "./Registration";
import CreateAppointment from "./CreateAppointment";
import ViewMedRecord from "./ViewMedRecord";

interface PatNavData {
  headerLinks: string[];
  headerLabels: string[];
  headerRoutes: React.ReactElement[];
}

const patNavData: PatNavData = {
  headerLinks: ["/", "/viewMed", "/reg", "/viewApp", "/createApp"], //This array contains the paths to elements
  headerLabels: [
    "Home",
    "View Medical Record",
    "Registration",
    "View and Cancel Appointments",
    "Create Appointment",
  ],
  headerRoutes: [
    <HomePage />,
    <ViewMedRecord />,
    <Registration />,
    <ViewAppointment />,
    <CreateAppointment nhsNum="" />,
  ],
};

export default patNavData;
