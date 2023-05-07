<?php

/*

Authors:
Osman

Used by doctors to register to the system.

*/

//Setting headers to open is bad practice
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$data = json_decode(file_get_contents("php://input"));

//Input variables
$docNum = $_POST['docNum'];
$fName = $_POST['fName'];
$password =  $_POST['password'];

//Array to contain errors and validation mistakes
$errors = array();

//Input validation
if(empty($docNum)) {
    array_push($errors, 'Doctor number is required');
} else if (strlen($docNum) != 10) {
    array_push($errors, 'Doctor number must be 10 digits');
}

if(empty($fName)) {
    array_push($errors, 'Forename is required');
}

if(empty($password)) {
    array_push($errors, 'Password is required');
} else {

if(strlen($password) < 8) {
    array_push($errors, 'Password must be at least 8 characters');
}

if(! preg_match("/[0-9]/i", $password)) {
    array_push($errors, "Password must contain at least one number");
}

if(! preg_match("/[a-z]/i", $password)) {
    array_push($errors, "Password must contain at least one letter");
}

}

//Checking errors
if(count($errors)){
    array_unshift($errors, 'ERROR_DETECTED');
    echo json_encode($errors);
    exit;
}

//Password hashed used to protect against SQL injection
$password_hash = password_hash($password, PASSWORD_DEFAULT);

//Creating connection to local GP database
$pdo = require __DIR__ . "/database-con.php";

//SQL query that is sent to database
$sql = "INSERT INTO `doctor.login` (docNum, docFName, docPasswordHash)
        VALUES (:docNum, :docFName, :docPasswordHash)";
//Placeholders protect against SQL injection ^^^^^^

//Preparing query
$stmt = $pdo->prepare($sql);

//Binding values to the placeholders
$stmt->bindValue(":docNum", $docNum, PDO::PARAM_INT);
$stmt->bindValue(":docFName", $fName, PDO::PARAM_STR);
$stmt->bindValue(":docPasswordHash", $password_hash, PDO::PARAM_STR);

//Running
try{
    $success = $stmt -> execute();

    //If success, exit with success
    if($success){
        array_push($errors, "Success");
        echo json_encode($errors);
        exit;
    } else {
        //Error checking
        echo json_encode("Error: " . $pdo->lastErrorMsg());
    }
} catch (PDOException $e) {
    if($e->getCode() == 23000){
            array_unshift($errors, 'ERROR_DETECTED');
            //Constraint violation if doctor number (unique) is the same as another
            array_push($errors, 'Constraint violation, doctor number matches existing entry');
    echo json_encode($errors);
    exit;
    } else {
        array_push($errors, 'ERROR_DETECTED');
        echo json_encode($errors, "Error: " . $e->getMessage());
    }

    if(count($errors)){
        array_unshift($errors, 'ERROR_DETECTED');
        echo json_encode($errors);
        exit;
    }
}

?>