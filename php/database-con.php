<?php
/*

Authors:
Osman

This file contains the connection to the local GP database

nhsdatabase-con contains the connection to the vaccines.db

*/


$con = new \PDO("sqlite:gp_records.db");

if ($con -> errorCode()) {
    echo json_encode("Failure");
    die("Connection error: " . $con->connectInfo());
}

return $con;

?>