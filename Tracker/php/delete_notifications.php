<?php
// delete_notifications.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$ids = $data['ids'];

if (!$ids || !is_array($ids)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$conn = new mysqli("localhost", "root", "", "college_applications");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

$placeholders = implode(',', array_fill(0, count($ids), '?'));
$types = str_repeat('i', count($ids));
$stmt = $conn->prepare("DELETE FROM notifications WHERE notification_ID IN ($placeholders)");

if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Prepare failed']);
    exit;
}

$stmt->bind_param($types, ...$ids);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to delete notifications']);
}

$stmt->close();
$conn->close();
?>
