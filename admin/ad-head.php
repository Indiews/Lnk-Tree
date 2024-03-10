<?php
// Check if login is made
include('includes/check-login.php');

// Include the database configuration
include('../config.php');

// Fetch existing settings from the database
$sql = "SELECT * FROM website WHERE id = 1";
$result = $conn->query($sql);
$websiteSettings = $result->fetch_assoc();

// Initialize variables for form values with existing values
$codehead = $websiteSettings['codehead'];


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
                <div class="d-sm-flex justify-content-between align-items-center mb-4">
                    <h3 class="text-dark mb-0">Ads & Header</h3>
                </div>
                
                <div class="row">
                    <div class="col">
                        <div class="card shadow mb-3">
                            <div class="card-header py-3">
                                <p class="text-primary m-0 fw-bold">Header Code</p>
                            </div>
                            <div class="card-body">
                            <form>
                                        <div class="row">
                                            <div class="col">
                                                <div class="mb-3"><label class="form-label" for="webname"><strong>HTML Code</strong></label><input class="form-control" type="text" id="headcode" placeholder="<head><br><script> and more..." name="codehead" style="height: calc(2.5em + 4.75rem + 2px);></div>
                                            </div>
                                        </div>
                                        <div class="mb-3"><button class="btn btn-primary btn-sm" type="submit">Save Settings</button></div>
                                    </form>
                            </div>
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
