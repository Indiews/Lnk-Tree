<?php
session_start();
include('../config.php');

// Brute-force settings
$max_attempts = 5;          // Max failed attempts before block
$lockout_time = 15 * 60;    // Lockout time in seconds (15 minutes)

// Get user's IP
$ip_address = $_SERVER['REMOTE_ADDR'];

// Count recent failed attempts for this IP
$stmt = $conn->prepare("
    SELECT COUNT(*) AS attempt_count 
    FROM login_attempts 
    WHERE ip_address = ? 
      AND attempt_time > (NOW() - INTERVAL ? SECOND)
");
$stmt->bind_param("si", $ip_address, $lockout_time);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$attempt_count = $row['attempt_count'];
$stmt->close();

// Flag if blocked
$is_blocked = ($attempt_count >= $max_attempts);

// If already logged in, redirect to dashboard
if (isset($_SESSION['email'])) {
    header("Location: dashboard.php");
    exit();
}

// Handle login submission only if NOT blocked
if (!$is_blocked && isset($_POST['login'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        $storedHashedPassword = $row['password'];

        if (password_verify($password, $storedHashedPassword)) {
            // Success: clear attempts for this IP
            $clearStmt = $conn->prepare("DELETE FROM login_attempts WHERE ip_address = ?");
            $clearStmt->bind_param("s", $ip_address);
            $clearStmt->execute();
            $clearStmt->close();

            $_SESSION['email'] = $email;
            $token = bin2hex(random_bytes(32));
            $_SESSION['token'] = $token;

            $updateStmt = $conn->prepare("UPDATE users SET token = ? WHERE email = ?");
            $updateStmt->bind_param("ss", $token, $email);
            $updateStmt->execute();
            $updateStmt->close();

            header("Location: dashboard.php");
            exit();
        } else {
            // Wrong password → log failed attempt
            $logStmt = $conn->prepare("INSERT INTO login_attempts (ip_address) VALUES (?)");
            $logStmt->bind_param("s", $ip_address);
            $logStmt->execute();
            $logStmt->close();

            $login_error = "<p class='text-danger'>Invalid login credentials. Please try again.</p>";
        }
    } else {
        // No such email → log failed attempt
        $logStmt = $conn->prepare("INSERT INTO login_attempts (ip_address) VALUES (?)");
        $logStmt->bind_param("s", $ip_address);
        $logStmt->execute();
        $logStmt->close();

        $login_error = "<p class='text-danger'>Invalid login credentials. Please try again.</p>";
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login - Lnk Tree</title>
    <link rel="stylesheet" href="../admin/assets/bootstrap/css/bootstrap.min.css">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,300,400,600,700,800,900&display=swap" rel="stylesheet">
</head>

<body class="bg-gradient-primary" style="background-image: linear-gradient(180deg,rgb(58, 58, 58) 10%, #000000 100%);">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-9 col-lg-12 col-xl-10">
                <div class="card shadow-lg o-hidden border-0 my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-6 d-none d-lg-flex">
                                <div class="flex-grow-1 bg-login-image" style="background-image: url(https://cdn.indiews.com/lnk-tree/branding/001.png);"></div>
                            </div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h4 class="text-dark mb-4">Welcome to Lnk Tree</h4>
                                    </div>

                                    <?php 
                                    if ($is_blocked) {
                                        echo "<p class='text-danger'>Too many failed login attempts from your IP. Please try again later.</p>";
                                    } else {
                                        if (!empty($login_error)) {
                                            echo $login_error;
                                        }
                                    ?>
                                        <form class="user" method="POST" action="">
                                            <div class="mb-3">
                                                <input class="form-control form-control-user" type="email" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." name="email" required>
                                            </div>
                                            <div class="mb-3">
                                                <input class="form-control form-control-user" type="password" id="exampleInputPassword" placeholder="Password" name="password" required>
                                            </div>
                                            <button style="background-color: #000000 !important" class="btn btn-primary d-block btn-user w-100" type="submit" name="login">Login</button>
                                        </form>
                                    <?php } ?>

                                    <!-- Disabled links -->
                                    <!-- <div class="text-center"><a class="small" href="forgot-password.php">Forgot Password?</a></div>
                                    <div class="text-center"><a class="small" href="register.php">Create an Account!</a></div>-->
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

</html>
