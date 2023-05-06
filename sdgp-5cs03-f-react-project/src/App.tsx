import "./components/css/styles.scss";
import { Link, Route, Routes, useNavigate } from "react-router-dom"; //BrowserRouter isn't required because it exists in index.tsx
import Header from "./components/uniComponents/Header";
import Footer from "./components/uniComponents/Footer";
import PatLogin from "./components/patComponents/PatLogin";
import UserChoice from "./components/uniComponents/choiceComponents/UserChoice";
import { useState } from "react";
import BodyAnimation from "./components/uniComponents/BodyAnimation";
import { mainAni } from "./components/uniComponents/BodyAnimation";
import admNavData from "./components/admComponents/admNavData";
import docNavData from "./components/docComponents/docNavData";
import DocRegistration from "./components/docComponents/DocRegistration";
import patNavData from "./components/patComponents/patNavData";
import HomePage from "./components/uniComponents/Home";
import ViewAppointment from "./components/uniComponents/ViewAppointment";
import Registration from "./components/patComponents/Registration";
import CreateAppointment from "./components/patComponents/CreateAppointment";
import ViewMedRecord from "./components/patComponents/ViewMedRecord";
import DocLogin from "./components/docComponents/DocLogin";
import AdmLogin from "./components/admComponents/AdmLogin";
import AdmRegistration from "./components/admComponents/AdmRegistration";

/*

The way routing is setup is like so: depending on which user button is chosen (admin, doctor, patient), 
the login component passes three arrays containing links, labels and routes to this component (main), 
these arrays are then put through the create functions (createLinks, labels, etcetera…) and they push 
those array elements into the headerLabels, headerLinks and headerRoutes arrays here, finally the 
createFinalRoutes function is used to create the routes and the links and labels are put into the header 
component’s props, and those are used to create the elements in the header that are used to navigate.

Refer to the following files for navigation:

Login.tsx
Header.tsx
HeaderLink.tsx
App.tsx

If you want to edit page navigation, refer to these files:
patNavData.tsx
docNavaData.tsx
admNavData.tsx

Comment made 29/04/2023 - Osman

*/

//These 3 constants, header links, labels and routes are all used for navigation.

let headerLinks: string[] = [];
let headerLabels: string[] = [];
let headerRoutes: React.ReactElement[] = [];

let routeCreator: React.ReactElement[] = []; //This is array is used to store our route components, which are later put on the site

