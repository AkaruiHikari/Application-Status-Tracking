<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include 'db_connect.php'; // adjust path if needed

$email = $_GET['email'] ?? '';

if ($email) {
    $stmt = $conn->prepare("
        SELECT n.*
        FROM notifications n
        INNER JOIN applicants a ON n.applicant_ID = a.applicant_ID
        WHERE a.email_address = ?
    ");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    $notifications = [];
    while ($row = $result->fetch_assoc()) {
        $notifications[] = $row;
    }

    echo json_encode($notifications);
} else {
    echo json_encode([]); // No email provided
}
?>
