/*
interface Props {
  text: string;
  links: [];
  routes: [];
}
*/

//{ text, links, routes }: Props

const UserButton = () => {
  return (
    <>
      <table className="govuk-table">
        <caption className="govuk-table__caption govuk-table__caption--m">
          Dates and amounts
        </caption>
        <thead className="govuk-table__head">
          <tr className="govuk-table__row">
            <th scope="col" className="govuk-table__header">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="govuk-table__body">
          <tr className="govuk-table__row">
            <th scope="row" className="govuk-table__header">
              First 6 weeks
            </th>
            <td className="govuk-table__cell">£109.80 per week</td>
          </tr>
          <tr className="govuk-table__row">
            <th scope="row" className="govuk-table__header">
              Next 33 weeks
            </th>
            <td className="govuk-table__cell">£109.80 per week</td>
          </tr>
          <tr className="govuk-table__row">
            <th scope="row" className="govuk-table__header">
              Total estimated pay
            </th>
            <td className="govuk-table__cell">£4,282.20</td>
          </tr>
        </tbody>
      </table>
      <button className="govuk-button" data-module="govuk-button">
        Admin Login
        <svg
          className="govuk-button__start-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="17.5"
          height="19"
          viewBox="0 0 33 40"
          aria-hidden="true"
          focusable="false"
          color="b"
        >
          {/*
        Note for Osman:

        This is to be implemented in a useState later.
        */}
          <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
        </svg>
      </button>
    </>
  );
};

export default UserButton;
