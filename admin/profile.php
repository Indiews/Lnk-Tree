<?php
        // Check if login is made
        include('includes/check-login.php');
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Profile - Lnk Tree</title>
    <link rel="stylesheet" href="../admin/assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&amp;display=swap">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css">
</head>

<body id="page-top">
        <?php
        // Include the sidebar.php file
        include('includes/sidebar.php');
        ?>
        <div class="d-flex flex-column" id="content-wrapper">
            <div id="content">
        
        <?php
        // Include the NavBar file
        include('includes/nav-top.php');
        ?>
                <div class="container-fluid">
                    <h3 class="text-dark mb-4">Profile</h3>
                    <div class="card shadow mb-3">
                        <div class="card-header py-3">
                            <p class="text-primary m-0 fw-bold">User Settings</p>
                        </div>

                        <?php
                        // Include the database configuration and other necessary files
                        include('../config.php');

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

                        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                            // Get updated user data from the form
                            $newFirstName = $_POST['first_name'];
                            $newLastName = $_POST['last_name'];
                            $newEmail = $_POST['email'];

                            // Check if the new email is the same as the current email or already exists
                            if ($newEmail !== $userEmail) {
                                $checkEmailSql = "SELECT email FROM users WHERE email = '$newEmail'";
                                $checkResult = $conn->query($checkEmailSql);

                                if ($checkResult->num_rows > 0) {
                                    $emailError = "A profile with this email already exists.";
                                }
                            }

                            // If no email error, proceed with the update
                            if (empty($emailError)) {
                                // Update the email in the session if it has changed
                                if ($newEmail !== $userEmail) {
                                    $_SESSION['email'] = $newEmail;
                                }

                                // Update the user's data in the database
                                $updateSql = "UPDATE users SET name = '$newFirstName', surname = '$newLastName', email = '$newEmail' WHERE email = '$userEmail'";

                                if ($conn->query($updateSql) === TRUE) {
                                    // Data updated successfully, set a success message
                                    $successMessageProf = "Settings saved successfully.";

                                    // Update the displayed user data with the new values
                                    $firstName = $newFirstName;
                                    $lastName = $newLastName;
                                    $email = $newEmail;
                                } else {
                                    // Data update failed, display an error message
                                    echo "Error updating data: " . $conn->error;
                                }
                            }
                        }
                        ?>


<div class="card-body">
    <?php
    // Display a success message if settings are saved successfully
    if (!empty($successMessageProf)) {
        echo '<div class="alert alert-success">' . $successMessageProf . '</div>';
    }

    // Display an email error message if one exists
    if (!empty($emailError)) {
        echo '<div class="alert alert-danger">' . $emailError . '</div>';
    }
    ?>
    <form name="formUser" method="POST" action="">
        <div class="row">
            <div class="col">
                <div class="mb-3"><label class="form-label" for="first_name"><strong>First Name</strong></label><input class="form-control" type="text" id="first_name" placeholder="John" name="first_name" value="<?php echo $firstName; ?>"></div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="mb-3"><label class="form-label" for="last_name"><strong>Last Name</strong></label><input class="form-control" type="text" id="last_name" placeholder="Doe" name="last_name" value="<?php echo $lastName; ?>"></div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="mb-3"><label class="form-label" for="email"><strong>Email Address</strong></label><input class="form-control" type="email" id="email" placeholder="user@example.com" name="email" value="<?php echo $email; ?>"></div>
            </div>
        </div>
        <div class="mb-3"><button class="btn btn-primary btn-sm" type="submit">Save Settings</button></div>
    </form>
</div>
                    </div>
                    <div class="card shadow mb-3">
                        <div class="card-header py-3">
                            <p class="text-primary m-0 fw-bold">Password Management</p>
                        </div>

                        <?php
                        // Include the database configuration
                        include('../config.php');

                        // Initialize variables for error messages
                        $emailError = $currentPasswordError = $newPasswordError = $confirmPasswordError = "";

                        $userEmail = $_SESSION['email'];

                        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                            // Check if the submitted form is named "formPass"
                            if (isset($_POST['formPass'])) {
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
                                        $currentPasswordError = "Incorrect current password.";
                                    }

                                    // Check if the new password matches the confirm password
                                    if ($newPassword !== $confirmPassword) {
                                        $newPasswordError = "New password and confirm password do not match.";
                                    }

                                    // If no errors, update the password
                                    if (empty($currentPasswordError) && empty($newPasswordError)) {
                                        // Hash the new password
                                        $hashedNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);

                                        // Update the user's password in the database based on their email
                                        $updateSql = "UPDATE users SET password = '$hashedNewPassword' WHERE email = '$email'";

                                        if ($conn->query($updateSql) === TRUE) {
                                            // Password updated successfully, you can redirect or display a success message
                                            $successMessagePass = "Password updated successfully."; // Updated variable name
                                        } else {
                                            // Password update failed, display an error message
                                            echo "Error updating password: " . $conn->error;
                                        }
                                    }
                                }
                            }

                            // Close the database connection
                            $conn->close();
                        }
                        ?>



                        <div class="card-body">
                            <form name="formPass" method="POST" action="">
                            <div class="mb-3">
                                <div id="success-message">
                                <?php
                                // Check if the success message variable is set and display it
                                if (isset($successMessagePass)) {
                                    echo '<div class="alert alert-success">' . $successMessagePass . '</div>';
                                }
                                ?>
                                </div>
                                
                                <label class="form-label" for="currentPassword"><strong>Current Password</strong></label>
                                <input class="form-control" type="password" name="current-password" required>
                                <span class="text-danger"><?php echo $currentPasswordError; ?></span>
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="newPassword"><strong>New Password</strong></label>
                                <input class="form-control" type="password" name="new-password" required>
                                <span class="text-danger"><?php echo $newPasswordError; ?></span>
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="confirmPassword"><strong>Confirm Password</strong></label>
                                <input class="form-control" type="password" name="confirm-password" required>
                                <span class="text-danger"><?php echo $confirmPasswordError; ?></span>
                            </div>
                            <button class="btn btn-primary btn-sm" type="submit">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <?php
            // Add footer
            include('includes/footer.php');
            ?>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../assets/js/script.min.js"></script>
</body>

</html>