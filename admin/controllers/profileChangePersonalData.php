<?php
session_start();

// Include the database configuration and other necessary files
include('../../config.php');

if (isset($_POST['formuser'])) {
    // Initialize variables for error messages
    $firstName = $lastName = $email = '';
    $emailError = '';
    $successMessageProf = '';

    // Fetch user's email from the session
    if (isset($_SESSION['email'])) {
        $userEmail = $_SESSION['email'];

        // Fetch user data based on their email
        $sql = "SELECT * FROM users WHERE email = '$userEmail'";
        $result = $conn->query($sql);

        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            $firstName = $row['name'];
            $lastName = $row['surname'];
            $email = $row['email'];
        }
    }

    // Get updated user data from the form
    $newFirstName = $_POST['first_name'];
    $newLastName = $_POST['last_name'];

    // Update the user's data in the database
    $updateSql = "UPDATE users SET name = '$newFirstName', surname = '$newLastName' WHERE email = '$userEmail'";

    if ($conn->query($updateSql) === TRUE) {
        // Data updated successfully, set a success message
        $_SESSION['successMessagePersonalData'] = "Settings saved successfully.";

        // Update the displayed user data with the new values
        $firstName = $newFirstName;
        $lastName = $newLastName;
    } else {
        $_SESSION['errorMessagePersonalData'] = "Something failed when trying to change your information.";
        // Data update failed, display an error message
        echo "Error updating data: " . $conn->error;
    }
}

header('Location: /admin/profile.php');