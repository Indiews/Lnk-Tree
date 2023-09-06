<?php
session_start();

// Check if the user is logged in
if (isset($_SESSION['email'])) {
    // If logged in, redirect to the dashboard or any other protected page
    header("Location: dashboard.php"); // Change to the actual dashboard page URL
    exit();
} else {
    // If not logged in, redirect to the login page
    header("Location: login.php"); // Change to the actual login page URL
    exit();
}
?>
