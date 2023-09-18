<?php
session_start();

// Check if the user is not logged in
/*if (!isset($_SESSION['email'])) {
    // Redirect to the login page
    header("Location: login.php"); // Change to the actual login page URL
    exit(); // Ensure that the script stops executing
}*/

// Include the database configuration
include('../config.php');


if (!isset($_SESSION['email'])) {
    // Redirect to the login page
    header("Location: login.php");}
else {
// Get the email from the session
$email = $_SESSION['email'];

// Query the database to check if the email exists
 $query = "SELECT * FROM users WHERE email = '$email'";
$result = $conn->query($query);

// Check if the email exists in the database
if ($result->num_rows === 0) {
    // Email not found in the database, redirect to the login page
    header("Location: login.php"); 
   
}

}
exit();

// If the user is logged in and the email exists in the database, you can proceed with displaying the protected content.
?>
