<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db_connect.php';
date_default_timezone_set('Asia/Manila');

$data = json_decode(file_get_contents("php://input"), true);
$response = [];

if (isset($data['id']) && isset($data['status'])) {
    $id = (int) $data['id'];
    $status = $conn->real_escape_string($data['status']);

    // 1. Update the application status
    $sql = "UPDATE applications SET application_status = '$status' WHERE applicant_ID = $id";

    if ($conn->query($sql)) {
        // 2. Prepare fixed values for notification
        $subject = "Application Status (AUTOMATED)";
        $timestamp = date('Y-m-d H:i:s');

        // Choose message based on status
        switch ($status) {
            case 'Approved':
                $message = "Congratulations! Your application has been approved. Wait for further announcements on what your interview schedule will be. Thank you!";
                break;
            case 'Rejected':
                $message = "We regret to inform you that your application has been rejected.";
                break;
            case 'Pending':
            default:
                $message = "Your application is currently under review. Please wait for further updates.";
                break;
        }

        // Insert into notifications table
        $notif_sql = "INSERT INTO notifications (applicant_ID, subject, status, message, timestamp)
                      VALUES ('$id', '$subject', '$status', '$message', '$timestamp')";
        $conn->query($notif_sql);

        $response['success'] = true;
    } else {
        $response['success'] = false;
        $response['error'] = $conn->error;
    }
} else {
    $response['success'] = false;
    $response['error'] = 'Missing id or status';
}

echo json_encode($response);
$conn->close();
