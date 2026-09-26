<?php
$con = mysqli_connect('localhost', 'root', '', 'eva');
$name = mysqli_real_escape_string($con, $_POST['name_lecturer']);
$query = "INSERT INTO lecturer (name_lecturer) VALUES ('$name')";
mysqli_query($con, $query);
?>
