<?php
/*

Authors:
Osman

Used by patients to create appointments with doctors

*/

//Header is open which is bad practice
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$data = json_decode(file_get_contents("php://input"));

//Input fields
$nhsNum = $_POST['nhsNum'];
$location = $_POST['location'];
$date = $_POST['date'];
$time = $_POST['time'];
$docId = $_POST['docId'];

$day = $_POST['day'];
$month = $_POST['month'];
$year = $_POST['year'];
//$hour = $_POST['hour'];
$minute = $_POST['minute'];
$textarea = $_POST['detail'];

//Array to hold errors and input validation
$errors = array();

//Input validation
if(empty($location)) {
    array_push($errors, 'Location is required');
}

if(empty($docId)) {
    array_push($errors, 'Doctor select is required');
}

if(empty($date)) {
    array_push($errors, 'Date is required');
}

//OLD TIME CHECK
//|| empty($hour) || empty($minute)

if(empty($time)){
    array_push($errors, 'Time is required');
}


if(empty($nhsNum)) {
    array_push($errors, 'Patient error: cannot find patient NHS number');
}

if($day < 1 || $day > 31 || $month <1 || $month >12 || $year > 2101 || $year < 2020) {
    array_push($errors, 'Date of appointment is invalid');
}

//OLD TIME CHECK
/*
if($hour < 0 || $hour > 23 || $minute < 0 || $minute > 60) {
    array_push($errors, 'Time is invalid, please put it in 24 hour format');
}
*/

if(count($errors)){
    array_unshift($errors, 'ERROR_DETECTED');
    echo json_encode($errors);
    exit;
}

//Force formatting date
$date1=date_create($date);
$date2=date_format($date1,"Y/m/d");

//Creates connection to the local GP database

$pdo = require __DIR__ . "/database-con.php";

//SQL query, inserts values into appointment table
$sql = "INSERT INTO `appointment` (patNHSNumber, appLocation, docId, appDate, appTime, appDetail)
        VALUES (:patNHSNumber, :appLocation, :docId, :appDate, :appTime, :appDetail)";

$stmt = $pdo->prepare($sql);

//Binding values to placeholders
$stmt->bindValue(":patNHSNumber", $nhsNum, PDO::PARAM_INT);
$stmt->bindValue(":appLocation", $location, PDO::PARAM_STR);
$stmt->bindValue(":docId", $docId, PDO::PARAM_INT);
$stmt->bindValue(":appDate", $date2, PDO::PARAM_STR);
$stmt->bindValue(":appTime", $time, PDO::PARAM_STR);
$stmt->bindValue(":appDetail", $textarea, PDO::PARAM_STR);

//Running
try{
    $success = $stmt -> execute();

    if($success){
        array_push($errors, "Success");
        echo json_encode($errors);
        exit;
    } else {
        //Error handling:
        echo json_encode("Error: " . $pdo->lastErrorMsg());
    }
} catch (PDOException $e) {
    if($e->getCode() == 23000){
            array_unshift($errors, 'ERROR_DETECTED');
            array_push($errors, 'Constraint violation,  number matches existing entry');
    echo json_encode($errors);
    exit;
        

    } else {
        array_push($errors, 'ERROR_DETECTED');
        echo json_encode($errors, "Error: " . $e->getMessage());
        exit;
    }

    if(count($errors)){
        array_unshift($errors, 'ERROR_DETECTED');
        echo json_encode($errors);
        exit;
    }
}

?>