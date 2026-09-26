<?php
$con = mysqli_connect('localhost', 'root', '', 'eva');
$query = 'SELECT * FROM lecturer';
$result = mysqli_query($con, $query);
$lecturers = [];

while($row = mysqli_fetch_assoc($result)) {
    $lecturers[] = $row;
}

echo json_encode($lecturers);
?>
