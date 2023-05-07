<?php
/*

Authors:
Diogo
Sayhan


Used by patients to create appointments with doctors

*/

header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$data = json_decode(file_get_contents("php://input"));

$nhsNum = $_POST['nhsNum'];
$errors = array();

if(empty($nhsNum)) {
    echo json_encode($nhsNum);
    array_push($errors, 'Unexpected NHS number error');
}


if(count($errors)){
    array_unshift($errors, 'ERROR_DETECTED');
    echo json_encode($errors);
    exit;
}

$pdo = require __DIR__ . "/database-con.php";

$sql = "DELETE FROM `patient.login` WHERE `patNHSNumber` = :patNHSNumber; VALUES (:patNHSNumber)";

$stmt = $pdo->prepare($sql);

$stmt->bindValue(":patNHSNumber", $nhsNum, PDO::PARAM_INT);



try{
    $success = $stmt->execute();

    // fetch results
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