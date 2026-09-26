<?php
$con = mysqli_connect('localhost', 'root', '', 'eva') or die('Can\'t connect to mysql server');

$query = 'SELECT COUNT(*) AS Id_lecturer FROM result';
$result = mysqli_query($con, $query) or die('There is an error in the query');

if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result); 
    $totalLecturers = $row['Id_lecturer'];
    echo json_encode(['Id_lecturer' => $totalLecturers]);
} else {
    echo json_encode(['Id_lecturer' => 0]);
}

mysqli_free_result($result); 
mysqli_close($con);
?>
