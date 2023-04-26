interface Props {
  text: string;
  links: [];
  routes: [];
}

const UserButton = ({ text, links, routes }: Props) => {
  return (
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
  );
};

export default UserButton;
