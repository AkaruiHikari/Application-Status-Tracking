<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db_connect.php';

$data = json_decode(file_get_contents("php://input"), true);

$applicant_ID = (int)$data['id']; // Comes from frontend as `id`
$status = $conn->real_escape_string($data['status']);
$notification = $conn->real_escape_string($data['notification']);

$sql = "UPDATE applications 
        SET application_status = '$status', notification = '$notification'
        WHERE applicant_ID = $applicant_ID";

$response = [];

if ($conn->query($sql)) {
  $response['success'] = true;
} else {
  $response['success'] = false;
  $response['error'] = $conn->error;
}

header('Content-Type: application/json');
echo json_encode($response);
$conn->close();
?>
?>
