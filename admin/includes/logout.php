<?php
session_start(); // Start the session

// Include the database configuration file
include('../../config.php'); // Ensure the path to config.php is correct

// Check if the user is logged in (session variable exists)
if (isset($_SESSION['email'])) {
    $email = $_SESSION['email']; // Store the email before the session is destroyed
    
    // Prepare an update statement to mark the user as logged-out in the database
    $updateQuery = "UPDATE users SET token = 'logged-out' WHERE email = ?";
    $updateStmt = $conn->prepare($updateQuery);
    $updateStmt->bind_param("s", $email);
    $updateStmt->execute();
    $updateStmt->close();

    // Unset the session variable(s)
    unset($_SESSION['email']); // Replace 'email' with the name of your authentication variable
    unset($_SESSION['token']); // Also unset the token

    // Destroy the session
    session_destroy();
}

// Redirect the user to the login page or any other desired location
header("Location: ../login.php"); // Change to the actual login page URL
exit();


?>