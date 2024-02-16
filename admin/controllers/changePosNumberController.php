<?php
if(isset($_POST['submit'])) {
    // Check if login is made
    include('../../includes/check-login.php');

    // Include the database configuration
    include('../../config.php');

    // Retrieve arrays of IDs and order numbers
    $ids = $_POST['ids'];
    $orderNums = $_POST['orderNums'];

    // Validate input (you may want to add more validation as needed)

    // Loop through the arrays
    foreach ($ids as $key => $id) {
        $orderNum = $orderNums[$key];

        // Use prepared statements to prevent SQL injection
        $stmt = $conn->prepare("SELECT * FROM links WHERE `order` = ?");
        $stmt->bind_param("i", $orderNum);
        $stmt->execute();
        $resultSearchLinksByOrder = $stmt->get_result();

        if (mysqli_num_rows($resultSearchLinksByOrder) < 1) {
            $stmt = $conn->prepare("UPDATE links SET `order` = ? WHERE id = ?");
            $stmt->bind_param("ii", $orderNum, $id);
            $stmt->execute();
            $_SESSION['successMessage'] = 'Orders successfully changed.';
        } else {
            $_SESSION['errorMessage'] = 'You already have a link in that position.';
            // If you want to stop processing further orders when an error occurs, you can use break; here.
        }
    }

    header("Location: /admin/links.php");
} else {
    header('Location: /admin');
}
?>
