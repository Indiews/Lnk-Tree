<?php
// Check if login is made
include('includes/check-login.php');

// Include the database configuration
include('../config.php');

// Initialize variables
$codehead = "";

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['codehead'])) {
    $codehead = $conn->real_escape_string($_POST['codehead']);

    $updateSql = "UPDATE website SET codehead = '$codehead' WHERE id = 1";
    if ($conn->query($updateSql) === TRUE) {
        $message = "Settings updated successfully.";
    } else {
        $message = "Error updating settings: " . $conn->error;
    }
}

// Fetch existing settings from the database
$sql = "SELECT * FROM website WHERE id = 1";
$result = $conn->query($sql);
$websiteSettings = $result->fetch_assoc();

$codehead = $websiteSettings['codehead'] ?? '';

// Close the database connection
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Ads & Header - Lnk Tree</title>
    <link rel="stylesheet" href="../admin/assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&amp;display=swap">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="../assets/fonts/fontawesome5-overrides.min.css">
</head>

<body id="page-top">
    <?php include('includes/sidebar.php'); ?>
    <div class="d-flex flex-column" id="content-wrapper">
        <div id="content">
            <?php include('includes/nav-top.php'); ?>
            <div class="container-fluid">
                <div class="d-sm-flex justify-content-between align-items-center mb-4">
                    <h3 class="text-dark mb-0">Ads & Header</h3>
                </div>

                <?php if (!empty($message)): ?>
                    <div class="alert alert-info"><?= htmlspecialchars($message) ?></div>
                <?php endif; ?>

                <div class="row">
                    <div class="col">
                        <div class="card shadow mb-3">
                            <div class="card-header py-3">
                                <p class="text-primary m-0 fw-bold">Header Code</p>
                            </div>
                            <div class="card-body">
                                <form method="POST">
                                    <div class="row">
                                        <div class="col">
                                            <div class="mb-3">
                                                <label class="form-label" for="headcode"><strong>HTML Code</strong></label>
                                                <textarea class="form-control" id="headcode" name="codehead" rows="10" placeholder="Paste your <head> code here..."><?= htmlspecialchars($codehead) ?></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <button class="btn btn-primary btn-sm" type="submit">Save Settings</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <?php include('includes/footer.php'); ?>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../assets/js/script.min.js"></script>
</body>
</html>
