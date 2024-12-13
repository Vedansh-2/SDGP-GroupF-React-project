import { useState, useEffect } from "react";
import jq from "jquery";

/*

Authored by:
Osman
Sayhan
Diogo

This component is used by doctors to view their appointments, keep in mind it only shows the currently logged in doctor’s appointments, not all.

*/

interface Props {
  docNum: string;
}

const DocViewAppointment = ({ docNum }: Props) => {
  const [appointments, setAppointments] = useState([]);
  //Error checking:
  const [errors, setErrors] = useState<React.ReactElement[]>([]);
  const [errorVisible, setErrorVisible] = useState(false);
  const [appointmentsVisible, setAppointmentsVisible] = useState(false);

  const getAppointments = () => {
    let loginData = {
      docNum: docNum,
    };
    jq.ajax({
      type: "POST",
      url: "http://localhost/php/doc-view-apps.php",
      data: loginData,
      success: function (data) {
        var json = jq.parseJSON(data);
        if (json === "No appointments avaliable") {
          setErrors([
            <h3 className="govuk-heading-m"> Fatal Error: </h3>,
            <p className="govuk-body">No appontments avaliable</p>,
          ]);
          setErrorVisible(true);
          setAppointments(json);
          setAppointmentsVisible(false);

          //If appointments exist, set the appointments list
        } else {
          setAppointments(json);
          setAppointmentsVisible(true);
        }
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
                </tr>
              );
            })}
        </tbody>
      </table>
    </main>
  );
};

export default DocViewAppointment;
