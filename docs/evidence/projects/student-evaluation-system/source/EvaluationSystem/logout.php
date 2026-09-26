<?php
session_start();
$conn = mysqli_connect('localhost', 'root', '', 'eva');

if (!$conn) {
    die('Connection error: ' . mysqli_connect_error());
}

$_SESSION = [];
session_unset();
session_destroy();

echo json_encode(['success' => true]);
?>
