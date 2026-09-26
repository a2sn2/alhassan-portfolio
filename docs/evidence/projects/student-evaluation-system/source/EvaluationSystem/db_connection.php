<?php
$host = 'localhost';  // Or the IP of your MySQL server
$db = 'eva';
$user = 'root';  // Default MySQL user
$pass = '';  // Default password for root

$conn = mysqli_connect($host, $user, $pass, $db);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
