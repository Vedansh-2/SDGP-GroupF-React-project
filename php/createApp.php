<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$data = json_decode(file_get_contents("php://input"));

$nhsNum = $_POST['nhsNum'];
$location = $_POST['location'];
$date = $_POST['date'];
$time = $_POST['time'];
$docId = $_POST['docId'];

$day = $_POST['day'];
$month = $_POST['month'];
$year = $_POST['year'];
$hour = $_POST['hour'];
$minute = $_POST['minute'];
$textarea = $_POST['detail'];

$errors = array();

if(empty($location)) {
    array_push($errors, 'Location is required');
}

if(empty($docId)) {
    array_push($errors, 'Doctor select is required');
}

if(empty($date)) {
    array_push($errors, 'Date is required');
}

if(empty($time) || empty($hour) || empty($minute)){
    array_push($errors, 'Time is required');
}

if(empty($nhsNum)) {
    array_push($errors, 'Patient error: cannot find patient NHS number');
}

if(!checkdate($month, $day, $year) || $year > 2101) {
    array_push($errors, 'Date of appointment is invalid');
}

if($hour < 0 || $hour > 23 || $time < 0 || $time > 60) {
    array_push($errors, 'Time is invalid, please put it in 24 hour format');
}

if(count($errors)){
    array_unshift($errors, 'ERROR_DETECTED');
    echo json_encode($errors);
    exit;
}

$pdo = require __DIR__ . "/database-con.php";

$sql = "INSERT INTO `appointment` (patNHSNumber, appLocation, docId, appDate, appTime, appDetail)
        VALUES (:patNHSNumber, :appLocation, :docId, :appDate, :appTime, :appDetail)";

$stmt = $pdo->prepare($sql);

$stmt->bindValue(":patNHSNumber", $nhsNum, PDO::PARAM_INT);
$stmt->bindValue(":appLocation", $location, PDO::PARAM_STR);
$stmt->bindValue(":docId", $docId, PDO::PARAM_INT);
$stmt->bindValue(":appDate", $date, PDO::PARAM_STR);
$stmt->bindValue(":appTime", $time, PDO::PARAM_STR);
$stmt->bindValue(":appDetail", $textarea, PDO::PARAM_STR);

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
            array_push($errors, 'Constraint violation,  number matches existing entry');
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