/*

Authored by:
Ali
Khalid


Doctor registration is used for doctors to register to the system.

*/

import { useState } from "react";
import BodyAnimation from "../uniComponents/BodyAnimation";
import jq from "jquery";
import { errorAni } from "../uniComponents/BodyAnimation";

const DocRegistration = () => {
  //States for holding input data
  const [docNumState, setDocNum] = useState(0);
  const [fNameState, setFName] = useState("");
  const [passwordState, setPassword] = useState("");

  //States for error checking
  const [errorsVisible, setErrorsVisible] = useState(false);
  const [errors, setErrors] = useState([]);

  //Function that performs registration
  function register() {
    let registerData = {
      docNum: docNumState,
      fName: fNameState,
      password: passwordState,
    };

    jq.ajax({
      type: "POST",
      url: "http://localhost/php/doc-register.php",
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
              <h1 className="govuk-heading-xl">Doctor Registration</h1>
            </div>
          </div>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <div className="govuk-form-group">
                <label className="govuk-label" htmlFor="fNameLog">
                  Doctor Number
                </label>
                <input
                  className="govuk-input govuk-input--width-10"
                  id="fNameLog"
                  name="fNameLog"
                  type="text"
                  onChange={(e) => setDocNum(e.target.value)}
                />
              </div>
              <div className="govuk-form-group">
                <label className="govuk-label" htmlFor="fNameLog">
                  Forename
                </label>
                <input
                  className="govuk-input govuk-input--width-10"
                  id="fNameLog"
                  name="fNameLog"
                  type="text"
                  onChange={(e) => setFName(e.target.value)}
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

export default DocRegistration;
