/*

This component used for displaying all patient records, and is therefore exclusive to the doctor.

*/

const PatientRecords = () => {
  return (
    <>
      <main
        className="govuk-main-wrapper app-main-class"
        id="main-content"
        role="main"
      >
        <h1 className="govuk-heading-xl">Patient Records</h1>
        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor="search">
            Search by name:
          </label>
          <input
            className="govuk-input govuk-!-width-one-quarter"
            id="search"
            name="search"
            type="text"
          />
        </div>
      </main>
    </>
  );
};
export default PatientRecords;
