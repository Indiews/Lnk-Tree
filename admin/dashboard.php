<?php
        // Check if login is made
        include('includes/check-login.php');
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Dashboard - Lnk Tree</title>
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
                        <h3 class="text-dark mb-0">Dashboard</h3>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-xl-3 mb-4">
                            <div class="card shadow border-start-primary py-2">
                                <div class="card-body">
                                    <div class="row align-items-center no-gutters">
                                        <div class="col me-2">
                                            <div class="text-uppercase text-primary fw-bold text-xs mb-1"><span style="color: var(--bs-emphasis-color);">Total Links</span></div>
                                            <div class="text-dark fw-bold h5 mb-0"><span>5</span></div>
                                        </div>
                                        <div class="col-auto"><i class="fas fa-external-link-alt fa-2x text-gray-300"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-xl-3 mb-4">
                            <div class="card shadow border-start-primary py-2">
                                <div class="card-body">
                                    <div class="row align-items-center no-gutters">
                                        <div class="col me-2">
                                            <div class="text-uppercase text-primary fw-bold text-xs mb-1"><span style="color: var(--bs-emphasis-color);">permission level</span></div>
                                            <div class="text-dark fw-bold h5 mb-0"><span>ADMIN</span></div>
                                        </div>
                                        <div class="col-auto"><i class="fas fa-user fa-2x text-gray-300"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-xl-3 mb-4">
                            <div class="card shadow border-start-warning py-2">
                                <div class="card-body">
                                    <div class="row align-items-center no-gutters">
                                        <div class="col me-2">
                                            <div class="text-uppercase text-warning fw-bold text-xs mb-1"><span style="color: var(--bs-emphasis-color);">Lnk Tree Version</span></div>
                                            <div class="text-dark fw-bold h5 mb-0"><span>V 0.1.0</span></div>
                                        </div>
                                        <div class="col-auto"><i class="fa fa-file-code-o fa-2x text-gray-300"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="card shadow mb-3">
                                <div class="card-header py-3">
                                    <p class="text-primary m-0 fw-bold">Website Settings</p>
                                </div>
                                <div class="card-body">

                                <?php
                                // Include the database configuration and other necessary files
                                include('../config.php');

                                // Initialize variables for error messages
                                $webname = $description = $logo = $background = $buttonBack = $buttonBorder = '';
                                $successMessage = '';

                                // Fetch user's website data from the session or use a website ID if applicable
                                // Replace '$_SESSION['website_id']' with the actual way you identify the website
                                $websiteId = isset($_SESSION['website_id']) ? $_SESSION['website_id'] : 1;

                                // Fetch current website settings from the database based on the website ID
                                $sql = "SELECT * FROM website WHERE id = $websiteId";
                                $result = $conn->query($sql);

                                if ($result->num_rows == 1) {
                                    $row = $result->fetch_assoc();
                                    $webname = $row['webname'];
                                    $description = $row['description'];
                                    //$logo = $row['logo'];
                                    $background = $row['bkcolor'];
                                    $buttonBack = $row['btbkcolor'];
                                    $buttonBorder = $row['btbocolor'];
                                }

                                if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                                    // Get updated values from the form
                                    $newWebname = $_POST['webname'];
                                    $newDescription = $_POST['description'];
                                    $newBackground = $_POST['background'];
                                    $newButtonBack = $_POST['button_back'];
                                    $newButtonBorder = $_POST['button_border'];

                                    // Update the website settings in the database with ID 1 (or any other ID as needed)
                                    $updateSql = "UPDATE website SET 
                                        webname = '$newWebname',
                                        description = '$newDescription',
                                        bkcolor = '$newBackground',
                                        btbkcolor = '$newButtonBack',
                                        btbocolor = '$newButtonBorder'
                                        WHERE id = 1"; // Update row with ID 1

                                    if ($conn->query($updateSql) === TRUE) {
                                        // Data updated successfully, set a success message
                                        $successMessage = "Settings saved successfully.";

                                        // Update the displayed values with the new ones
                                        $webname = $newWebname;
                                        $description = $newDescription;
                                        $background = $newBackground;
                                        $buttonBack = $newButtonBack;
                                        $buttonBorder = $newButtonBorder;
                                    } else {
                                        // Data update failed, display an error message
                                        echo "Error updating data: " . $conn->error;
                                    }
                                }
                                ?>


                            <div class="card-body">
                                <?php
                                // Display a success message if settings are saved successfully
                                if (!empty($successMessage)) {
                                    echo '<div class="alert alert-success">' . $successMessage . '</div>';
                                }
                                ?>
                                <form method="POST" action="">
                                    <div class="row">
                                        <!-- Input fields for background, button background, and button border colors -->
                                        <!-- Add 'value' attributes to populate with current values -->
                                        <div class="col">
                                            <div class="mb-3"><label class="form-label" for="background"><strong>Background Color</strong></label><input class="form-control form-control-color" type="color" id="background" name="background" value="<?php echo $background; ?>"></div>
                                        </div>
                                        <div class="col">
                                            <div class="mb-3"><label class="form-label" for="button_back"><strong>Button Background Color</strong></label><input class="form-control form-control-color" type="color" id="button_back" name="button_back" value="<?php echo $buttonBack; ?>"></div>
                                        </div>
                                        <div class="col">
                                            <div class="mb-3"><label class="form-label" for="button_border"><strong>Button Border Color</strong></label><input class="form-control form-control-color" type="color" id="button_border" name="button_border" value="<?php echo $buttonBorder; ?>"></div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="mb-3"><label class="form-label" for="webname"><strong>Website Name</strong></label><input class="form-control" type="text" id="webname" name="webname" placeholder="My Brand" value="<?php echo $webname; ?>"></div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="mb-3"><label class="form-label" for="description"><strong>Description</strong></label><input class="form-control" type="text" id="description" name="description" placeholder="I'm an awesome website" value="<?php echo $description; ?>"></div>
                                        </div>
                                    </div>
                                    <div class="mb-3"><button class="btn btn-primary btn-sm" type="submit">Save Settings</button></div>
                                </form>
                            </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col"><iframe style="height: 300px; width: 95%; " src="../" title="Preview"></iframe></div>
                    </div>
                </div>
                <?php
                // Add footer
                include('includes/footer.php');
                ?>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../assets/js/script.min.js"></script>
</body>

</html>