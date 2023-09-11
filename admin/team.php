<?php
        // Check if login is made
        include('includes/check-login.php');
        
        include('../config.php');
        

        $sql="SELECT * FROM users";
        $queryCat=mysqli_query($conn, $sql) or die ($sql);


        $sql="SELECT * FROM users";
        $queryUsers=mysqli_query($conn, $sql) or die ($sql);
        $total=mysqli_num_rows($queryUsers);
        if($total>0){
        $fetch=mysqli_fetch_assoc($queryUsers);
        }

        if(isset($_GET['remove'])){
            $id=$_GET['id'];
            $table="users";
            $sql="DELETE FROM $table WHERE id=$id LIMIT 1";
            mysqli_query($conn, $sql)  or die ($sql);
            $path="?removed";
            header("Location:$path");
    
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Team - Lnk Tree</title>
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
                    <h3 class="text-dark mb-4">Team</h3>
                    <div class="card shadow">
                        <div class="card-header py-3">
                            <p class="text-primary m-0 fw-bold">Team Info</p>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                            <table class="table my-0" id="dataTable">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Permission</th>
                                            <th>DELETE?</th>
                                        </tr>
                                    </thead>
                                    <tbody> 
                                    <?php $i=0; do { $i++;?>
                                        <tr>
                                            <td><?php echo $fetch['name'];?> <?php echo $fetch['surname'];?></td>
                                            <td><?php echo $fetch['email'];?></td>
                                            <td><?php echo $fetch['permission'];?></td>
                                            <td><a style='color:Red' href="?remove&id=<?php echo $fetch['id'];?>">Remove</a></td>
                                        </tr>
                                        <?php } while($fetch=mysqli_fetch_assoc($queryUsers));?>
                                    </tbody>
                                        
                                    <tfoot>
                                        <tr></tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <?php
            // Add footer
            include('includes/footer.php');
            ?>
        </div><a class="border rounded d-inline scroll-to-top" href="#page-top"><i class="fas fa-angle-up"></i></a>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../assets/js/script.min.js"></script>
</body>

</html>