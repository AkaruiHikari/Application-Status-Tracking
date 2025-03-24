<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "db_connect.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"];
$status = $data["status"];
$notification = isset($data["notification"]) ? $data["notification"] : '';

$sql = "UPDATE applicants SET status='$status', notification='$notification' WHERE id=$id";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Applicant status updated successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
}

$conn->close();
?>
