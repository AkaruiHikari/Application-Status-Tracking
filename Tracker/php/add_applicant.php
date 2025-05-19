<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db_connect.php';

$data = json_decode(file_get_contents("php://input"), true);

// Validate request method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
    exit;
}

// Extract and sanitize data
$first_name = $conn->real_escape_string($data['first_name']);
$middle_name = $conn->real_escape_string($data['middle_name']);
$last_name = $conn->real_escape_string($data['last_name']);
$extension_name = $conn->real_escape_string($data['extension_name']);
$birthday = $conn->real_escape_string($data['birthday']);
$country_of_birth = $conn->real_escape_string($data['country_of_birth']);
$age = (int)$data['age'];
$sex = $conn->real_escape_string($data['sex']);
$blood_type = $conn->real_escape_string($data['blood_type']);
$civil_status = $conn->real_escape_string($data['civil_status']);
$religious_affiliation = $conn->real_escape_string($data['religious_affiliation']);
$citizenship = $conn->real_escape_string($data['citizenship']);
$number_of_siblings = (int)$data['number_of_siblings'];
$email_address = $conn->real_escape_string($data['email_address']);
$contact_number = $conn->real_escape_string($data['contact_number']);
$first_course = $conn->real_escape_string($data['first_course']);
$second_course = $conn->real_escape_string($data['second_course']);
$startYear = date('Y'); // e.g., 2025
$endYear = $startYear + 4;
$school_year = "$startYear-$endYear";
$status = $conn->real_escape_string($data['status']);
$today = date("Y-m-d");

// Validate required fields
if (empty($first_name) || empty($last_name) || empty($status)) {
    echo json_encode(['success' => false, 'error' => 'Required fields missing']);
    exit;
}

$response = [];

// Insert into applicants table
$sql = "INSERT INTO applicants (
    first_name, middle_name, last_name, extension_name, birthday, 
    country_of_birth, age, sex, blood_type, civil_status, 
    religious_affiliation, citizenship, number_of_siblings, 
    email_address, contact_number
) VALUES (
    '$first_name', '$middle_name', '$last_name', '$extension_name', '$birthday',
    '$country_of_birth', '$age', '$sex', '$blood_type', '$civil_status',
    '$religious_affiliation', '$citizenship', '$number_of_siblings',
    '$email_address', '$contact_number'
)";

if ($conn->query($sql)) {
    $applicant_ID = $conn->insert_id;

    // Insert into applications table
    $sql2 = "INSERT INTO applications (applicant_ID, application_status, submission_date)
             VALUES ('$applicant_ID', '$status', '$today')";
             
    $notification_message = "Your application has been submitted successfully and is currently '$status'.";


    if ($conn->query($sql2)) {
        $application_ID = $conn->insert_id;

        // Insert into courses table
        $sql3 = "INSERT INTO courses (first_course, second_course, application_ID, school_year)
               VALUES ('$first_course', '$second_course', '$application_ID', '$school_year')";

        if ($conn->query($sql3)) {
            $response['success'] = true;
        } else {
            $response['success'] = false;
            $response['error'] = "Course insert failed: " . $conn->error;
        }
    } else {
        $response['success'] = false;
        $response['error'] = "Application insert failed: " . $conn->error;
    }
} else {
    $response['success'] = false;
    $response['error'] = "Applicant insert failed: " . $conn->error;
}

echo json_encode($response);
$conn->close();
