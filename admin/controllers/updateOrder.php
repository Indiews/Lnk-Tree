<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include('../../config.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['order'])) {
    $orderData = $_POST['order'];

    // OPTIONAL: Remove transaction if DB engine is MyISAM
    if (method_exists($conn, 'begin_transaction')) {
        $conn->begin_transaction();
    }

    try {
        // Update with new order values
        $stmt = $conn->prepare("UPDATE links SET `order` = ? WHERE id = ?");
        if (!$stmt) {
            throw new Exception("Prepare failed: " . $conn->error);
        }

        foreach ($orderData as $item) {
            $id = intval($item['id']);
            $position = intval($item['position']);

            $stmt->bind_param("ii", $position, $id);
            if (!$stmt->execute()) {
                throw new Exception("Execute failed for ID $id: " . $stmt->error);
            }
        }

        if (method_exists($conn, 'commit')) {
            $conn->commit();
        }

        echo json_encode(['status' => 'success']);

    } catch (Exception $e) {
        if (method_exists($conn, 'rollback')) {
            $conn->rollback();
        }
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }

} else {
    http_response_code(400);
    echo json_encode(['status' => 'invalid request']);
}
