/*

The Admin login component is used for admins logging into the system, it also sends valuable navigation data to the header.

*/

import BodyAnimation from "../uniComponents/BodyAnimation";
import { loginAni, errorAni } from "../uniComponents/BodyAnimation";
import { useState, useEffect } from "react";
import jq from "jquery";

//The above imports are components used to store navigation data.

//Props used are:
//username(fName) - used for passing username back to App.tsx
//passSuccess(true) - used for letting App.tsx know that the user has entered the correct information

const AdmLogin = (props) => {
  //Some basic states declared

  //States for logging in
  const [admNum, setAdmNum] = useState(0);
  const [passwordState, setPassword] = useState("");

  //States for catching errors
  const [errors, setErrors] = useState([]);

  //States for visibility
  const [errorVisible, setErrorVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(true);
  const [buttonValue, setButtonValue] = useState("Submit");
  const [pageVisible, setPageVisible] = useState(true);

  function login() {
    //Stores user's login for jQuery
    let loginData = {
      admNum: admNum,
      password: passwordState,
    };

    //Post request
    jq.ajax({
      type: "POST",
      url: "http://localhost/php/adm-login.php",
      data: loginData,
      mode: "no-core",
      success: function (data) {
        var dataReturned = jq.parseJSON(data);
        if (dataReturned[0] === "Success") {
          setErrorVisible(false);

          //Passes the username and success for app
          props.username(admNum);
          props.passSuccess(true);

          //Remove login items
          setLoginVisible(false);

          //Go to home page is used to redirect user to routes
          setButtonValue("Go to home page");
          if (buttonValue === "Go to home page") {
            //When the button is set to this text, it will remove all page (I think this is a cleaver implementation to same lines)
            setPageVisible(false);
          }
        } else {
          //If errors are found, else is triggered

          //Storing errors and then displaying them in an error box
          let newErrors = [];
          setErrors(newErrors);
          newErrors.push(<h3 className="govuk-heading-m"> Requirements: </h3>);
          for (let i = 1; i < dataReturned.length; i++) {
            newErrors.push(<p className="govuk-body">{dataReturned[i]}</p>);
          }
          setErrors(newErrors);
          setErrorVisible(true);
        }
      },
    });
  }

  //Depending on user type, different navigation data is passed.
  //Triggered by clicking the submit button.

  return (
    <>
      {pageVisible && (
        <BodyAnimation animation={loginAni}>
          <div className="govuk-width-container">
            <main className="govuk-main-wrapper">
              <div className="govuk-grid-row">
                {loginVisible && (
                  <div className="govuk-grid-column-two-thirds">
                    <h1 className="govuk-heading-xl">Admin Login</h1>
                  </div>
                )}
              </div>
              <div className="govuk-grid-row">
                <div className="govuk-grid-column-two-thirds">
                  {loginVisible && (
                    <>
                      <div className="govuk-form-group">
                        <label className="govuk-label" htmlFor="nameLog">
                          Admin Number
                        </label>
                        <input
                          className="govuk-input govuk-input--width-10"
                          id="nameLog"
                          name="nameLog"
                          type="text"
                          onChange={(e) => setAdmNum(parseInt(e.target.value))}
                        />
                      </div>
                      <div className="govuk-form-group">
                        <label className="govuk-label" htmlFor="passwordLog">
                          Password
                        </label>
                        <input
                          className="govuk-input govuk-input--width-10"
                          id="passwordLog"
                          name="passwordLog"
                          type="text"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  <button
                    className="govuk-button"
                    data-module="govuk-button"
                    onClick={login}
                  >
                    {buttonValue}
                  </button>
                </div>
                {errorVisible && (
                  <div className="govuk-grid-column-one-third">
                    <BodyAnimation animation={errorAni}>{errors}</BodyAnimation>
                  </div>
                )}
              </div>
            </main>
          </div>
        </BodyAnimation>
      )}
    </>
  );
};

export default AdmLogin;
