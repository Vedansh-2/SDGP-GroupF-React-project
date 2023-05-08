/*

Authored by:
Diogo

View medical record is used primarily for displaying a 
patient’s medical record to themselves, 
therefore is a patient component.

However, upon finishing the project we didn't have enough time to make medical records 
so it only displays basic information about the currently logged in patient.

*/

import { useState, useEffect } from "react";
import jq from "jquery";

interface Props {
  nhsNum: string;
}

const ViewMedRecord = ({ nhsNum }: Props) => {
  const [patientFName, setPatientFName] = useState("");
  const [patientSName, setPatientSName] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [patientDOB, setPatientDOB] = useState("");
  const [patientAddress, setPatientAddress] = useState("");

  const getPatient = () => {
    let patientData = {
      nhsNum: nhsNum,
    };

    jq.ajax({
      type: "POST",
      url: "http://localhost/php/get-patient.php",
      data: patientData,
      success: function (data) {
        var json = jq.parseJSON(data);
        const patient = json[0];
        setPatientFName(patient.patFName);
        setPatientSName(patient.patSName);
        setPatientGender(patient.patGender);
        setPatientDOB(patient.patDOB);
        setPatientAddress(patient.patPostcode);
      },
    });
  };

  useEffect(() => {
    getPatient();
  }, []);

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
              <td className="govuk-table__cell ">{patientFName}</td>
            </tr>
            <tr className="govuk-table__row">
              <th scope="row" className="govuk-table__header ">
                Surname:
              </th>
              <td className="govuk-table__cell">{patientSName}</td>
            </tr>
            <tr className="govuk-table__row ">
              <th scope="row" className="govuk-table__header">
                Gender:
              </th>
              <td className="govuk-table__cell">{patientGender}</td>
            </tr>
            <tr className="govuk-table__row ">
              <th scope="row" className="govuk-table__header">
                Date of birth:
              </th>
              <td className="govuk-table__cell">{patientDOB}</td>
            </tr>
            <tr className="govuk-table__row ">
              <th scope="row" className="govuk-table__header">
                Address:
              </th>
              <td className="govuk-table__cell">{patientAddress}</td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
};

export default ViewMedRecord;
