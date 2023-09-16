<?php
// Database configuration
$db_host = "37.187.145.226";
$db_user = "admin_demo_lnk";
$db_password = "L4T4imipbE";
$db_name = "admin_demo_lnk";

// Email server configuration for V2
// No valid use for V1 users
$email_host = "smtp.example.com"; // Your SMTP server hostname
$email_port = 587; // Port for SMTP (usually 587 for TLS/STARTTLS)
$email_username = "your_email@example.com"; // Your email username
$email_password = "your_email_password"; // Your email password
$email_sender = "your_email@example.com"; // The email address to be used as the sender

// Create a database connection
$conn = new mysqli($db_host, $db_user, $db_password, $db_name);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
