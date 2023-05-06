/*

Authored by:
Ali
Diogo

The patient login component is used for patients logging into the system, it also sends valuable navigation data to the header.

*/

import BodyAnimation from "../uniComponents/BodyAnimation";
import { loginAni, errorAni } from "../uniComponents/BodyAnimation";
import { useState } from "react";
import jq from "jquery";

const PatLogin = (props) => {
  //States for logging in
  const [nhsState, setNHS] = useState(0);
  const [passwordState, setPassword] = useState("");

  //States for catching errors
  const [errors, setErrors] = useState([]);

  //States for visibility
  const [visible, setVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(true);
  const [buttonValue, setButtonValue] = useState("Submit");
  const [pageVisible, setPageVisible] = useState(true);

  function login() {
    //Stores user's login for
    let loginData = {
      nhsNum: nhsState,
      password: passwordState,
    };

    //JQuery to check user login
    jq.ajax({
      type: "POST",
      url: "http://localhost/php/pat-login.php",
      data: loginData,
      mode: "no-core",
      success: function (data) {
        var json = jq.parseJSON(data);
        if (json[0] === "Success") {
          setVisible(false);

          //Returning username and success
          props.username(nhsState);
          props.passSuccess(true);

          //Chanes submit button
          setLoginVisible(false);
          setButtonValue("Go to home page");
          if (buttonValue === "Go to home page") {
            setPageVisible(false);
          }
        } else {
          //Error logging
          let newErrors = [];
          setErrors(newErrors);
          newErrors.push(<h3 className="govuk-heading-m"> Requirements: </h3>);
          for (let i = 1; i < json.length; i++) {
            newErrors.push(<p className="govuk-body">{json[i]}</p>);
          }
          setErrors(newErrors);
          setVisible(true);
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
                    <h1 className="govuk-heading-xl">Patient Login</h1>
                  </div>
                )}
              </div>
              <div className="govuk-grid-row">
                <div className="govuk-grid-column-two-thirds">
                  {loginVisible && (
                    <>
                      <div className="govuk-form-group">
                        <label className="govuk-label" htmlFor="nameLog">
                          NHSNumber
                        </label>
                        <input
                          className="govuk-input govuk-input--width-10"
                          id="nameLog"
                          name="nameLog"
                          type="text"
                          onChange={(e) => setNHS(parseInt(e.target.value))}
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
                {visible && (
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

export default PatLogin;
