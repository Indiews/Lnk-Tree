<?php
// Database configuration
$db_host = 'localhost';
$db_user = 'lnk_tree';
$db_password = 'lnk_tree';
$db_name = 'lnk_tree';

// Create a database connection
$conn = new mysqli($db_host, $db_user, $db_password, $db_name);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>