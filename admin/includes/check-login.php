<?php
session_start();

// Include the database configuration
include('../config.php');

// Check if the user is not logged in
if (!isset($_SESSION['email'])) {
    // Clear the session cookie
    session_unset();
    session_destroy();

    // Redirect to the login page
    header("Location: login.php");
    exit(); // Ensure that the script stops executing
}

// Get the email from the session
$email = $_SESSION['email'];

// Query the database to check if the email exists (use prepared statements for security)
$query = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

// Check if the email exists in the database
if ($result->num_rows === 0) {
    // Clear the session cookie
    session_unset();
    session_destroy();

    // Email not found in the database, redirect to the login page
    header("Location: login.php");
    exit();
}

// If the user is logged in and the email exists in the database, you can proceed with displaying the protected content.

// ... Your protected content code goes here ...

// Close the database connection (optional but good practice)
$stmt->close();
$conn->close();
?>
