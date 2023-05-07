<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$data = json_decode(file_get_contents("php://input"));


$fName = $data->fName;
$sName = $data->sName;
$password = $data->password;
$nhsNum = $data->nhsNum;
$gender = $data->gender;
$postcode = $data->postcode;
$day = $data -> day;
$month = $data -> month;
$year = $data -> year;
$dob = $data->dob;
$errors = array();

if(empty($nhsNum)) {
    array_push($errors, 'NHS Number is required');
} else if (strlen($nhsNum) != 10) {
    array_push($errors, 'NHS Number must be 10 digits');
}

if(empty($fName)) {
    array_push($errors, 'Forename is required');
}

if(empty($sName)) {
    array_push($errors, 'Surname is required');
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

if(empty($gender)) {
    array_push($errors, 'Please input the gender');
}


if(strlen($postcode) != 7) {
    array_push($errors, 'Postcode must be 7 characters');
}

if($day < 1 || $day > 31 || $month <1 || $month >12 || $year > 2101 || $year < 2003) {
    array_push($errors, 'Date of birth is invalid');
}

if(count($errors)){
    array_unshift($errors, 'ERROR_DETECTED');
    echo json_encode($errors);
    exit;
}

$password_hash = password_hash($password, PASSWORD_DEFAULT);
$pdo = require __DIR__ . "/database-con.php";

$sql = "INSERT INTO `patient.login` (patFName, patSName, patPasswordHash, patGender, patNHSNumber, patPostcode, patDOB)
        VALUES (:patFName, :patSName, :patPasswordHash, :patGender, :patNHSNumber, :patPostcode, :patDOB)";

$stmt = $pdo->prepare($sql);

$stmt->bindValue(":patFName", $fName, PDO::PARAM_STR);
$stmt->bindValue(":patSName", $sName, PDO::PARAM_STR);
$stmt->bindValue(":patPasswordHash", $password_hash, PDO::PARAM_STR);
$stmt->bindValue(":patGender", $gender, PDO::PARAM_STR);
$stmt->bindValue(":patNHSNumber", $nhsNum, PDO::PARAM_STR);
$stmt->bindValue(":patPostcode", $postcode, PDO::PARAM_STR);
$stmt->bindValue(":patDOB", $dob, PDO::PARAM_STR);


try{
    $success = $stmt -> execute();

    if($success){
        echo json_encode("Register");
        exit;
    } else {
        echo json_encode("Error: " . $pdo->lastErrorMsg());
    }
} catch (PDOException $e) {
    if($e->getCode() == 23000){
        array_push($errors, 'Constraint violation, NHS number matches existing entry');

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