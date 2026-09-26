<?php
// الاتصال بقاعدة البيانات
$con = mysqli_connect('localhost', 'root', '', 'eva');

// تحقق من نجاح الاتصال
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}

// تحقق من وجود 'old_name_lecturer' و 'new_name_lecturer' في POST
if (isset($_POST['old_name_lecturer']) && isset($_POST['new_name_lecturer'])) {
    $oldName = mysqli_real_escape_string($con, $_POST['old_name_lecturer']);
    $newName = mysqli_real_escape_string($con, $_POST['new_name_lecturer']);

    // إعداد الاستعلام لتحديث اسم المحاضر
    $query = "UPDATE lecturer SET name_lecturer = '$newName' WHERE name_lecturer = '$oldName'";

    // تنفيذ الاستعلام
    if (mysqli_query($con, $query)) {
        echo json_encode(['status' => 'success', 'message' => 'Lecturer updated successfully.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error updating lecturer: ' . mysqli_error($con)]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'No lecturer names provided.']);
}

// إغلاق الاتصال بقاعدة البيانات
mysqli_close($con);
?>
