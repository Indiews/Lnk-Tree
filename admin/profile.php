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
                        <?php
                        if (isset($_SESSION['successMessagePersonalData'])) {
                            echo '<div class="alert alert-success">' . $_SESSION['successMessagePersonalData'] . '</div>';
                            unset($_SESSION['successMessagePersonalData']);
                        }

                        if (isset($_SESSION['errorMessagePersonalData'])) {
                            echo '<div class="alert alert-danger">' . $_SESSION['errorMessagePersonalData'] . '</div>';
                            unset($_SESSION['errorMessagePersonalData']);
                        }
                        ?>
                        <form method="POST" action="/admin/controllers/profileChangePersonalData.php">
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
                                    <div class="mb-3"><label class="form-label" for="email"><strong>Email Address</strong></label><input class="form-control" type="email" id="email" placeholder="user@example.com" disabled value="<?php echo $email; ?>"></div>
                                </div>
                            </div>
                            <div class="mb-3"><button class="btn btn-primary btn-sm" type="submit" name="formuser">Save Settings</button></div>
                        </form>
                    </div>
                </div>
                    <div class="card shadow mb-3">
                        <div class="card-header py-3">
                            <p class="text-primary m-0 fw-bold">Password Management</p>
                        </div>
                        <div class="card-body">
                            <form method="POST" action="/admin/controllers/profileChangePassword.php">
                            <div class="mb-3">
                                <div id="success-message">
                                <?php
                                if (isset($_SESSION['successMessage'])) {
                                    echo '<div class="alert alert-success">' . $_SESSION['successMessage'] . '</div>';
                                    unset($_SESSION['successMessage']);
                                }

                                if (isset($_SESSION['errorMessage'])) {
                                    echo '<div class="alert alert-danger">' . $_SESSION['errorMessage'] . '</div>';
                                    unset($_SESSION['errorMessage']);
                                }
                                ?>
                                </div>
                                
                                <label class="form-label" for="currentPassword"><strong>Current Password</strong></label>
                                <input class="form-control" type="password" name="current-password" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="newPassword"><strong>New Password</strong></label>
                                <input class="form-control" type="password" name="new-password" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="confirmPassword"><strong>Confirm Password</strong></label>
                                <input class="form-control" type="password" name="confirm-password" required>
                            </div>
                            <button class="btn btn-primary btn-sm" type="submit" name="formpass">Update</button>
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