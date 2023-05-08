<?php

/*

Authors:
Osman

Used by admins to view all appointments within the system.

*/

//Header allows access from everywhere, which is bad security practice but done for ease
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//Creating connection to the local GP database
$pdo = require __DIR__ . "/database-con.php";

//Putting our SQL in a variable
$sql = "
SELECT a.appId, p.patNHSNumber, d.docId, d.docNum, p.patFName, d.docFName, a.appTime, a.appDate, a.patNHSNumber, a.appLocation
FROM `patient.login` p
JOIN appointment a
ON p.patNHSNumber = a.patNHSNumber
JOIN 'doctor.login' d
ON a.docId = d.docId
WHERE
p.patNHSNumber = a.patNHSNumber
";

//Preparing SQL to be pushed to connection
$stmt = $pdo->prepare($sql);

$data = array();

try{
    //Executing the query
    $success = $stmt->execute();

    //If successful, run
    if($success) {

        //Output contains all rows that are fetched
        $output = $allRows = $stmt->fetchAll(PDO::FETCH_OBJ);

        //If the rows are empty, then display that there are no appointments avaliable
        if(empty($output)){
            #Careful when changing this string, changing it breaks the main program unless you append the if statement for this there
            echo json_encode("No appointments avaliable");
        }
        else { 
            //If rows are avaliable, json_encode them
                foreach($allRows as $row){
                    array_push($data, $row);
                }
                echo json_encode($allRows);
                exit;
            }
        } else {
            //Error checking
            echo json_encode("Error: " . $pdo->lastErrorMsg());
        }
} catch (PDOException $e) {
    if($e->getCode() == 23000){
            array_unshift($errors, 'ERROR_DETECTED');
            array_push($errors, 'Constraint violation, admin number matches existing entry');
    echo json_encode($errors);
    exit;
        

    }
    if(count($errors)){
        array_unshift($errors, 'ERROR_DETECTED');
        echo json_encode($errors);
        exit;
    }
}

