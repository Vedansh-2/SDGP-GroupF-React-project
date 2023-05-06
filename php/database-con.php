<?php

$con = new \PDO("sqlite:gp_records.db");
//Consider changing the port depending on the user system

if ($con -> errorCode()) {
    echo json_encode("Failure");
    die("Connection error: " . $con->connectInfo());
}

return $con;

?>