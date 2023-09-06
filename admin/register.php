<?php
// Include the database configuration
include('../config.php');

// Initialize variables to store user input and error messages
$name = $surname = $username = $email = $password = '';
$nameErr = $surnameErr = $usernameErr = $emailErr = $passwordErr = '';

// Check if the registration form was submitted
if (isset($_POST['register'])) {
    // Validate user input
    if (empty($_POST['name'])) {
        $nameErr = "Name is required";
    } else {
        $name = $_POST['name'];
    }

    if (empty($_POST['surname'])) {
        $surnameErr = "Surname is required";
    } else {
        $surname = $_POST['surname'];
    }

    if (empty($_POST['username'])) {
        $usernameErr = "Username is required";
    } else {
        $username = $_POST['username'];
    }

    if (empty($_POST['email'])) {
        $emailErr = "Email is required";
    } else {
        $email = $_POST['email'];
    }

    if (empty($_POST['password'])) {
        $passwordErr = "Password is required";
    } else {
        $password = $_POST['password'];
    }

    // If there are no validation errors, insert user data into the database
    if (empty($nameErr) && empty($surnameErr) && empty($usernameErr) && empty($emailErr) && empty($passwordErr)) {
        // Hash the password (you should use a secure hashing algorithm)
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Insert user data into the "users" table
        $insertQuery = "INSERT INTO users (name, surname, username, email, password) VALUES ('$name', '$surname', '$username', '$email', '$hashedPassword')";

        if ($conn->query($insertQuery) === TRUE) {
            // Registration successful, you can redirect to a login page or display a success message
            echo "Registration successful. <a href='login.php'>Login here</a>.";
        } else {
            echo "Error: " . $insertQuery . "<br>" . $conn->error;
        }
    }
}
?>


<?php
        // Check if login is made
        include('includes/check-login.php');
?>

<!DOCTYPE php>
<php data-bs-theme="light" lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Register - Lnk Tree</title>
    <link rel="stylesheet" href="../assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&amp;display=swap">
    <!-- Temporary Redirect -->
    <meta http-equiv="refresh" content="0; URL='register-temp.php'"/>
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
                            </div>
                            <form class="user">
                                <div class="row mb-3">
                                    <div class="col-sm-6 mb-3 mb-sm-0"><input class="form-control form-control-user" type="text" id="exampleFirstName" placeholder="First Name" name="first_name"></div>
                                    <div class="col-sm-6"><input class="form-control form-control-user" type="text" id="exampleLastName" placeholder="Last Name" name="last_name"></div>
                                </div>
                                <div class="mb-3"><input class="form-control form-control-user" type="email" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Email Address" name="email"></div>
                                <div class="row mb-3">
                                    <div class="col-sm-6 mb-3 mb-sm-0"><input class="form-control form-control-user" type="password" id="examplePasswordInput" placeholder="Password" name="password"></div>
                                    <div class="col-sm-6"><input class="form-control form-control-user" type="password" id="exampleRepeatPasswordInput" placeholder="Repeat Password" name="password_repeat"></div>
                                </div><button class="btn btn-primary d-block btn-user w-100" type="submit">Register Account</button>
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

</php>