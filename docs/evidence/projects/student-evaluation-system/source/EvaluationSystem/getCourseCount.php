<?php
$con = mysqli_connect('localhost', 'root', '', 'eva') or die('Can\'t connect to mysql server');

$query = 'SELECT COUNT(*) AS Id_course FROM result';
$result = mysqli_query($con, $query) or die('There is an error in the query');

if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result); 
    $totalCourses = $row['Id_course'];
    echo json_encode(['Id_course' => $totalCourses]);
} else {
    echo json_encode(['Id_course' => 0]);
}

mysqli_free_result($result); 
mysqli_close($con);
?>
