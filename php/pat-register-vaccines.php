<?php

/*

Authors:
Osman

*/

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$data = json_decode(file_get_contents("php://input"));

//Work in progress
$nhsNum = 94648205861;
$password = "omegalul";
$errors = array();

if(empty($nhsNum)) {
    array_push($errors, 'NHS Number is required');
} else if (strlen($nhsNum) != 11) {
    array_push($errors, 'NHS Number must be 11 digits');
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

if(count($errors)){
    array_unshift($errors, 'ERROR_DETECTED');
    echo json_encode($errors);
    exit;
}

$password_hash = password_hash($password, PASSWORD_DEFAULT);
$pdo = require __DIR__ . "/nhsdatabase-con.php";

$sql = "SELECT * FROM `patients` WHERE NHSNumber = :nhsNum; VALUES (:nhsNum)";

$stmt = $pdo->prepare($sql);

$stmt->bindValue(":nhsNum", $nhsNum, PDO::PARAM_STR);


try{
    $success = $stmt -> execute();
    // fetch results

    if($success){
        $output1 = $stmt->fetch(PDO::FETCH_ASSOC);
        if($output1 == false) {
            array_unshift($errors, 'ERROR_DETECTED');
            array_push($errors, 'This is not an existing NHS number');
            echo json_encode($errors);
            exit;
        }

        $nhsNum = $output1['NHSNumber'];
        $fName = $output1['Forename'];
        $lName = $output1['Surname'];
        $dob = $output1['PersonDOB'];
        $gender = $output1['GenderCode'];
        $postcode = $output1['Postcode'];

        if($gender == 1){
            $gender = "Male";
        } else if ($gender == 2) {
            $gender = "Female";
        }

        $pdo = require __DIR__ . "/database-con.php";

        $sql = "INSERT INTO `patient.login` (patFName, patSName, patPasswordHash, patGender, patNHSNumber, patPostcode, patDOB)
        VALUES (:patFName, :patSName, :patPasswordHash, :patGender, :patNHSNumber, :patPostcode, :patDOB)";

        $stmt = $pdo->prepare($sql);

        
        $stmt->bindValue(":patFName", $fName, PDO::PARAM_STR);
        $stmt->bindValue(":patSName", $lName, PDO::PARAM_STR);
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

    } else {
        echo json_encode("Error: " . $pdo->lastErrorMsg());
    }
    
} catch (PDOException $e) {
    if($e->getCode() == 23000){
        array_push($errors, 'Constraint violation, NHS number matches existing entry');

    } else {
        echo json_encode("Error: " . $e->getMessage());
    }

    if(count($errors)){
        array_unshift($errors, 'ERROR_DETECTED');
        echo json_encode($errors);
        exit;
    }
}

?>