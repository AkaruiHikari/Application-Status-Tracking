<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "db_connect.php";

$data = json_decode(file_get_contents("php://input"), true);

// Sanitize & assign values
$name = trim($data["name"]);
$college = trim($data["college"]);
$schoolYear = trim($data["schoolYear"]);
$program = trim($data["program"]);
$status = trim($data["status"]);
$notification = trim($data["notification"]);

// ✅ VALIDATION: Block blank entries
if ($name === "" || $college === "" || $schoolYear === "" || $program === "" || $status === "") {
    echo json_encode(["success" => false, "message" => "All fields except notification are required."]);
    exit;
}

// Proceed with DB insert
$sql = "INSERT INTO applicants (applicant_name, college, school_year, program, status, notification)
        VALUES ('$name', '$college', '$schoolYear', '$program', '$status', '$notification')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Applicant added successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
}

$conn->close();
?>
