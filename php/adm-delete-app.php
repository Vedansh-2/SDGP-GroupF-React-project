<?php

/*

Authors:
Osman
Diogo

Used in admin components to delete appointments

*/

//Setting open headers, not good security practice.
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$data = json_decode(file_get_contents("php://input"));

//Input
$appId = $_POST['appId'];

//Error array checks for errors
$errors = array();

//Validation
if(empty($appId)) {
    echo json_encode($appId);
    array_push($errors, 'Unexpected App ID error');
}


if(count($errors)){
    array_unshift($errors, 'ERROR_DETECTED');
    echo json_encode($errors);
    exit;
}

//Getting connection to the local GP database
$pdo = require __DIR__ . "/database-con.php";

//The SQL statement
$sql = "DELETE FROM `appointment` WHERE `appId` = :appId; VALUES (:appId)";

$stmt = $pdo->prepare($sql);

//Use of placeholder protects against SQL injection
$stmt->bindValue(":appId", $appId, PDO::PARAM_INT);


//Running the query
try{
    $success = $stmt->execute();

    //Fetching all results
    $output = $stmt->fetchAll(PDO::FETCH_ASSOC);

    //Success
    if($success){
        array_push($errors, "Success");
        echo json_encode($output);
        exit;
    } 
    //Error checking...
    else {
        echo json_encode("Error: " . $pdo->lastErrorMsg());
    }
} catch (PDOException $e) {
    if($e->getCode() == 23000){
            array_unshift($errors, 'ERROR_DETECTED');
            array_push($errors, 'Constraint violation, doctor number matches existing entry');
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