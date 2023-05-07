<?php
/*

Authors:
Osman
Ali

Used by doctors to login to the system

*/

//Setting headers to open, bad practice
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$data = json_decode(file_get_contents("php://input"));

//Creating local GP connection
$pdo = require __DIR__ . "/database-con.php";

//Input variables
$docNum = $_POST['docNum'];
$password = $_POST['password'];

//Array to contain errors and input validation
$errors = array();

//Input validation
if(empty($docNum)) {
    array_push($errors, 'Doctor number is required');
} else if (strlen($docNum) != 10) {
    array_push($errors, 'Doctor number must be 10 digits');
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

if(count($errors)){
    array_unshift($errors, 'ERROR_DETECTED');
    echo json_encode($errors);
    exit;
}

//Prepasring SQL code
$stmt = $pdo->prepare('SELECT docNum, docPasswordHash FROM `doctor.login`  WHERE docNum = :docNum');

//Binding variable values to placeholders
$stmt->bindValue(":docNum", $docNum, PDO::PARAM_INT);

//Executing code and fetching result
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    //Checking password hash
    if (hash_equals($user["docPasswordHash"], crypt($password, $user["docPasswordHash"]))) {
        array_push($errors, "Success");
        echo json_encode($errors);
        exit;
    } else {
        //Final validations:
        array_unshift($errors, 'ERROR_DETECTED');
        array_push($errors, "Password was incorrect");
        echo json_encode($errors);
        exit;
    }
}else {
    array_unshift($errors, 'ERROR_DETECTED');
        array_push($errors, "Password was incorrect");
        echo json_encode($errors);
        exit;
}


?>