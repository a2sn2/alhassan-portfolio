<?php
header('Content-Type: application/json');
$con = mysqli_connect('localhost', 'root', '', 'eva') أو die('Connection failed');

// جلب جميع الدورات
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $query = 'SELECT * FROM course';
    $result = mysqli_query($con, $query);
    $courses = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $courses[] = $row;
    }
    echo json_encode($courses);
}

// إضافة دورة جديدة
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name_course = $_POST['name_course'];
    $Id_type_course = $_POST['Id_type_course'];
    $query = "INSERT INTO course (name_course, Id_type_course) VALUES ('$name_course', '$Id_type_course')";
    if (mysqli_query($con, $query)) {
        echo json_encode(['message' => 'Course added successfully']);
    } else {
        echo json_encode(['message' => 'Error adding course']);
    }
}

// تعديل دورة موجودة
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    parse_str(file_get_contents("php://input"), $_PUT);
    $id = $_PUT['Id_course'];
    $name_course = $_PUT['name_course'];
    $Id_type_course = $_PUT['Id_type_course'];
    $query = "UPDATE course SET name_course='$name_course', Id_type_course='$Id_type_course' WHERE Id_course=$id";
    if (mysqli_query($con, $query)) {
        echo json_encode(['message' => 'Course updated successfully']);
    } else {
        echo json_encode(['message' => 'Error updating course']);
    }
}

// حذف دورة
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    parse_str(file_get_contents("php://input"), $_DELETE);
    $id = $_DELETE['Id_course'];
    $query = "DELETE FROM course WHERE Id_course=$id";
    if (mysqli_query($con, $query)) {
        echo json_encode(['message' => 'Course deleted successfully']);
    } else {
        echo json_encode(['message' => 'Error deleting course']);
    }
}
?>
