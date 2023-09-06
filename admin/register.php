<?php

// Check if login is made
include('includes/check-login.php');

// Include the database configuration
include('../config.php');

$error_message = ""; // Initialize an empty error message

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get user input from the registration form
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $password_repeat = $_POST['password_repeat'];

    // Check if the passwords match
    if ($password !== $password_repeat) {
        // Passwords do not match, set the error message
        $error_message = "Error: Passwords do not match.";
    } else {
        // Hash the password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Insert the user into the database
        $sql = "INSERT INTO users (name, surname, email, password, perms) VALUES ('$first_name', '$last_name', '$email', '$hashed_password', 'admin')";

        if ($conn->query($sql) === TRUE) {
            // Registration successful, redirect to login page
            header("Location: login.php");
            exit();
        } else {
            // Registration failed, set the error message
            $error_message = "Error: " . $conn->error;
        }
    }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Register - Lnk Tree</title>
    <link rel="stylesheet" href="../admin/assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&amp;display=swap">
    <style>
        .error-message {
            color: red;
            margin-bottom: 10px;
        }
    </style>
</head>

<body class="bg-gradient-primary">
    <div class="container">
        <div class="card shadow-lg o-hidden border-0 my-5">
            <div class="card-body p-0">
                <div class="row">
                    <div class="col-lg-5 d-none d-lg-flex">
                        <div class="flex-grow-1 bg-register-image" style="background-image: url(&quot;https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg&quot;);"></div>
                    </div>
                    <div class="col-lg-7">
                        <div class="p-5">
                            <div class="text-center">
                                <h4 class="text-dark mb-4">Create an Account!</h4>
                                <!-- Display the error message here -->
                                <?php if (!empty($error_message)) { ?>
                                    <div class="error-message"><?php echo $error_message; ?></div>
                                <?php } ?>
                            </div>
                            <form class="user" method="POST" action="">
                                <div class="row mb-3">
                                    <div class="col-sm-6 mb-3 mb-sm-0"><input class="form-control form-control-user" type="text" id="FirstName" placeholder="First Name" name="first_name" required></div>
                                    <div class="col-sm-6"><input class="form-control form-control-user" type="text" id="LastName" placeholder="Last Name" name="last_name" required></div>
                                </div>
                                <div class="mb-3"><input class="form-control form-control-user" type="email" id="InputEmail" aria-describedby="emailHelp" placeholder="Email Address" name="email" required></div>
                                <div class="row mb-3">
                                    <div class="col-sm-6 mb-3 mb-sm-0"><input class="form-control form-control-user" type="password" id="PasswordInput" placeholder="Password" name="password" required></div>
                                    <div class="col-sm-6"><input class="form-control form-control-user" type="password" id="RepeatPasswordInput" placeholder="Repeat Password" name="password_repeat" required></div>
                                </div>
                                <button class="btn btn-primary d-block btn-user w-100" type="submit">Register Account</button>
                                <hr>
                            </form>
                            <div class="text-center"><a class="small" href="forgot-password.php">Forgot Password?</a></div>
                            <div class="text-center"><a class="small" href="login.php">Already have an account? Login!</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../assets/js/script.min.js"></script>
</body>
</html>
