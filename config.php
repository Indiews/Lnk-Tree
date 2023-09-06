<?php
// Database configuration
$db_host = "localhost";
$db_user = "itsfdo_its";
$db_password = "qyvJgtfOBO";
$db_name = "itsfdo_its";

// Create a database connection
$conn = new mysqli($db_host, $db_user, $db_password, $db_name);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
