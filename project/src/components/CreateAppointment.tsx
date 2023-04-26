import "./componentStyle.css";

const CreateAppointment = () => {
  return (
    <main
      className="govuk-main-wrapper app-main-class"
      id="main-content"
      role="main"
    >
      <h1 className="govuk-heading-xl">Create Appointment</h1>
      <div className="govuk-form-group">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
          <h1 className="govuk-fieldset__heading">Please fill this form:</h1>
        </legend>
        <fieldset
          className="govuk-fieldset"
          role="group"
          aria-describedby="app-issued-hint"
        >
          <label className="govuk-label" htmlFor="nameLog">
            Forename
          </label>
          <input
            className="govuk-input govuk-input--width-10"
            id="fNameLog"
            name="fNameLog"
            type="text"
          />
          <label className="govuk-label" htmlFor="nameLog">
            Surname
          </label>
          <input
            className="govuk-input govuk-input--width-10"
            id="lNameLog"
            name="lNameLog"
            type="text"
          />
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="location">
              Location
            </label>
            <select className="govuk-select" id="location" name="location">
              <option value="published">Location</option>
              <option value="updated" selected>
                Location 1
              </option>
              <option value="views">Location 2</option>
              <option value="comments">Location 3</option>
            </select>
          </div>
          <div id="app-issued-hint" className="govuk-hint"></div>
          <label
            className="govuk-label govuk-date-input__label boldLabel"
            htmlFor="app-issued-day"
          >
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
                  htmlFor="app-issued-day"
                >
                  Hour
                </label>
                <input
                  className="govuk-input govuk-date-input__input govuk-input--width-2"
                  id="app-issued-day"
                  name="app-issued-day"
                  type="number"
                />
              </div>
            </div>
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label
                  className="govuk-label govuk-date-input__label"
                  htmlFor="app-issued-month"
                >
                  Minute
                </label>
                <input
                  className="govuk-input govuk-date-input__input govuk-input--width-2"
                  id="app-issued-month"
                  name="app-issued-month"
                  type="number"
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
            Do not include personal or financial information, like your National
            Insurance number or credit card details.
          </div>
          <textarea
            className="govuk-textarea"
            id="more-detail"
            name="more-detail"
            aria-describedby="more-detail-hint"
            rows={10}
          ></textarea>
        </div>
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
      <button className="govuk-button" data-module="govuk-button">
        Submit
      </button>
    </main>
  );
};

export default CreateAppointment;
