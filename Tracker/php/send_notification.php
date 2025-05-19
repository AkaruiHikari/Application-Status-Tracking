<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
date_default_timezone_set('Asia/Manila');

include 'db_connect.php';

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email_address'] ?? null;
$subject = $data['subject'] ?? null;
$status = $data['status'] ?? 'Pending';
$message = $data['message'] ?? null;
$response = [];

if (!$email || !$message || !$subject || !$status) {
    echo json_encode(["success" => false, "error" => "Missing fields"]);
    exit;
}

// Find applicant_ID
$sql = "SELECT applicant_ID FROM applicants WHERE email_address = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $applicant_ID = $row['applicant_ID'];

    // Insert into notifications
    $timestamp = date('Y-m-d H:i:s');
    $insert_sql = "INSERT INTO notifications (applicant_ID, subject, status, message, timestamp)
                   VALUES (?, ?, ?, ?, ?)";
    $insert_stmt = $conn->prepare($insert_sql);
    $insert_stmt->bind_param("issss", $applicant_ID, $subject, $status, $message, $timestamp);

    if ($insert_stmt->execute()) {
        $response['success'] = true;
    } else {
        $response['success'] = false;
        $response['error'] = "Insert failed: " . $insert_stmt->error;
    }
} else {
    $response['success'] = false;
    $response['error'] = "Applicant not found for email: $email";
}

echo json_encode($response);
$conn->close();
?>
