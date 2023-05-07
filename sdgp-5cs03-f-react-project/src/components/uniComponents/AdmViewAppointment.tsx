import { useState, useEffect } from "react";
import jq from "jquery";

/*

The view appointments component is used for viewing appointments

*/

const AdmViewAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  //Error checking:
  const [errors, setErrors] = useState<React.ReactElement[]>([]);
  const [errorVisible, setErrorVisible] = useState(false);
  const [appointmentsVisible, setAppointmentsVisible] = useState(false);

  const getAppointments = async () => {
    //Check for no appointments
    const response = await fetch("http://localhost/PHP/adm-view-apps.php");
    const result = await response.json();

    if (result === "No appointments avaliable") {
      setErrors([
        <h3 className="govuk-heading-m"> Fatal Error: </h3>,
        <p className="govuk-body">No appontments avaliable</p>,
      ]);
      setErrorVisible(true);
      setAppointments(result);
      setAppointmentsVisible(false);

      //If appointments exist, set the appointments list
    } else {
      setAppointments(result);
      setAppointmentsVisible(true);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const deleteAppointment = (appId: number) => {
    let appData = {
      appId: appId,
    };

    jq.ajax({
      type: "POST",
      url: "http://localhost/php/adm-delete-app.php",
      data: appData,
      success: function (data) {
        var dataReturned = jq.parseJSON(data);
        console.log(dataReturned);
        if (dataReturned[0] === "Success") {
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
        getAppointments();
      },
    });
  };

  return (
    <main
      className="govuk-main-wrapper app-main-class"
      id="main-content"
      role="main"
    >
      <h1 className="govuk-heading-xl">View / Cancel Appointments</h1>
      <table className="govuk-table">
        <caption className="govuk-table__caption govuk-table__caption--m">
          Booked Appointments
        </caption>
        {/* Headings: */}
        <thead className="govuk-table__head">
          <tr className="govuk-table__row">
            <th
              scope="col"
              className="govuk-table__header app-custom-className"
            >
              Patient (NHS Number)
            </th>
            <th
              scope="col"
              className="govuk-table__header app-custom-className"
            >
              Doctor (ID)
            </th>
            <th
              scope="col"
              className="govuk-table__header app-custom-className"
            >
              Date
            </th>
            <th
              scope="col"
              className="govuk-table__header app-custom-className"
            >
              Start Time
            </th>
            <th
              scope="col"
              className="govuk-table__header app-custom-className"
            >
              Location
            </th>
            <th
              scope="col"
              className="govuk-table__header app-custom-className"
            >
              Details Button
            </th>
            <th
              scope="col"
              className="govuk-table__header app-custom-className"
            >
              Cancel?
            </th>
          </tr>
        </thead>
        <tbody className="govuk-table__body">
          {appointmentsVisible &&
            appointments.map((res: any) => {
              return (
                <tr className="govuk-table__row">
                  <th scope="row" className="govuk-table__header">
                    {res.patFName} ({res.patNHSNumber})
                  </th>
                  <th scope="row" className="govuk-table__header">
                    {res.docFName} ({res.docId})
                  </th>
                  <td className="govuk-table__cell">{res.appDate}</td>
                  <td className="govuk-table__cell">{res.appTime}</td>
                  <td className="govuk-table__cell">{res.appLocation}</td>
                  <td className="govuk-table__cell">
                    <button
                      className="govuk-button govuk-button--secondary"
                      data-module="govuk-button"
                    >
                      Details
                    </button>
                  </td>
                  <td className="govuk-table__cell">
                    <button
                      className="govuk-button govuk-button--warning"
                      data-module="govuk-button"
                      onClick={() => deleteAppointment(res.appId)}
                    >
                      Cancel App
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </main>
  );
};

export default AdmViewAppointment;
