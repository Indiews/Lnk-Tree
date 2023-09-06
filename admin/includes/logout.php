<?php
session_start(); // Start the session

// Check if the user is logged in (session variable exists)
if (isset($_SESSION['email'])) {
    // Unset the session variable(s)
    unset($_SESSION['email']); // Replace 'email' with the name of your authentication variable

    // Destroy the session
    session_destroy();
}

// Redirect the user to the login page or any other desired location
header("Location: ../login.php"); // Change to the actual login page URL
exit();
?>