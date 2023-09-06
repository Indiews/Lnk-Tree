<?php
session_start();

// Check if the user is logged in
if (isset($_SESSION['email'])) {
    // If logged in, redirect to the dashboard
    header("Location: dashboard.php"); 
    exit();
}
?>

<!DOCTYPE php>
<php lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Login - Lnk Tree</title>
    <link rel="stylesheet" href="../admin/assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&amp;display=swap">
</head>

<body class="bg-gradient-primary">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-9 col-lg-12 col-xl-10">
                <div class="card shadow-lg o-hidden border-0 my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-6 d-none d-lg-flex">
                                <div class="flex-grow-1 bg-login-image" style="background-image: url(&quot;https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg&quot;);"></div>
                            </div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h4 class="text-dark mb-4">Welcome Back!</h4>
                                    </div>
                                    <?php
                                    // Include the database configuration
                                    include('../config.php');

                                    // Check if the form was submitted
                                    if (isset($_POST['login'])) {
                                        // Get user input
                                        $email = $_POST['email'];
                                        $password = $_POST['password'];

                                        // Query to check user credentials
                                        $query = "SELECT * FROM users WHERE email = '$email'";
                                        $result = $conn->query($query);

                                        if ($result->num_rows == 1) {
                                            $row = $result->fetch_assoc();
                                            $storedHashedPassword = $row['password']; // Replace 'password' with the actual column name

                                            if (password_verify($password, $storedHashedPassword)) {
                                                // Successful login, set a session or redirect to a dashboard page
                                                session_start();
                                                $_SESSION['email'] = $email;
                                                header("Location: dashboard.php");
                                                exit();
                                            } else {
                                                // Invalid credentials, display an error message
                                                echo "<p class='text-danger'>Invalid login credentials. Please try again.</p>";
                                            }
                                        }
                                    }
                                    ?>
                                    <form class="user" method="POST" action="">
                                        <div class="mb-3"><input class="form-control form-control-user" type="email" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." name="email"></div>
                                        <div class="mb-3"><input class="form-control form-control-user" type="password" id="exampleInputPassword" placeholder="Password" name="password"></div>
                                        <div class="mb-3">
                                            <div class="custom-control custom-checkbox small">
                                                <div class="form-check"><input class="form-check-input custom-control-input" type="checkbox" id="formCheck-1"><label class="form-check-label custom-control-label" for="formCheck-1">Remember Me</label></div>
                                            </div>
                                        </div><button class="btn btn-primary d-block btn-user w-100" type="submit" name="login">Login</button>
                                    </form>
                                    <!-- Temporarily Disabled -->
                                    <!-- <div class="text-center"><a class="small" href="forgot-password.php">Forgot Password?</a></div> -->
                                    <div class="text-center"><a class="small" href="register.php">Create an Account!</a></div>
                                </div>
                            </div>
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
