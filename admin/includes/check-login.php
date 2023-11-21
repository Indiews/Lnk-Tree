<?php
session_start();

// Include the database configuration
include('../config.php');

// Check if the user is not logged in or if the token is not set
if (!isset($_SESSION['email']) || !isset($_SESSION['token'])) {
    // Clear the session cookie
    session_unset();
    session_destroy();

    // Redirect to the login page
    header("Location: login.php");
    exit(); // Ensure that the script stops executing
}

// Get the email and token from the session
$email = $_SESSION['email'];
$token = $_SESSION['token'];

// Query the database to check if the email exists and the token matches (use prepared statements for security)
$query = "SELECT * FROM users WHERE email = ? AND token = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ss", $email, $token);
$stmt->execute();
$result = $stmt->get_result();

// Check if the email exists and the token matches
if ($result->num_rows === 0) {
    // Clear the session cookie
    session_unset();
    session_destroy();

    // Email not found or token does not match, redirect to the login page
    header("Location: login.php");
    exit();
}

// If the user is logged in, the email exists, and the token matches in the database, you can proceed with displaying the protected content.

// Close the database connection (optional but good practice)
$stmt->close();
$conn->close();


?>
