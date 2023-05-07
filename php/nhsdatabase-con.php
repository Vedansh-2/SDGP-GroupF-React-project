<?php
/*

Authors:
Sayhan
Ali

Used to establish conenction to the vaccines.db or NHS database

*/

$con = new \PDO("sqlite:vaccines.db");

if ($con -> errorCode()) {
    echo json_encode("Failure");
    die("Connection error: " . $con->connectInfo());
}

return $con;

?>