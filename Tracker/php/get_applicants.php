<?php
header("Access-Control-Allow-Origin: *"); // Allow React frontend
header("Content-Type: application/json");

include 'db_connect.php';

$sql = "SELECT 
            a.applicant_ID AS id,
            a.first_name,
            a.last_name,
            ap.application_status AS status
        FROM applicants a
        LEFT JOIN applications ap ON a.applicant_ID = ap.applicant_ID";

$result = $conn->query($sql);

$applicants = [];

while ($row = $result->fetch_assoc()) {
    $applicants[] = $row;
}

header('Content-Type: application/json');
echo json_encode($applicants);
$conn->close();
?>


