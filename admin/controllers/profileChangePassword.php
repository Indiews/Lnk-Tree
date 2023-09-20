<?php
session_start();

// Include the database configuration
include('../../config.php');

$userEmail = $_SESSION['email'];

// Check if the submitted form is named "formPass"
if (isset($_POST['formpass'])) {
    echo 'aqui';
    // Get user input from the form
    $email = $_SESSION['email'];
    $currentPassword = $_POST['current-password'];
    $newPassword = $_POST['new-password'];
    $confirmPassword = $_POST['confirm-password'];

    // Create a SQL query to retrieve the hashed password for the provided email
    $sql = "SELECT password FROM users WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // User with the provided email found, retrieve the hashed password
        $row = $result->fetch_assoc();
        $storedHashedPassword = $row['password'];

        // Verify the current password
        if (!password_verify($currentPassword, $storedHashedPassword)) {
            $_SESSION['errorMessage'] = "Incorrect current password.";
        }

        // Check if the new password matches the confirm password
        if ($newPassword !== $confirmPassword) {
            $_SESSION['errorMessage'] = "New password and confirm password do not match.";
        }

        // If no errors, update the password
        if (!isset($_SESSION['errorMessage'])) {
            // Hash the new password
            $hashedNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);

            // Update the user's password in the database based on their email
            $updateSql = "UPDATE users SET password = '$hashedNewPassword' WHERE email = '$email'";

            if ($conn->query($updateSql) === TRUE) {
                // Password updated successfully, you can redirect or display a success message
                $_SESSION['successMessage'] = "Password updated successfully."; // Updated variable name
            } else {
                // Password update failed, display an error message
                echo "Error updating password: " . $conn->error;
            }
        }
    }
    // Close the database connection
    $conn->close();
}

header('Location: /admin/profile.php');