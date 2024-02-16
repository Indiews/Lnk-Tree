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
$background = $websiteSettings['bkcolor'];
$buttonBackgroundColor = $websiteSettings['btbkcolor'];
$buttonBorderColor = $websiteSettings['btbocolor'];
$webname = $websiteSettings['webname'];
$description = $websiteSettings['description'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Check if input is provided, if not, keep the existing values
    $background = isset($_POST['background']) ? $_POST['background'] : $background;
    $buttonBackgroundColor = isset($_POST['button_back']) ? $_POST['button_back'] : $buttonBackgroundColor;
    $buttonBorderColor = isset($_POST['button_border']) ? $_POST['button_border'] : $buttonBorderColor;
    $webname = isset($_POST['webname']) ? $_POST['webname'] : $webname;
    $description = isset($_POST['description']) ? $_POST['description'] : $description;

    // Update settings in the database
    $updateSql = "UPDATE website SET bkcolor = '$background', btbkcolor = '$buttonBackgroundColor', btbocolor = '$buttonBorderColor', webname = '$webname', description = '$description' WHERE id = 1";
    if ($conn->query($updateSql) === TRUE) {
        // Data updated successfully, you can display a success message
        $successMessage = "Settings saved successfully.";
    } else {
        // Data update failed, display an error message
        echo "Error updating data: " . $conn->error;
    }

    // Handle logo upload separately, if provided
    if (!empty($_FILES['logo']['name'])) {
        // Handle logo upload logic here
        // ...

        // Example logic to move uploaded logo to /assets/img/
        $logoFileName = 'logo.' . pathinfo($_FILES['logo']['name'], PATHINFO_EXTENSION);
        $logoFilePath = '../assets/img/' . $logoFileName;
        if (move_uploaded_file($_FILES['logo']['tmp_name'], $logoFilePath)) {
            // Logo uploaded successfully, you can update the database with the new logo file name if needed
            $logoUpdateSql = "UPDATE website SET logo = '../assets/img/$logoFileName' WHERE id = 1";
            if ($conn->query($logoUpdateSql) !== TRUE) {
                echo "Error updating logo data: " . $conn->error;
            }
        } else {
            echo "Error uploading logo.";
        }
    }
}

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
                                <p class="text-primary m-0 fw-bold">Website Settings</p>
                            </div>
                            <div class="card-body">
                                <form method="POST" action="" enctype="multipart/form-data">
                                    <div class="row">
                                    <div class="mb-3"><label class="form-label" for="background"><strong>Background Color</strong></label><input class="form-control form-control-color" type="color" id="background" name="background" value="<?php echo $background; ?>"></div>
                                    <div class="mb-3"><label class="form-label" for="button-back"><strong>Button Background Color</strong></label><input class="form-control form-control-color" type="color" id="button-back" name="button_back" value="<?php echo $buttonBackgroundColor; ?>"></div>
                                    <div class="mb-3"><label class="form-label" for="button-border"><strong>Button Border Color</strong></label><input class="form-control form-control-color" type="color" id="button-border" name="button_border" value="<?php echo $buttonBorderColor; ?>"></div>
                                    <div class="mb-3"><label class="form-label" for="webname"><strong>Website Name</strong></label><input class="form-control" type="text" id="webname" placeholder="My Brand" name="webname" value="<?php echo $webname; ?>"></div>
                                    <div class="mb-3"><label class="form-label" for="description"><strong>Description</strong></label><input class="form-control" type="text" id="description" placeholder="I'm an awesome website" name="description" value="<?php echo $description; ?>"></div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="mb-3"><label class="form-label" for="logo"><strong>Upload Logo</strong></label><input class="form-control" type="file" id="logo" name="logo"></div>
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
