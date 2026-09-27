<?php
 


 include('connection.php');

$id = $_POST['id'];
$del = false; 

$res=mysqli_query($con,"DELETE FROM products WHERE  id = $id ");
 
if($res){

$del=true;

header('location:tableview.php?del='.$del);

}else{


}




?>
