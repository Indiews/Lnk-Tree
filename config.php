<?php
// Database configuration
$db_host = 'localhost';
$db_user = 'lnk_tree';
$db_password = 'lnk_tree';
$db_name = 'lnk_tree';

// Email server configuration for V2
// No valid use for V1 users
$email_host = "smtp.example.com";
$email_port = 587;
$email_username = "your_email@example.com";
$email_password = "your_email_password";
$email_sender = "your_email@example.com";

// Create a database connection
$conn = new mysqli($db_host, $db_user, $db_password, $db_name);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>