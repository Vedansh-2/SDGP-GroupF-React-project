import jq from "jquery";
import { useState, useEffect } from "react";

/*

Authored by:
Osman
Ali

The deregister component is used to deregister a patient from the local GP, the patient deregisters themselves.

*/

//Storing nhsNum from App.tsx when logged in
interface Props {
  nhsNum: string;
  onButClick: () => void;
}

const Deregister = (props: Props) => {
  //Appointment check and app error are used to display to the patient if they need to remove appointments before derregistering.
  const [appointmentCheck, setAppointments] = useState();
  const [appError, setAppError] = useState(false);

  //Deregister function
  const dereg = () => {
    let deregData = {
      nhsNum: props.nhsNum,
    };

    console.log(appointmentCheck);

    if (appointmentCheck != "No appointments avaliable") {
      setAppError(true);
    } else {
      jq.ajax({
        type: "POST",
        url: "http://localhost/php/pat-deregister.php",
        data: deregData,
        success: function (data) {
          console.log(data);
          props.onButClick();
        },
      });
    }
  };

  //Get appointments is used to check if patient has any currently booked appointments
  const getAppointments = () => {
    let loginData = {
      nhsNum: props.nhsNum,
    };
    jq.ajax({
      type: "POST",
      url: "http://localhost/php/pat-view-apps.php",
      data: loginData,
      success: function (data) {
        var json = jq.parseJSON(data);
        setAppointments(json);
      },
    });
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <main
      className="govuk-main-wrapper app-main-class"
      id="main-content"
      role="main"
    >
      <h1 className="govuk-heading-xl">Deregister:</h1>

      <p className="govuk-body">
        Please understand that deregistering an account is permanent and cannot
        be undone!
      </p>
      <button
        onClick={dereg}
        className="govuk-button govuk-button--warning"
        data-module="govuk-button"
      >
        Deregister from GP
      </button>
      {appError && (
        <p id="passport-issued-error" className="govuk-error-message">
          Error: Please unbook all appointments to deregister from the system.
        </p>
      )}
    </main>
  );
};

export default Deregister;
