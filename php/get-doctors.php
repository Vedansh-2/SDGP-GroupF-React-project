<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$data = json_decode(file_get_contents("php://input"));

$errors = array();


if(count($errors)){
    array_unshift($errors, 'ERROR_DETECTED');
    echo json_encode($errors);
    exit;
}

$pdo = require __DIR__ . "/database-con.php";

$sql = "SELECT * FROM `doctor.login`";

$stmt = $pdo->prepare($sql);

$data = array();



try{
    // execute query
    $success = $stmt->execute();

    // fetch results
    #$output = $stmt->fetchAll();
    if($success) {
    while($allRows = $stmt->fetchAll(PDO::FETCH_OBJ)){
        foreach($allRows as $row){
            array_push($data, $row);
        }
        echo json_encode($allRows);
        exit;
    } } else {
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