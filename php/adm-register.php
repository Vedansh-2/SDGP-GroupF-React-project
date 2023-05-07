<?php

/*

Authors:
Osman
Vedansh

Used to register to the system

*/

//Setting header
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$data = json_decode(file_get_contents("php://input"));

//Getting register inputs
$admNum = $_POST['admNum'];
$fName = $_POST['fName'];
$password =  $_POST['password'];
$errors = array();

//Input validation
if(empty($admNum)) {
    array_push($errors, 'Admin number is required');
} else if (strlen($admNum) != 10) {
    array_push($errors, 'Admin number must be 10 digits');
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

//Final error check is used at the end so all input validation can be displayed at once
if(count($errors)){
    array_unshift($errors, 'ERROR_DETECTED');
    echo json_encode($errors);
    exit;
}

//Password hashing (encryption)
$password_hash = password_hash($password, PASSWORD_DEFAULT);

//Getting the connection to the local GP database
$pdo = require __DIR__ . "/database-con.php";

//Inserting values into the database
$sql = "INSERT INTO `admin.login` (admNum, admFName, admPasswordHash)
        VALUES (:admNum, :admFName, :admPasswordHash)";

//Preparing query
$stmt = $pdo->prepare($sql);

//Binding values to the placeholders in the query, this protects against SQL injection
$stmt->bindValue(":admNum", $admNum, PDO::PARAM_INT);
$stmt->bindValue(":admFName", $fName, PDO::PARAM_STR);
$stmt->bindValue(":admPasswordHash", $password_hash, PDO::PARAM_STR);

try{
    //Executing
    $success = $stmt -> execute();

    //If success, pass success which is read by the react project
    if($success){
        array_push($errors, "Success");
        echo json_encode($errors);
        exit;
    } else {
        //Error checking...
        echo json_encode("Error: " . $pdo->lastErrorMsg());
    }
} catch (PDOException $e) {
    if($e->getCode() == 23000){
            array_unshift($errors, 'ERROR_DETECTED');
            array_push($errors, 'Constraint violation, admin number matches existing entry');
    echo json_encode($errors);
    exit;
        
    } else {
        array_unshift($errors, 'ERROR_DETECTED');
        echo json_encode($errors, "Error: " . $e->getMessage());
    }

    if(count($errors)){
        array_unshift($errors, 'ERROR_DETECTED');
        echo json_encode($errors);
        exit;
    }
}

?>