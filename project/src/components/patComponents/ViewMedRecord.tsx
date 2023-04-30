/*

View medical record is used primarily for displaying a 
patient’s medical record to themselves, 
therefore is a patient component.

*/

const ViewMedRecord = () => {
  return (
    <>
      <main
        className="govuk-main-wrapper app-main-class"
        id="main-content"
        role="main"
      >
        <h1 className="govuk-heading-xl">Your Medical Record Information:</h1>
        <table className="govuk-table">
          <caption className="govuk-table__caption govuk-table__caption--m">
            This is the information we currently have:
          </caption>

          <tbody className="govuk-table__body">
            <tr className="govuk-table__row">
              <th
                scope="row"
                className="govuk-table__header govuk-!-width-one-half"
              >
                Forename:
              </th>
              <td className="govuk-table__cell ">Osman</td>
            </tr>
            <tr className="govuk-table__row">
              <th scope="row" className="govuk-table__header ">
                Surname:
              </th>
              <td className="govuk-table__cell">Mahmood</td>
            </tr>
            <tr className="govuk-table__row ">
              <th scope="row" className="govuk-table__header">
                Gender:
              </th>
              <td className="govuk-table__cell">M</td>
            </tr>
            <tr className="govuk-table__row ">
              <th scope="row" className="govuk-table__header">
                Date of birth:
              </th>
              <td className="govuk-table__cell">01/01/0000</td>
            </tr>
            <tr className="govuk-table__row ">
              <th scope="row" className="govuk-table__header">
                Address:
              </th>
              <td className="govuk-table__cell">ELW1 P19</td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
};

export default ViewMedRecord;
