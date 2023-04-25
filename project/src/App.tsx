import "./styles.scss";
import { Link, Route, Routes } from "react-router-dom"; //BrowserRouter isn't required because it exists in index.js
import HomePage from "./components/HomePage";
import ViewAppointment from "./components/ViewAppointment";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Registration from "./components/Registration";

const headerLinks = ["/", "/login", "/reg", "/viewApp"]; //This array contains the paths to elements
const headerLabels = ["Home", "Login", "Registration", "View Appointments"]; //This array contains the labels of the header links

function App() {
  return (
    <>
      <div id="header">
        <Header links={headerLinks} labels={headerLabels} />
      </div>

      <div className="govuk-width-container app-width-container" id="body">
        <Routes>
          {" "}
          {/* Note to Osman: consider using for loops to generate routes depending on how many headerLinks there are*/}
          <Route path={headerLinks[0]} element={<HomePage />} />
          <Route path={headerLinks[1]} element={<Login />} />
          <Route path={headerLinks[2]} element={<Registration />} />
          <Route path={headerLinks[3]} element={<ViewAppointment />} />
        </Routes>
      </div>

      <div id="footer">
        <Footer />
      </div>
      <script src="/govuk-frontend/all.js"></script>
    </>
  );
}

export default App;
