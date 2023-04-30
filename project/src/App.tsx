import "./components/css/styles.scss";
import { Link, Route, Routes, useNavigate } from "react-router-dom"; //BrowserRouter isn't required because it exists in index.tsx
import Header from "./components/uniComponents/Header";
import Footer from "./components/uniComponents/Footer";
import Login from "./components/uniComponents/Login";
import UserChoice from "./components/uniComponents/choiceComponents/UserChoice";
import { useState } from "react";

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
    routerState: React.ReactElement[];
  }

  //This useState is used to update the header depending on the type of user (doctor, patient, etcetera...)
  const [header, setHeader] = useState<headerState>({
    linkState: headerLinks,
    labelState: headerLabels,
    routerState: headerRoutes,
  });

  //Used for setting visibility upon login
  const [loginIsVisible, setLoginIsVisible] = useState<boolean>(true);
  const [backIsVisible, setBackIsVisible] = useState<boolean>(false);

  //This is intended to handle the user's choice (doctor, patient, admin)
  const [user, setUser] = useState("");

  //useNavigate is used to keep the user's URL on the correct page each time they use the buttons.
  const navigate = useNavigate();

  /* 
  
  These three functions are used to create the header navigation
  once you have logged in and pressed submit.

  */

  const createLinks = (links: string[]) => {
    for (let i = 0; i < links.length; i++) {
      headerLinks.push(links[i]);
    }
  };

  const createLabels = (labels: string[]) => {
    for (let i = 0; i < labels.length; i++) {
      headerLabels.push(labels[i]);
    }
  };

  const createRoutes = (routes: React.ReactElement[]) => {
    for (let i = 0; i < routes.length; i++) {
      headerRoutes.push(routes[i]);
    }

    //Once login is finished, it is removed and back is presented above other components
    setLoginIsVisible(false);
    setBackIsVisible(true);
  };

  //Finally, this sets up the routes for the links displayed on the header
  const createFinalRoutes = () => {
    //Setting the state of header elements
    setHeader({
      linkState: headerLinks,
      labelState: headerLabels,
      routerState: headerRoutes,
    });

    //This if statement generates the amount of routes required based on the amount of labels and links to page components.
    if (headerLinks.length > 0 && headerLabels.length > 0) {
      for (let i = 0; i < headerLinks.length; i++) {
        routeCreator.push(
          <Route path={header.linkState[i]} element={header.routerState[i]} />
        );
      }
    }
  };

  const handleNavigation = (input: string) => {
    setUser(input);

    //Navigate is used to automatically put user on the default page after logging in
    navigate("/");
  };

  return (
    <>
      {/* The header, the above link and label variables are passed here */}
      <div id="header">
        <Header links={header.linkState} labels={header.labelState} />
      </div>

      <div className="govuk-width-container app-width-container" id="body">
        {/* Back Button */}
        {backIsVisible && (
          <a onClick={() => navigate(-1)} className="govuk-back-link">
            Back
          </a>
        )}

        {/* RouteCreator function is used to automatically create routes based on routeState and routeHeader variables */}
        <Routes>{routeCreator};</Routes>

        {/* This switch case checks the user use-state, which is defined depending on the user button pressed. */}
        {(() => {
          switch (user) {
            case "Patient":
              return (
                <div onClick={createFinalRoutes}>
                  {loginIsVisible && (
                    <Login
                      userType="Patient"
                      passLabels={createLabels}
                      passLinks={createLinks}
                      passRoutes={createRoutes}
                    />
                  )}
                </div>
              );
            case "Doctor":
              return (
                <div onClick={createFinalRoutes}>
                  {loginIsVisible && (
                    <Login
                      userType="Doctor"
                      passLabels={createLabels}
                      passLinks={createLinks}
                      passRoutes={createRoutes}
                    />
                  )}
                </div>
              );
            case "Admin":
              return (
                <div onClick={createFinalRoutes}>
                  {loginIsVisible && (
                    <Login
                      userType="Admin"
                      passLabels={createLabels}
                      passLinks={createLinks}
                      passRoutes={createRoutes}
                    />
                  )}
                </div>
              );

            /*

            The default case is a button, the onButClick prop is used to determine the type of user, 
            the user’s state is then updated to either doctor, patient and admin and then the type of login is chosen.

            */

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