function App() {
  //Interface is defined for useState
  interface headerState {
    linkState: string[];
    labelState: string[];
  }

  //This useState is used to update the header depending on the type of user (doctor, patient, etcetera...)
  const [header, setHeader] = useState<headerState>({
    linkState: headerLinks,
    labelState: headerLabels,
  });

  //Used for setting visibility upon login
  const [loginIsVisible, setLoginIsVisible] = useState<boolean>(true);
  const [backIsVisible, setBackIsVisible] = useState<boolean>(false);
  const [logoutIsVisible, setLogoutIsVisible] = useState<boolean>(false);
  const [loginBackIsVisible, setLoginBackIsVisible] = useState<boolean>(false);
  const [userVisible, setUserVisible] = useState<boolean>(false);

  //This is intended to handle the user's choice (doctor, patient, admin)
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");

  //useNavigate is used to keep the user's URL on the correct page each time they use the buttons.
  const navigate = useNavigate();
  const [reset, setReset] = useState(false);

  /* 
  
  These three functions are used to create the header navigation
  once you have logged in and pressed submit.

  */

  const setHeaderElements = (type: string) => {
    if (type == "Patient") {
      setHeader({
        linkState: patNavData.headerLinks,
        labelState: patNavData.headerLabels,
      });
      headerRoutes = [
        <HomePage />,
        <ViewMedRecord />,
        <Registration />,
        <ViewAppointment />,
        <CreateAppointment nhsNum={username} />,
      ];
    } else if (type == "Doctor") {
      setHeader({
        linkState: docNavData.headerLinks,
        labelState: docNavData.headerLabels,
      });
      headerRoutes = [<HomePage />, <ViewMedRecord />, <Registration />];
    } else if (type == "Admin") {
      setHeader({
        linkState: admNavData.headerLinks,
        labelState: admNavData.headerLabels,
      });
      headerRoutes = [<HomePage />, <ViewMedRecord />];
    }
  };

  const loginSuccess = (success: boolean) => {
    if (success == true && userType == "Patient") {
      setHeaderElements("Patient");

      for (let i = 0; i < headerRoutes.length; i++) {
        routeCreator.push(
          <Route
            path={header.linkState[i]}
            element={
              <BodyAnimation animation={mainAni}>
                {headerRoutes[i]}
              </BodyAnimation>
            }
          />
        );
      }
      setReset(true);
      setBackIsVisible(true);
      setLogoutIsVisible(true);
      setLoginBackIsVisible(false);
      setUserVisible(true);
    } else if (success == true && userType == "Doctor") {
      setHeaderElements("Doctor");

      for (let i = 0; i < headerRoutes.length; i++) {
        routeCreator.push(
          <Route
            path={header.linkState[i]}
            element={
              <BodyAnimation animation={mainAni}>
                {headerRoutes[i]}
              </BodyAnimation>
            }
          />
        );
      }
      setReset(true);
      setBackIsVisible(true);
      setLogoutIsVisible(true);
      setLoginBackIsVisible(false);
      setUserVisible(true);
    } else if (success == true && userType == "Admin") {
      setHeaderElements("Admin");

      for (let i = 0; i < headerRoutes.length; i++) {
        routeCreator.push(
          <Route
            path={header.linkState[i]}
            element={
              <BodyAnimation animation={mainAni}>
                {headerRoutes[i]}
              </BodyAnimation>
            }
          />
        );
      }
      setReset(true);
      setBackIsVisible(true);
      setLogoutIsVisible(true);
      setLoginBackIsVisible(false);
      setUserVisible(true);
    }
  };

  const handleData = (data: any) => {
    setUsername(data);
  };

  const logOut = () => {
    //Reset header arrays and states
    routeCreator = [];
    headerRoutes = [];
    headerLabels = [];
    headerLinks = [];
    setHeader({
      linkState: headerLinks,
      labelState: headerLabels,
    });
    //Setting reset to true resets the header, the header takes a boolean prop called reset which activates this
    setReset(false);
    setReset(true);

    //Sets the user back to the user choice
    setUserType("Back");
    setBackIsVisible(false);
    setLoginBackIsVisible(false);
    setLoginIsVisible(false);
    setLogoutIsVisible(false);
    setUsername("");
    setUserVisible(false);
  };

  const handleNavigation = (input: string) => {
    console.log(input);
    setUserType(input);

    //Navigate is used to automatically put user on the default page after logging in
    navigate("/");

    //Set login page to visible, this is done so after logging out the login is set to visible once again
    setLoginIsVisible(true);
    setBackIsVisible(false);
    setLoginBackIsVisible(true);
    setUserVisible(false);
  };

  const goBackFromLogin = () => {
    setUserType("Back");
    setLoginBackIsVisible(false);
  };

  return (
    <>
      {/* The header, the above link and label variables are passed here */}

      <div id="header">
        <Header
          links={header.linkState}
          labels={header.labelState}
          reset={reset}
        />
      </div>

      <div className="govuk-width-container app-width-container" id="body">
        {/* Logout Button */}
        {logoutIsVisible && (
          <>
            <a onClick={logOut} className="govuk-back-link">
              Logout
            </a>
            <span>&nbsp;&nbsp;</span>
          </>
        )}

        {/* Back Button */}
        {backIsVisible && (
          <>
            <a onClick={() => navigate(-1)} className="govuk-back-link">
              Back
            </a>
            <span>&nbsp;&nbsp;</span>
          </>
        )}

        {loginBackIsVisible && (
          <>
            <a onClick={goBackFromLogin} className="govuk-back-link">
              Back
            </a>
            <span>&nbsp;&nbsp;</span>
          </>
        )}

        {userVisible && (
          <>
            <div>
              <a className="govuk-body govuk-!-font-weight-bold">
                &nbsp;&nbsp;&nbsp;&nbsp;{userType} | Logged in as 'w{username}'
              </a>
              <span>&nbsp;&nbsp;</span>
            </div>
          </>
        )}

        {/* RouteCreator function is used to automatically create routes based on routeState and routeHeader variables */}
        <Routes>{routeCreator};</Routes>

        {/* This switch case checks the user use-state, which is defined depending on the user button pressed. */}
        {(() => {
          switch (userType) {
            case "Patient":
              return (
                <div>
                  {loginIsVisible && (
                    <PatLogin
                      userType="Patient"
                      passSuccess={loginSuccess}
                      username={handleData}
                    />
                  )}
                </div>
              );
            case "Doctor":
              return (
                <div>
                  {loginIsVisible && (
                    <DocLogin
                      userType="Doctor"
                      passSuccess={loginSuccess}
                      username={handleData}
                    />
                  )}
                </div>
              );
            case "Admin":
              return (
                <div>
                  {loginIsVisible && (
                    <>
                      <AdmLogin
                        userType="Admin"
                        passSuccess={loginSuccess}
                        username={handleData}
                      />
                    </>
                  )}
                </div>
              );
            case "Patient Register":
              return <div>{loginIsVisible && <Registration />}</div>;
            case "Doctor Register":
              return <div>{loginIsVisible && <DocRegistration />}</div>;
            case "Admin Register":
              return <div>{loginIsVisible && <AdmRegistration />}</div>;
            /*

            The default case is a button, the onButClick prop is used to determine the type of user, 
            the user’s state is then updated to either doctor, patient and admin and then the type of login is chosen.

            Case "Back" is for logging out or using the back button before logging in.

            */

            case "Back":
              return <UserChoice onButClick={handleNavigation} />;
            default:
              return <UserChoice onButClick={handleNavigation} />;
          }
        })()}
      </div>
      <div id="footer">
        <Footer />
      </div>
      <script src="/govuk-frontend/all.js"></script>
    </>
  );
}

export default App;
