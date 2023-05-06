/*

Doctor registration is used for patients to register to the system, 
because admins and doctors are hard coded into the
system they do not use this component.

*/

import { useState } from "react";
import { register } from "../unorganizedComponents/FetchData";
import BodyAnimation from "../uniComponents/BodyAnimation";
import { errorTran, errorAni } from "../uniComponents/BodyAnimation";
import jq from "jquery";

const DocRegistration = () => {
  //States for registering
  const [admNumState, setAdmNum] = useState(0);
  const [fNameState, setFName] = useState("");
  const [passwordState, setPassword] = useState("");

  const [errorsVisible, setErrorsVisible] = useState(false);
  const [errors, setErrors] = useState([]);

  function register() {
    let registerData = {
      admNum: admNumState,
      fName: fNameState,
      password: passwordState,
    };

    jq.ajax({
      type: "POST",
      url: "http://localhost/php/adm-register.php",
      data: registerData,
      mode: "no-core",
      success: function (data) {
        let newErrors = [];
        setErrors(newErrors);
        var dataReturned = jq.parseJSON(data);
        console.log(dataReturned);
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

  /*

  const submit = async () => {
    const dataPromise = register(
      nhsState,
      fNameState,
      sNameState,
      passwordState,
      genderState,
      postState,
      dayState,
      monthState,
      yearState
    );
    dataPromise.then((value) => {});
    const result = await dataPromise;
    console.log(result);

    let newErrors: React.ReactElement[] = [];
    setErrors(newErrors);

    if (result[0] === "ERROR_DETECTED") {
      newErrors.push(<h3 className="govuk-heading-m"> Requirements: </h3>);
      for (let i = 1; i < result.length; i++) {
        newErrors.push(<p className="govuk-body">{result[i]}</p>);
      }
      setErrors(newErrors);
      setErrorsVisible(true);
    } else if (result.includes("Register")) {
      newErrors.push(
        <h3 className="govuk-heading-m"> Successful Registration </h3>
      );
      setErrors(newErrors);
      setErrorsVisible(true);
    }
  };
*/

  /*
  const submitForm=(e: React.ChangeEvent<any>)=>{
    e.preventDefault();
      data = {
        first_name: 
      }
  }
*/

  return (
    <>
      <div className="govuk-width-container">
        <main className="govuk-main-wrapper">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-xl">Registration</h1>
            </div>
          </div>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <div className="govuk-form-group">
                <label className="govuk-label" htmlFor="fNameLog">
                  Admin Number
                </label>
                <input
                  className="govuk-input govuk-input--width-10"
                  id="fNameLog"
                  name="fNameLog"
                  type="text"
                  onChange={(e) => setAdmNum(e.target.value)}
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
