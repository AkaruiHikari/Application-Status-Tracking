<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db_connect.php';

// Get the POSTed JSON input
$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email_address'] ?? null;
$message = $data['message'] ?? null;
$response = [];

// Basic validation
if (!$email || !$message) {
    echo json_encode(["success" => false, "error" => "Missing email or message"]);
    exit;
}

// 1. Find the applicant_ID from the email
$sql = "SELECT applicant_ID FROM applicants WHERE email_address = '$email'";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $applicant_ID = $row['applicant_ID'];

    // 2. Insert into notifications table
    $timestamp = date('Y-m-d H:i:s'); // current timestamp
    $insert_sql = "INSERT INTO notifications (applicant_ID, message, timestamp) 
                   VALUES ('$applicant_ID', '$message', '$timestamp')";

    if ($conn->query($insert_sql)) {
        $response['success'] = true;
    } else {
        $response['success'] = false;
        $response['error'] = "Insert failed: " . $conn->error;
    }
} else {
    $response['success'] = false;
    $response['error'] = "Applicant not found for email: $email";
}

echo json_encode($response);
$conn->close();
?>
