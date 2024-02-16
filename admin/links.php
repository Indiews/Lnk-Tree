
<?php
        // Check if login is made
        include('includes/check-login.php');

        // Include the database configuration
        include('../config.php');

        $searchLinksSql = "SELECT * FROM links ORDER BY `order` ASC";
        $resultSearchLinks = $conn->query($searchLinksSql);

        if(isset($_GET['remove'])) {
            $id = $_GET['id'];
            $sql = "DELETE FROM links WHERE id=$id LIMIT 1";
            mysqli_query($conn, $sql) or die ($sql);
            $path = "?removed";
            header("Location:$path");
        }
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Links - Lnk Tree</title>
    <link rel="stylesheet" href="../admin/assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&amp;display=swap">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css">
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
                    <h3 class="text-dark mb-4">Links</h3>
                    <div class="card shadow">
                        <div class="card-header py-3">
                            <p class="text-primary m-0 fw-bold">Links Management</p>
                        </div>
                        <div class="card-body">
                            <?php
                            // Display a success message if settings are saved successfully
                            if (isset($_SESSION['successMessage'])) {
                                echo '<div class="alert alert-success">' . $_SESSION['successMessage'] . '</div>';
                                unset($_SESSION['successMessage']);
                            }

                            // Display an email error message if one exists
                            if (isset($_SESSION['errorMessage'])) {
                                echo '<div class="alert alert-danger">' . $_SESSION['errorMessage'] . '</div>';
                                unset($_SESSION['errorMessage']);
                            }
                            ?>
                            <?php
                                if (mysqli_num_rows($resultSearchLinks) > 0) {
                            ?>
                            <div class="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                                <table class="table my-0" id="dataTable">
                                    <thead>
                                        <tr>
                                            <th>Display Name</th>
                                            <th>URL</th>
                                            <th>Position</th>
                                            <th>DELETE?</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <form method="POST" action="/admin/controllers/changePosNumberController.php">
                                        <?php
                                        while ($rowSearchLinks = mysqli_fetch_assoc($resultSearchLinks)) {
                                        ?>
                                        <tr>
                                            <td><?php echo $rowSearchLinks['name']; ?></td>
                                            <td><?php echo $rowSearchLinks['link']; ?></td>
                                            <td>
                                                <input type="hidden" name="ids[]" value="<?php echo $rowSearchLinks['id']; ?>" />
                                                <input type="number" name="orderNums[]" value="<?php echo $rowSearchLinks['order']; ?>" required />
                                            </td>
                                            <td><a style='color:Red' href="?remove&id=<?php echo $rowSearchLinks['id'];?>">Remove</a></td>
                                        </tr>
                                        <?php
                                        }
                                        ?>
                                        <tr>
                                            <td colspan="4">
                                                <button class="btn btn-primary btn-sm" type="submit" name="submit">Change</button>
                                            </td>
                                        </tr>
                                    </form>
                                </tbody>
                                    <tfoot>
                                        <tr></tr>
                                    </tfoot>
                                </table>
                            </div>
                            <?php
                                } else {
                                    echo 'No results were found.';
                                }
                            ?>
                        </div>
                    </div>
                </div>
                <div class="container-fluid">
                    <h3 class="text-dark mb-4"></h3>
                    <div class="col">
                        <div class="card shadow mb-3">
                            <div class="card-header py-3">
                                <p class="text-primary m-0 fw-bold">Add Link</p>
                            </div>
                            <div class="card-body">
                                                      
                                <?php
                                // Check if the form is submitted
                                if ($_SERVER["REQUEST_METHOD"] == "POST") {
                                    $name = $_POST['name'];
                                    $link = $_POST['link'];

                                    // Get the maximum 'order' value from the database
                                    $maxOrderQuery = "SELECT MAX(`order`) FROM links";
                                    $result = $conn->query($maxOrderQuery);
                                    $row = $result->fetch_assoc();
                                    $maxOrder = $row['MAX(`order`)'];
                                    $newOrder = $maxOrder + 1;

                                    // Insert data into the database with the new 'order' value
                                    $sql = "INSERT INTO links (name, link, `order`) VALUES (?, ?, ?)";
                                    $stmt = $conn->prepare($sql);
                                    $stmt->bind_param("ssi", $name, $link, $newOrder);

                                    if ($stmt->execute()) {
                                        $successMessage = "Link added successfully!";
                                        echo '<meta http-equiv="refresh" content="2;url=links.php">';
                                    } else {
                                        $errorMessage = "Error: " . $stmt->error;

                                        //echo "Error: " . $stmt->error;
                                    }

                                    $stmt->close();
                                }

                                $conn->close();
                                ?>

                                
                                <form method="POST">
                                <?php
                                if (!empty($successMessage)) {
                                echo '<div class="alert alert-success">' . $successMessage . '</div>';
                                 }
                                
                                 if (!empty($errorMessage)) {
                                    echo '<div class="alert alert-danger">' . $errorMessag . '</div>';
                                }
                                 
                                ?>
                                    <div class="row">
                                        <div class="col">
                                            <div class="mb-3"><label class="form-label" for="name"><strong>Display Name</strong></label><input class="form-control" type="text" id="name" placeholder="Website" name="name" required></div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="mb-3"><label class="form-label" for="link"><strong>Link</strong></label><input class="form-control" type="text" id="link" placeholder="https://lnk-tree.com" name="link" required></div>
                                        </div>
                                    </div>
                                    <div class="mb-3"><button class="btn btn-primary btn-sm" type="submit">Save Link</button></div>
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