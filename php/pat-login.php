<?php

/*

Authors:
Osman
Diogo
Ali

Used by patients to log into the system

*/

//Header is open which is bad practice
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$data = json_decode(file_get_contents("php://input"));

//Establishes connection to the database
$pdo = require __DIR__ . "/database-con.php";

//Inputs
$nhsNum = $_POST['nhsNum'];
$password = $_POST['password'];

//Array for error checking
$errors = array();

//Input validations
if(empty($nhsNum)) {
    array_push($errors, 'NHS Number is required');
} else if (strlen($nhsNum) != 11) {
    array_push($errors, 'NHS Number must be 11 digits');
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

//Final error check
if(count($errors)){
    array_unshift($errors, 'ERROR_DETECTED');
    echo json_encode($errors);
    exit;
}

//Preparing the connection
$stmt = $pdo->prepare('SELECT patNHSNumber, patPasswordHash FROM `patient.login`  WHERE patNHSNumber = :nhsNum');

//Binding value to placeholder, which helps against SQL injection
$stmt->bindValue(":nhsNum", $nhsNum, PDO::PARAM_INT);

//Executing
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    
    //Checking password hash with unencrypted password
    if (hash_equals($user["patPasswordHash"], crypt($password, $user["patPasswordHash"]))) {
        array_push($errors, "Success");
        echo json_encode($errors);
        exit;
    } else
        array_unshift($errors, 'ERROR_DETECTED');
        array_push($errors, "Password was incorrect");
        echo json_encode($errors);
        exit;
} else {
    array_unshift($errors, 'ERROR_DETECTED');
        array_push($errors, "Password was incorrect");
        echo json_encode($errors);
        exit;
}

?>