<?php
session_start();

// Check if the user is not logged in
if (!isset($_SESSION['email'])) {
    // Redirect to the login page
    header("Location: login.php"); // Change to the actual login page URL
    exit(); // Ensure that the script stops executing
}

// If the user is logged in, you can proceed with displaying the protected content.
?>
