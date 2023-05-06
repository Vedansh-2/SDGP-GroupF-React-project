<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$data = json_decode(file_get_contents("php://input"));

$docNum = $_POST['docNum'];
$errors = array();


if(empty($docNum)) {
    array_push($errors, 'Please select a doctor');
}


if(count($errors)){
    array_unshift($errors, 'ERROR_DETECTED');
    echo json_encode($errors);
    exit;
}

$pdo = require __DIR__ . "/database-con.php";

$sql = "SELECT * FROM `doctor.login` WHERE docNum = :docNum;
        VALUES (:docNum)";

$stmt = $pdo->prepare($sql);

$stmt->bindValue(":docNum", $docNum, PDO::PARAM_INT);



try{
    // execute query
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