<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db_connect.php';

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Check for valid input
if (!$data || !isset($data['first_name']) || !isset($data['last_name']) || !isset($data['status'])) {
    echo json_encode(['success' => false, 'error' => 'Missing or invalid input data.']);
    exit;
}

$first_name = $conn->real_escape_string($data['first_name']);
$last_name = $conn->real_escape_string($data['last_name']);
$status = $conn->real_escape_string($data['status']);

$response = [];

// Insert into applicants table
$sql1 = "INSERT INTO applicants (first_name, last_name) VALUES ('$first_name', '$last_name')";

if ($conn->query($sql1)) {
    $applicant_ID = $conn->insert_id;

    // Insert into applications table without notification
    $sql2 = "INSERT INTO applications (applicant_ID, application_status) 
             VALUES ('$applicant_ID', '$status')";

    if ($conn->query($sql2)) {
        $response['success'] = true;
    } else {
        $response['success'] = false;
        $response['error'] = "Application insert failed: " . $conn->error;
    }
} else {
    $response['success'] = false;
    $response['error'] = "Applicant insert failed: " . $conn->error;
}

echo json_encode($response);
$conn->close();
?>
