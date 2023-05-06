<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$data = json_decode(file_get_contents("php://input"));

$docNum = $_POST['docNum'];
$fName = $_POST['fName'];
$password =  $_POST['password'];
$errors = array();

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

if(count($errors)){
    array_unshift($errors, 'ERROR_DETECTED');
    echo json_encode($errors);
    exit;
}

$password_hash = password_hash($password, PASSWORD_DEFAULT);
$pdo = require __DIR__ . "/database-con.php";

$sql = "INSERT INTO `doctor.login` (docNum, docFName, docPasswordHash)
        VALUES (:docNum, :docFName, :docPasswordHash)";

$stmt = $pdo->prepare($sql);

$stmt->bindValue(":docNum", $docNum, PDO::PARAM_INT);
$stmt->bindValue(":docFName", $fName, PDO::PARAM_STR);
$stmt->bindValue(":docPasswordHash", $password_hash, PDO::PARAM_STR);

try{
    $success = $stmt -> execute();

    if($success){
        array_push($errors, "Success");
        echo json_encode($errors);
        exit;
    } else {
        echo json_encode("Error: " . $pdo->lastErrorMsg());
    }
} catch (PDOException $e) {
    if($e->getCode() == 23000){
            array_unshift($errors, 'ERROR_DETECTED');
            array_push($errors, 'Constraint violation, doctor number matches existing entry');
    echo json_encode($errors);
    exit;
        

    } else {
        array_push($errors, 'Please input the gender');
        echo json_encode($errors, "Error: " . $e->getMessage());
    }

    if(count($errors)){
        array_unshift($errors, 'ERROR_DETECTED');
        echo json_encode($errors);
        exit;
    }
}

?>