<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db_connect.php';

// Read incoming JSON
$data = json_decode(file_get_contents("php://input"), true);

// Check if both 'id' and 'status' are provided
if (isset($data['id']) && isset($data['status'])) {
    $id = (int) $data['id'];
    $status = $conn->real_escape_string($data['status']);

    // Update the 'application_status' in the 'applications' table
    $sql = "UPDATE applications SET application_status = '$status' WHERE applicant_ID = $id";

    if ($conn->query($sql)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $conn->error]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Missing id or status']);
}

$conn->close();
?>
