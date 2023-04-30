/*

Registration is used for patients to register to the system, 
because admins and doctors are hard coded into the
system they do not use this component.

*/

const Registration = () => {
  return (
    <main
      className="govuk-main-wrapper app-main-class"
      id="main-content"
      role="main"
    >
      <h1 className="govuk-heading-xl">Registration</h1>
      <div className="govuk-form-group">
        <label className="govuk-label" htmlFor="nhsLog">
          NHS Number
        </label>
        <input
          className="govuk-input govuk-input--width-5"
          id="nhsLog"
          name="nhsLog"
          type="number"
        />
      </div>
      <div className="govuk-form-group">
        <label className="govuk-label" htmlFor="nameLog">
          Full Name
        </label>
        <input
          className="govuk-input govuk-input--width-10"
          id="nameLog"
          name="nameLog"
          type="text"
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
          type="text"
        />
      </div>
      <div className="govuk-form-group">
        <label className="govuk-label" htmlFor="genLog">
          Gender
        </label>
        <select className="govuk-select" id="genLog" name="genLog">
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>
      <button className="govuk-button" data-module="govuk-button">
        Submit
      </button>
    </main>
  );
};

export default Registration;
