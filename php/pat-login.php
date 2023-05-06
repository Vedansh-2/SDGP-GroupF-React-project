<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$data = json_decode(file_get_contents("php://input"));

$pdo = require __DIR__ . "/database-con.php";

#$nhsNum = $data->nhsNum;
#$password = $data->password;
$nhsNum = $_POST['nhsNum'];
$password = $_POST['password'];
$errors = array();

if(empty($nhsNum)) {
    array_push($errors, 'NHS Number is required');
} else if (strlen($nhsNum) != 10) {
    array_push($errors, 'NHS Number must be 10 digits');
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

//Bound params
$stmt = $pdo->prepare('SELECT patNHSNumber, patPasswordHash FROM `patient.login`  WHERE patNHSNumber = :nhsNum');
$stmt->bindValue(":nhsNum", $nhsNum, PDO::PARAM_INT);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);
if ($user) {
    //Constant-time password comparison function allows the avoidance of timing attacks.
    if (hash_equals($user["patPasswordHash"], crypt($password, $user["patPasswordHash"]))) {
        array_push($errors, "Success");
        echo json_encode($errors);
        exit;
    } else
        array_unshift($errors, 'ERROR_DETECTED');
        array_push($errors, "Password was incorrect");
        echo json_encode($errors);
        exit;
} else {
    array_unshift($errors, 'ERROR_DETECTED');
        array_push($errors, "Password was incorrect");
        echo json_encode($errors);
        exit;
}

?>