<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'db_connect.php';

$sql = "SELECT 
            a.applicant_ID AS id,
            a.first_name,
            a.last_name,
            a.email_address,
            ap.application_status AS status,
            c.first_course,
            c.second_course
        FROM applicants a
        LEFT JOIN applications ap ON ap.applicant_ID = a.applicant_ID
        LEFT JOIN courses c ON c.application_ID = ap.application_ID
        ORDER BY a.applicant_ID DESC";


$result = $conn->query($sql);

$applicants = [];

while ($row = $result->fetch_assoc()) {
    $applicants[] = $row;
}

echo json_encode($applicants);
$conn->close();
?>
