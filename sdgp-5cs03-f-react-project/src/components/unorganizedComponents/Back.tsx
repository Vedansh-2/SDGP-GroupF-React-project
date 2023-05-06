import { useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate();

  return (
    <a onClick={() => navigate(-1)} className="govuk-back-link">
      Back
    </a>
  );
};

export default Back;
