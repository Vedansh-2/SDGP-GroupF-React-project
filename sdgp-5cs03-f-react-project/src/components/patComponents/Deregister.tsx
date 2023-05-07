import jq from "jquery";

//Storing nhsNum from App.tsx when logged in
interface Props {
  nhsNum: string;
  onButClick: () => void;
}

const Deregister = (props: Props) => {
  const dereg = () => {
    let deregData = {
      nhsNum: props.nhsNum,
    };

    jq.ajax({
      type: "POST",
      url: "http://localhost/php/pat-deregister.php",
      data: deregData,
      success: function (data) {
        console.log(data);
        props.onButClick();
      },
    });
  };

  return (
    <main
      className="govuk-main-wrapper app-main-class"
      id="main-content"
      role="main"
    >
      <h1 className="govuk-heading-xl">Deregister:</h1>

      <p className="govuk-body">
        Please understand that deregistering an account is permanent and cannot
        be undone!
      </p>
      <button
        onClick={dereg}
        className="govuk-button govuk-button--warning"
        data-module="govuk-button"
      >
        Deregister from GP
      </button>
    </main>
  );
};

export default Deregister;
