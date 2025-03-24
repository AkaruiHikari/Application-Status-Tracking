<?php
header("Access-Control-Allow-Origin: *"); // Allow React frontend
header("Content-Type: application/json");

include "db_connect.php";

$sql = "SELECT * FROM applicants";
$result = $conn->query($sql);

$applicants = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $applicants[] = $row;
    }
    echo json_encode($applicants);
} else {
    echo json_encode([]);
}

$conn->close();


?>


