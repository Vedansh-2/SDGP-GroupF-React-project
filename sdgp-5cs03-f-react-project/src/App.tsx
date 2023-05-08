/*

Authors:

Osman
Diogo
Ali
Sayhan
Vedansh
Khalid

This is the main component of the whole project, it is where everything runs
and therefore includes a lot of imports. Navigation is done here, 
user choice on what type of user they are (patient, doctor, admin), 
storing login data (username, NHS number), visibility of components, 
logging out, and much more. Be very careful when tweaking around with this.

*/

import "./components/css/styles.scss";
import { Route, Routes, useNavigate } from "react-router-dom"; //BrowserRouter isn't required because it exists in index.tsx
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
import AdmViewAppointment from "./components/admComponents/AdmViewAppointment";
import Registration from "./components/patComponents/PatRegistration";
import CreateAppointment from "./components/patComponents/CreateAppointment";
import ViewMedRecord from "./components/patComponents/ViewMedRecord";
import DocLogin from "./components/docComponents/DocLogin";
import AdmLogin from "./components/admComponents/AdmLogin";
import AdmRegistration from "./components/admComponents/AdmRegistration";
import Deregister from "./components/patComponents/Deregister";
import DocViewAppointment from "./components/docComponents/DocViewAppointment";
import PatRegistrationExist from "./components/patComponents/PatRegistrationExist";
import PatViewAppointment from "./components/patComponents/PatViewAppointment";

//These 3 constants, header links, labels and routes are all used for navigation.
//They are passed to the header which then uses them as elements for navigation

let headerLinks: string[] = [];
let headerLabels: string[] = [];
let headerRoutes: React.ReactElement[] = [];

let routeCreator: React.ReactElement[] = []; //This is array is used to store our route components, which are later put on the site

function App() {
  //Interface is defined for the header useState
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
  const [loginIsVisible, setLoginIsVisible] = useState<boolean>(true); //hides login page
  const [backIsVisible, setBackIsVisible] = useState<boolean>(false); //hides back button
  const [logoutIsVisible, setLogoutIsVisible] = useState<boolean>(false); //shows logout button
  const [loginBackIsVisible, setLoginBackIsVisible] = useState<boolean>(false); //hides back button for user choice
  const [userVisible, setUserVisible] = useState<boolean>(false); //shows the user's username at the top of the screen

  //This is intended to handle the user's choice (doctor, patient, admin)
  const [userType, setUserType] = useState(""); //userType is patient, doctor, etc
  const [username, setUsername] = useState(""); //username is nhsNumber or first name

  //useNavigate is used to keep the user's URL on the correct page each time they use the buttons.
  const navigate = useNavigate();

  //Reset is used to reset the header's elements upon logout
  const [reset, setReset] = useState(false);

  /* 
  
  These three functions are used to create the header navigation
  once you have logged in and pressed submit.

  */

  const setHeaderElements = (type: string) => {
    /*

    Depending on type, a different header route array is selected

    */
    if (type == "Patient") {
      setHeader({
        linkState: patNavData.headerLinks,
        labelState: patNavData.headerLabels,
      });
      headerRoutes = [
        <HomePage />,
        <ViewMedRecord nhsNum={username} />,
        <CreateAppointment nhsNum={username} />,
        <PatViewAppointment nhsNum={username} />,
        <Deregister nhsNum={username} onButClick={logOut} />,
      ];
    } else if (type == "Doctor") {
      setHeader({
        linkState: docNavData.headerLinks,
        labelState: docNavData.headerLabels,
      });
      headerRoutes = [<HomePage />, <DocViewAppointment docNum={username} />];
    } else if (type == "Admin") {
      setHeader({
        linkState: admNavData.headerLinks,
        labelState: admNavData.headerLabels,
      });
      headerRoutes = [<HomePage />, <AdmViewAppointment />];
    }
  };

  /*

  Called upon a successful login attempt

  */
  const loginSuccess = (success: boolean) => {
    //Depending on selected type, choose different routes
    if (success == true) {
      if (success == true && userType == "Patient") {
        setHeaderElements("Patient");
      } else if (success == true && userType == "Doctor") {
        setHeaderElements("Doctor");
      } else if (success == true && userType == "Admin") {
        setHeaderElements("Admin");
      }

      //Creating routes
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

      //Visibility of elements once logged in
      setReset(true);
      setBackIsVisible(true);
      setLogoutIsVisible(true);
      setLoginBackIsVisible(false);
      setUserVisible(true);
    }
  };

  //Callback for storing user's name
  const handleUsername = (data: any) => {
    setUsername(data);
  };

  //Called when logging out:
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

    //Visibility after logging out is reset to default.
    setBackIsVisible(false);
    setLoginBackIsVisible(false);
    setLoginIsVisible(false);
    setLogoutIsVisible(false);
    setUsername("");
    setUserVisible(false);
  };

  const userChoiceSelected = (input: string) => {
    setUserType(input);

    //Navigate is used to automatically put user on the default page after logging in
    navigate("/");

    //Set login page to visible, this is done so after logging out the login is set to visible once again
    setLoginIsVisible(true);
    setBackIsVisible(false);
    setLoginBackIsVisible(true);
    setUserVisible(false);
  };

  //This shouldn't be confused with logging out, it is simply a way to return to the user choice before logging in
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

        {/* After clicking user choice, a different back button is used to 
          go back to user choice, alternatively, we probably could've had it
          so the onClick changes after getting to the home page, 
          but oh well */}
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
                      username={handleUsername}
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
                      username={handleUsername}
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
                        username={handleUsername}
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
            case "Patient Register Existing":
              return <div>{loginIsVisible && <PatRegistrationExist />}</div>;
            /*

            The default case is a button, the onButClick prop is used to determine the type of user, 
            the user’s state is then updated to either doctor, patient and admin and then the type of login is chosen.

            Case "Back" is for logging out or using the back button before logging in.

            */

            case "Back":
              return <UserChoice onButClick={userChoiceSelected} />;
            default:
              return <UserChoice onButClick={userChoiceSelected} />;
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
