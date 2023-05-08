/*

Authored by:
Osman

This patient registration is used to register patients from the vaccine.db 
to the local GP database, it requires their NHS number and all you need to do after is give them a password, all information is transferred after.

*/

import { useState } from "react";
import BodyAnimation from "../uniComponents/BodyAnimation";
import jq from "jquery";
import { errorAni } from "../uniComponents/BodyAnimation";

const PatRegistrationExist = () => {
  //States for holding input data
  const [nhsNumState, setNHSNum] = useState(0);
  const [passwordState, setPassword] = useState("");

  //States for error checking
  const [errorsVisible, setErrorsVisible] = useState(false);
  const [errors, setErrors] = useState([]);

  //Function that performs registration
  function register() {
    let registerData = {
      nhsNum: nhsNumState,
      password: passwordState,
    };

    jq.ajax({
      type: "POST",
      url: "http://localhost/php/pat-register-vaccines.php",
      data: registerData,
      mode: "no-core",
      success: function (data) {
        let newErrors = [];
        setErrors(newErrors);
        var dataReturned = jq.parseJSON(data);
        if (dataReturned[0] === "Success") {
          newErrors.push(
            <h3 className="govuk-heading-m"> Successful Registration </h3>
          );
          setErrors(newErrors);
          setErrorsVisible(true);
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
          setErrorsVisible(true);
        }
      },
    });
  }

  return (
    <>
      <div className="govuk-width-container">
        <main className="govuk-main-wrapper">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-xl">
                Patient Registration (vaccines.db)
              </h1>
            </div>
          </div>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <div className="govuk-form-group">
                <label className="govuk-label" htmlFor="fNameLog">
                  NHS Number
                </label>
                <input
                  className="govuk-input govuk-input--width-10"
                  id="fNameLog"
                  name="fNameLog"
                  type="text"
                  onChange={(e) => setNHSNum(e.target.value)}
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
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="govuk-button"
                data-module="govuk-button"
                onClick={register}
              >
                Submit
              </button>
            </div>
            {errorsVisible && (
              <div className="govuk-grid-column-one-third">
                <BodyAnimation animation={errorAni}>{errors}</BodyAnimation>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default PatRegistrationExist;
