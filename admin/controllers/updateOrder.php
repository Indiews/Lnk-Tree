<?php
include('../../config.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['order'])) {
    $orderData = $_POST['order'];

    $conn->begin_transaction();
    try {
        // Clear all orders first
        $conn->query("UPDATE links SET `order` = NULL");

        // Update with new order
        $stmt = $conn->prepare("UPDATE links SET `order` = ? WHERE id = ?");
        foreach ($orderData as $item) {
            $id = intval($item['id']);
            $position = intval($item['position']);
            $stmt->bind_param("ii", $position, $id);
            $stmt->execute();
        }

        $conn->commit();
        echo json_encode(['status' => 'success']);
    } catch (Exception $e) {
        $conn->rollback();
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(['status' => 'invalid request']);
}
