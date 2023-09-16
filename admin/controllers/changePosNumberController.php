<?php
if(isset($_POST['submit'])) {
    // Check if login is made
    include('../includes/check-login.php');

    // Include the database configuration
    include('../../config.php');

    $id = $_POST['id'];
    $orderNum = $_POST['orderNum'];
    $sql = "SELECT * FROM links WHERE `order` = $orderNum";
    $resultSearchLinksByOrder = $conn->query($sql);

    if (mysqli_num_rows($resultSearchLinksByOrder) < 1) {
        $sql = "UPDATE links SET `order` = $orderNum WHERE id = $id";
        mysqli_query($conn, $sql) or die ($sql);
        $_SESSION['successMessage'] = 'Order successfully changed.';
    } else {
        $_SESSION['errorMessage'] = 'You already have a link in that position.';
    }

    header("Location: /admin/links.php");
} else {
    header('Location: /admin');
}

?>