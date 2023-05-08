/*

Authored by:
Osman
Sayhan

*/

//Each nav data component is used for storing navigation data for each user role.

interface PatNavData {
  headerLinks: string[];
  headerLabels: string[];
}

const patNavData: PatNavData = {
  headerLinks: ["/", "/viewMed", "/createApp", "patViewApp", "/dereg"], //This array contains the paths to elements
  headerLabels: [
    "Home",
    "View Medical Record",
    "Create Appointment",
    "View your appointments",
    "Deregister",
  ],
};

export default patNavData;
