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

                        

                        <div class="card-body">
                            <form>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3"><label class="form-label" for="first_name"><strong>First Name</strong></label><input class="form-control" type="text" id="first_name" placeholder="John" name="first_name"></div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3"><label class="form-label" for="last_name"><strong>Last Name</strong></label><input class="form-control" type="text" id="last_name-1" placeholder="Doe" name="last_name"></div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3"><label class="form-label" for="email"><strong>Email Address</strong></label><input class="form-control" type="email" id="email-1" placeholder="user@example.com" name="email"></div>
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
                                        $successMessage = "Password updated successfully.";
                                    } else {
                                        // Password update failed, display an error message
                                        echo "Error updating password: " . $conn->error;
                                    }
                                }
                            }

                            // Close the database connection
                            $conn->close();
                        }
                        ?>

                        <div class="card-body">
                            <form method="POST" action="">
                            <div class="mb-3">
                                <div id="success-message">
                                <?php
                                // Check if the success message variable is set and display it
                                if (isset($successMessage)) {
                                    echo '<div class="alert alert-success">' . $successMessage . '</div>';
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
            <footer class="bg-white sticky-footer">
                <div class="container my-auto">
                    <div class="text-center my-auto copyright"><span>Copyright © Indiews - Digital Agency</span></div>
                </div>
            </footer>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../assets/js/script.min.js"></script>
</body>

</html>