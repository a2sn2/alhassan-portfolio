<?php
// الاتصال بقاعدة البيانات
$con = mysqli_connect('localhost', 'root', '', 'eva');

// تحقق من نجاح الاتصال
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}

// تحقق من وجود 'name_lecturer' في POST
if (isset($_POST['name_lecturer'])) {
    $name = mysqli_real_escape_string($con, $_POST['name_lecturer']); // حماية من SQL Injection

    // إعداد الاستعلام لحذف المحاضر بناءً على الاسم
    $query = "DELETE FROM lecturer WHERE name_lecturer = '$name'";

    // تنفيذ الاستعلام
    if (mysqli_query($con, $query)) {
        echo json_encode(['status' => 'success', 'message' => 'Lecturer deleted successfully.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error deleting lecturer: ' . mysqli_error($con)]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'No lecturer name provided.']);
}

// إغلاق الاتصال بقاعدة البيانات
mysqli_close($con);
?>
