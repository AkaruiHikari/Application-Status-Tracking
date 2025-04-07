<?php
$host = "localhost";
$username = "root"; // default for XAMPP
$password = "";     // leave empty if you're using default XAMPP
$database = "college_applications";

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
