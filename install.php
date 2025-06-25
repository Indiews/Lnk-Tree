<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $db_host = $_POST["db_host"];
    $db_user = $_POST["db_user"];
    $db_password = $_POST["db_password"];
    $db_name = $_POST["db_name"];

    $conn = new mysqli($db_host, $db_user, $db_password);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Create database if it doesn't exist
    $conn->query("CREATE DATABASE IF NOT EXISTS `$db_name`");
    $conn->select_db($db_name);

    // Create tables
    $createTables = [
        "CREATE TABLE IF NOT EXISTS `links` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `name` varchar(255) NOT NULL,
            `order` int(11) NOT NULL,
            `link` varchar(255) NOT NULL,
            PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=latin1;",

        "CREATE TABLE IF NOT EXISTS `users` (
            `id` int(255) NOT NULL AUTO_INCREMENT,
            `name` varchar(255) NOT NULL,
            `surname` varchar(255) NOT NULL,
            `permission` varchar(255) NOT NULL,
            `email` varchar(255) NOT NULL,
            `password` varchar(255) NOT NULL,
            `token` varchar(255) NOT NULL,
            PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",

        "CREATE TABLE IF NOT EXISTS `website` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `webname` varchar(255) NOT NULL,
            `lang` varchar(255) NOT NULL,
            `description` varchar(255) NOT NULL,
            `logo` varchar(255) NOT NULL,
            `bkcolor` varchar(255) NOT NULL,
            `btbkcolor` varchar(255) NOT NULL,
            `btbocolor` varchar(255) NOT NULL,
            `codehead` text NOT NULL,
            PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;"
    ];

    foreach ($createTables as $sql) {
        if (!$conn->query($sql)) {
            die("Table creation error: " . $conn->error);
        }
    }

    // Insert demo data
    $conn->query("INSERT INTO `links` (`name`, `order`, `link`) VALUES
        ('Maintained by Indiews', 2, 'https://indiews.com/'),
        ('Check Our Github', 1, 'https://github.com/Indiews/Lnk-Tree')");

    $conn->query('INSERT INTO `users` (`name`, `surname`, `permission`, `email`, `password`, `token`) VALUES
        ("Default", "User", "admin", "lnktree@indiews.com", "$2y$10$d5MUILFt5de21Y1iEPNpiORYHNCr8Kt6KbAZDbncpZKWxwKxkR.9.", "new-user")');

    $conn->query("INSERT INTO `website` (`webname`, `lang`, `description`, `logo`, `bkcolor`, `btbkcolor`, `btbocolor`, `codehead`) VALUES
        ('Lnk Tree', 'en', 'Meet Lnk Tree. Your custom and open Link Tree alternative.', 'https://cdn.indiews.com/lnk-tree/branding/001.png', '#000000', '#adadad', '#ffffff','')");

    // Build config.php content
    $configContent = <<<'PHP'
<?php
// Database configuration
$db_host = '{$db_host}';
$db_user = '{$db_user}';
$db_password = '{$db_password}';
$db_name = '{$db_name}';

// Create a database connection
$conn = new mysqli($db_host, $db_user, $db_password, $db_name);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
PHP;

    // Replace placeholders with real values
    $configContent = str_replace(
        ['{$db_host}', '{$db_user}', '{$db_password}', '{$db_name}'],
        [$db_host, $db_user, $db_password, $db_name],
        $configContent
    );

    // Save config.php
    file_put_contents("config.php", $configContent);

    echo "<p style='color: green;'>Installation complete! <code>config.php</code> created and database initialized.</p>";

    // Delete this installer file
    $installerFile = basename(__FILE__);
    if (unlink($installerFile)) {
        echo "<p style='color: blue;'>Installer file <code>$installerFile</code> was deleted for security.</p>";
    } else {
        echo "<p style='color: red;'>Warning: Could not delete <code>$installerFile</code>. Please remove it manually.</p>";
    }

    exit;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Install - Lnk Tree</title>
    <link rel="stylesheet" href="../admin/assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&amp;display=swap">
    <style>
        .error-message {
            color: red;
            margin-bottom: 10px;
        }
    </style>
</head>

<body class="bg-gradient-primary" style="background-image: linear-gradient(180deg,rgb(58, 58, 58) 10%, #000000 100%);">
    <div class="container">
        <div class="card shadow-lg o-hidden border-0 my-5">
            <div class="card-body p-0">
                <div class="row">
                    <div class="col-lg-5 d-none d-lg-flex">
                        <div class="flex-grow-1 bg-register-image" style="background-image: url(&quot;https://cdn.indiews.com/lnk-tree/branding/001.png&quot;); background-size: cover;"></div>
                    </div>
                    <div class="col-lg-7">
                        <div class="p-5">
                            <div class="text-center">
                                <h4 class="text-dark mb-4">Install Lnk Tree</h4>
                                <?php if (!empty($error_message)) { ?>
                                    <div class="error-message"><?php echo $error_message; ?></div>
                                <?php } ?>
                            </div>
                            <div class="alert alert-info alert-dismissible fade show mt-4" role="alert">
                            <strong>Default Account:</strong> Use <code>lnktree@indiews.com</code> and password <code>password</code> to log in after install.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>

                            <form class="user" method="POST" action="">
                                <div class="mb-3">
                                    <input class="form-control form-control-user" type="text" name="db_host" placeholder="Database Host" value="localhost" required>
                                </div>
                                <div class="mb-3">
                                    <input class="form-control form-control-user" type="text" name="db_user" placeholder="Database User" required>
                                </div>
                                <div class="mb-3">
                                    <input class="form-control form-control-user" type="password" name="db_password" placeholder="Database Password" required>
                                </div>
                                <div class="mb-3">
                                    <input class="form-control form-control-user" type="text" name="db_name" placeholder="Database Name" required>
                                </div>
                                <button class="btn btn-primary d-block btn-user w-100" type="submit">Install</button>
                                <hr>
                            </form>
                            <div class="text-center">
                                <a class="small btn" href="https://github.com/Indiews/Lnk-Tree">Check Github</a>
                                <a class="small btn" href="https://discord.gg/6jpkYPhRfV">Join Discord</a>
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
