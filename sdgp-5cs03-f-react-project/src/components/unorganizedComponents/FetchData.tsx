import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

/*
interface Props {
  dataToSend: {
    nhsNum: number;
    fName: string;
    sName: string;
    password: string;
    gender: string;
    submissionMsg: (msg: string) => void;
    register: (fetchData)
  };
}

{ dataToSend: {submissionMsg, nhsNum, fName, sName, password, gender} }: Props
*/

let hasRan = false;

/*
const login = async (nhsNum: number, password: string): Promise<string[]> => {
  const payload = {
    nhsNum: nhsNum,
    password: password,
  };

  const response = await axios.post(
    "http://localhost/php/pat-login.php",
    payload
  );

  return response.data;
};
*/

let callbackFnAlt: any;

/*
const login = (nhsNum: number, password: string, callbackFn: any) => {
  const payload = {
    nhsNum: nhsNum,
    password: password,
  };
  let dataJson;
  axios.post("http://localhost/php/pat-login.php", payload).then((res) => {
    dataJson = res.data;
    console.log(dataJson); // this would print response
    callbackFnAlt(dataJson);
  }.then(() => {
    
  }));
};
*/

/*


function login(nhsNum: number, password: string) {
  const payload = {
    nhsNum: nhsNum,
    password: password,
  };

  const res: string = axios.post("http://localhost/php/pat-login.php", payload);

  console.log(res.status);
}
*/

function login(e: any, nhsNum: number, password: string) {
  e.preventDefault();

  const payload = {
    nhsNum: nhsNum,
    password: password,
  };

  axios
    .post("http://localhost/php/pat-login.php", payload)

    .then((response) => {
      {
        console.log(response);
        JSON.stringify(response);
        console.log(response);
      }
    });
}

/*

const login = async (nhsNum: number, password: string): Promise<string[]> => {
  const payload = {
    nhsNum: nhsNum,
    password: password,
  };

  const response = await axios.post(
    "http://localhost/php/pat-login.php",
    payload
  );

  

  return response.data;
};
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
  console.log(response.data);
};

const FetchData = () => {};

export { register, login };

export default FetchData;
