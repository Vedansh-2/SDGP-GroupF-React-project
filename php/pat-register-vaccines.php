<?php

/*

Authors:
Osman

Used by existing patients within the vaccines (NHS) database 
to register themselves to our database with that existing information. 

*/

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$data = json_decode(file_get_contents("php://input"));

//Inputs
$nhsNum = $_POST['nhsNum'];
$password = $_POST['password'];
$errors = array();

//Input validation
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

//Encryption
$password_hash = password_hash($password, PASSWORD_DEFAULT);

//Establishing connection NHS database
$pdo = require __DIR__ . "/nhsdatabase-con.php";

$sql = "SELECT * FROM `patients` WHERE NHSNumber = :nhsNum; VALUES (:nhsNum)";

$stmt = $pdo->prepare($sql);

//Binding input to find the correct row in the database
$stmt->bindValue(":nhsNum", $nhsNum, PDO::PARAM_STR);


try{
    $success = $stmt -> execute();
    //Getting results

    if($success){
        //If first connection succeeds, 
        $output1 = $stmt->fetch(PDO::FETCH_ASSOC);
        if($output1 == false) {
            array_unshift($errors, 'ERROR_DETECTED');
            array_push($errors, 'This is not an existing NHS number');
            echo json_encode($errors);
            exit;
        }

        //Storing data from vaccines.db to be put in new db
        $nhsNum = $output1['NHSNumber'];
        $fName = $output1['Forename'];
        $lName = $output1['Surname'];
        $dob = $output1['PersonDOB'];
        $gender = $output1['GenderCode'];
        $postcode = $output1['Postcode'];

        //Forcing date into correct format
        $date1=date_create($dob);
        $dob1=date_format($date1,"Y/m/d");

        //Converting gender format to the one in our database
        if($gender == 1){
            $gender = "Male";
        } else if ($gender == 2) {
            $gender = "Female";
        }

        //Connecting to local GP
        $pdo = require __DIR__ . "/database-con.php";

        //Inserting the taken values
        $sql = "INSERT INTO `patient.login` (patFName, patSName, patPasswordHash, patGender, patNHSNumber, patPostcode, patDOB)
        VALUES (:patFName, :patSName, :patPasswordHash, :patGender, :patNHSNumber, :patPostcode, :patDOB)";

        $stmt = $pdo->prepare($sql);

   
        //Binding those values
        $stmt->bindValue(":patFName", $fName, PDO::PARAM_STR);
        $stmt->bindValue(":patSName", $lName, PDO::PARAM_STR);
        $stmt->bindValue(":patPasswordHash", $password_hash, PDO::PARAM_STR);
        $stmt->bindValue(":patGender", $gender, PDO::PARAM_STR);
        $stmt->bindValue(":patNHSNumber", $nhsNum, PDO::PARAM_STR);
        $stmt->bindValue(":patPostcode", $postcode, PDO::PARAM_STR);
        $stmt->bindValue(":patDOB", $dob1, PDO::PARAM_STR);

        try{
            $success = $stmt -> execute();
        
            if($success){
                $errors = array();
                array_push($errors, "Success");
                echo json_encode($errors);
                exit;
            } else {
                //Error checking...
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