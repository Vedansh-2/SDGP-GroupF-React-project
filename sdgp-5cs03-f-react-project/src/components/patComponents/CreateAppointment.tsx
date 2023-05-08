/*

Authored by:
Osman
Khalid
Sayhan

The creating appointment component is used by the patient to create their appointments.

*/

import "../css/componentStyle.css";
import { useState, useEffect } from "react";
import jq from "jquery";
import BodyAnimation from "../uniComponents/BodyAnimation";
import { errorAni } from "../uniComponents/BodyAnimation";

//Storing nhsNum from App.tsx when logged in
interface Props {
  nhsNum: string;
}

const CreateAppointment = ({ nhsNum }: Props) => {
  //useStates....
  //Error checking:
  const [errors, setErrors] = useState<React.ReactElement[]>([]);
  const [errorVisible, setErrorVisible] = useState(false);
  //Input fields:
  const [doctors, setDoctors] = useState([]);
  const [location, setLocation] = useState("Location 1");
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [time, setTime] = useState("");
  const [minute, setMinute] = useState(0);
  const [detail, setDetail] = useState("");
  const [doctor, setDoctor] = useState("");

  //Request that retrieves all doctors from the system
  const getDoctors = async () => {
    const response = await fetch("http://localhost/PHP/get-doctors.php");
    const result = await response.json();

    //Check for no doctors
    if (result === "No doctors avaliable") {
      setErrors([
        <h3 className="govuk-heading-m"> Fatal Error: </h3>,
        <p className="govuk-body">
          No doctors avaliable in system currently, submission will not work.
        </p>,
      ]);
      setErrorVisible(true);

      //If doctors exist, set the doctors list
    } else {
      setDoctors(result);
    }
  };

  //Keeps the doctors field updated
  useEffect(() => {
    getDoctors();
  }, []);

  //Sending the ajax request
  const createApp = () => {
    //Binding data to the PHP variables
    let appData = {
      location: location,
      date: year + "-" + month + "-" + day,
      time: time,
      minute: minute,
      //hour: hour,
      day: day,
      year: year,
      month: month,
      nhsNum: nhsNum,
      docId: doctor,
      detail: detail,
    };

    //AJAX request
    jq.ajax({
      type: "POST",
      url: "http://localhost/php/pat-create-app.php",
      data: appData,
      success: function (data) {
        var dataReturned = jq.parseJSON(data);
        if (dataReturned[0] === "Success") {
          let newErrors: React.ReactElement[] = [];
          newErrors.push(
            <h3 className="govuk-heading-m"> Appointment Booked </h3>
          );
          setErrors(newErrors);
        } else {
          //If errors are found, else is triggered
          //Storing errors and then displaying them in an error box
          let newErrors: React.ReactElement[] = [];
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
  };

  return (
    <main
      className="govuk-main-wrapper app-main-class"
      id="main-content"
      role="main"
    >
      <h1 className="govuk-heading-xl">Create Appointment</h1>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <div className="govuk-form-group">
            <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
              <h1 className="govuk-fieldset__heading">
                Please fill this form:
              </h1>
            </legend>
            <fieldset
              className="govuk-fieldset"
              role="group"
              aria-describedby="app-issued-hint"
            >
              <div className="govuk-form-group">
                <label className="govuk-label" htmlFor="location">
                  Location:
                </label>
                <select
                  className="govuk-select"
                  id="location"
                  name="location"
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="Location 1" selected>
                    Location 1
                  </option>
                  <option value="Location 2">Location 2</option>
                  <option value="Location 3">Location 3</option>
                </select>
              </div>
              <div id="app-issued-hint" className="govuk-hint"></div>
              <label className="govuk-label" htmlFor="app-issued-day">
                Please enter an appropriate date and time:
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
              <div id="app-issued-hint" className="govuk-hint"></div>
              <div className="govuk-date-input" id="app-issued">
                <div className="govuk-date-input__item">
                  <div className="govuk-form-group">
                    <label
                      className="govuk-label govuk-date-input__label "
                      htmlFor="app-issued-time"
                    >
                      Time
                    </label>
                    <input
                      className="govuk-input govuk-date-input__input govuk-input--width-5"
                      id="app-issued-time"
                      name="app-issued-time"
                      type="time"
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </fieldset>
            <div className="govuk-form-group">
              <h1 className="govuk-label-wrapper">
                <legend className="govuk-fieldset__legend govuk-fieldset__legend--l"></legend>
                <label
                  className="govuk-label govuk-date-input__label boldLabel"
                  htmlFor="more-detail"
                >
                  Can you provide more detail?
                </label>
              </h1>
              <div id="more-detail-hint" className="govuk-hint">
                Do not include personal or financial information, like your
                National Insurance number or credit card details.
              </div>
              <textarea
                className="govuk-textarea"
                id="more-detail"
                name="more-detail"
                aria-describedby="more-detail-hint"
                rows={10}
                // Note to self, make character counter - osman
                onChange={(e) => setDetail(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="selectDoc">
              Choose Doctor
            </label>
            <select
              className="govuk-select"
              id="selectDoc"
              name="selectDoc"
              //Doctors are stored here
              onChange={(e) => setDoctor(e.target.value)}
            >
              <option value={0}></option>
              {doctors.map((res: any) => {
                return (
                  <option value={res.docId}>
                    {res.docId}, {res.docFName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="file-upload-1">
              Upload a photo?
            </label>
            <input
              className="govuk-file-upload"
              id="file-upload-1"
              name="file-upload-1"
              type="file"
            />
          </div>
          <button
            className="govuk-button"
            data-module="govuk-button"
            onClick={createApp}
          >
            Submit
          </button>
        </div>
        <div className="govuk-grid-column-one-third">
          {errorVisible && (
            <p className="govuk-body">
              <BodyAnimation animation={errorAni}>{errors}</BodyAnimation>
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default CreateAppointment;
