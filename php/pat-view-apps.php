<?php

/*

Authors:
Osman

Used by patients to view their own appointments

*/

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$data = json_decode(file_get_contents("php://input"));

//Input for patient number is taken
$nhsNum = $_POST['nhsNum'];

//Creating connection to the database
$pdo = require __DIR__ . "/database-con.php";

//SQL query
$sql = "
SELECT a.appId, d.docNum, d.docFName, a.appTime, a.appDate, a.patNHSNumber, a.appLocation
FROM `patient.login` p
JOIN appointment a
ON p.patNHSNumber = a.patNHSNumber
JOIN 'doctor.login' d
ON a.docId = d.docId
WHERE
p.patNHSNumber = :nhsNum;
VALUES (:nhsNum)";

//Connection takes SQL query
$stmt = $pdo->prepare($sql);

//Binding doc number to the placeholder in the query
$stmt->bindValue(":nhsNum", $nhsNum, PDO::PARAM_INT);

$data = array();

try{
    //Executing the query
    $success = $stmt->execute();

    if($success) {

        //Fetching all rows
        $output = $allRows = $stmt->fetchAll(PDO::FETCH_OBJ);

        //If empty, send a message saying empty
        if(empty($output)){
            #Careful when changing this string, changing it breaks the main program unless you append the if statement for this there
            echo json_encode("No appointments avaliable");
        }
        else { 
            //Storing rows
                foreach($allRows as $row){
                    array_push($data, $row);
                }
                echo json_encode($allRows);
                exit;
            }
        } else {
            echo json_encode("Error: " . $pdo->lastErrorMsg());
        }
} catch (PDOException $e) {
    //Error checking
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

