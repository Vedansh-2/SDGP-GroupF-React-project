/*

View appointments is used to both view and cancel appointments.

*/

const ViewAppointment = () => {
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
              Name
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
          <tr className="govuk-table__row">
            <th scope="row" className="govuk-table__header">
              Osman
            </th>
            <td className="govuk-table__cell">22/04/2023</td>
            <td className="govuk-table__cell">15:00</td>
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
              >
                Cancel App
              </button>
            </td>
          </tr>
          <tr className="govuk-table__row">
            <th scope="row" className="govuk-table__header">
              Vedansh
            </th>
            <td className="govuk-table__cell">25/04/2023</td>
            <td className="govuk-table__cell">12:00</td>
            <td className="govuk-table__cell">
              {" "}
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
              >
                Cancel App
              </button>
            </td>
          </tr>
          <tr className="govuk-table__row">
            <th scope="row" className="govuk-table__header">
              Ali
            </th>
            <td className="govuk-table__cell">21/05/2023</td>
            <td className="govuk-table__cell">9:00</td>
            <td className="govuk-table__cell">
              {" "}
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
              >
                Cancel App
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};

export default ViewAppointment;
