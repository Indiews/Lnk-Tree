<?php
        // Check if login is made
        include('includes/check-login.php');
?>

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

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Page</title>
</head>
<body>
    <div class="container">
        <h2>Registration</h2>
        <h3> Due to the early stage of this project you need to be a registered user to create a new user. </h3>
        <form class="user" method="POST" action="register.php">
            <div class="mb-3">
                <input class="form-control form-control-user" type="text" name="name" placeholder="Name" value="<?php echo $name; ?>" required>
                <span class="error"><?php echo $nameErr; ?></span>
            </div>
            <div class="mb-3">
                <input class="form-control form-control-user" type="text" name="surname" placeholder="Surname" value="<?php echo $surname; ?>" required>
                <span class="error"><?php echo $surnameErr; ?></span>
            </div>
            <div class="mb-3">
                <input class="form-control form-control-user" type="text" name="username" placeholder="Username" value="<?php echo $username; ?>" required>
                <span class="error"><?php echo $usernameErr; ?></span>
            </div>
            <div class="mb-3">
                <input class="form-control form-control-user" type="email" name="email" placeholder="Email Address" value="<?php echo $email; ?>" required>
                <span class="error"><?php echo $emailErr; ?></span>
            </div>
            <div class="mb-3">
                <input class="form-control form-control-user" type="password" name="password" placeholder="Password" required>
                <span class="error"><?php echo $passwordErr; ?></span>
            </div>
            <button class="btn btn-primary d-block btn-user w-100" type="submit" name="register">Register</button>
        </form>
    </div>
</body>
</html>
