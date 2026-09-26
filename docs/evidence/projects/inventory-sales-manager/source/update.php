<?php
include('connection.php');  


$filename = $_FILES["uploadfile"]["name"];
$tempname = $_FILES["uploadfile"]["tmp_name"];
$folder = "./image/" . $filename;

$id = $_POST['id'];
$title = $_POST['title'];
$price = $_POST['price'];
$taxes = $_POST['taxes'];
$ads = $_POST['ads'];
$discount=$_POST['discount'];
$count = $_POST['count'];
$total = $_POST['total'];
$category = $_POST['category'];

$succ=false;






if($id=="" || $price=="" || $taxes=="" || $discount=="" || $ads=="" || $count==""||$filename==NULL|| $category=="" || $total=="")
{
	$wrong=true;
	header("location:tableview.php?title=$title".'&wrong='.$wrong);
	
}


else{


    if (move_uploaded_file($tempname, $folder)) {
       
$sql = "UPDATE products set id='" . $id . "', title='" . $title."' ,price='" . $price."' ,taxes='" . $taxes ."' ,ads='" . $ads ."',discount='" . $discount."',count='" . $count."',total='" . $total."',category='" . $category."',picture='" . $filename. "' WHERE id='" . $id .  "'";
    

    mysqli_query($con, $sql);

    $succ = true;

    header("location:tableview.php?title=$title&succ=$succ");
    }else {
        echo  '<script>alert("Failed to upload image!")</script>';
       

    }

}
 
 

?>
