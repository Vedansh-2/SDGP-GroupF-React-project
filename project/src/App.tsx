import "./styles.scss";
import { Link, Route, Routes } from "react-router-dom"; //BrowserRouter isn't required because it exists in index.js
import HomePage from "./components/HomePage";
import ViewAppointment from "./components/ViewAppointment";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Registration from "./components/Registration";
import CreateAppointment from "./components/CreateAppointment";

/*

These 3 constants, header links, labels and routes are all used for navigration, if you edit an index of one you are required to edit the same index of the rest.
For example: if index 1 of links is to login, then index 1 of labels must display a Login label, and index 1 of routes must route to a login component.

*/

const headerLinks = ["/", "/login", "/reg", "/viewApp", "/createApp"]; //This array contains the paths to elements
const headerLabels = [
  "Home",
  "Login",
  "Registration",
  "View and Cancel Appointments",
  "Create Appointment",
]; //This array contains the labels of the header links
const headerRoutes: React.ReactElement[] = [
  <HomePage />,
  <Login />,
  <Registration />,
  <ViewAppointment />,
  <CreateAppointment />,
]; //This array contains the elements to be routed to

let routeCreator: React.ReactElement[] = []; //This is array is used to store our route componenets, which are later put on the site

//This if statement generates the amount of routes required based on the amount of labels and links to page components.
if (headerLinks.length > 0 && headerLabels.length > 0) {
  for (let i = 0; i < headerLinks.length; i++) {
    console.log(routeCreator[i]);
    routeCreator.push(
      <Route path={headerLinks[i]} element={headerRoutes[i]} />
    );
  }
}

function App() {
  return (
    <>
      <div id="header">
        <Header links={headerLinks} labels={headerLabels} />
      </div>

      <div className="govuk-width-container app-width-container" id="body">
        <Routes>{routeCreator};</Routes>
      </div>

      <div id="footer">
        <Footer />
      </div>
      <script src="/govuk-frontend/all.js"></script>
    </>
  );
}

export default App;
