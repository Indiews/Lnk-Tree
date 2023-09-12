<?php
if(isset($_POST['submit'])) {
    // Check if login is made
    include('../includes/check-login.php');

    // Include the database configuration
    include('../../config.php');

    $id = $_POST['id'];
    echo $id;
    $orderNum = $_POST['orderNum' . $id];
    $sql = "UPDATE links SET `order` = $orderNum WHERE id = $id";
    mysqli_query($conn, $sql) or die ($sql);

    header("Location: /admin/links.php");
} else {
    header('Location: /admin');
}

?>