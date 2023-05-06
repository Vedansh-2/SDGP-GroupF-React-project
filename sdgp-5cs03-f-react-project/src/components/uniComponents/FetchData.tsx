/*

Fetch data is a utility component is intended 
to contain various methods for AJAX requests directly to the server. The main one in here is the one used for patient registration.

*/

import axios from "axios";

/*

This function is used by PatRegistration to register the patient

*/
const register = async (
  nhsNum: number,
  fName: string,
  sName: string,
  password: string,
  gender: string,
  postcode: string,
  day: number,
  month: number,
  year: number,
  dob: string
): Promise<string[]> => {
  const payload = {
    fName: fName,
    sName: sName,
    password: password,
    gender: gender,
    nhsNum: nhsNum,
    postcode: postcode,
    day: day,
    month: month,
    year: year,
    dob: dob,
  };

  const response = await axios.post(
    "http://localhost/php/pat-register.php",
    payload
  );

  return response.data;
};

const FetchData = () => {};

export { register };

export default FetchData;
