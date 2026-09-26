<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    $conn = mysqli_connect("localhost", "root", "", "eva");

    if(isset($_GET['userId'])) {
        $id = $_GET['userId'];
        $query = "SELECT * FROM users WHERE Id_users = $id";
        $result = mysqli_query($conn, $query);

        if(mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            echo json_encode($row);
        } else {
            echo json_encode(["message" => "User not found"]);
        }
    } else {
        echo json_encode(["message" => "User ID not provided"]);
    }

    mysqli_close($conn);
?>
