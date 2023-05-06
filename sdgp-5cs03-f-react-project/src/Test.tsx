import "./components/css/styles.scss";

const Test = () => {
  return (
    <>
      <main
        className="govuk-main-wrapper app-main-class"
        id="main-content"
        role="main"
      >
        <h1 className="govuk-heading-xl"> Login Page</h1>

        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor="nameLog">
            Name
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
      </main>
    </>
  );
};
export default Test;
