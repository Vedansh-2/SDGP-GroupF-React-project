<?php

/*

Authors:

Gets a specific patient from the system

*/

//Headers are open which is bad practice
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$data = json_decode(file_get_contents("php://input"));

//Input variables
$nhsNum = $_POST['nhsNum'];

//This array contains any errors
$errors = array();


//Input validation
if(empty($nhsNum)) {
    array_push($errors, 'Please select a patient');
}

//Checks the error array for input validation errors
if(count($errors)){
    array_unshift($errors, 'ERROR_DETECTED');
    echo json_encode($errors);
    exit;
}

//Creating connection to the DB
$pdo = require __DIR__ . "/database-con.php";

//Retrieving all results in patient login where doc number is equal to the input
$sql = "SELECT * FROM `patient.login` WHERE patNHSNumber = :nhsNum;
        VALUES (:nhsNum)";

//Preparing statement
$stmt = $pdo->prepare($sql);

//Binding value to placeholder
$stmt->bindValue(":nhsNum", $nhsNum, PDO::PARAM_INT);



try{
    //Execution
    $success = $stmt->execute();

    //Fetching
    $output = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if($success){
        array_push($errors, "Success");
        echo json_encode($output);
        exit;
    } else {
        echo json_encode("Error: " . $pdo->lastErrorMsg());
    }
} catch (PDOException $e) {
    if($e->getCode() == 23000){
            array_unshift($errors, 'ERROR_DETECTED');
            array_push($errors, 'Constraint violation, patient number matches existing entry');
    echo json_encode($errors);
    exit;
        

    }
    if(count($errors)){
        array_unshift($errors, 'ERROR_DETECTED');
        echo json_encode($errors);
        exit;
    }
}

?>