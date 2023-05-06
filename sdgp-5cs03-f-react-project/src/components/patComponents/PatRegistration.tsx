/*

Registration is used for patients to register to the system, 
because admins and doctors are hard coded into the
system they do not use this component.

*/

import { useState } from "react";
import { register } from "../uniComponents/FetchData";
import BodyAnimation from "../uniComponents/BodyAnimation";
import { errorTran, errorAni } from "../uniComponents/BodyAnimation";

const PatRegistration = () => {
  //These states are to be set by input elements
  const [nhsState, setNHS] = useState(0);
  const [fNameState, setFName] = useState("");
  const [sNameState, setSName] = useState("");
  const [passwordState, setPassword] = useState("");
  const [genderState, setGender] = useState("Male");
  const [postState, setPost] = useState("");
  const [dayState, setDay] = useState(0);
  const [monthState, setMonth] = useState(0);
  const [yearState, setYear] = useState(0);

  //These states are used for error checking
  const [errors, setErrors] = useState<React.ReactElement[]>([]);
  const [errorVisible, setErrorVisible] = useState(false);

  //Submission function
  const submit = async () => {
    const dob = yearState + "-" + monthState + "-" + dayState;
    const dataPromise = register(
      nhsState,
      fNameState,
      sNameState,
      passwordState,
      genderState,
      postState,
      dayState,
      monthState,
      yearState,
      dob
    );
    dataPromise.then((value) => {});
    const result = await dataPromise;

    let newErrors: React.ReactElement[] = [];
    setErrors(newErrors);

    if (result[0] === "ERROR_DETECTED") {
      newErrors.push(<h3 className="govuk-heading-m"> Requirements: </h3>);
      for (let i = 1; i < result.length; i++) {
        newErrors.push(<p className="govuk-body">{result[i]}</p>);
      }
      setErrors(newErrors);
      setErrorVisible(true);
    } else if (result.includes("Register")) {
      newErrors.push(
        <h3 className="govuk-heading-m"> Successful Registration </h3>
      );
      setErrors(newErrors);
      setErrorVisible(true);
    }
  };

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
                <label className="govuk-label" htmlFor="nhsLog">
                  NHS Number
                </label>
                <input
                  className="govuk-input govuk-input--width-10"
                  id="nhsLog"
                  name="nhsLog"
                  type="number"
                  onChange={(e) => setNHS(parseInt(e.target.value))}
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
                <label className="govuk-label" htmlFor="sNameLog">
                  Surname
                </label>
                <input
                  className="govuk-input govuk-input--width-10"
                  id="sNameLog"
                  name="sNameLog"
                  type="text"
                  onChange={(e) => setSName(e.target.value)}
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
              <label className="govuk-label" htmlFor="app-issued-day">
                Please enter an appropriate date of birth:
              </label>
              <div className="govuk-date-input" id="app-issued">
                <div className="govuk-date-input__item">
                  <div className="govuk-form-group">
                    <label
                      className="govuk-label govuk-date-input__label "
                      htmlFor="app-issued-day"
                    >
                      Day
                    </label>
                    <input
                      className="govuk-input govuk-date-input__input govuk-input--width-2"
                      id="app-issued-day"
                      name="app-issued-day"
                      type="number"
                      onChange={(e) => setDay(parseInt(e.target.value))}
                    />
                  </div>
                </div>
                <div className="govuk-date-input__item">
                  <div className="govuk-form-group">
                    <label
                      className="govuk-label govuk-date-input__label"
                      htmlFor="app-issued-month"
                    >
                      Month
                    </label>
                    <input
                      className="govuk-input govuk-date-input__input govuk-input--width-2"
                      id="app-issued-month"
                      name="app-issued-month"
                      type="number"
                      onChange={(e) => setMonth(parseInt(e.target.value))}
                    />
                  </div>
                </div>
                <div className="govuk-date-input__item">
                  <div className="govuk-form-group">
                    <label
                      className="govuk-label govuk-date-input__label"
                      htmlFor="app-issued-year"
                    >
                      Year
                    </label>
                    <input
                      className="govuk-input govuk-date-input__input govuk-input--width-4"
                      id="app-issued-year"
                      name="app-issued-year"
                      type="number"
                      onChange={(e) => setYear(parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>
              <div className="govuk-form-group">
                <label className="govuk-label" htmlFor="genLog">
                  Gender
                </label>
                <select
                  className="govuk-select"
                  id="genLog"
                  name="genLog"
                  onChange={(e) => setGender(e.target.value)}
                  defaultValue={"Male"}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="govuk-form-group">
                <label className="govuk-label" htmlFor="postcodeLog">
                  Postcode
                </label>
                <input
                  className="govuk-input govuk-input--width-10"
                  id="postcodeLog"
                  name="postcodeLog"
                  type="text"
                  onChange={(e) => setPost(e.target.value)}
                />
              </div>
              <button
                className="govuk-button"
                data-module="govuk-button"
                onClick={submit}
              >
                Submit
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
    </>
  );
};

export default PatRegistration;
