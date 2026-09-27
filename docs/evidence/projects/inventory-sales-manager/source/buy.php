<?php
include('connection.php'); 
// SQL query to select data from database
$sql = " SELECT * FROM products ORDER BY id ASC ";
$result = mysqli_query($con, $sql);
//$mysqli->close();
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
    <title>Cruds - Product Management System</title>
    <meta name="description" content="Product Management System built with Html5 , Css3 and JavaScript">
 <style>

*{
    margin: 0;
    padding: 0;
    color: black;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
input[type="text"]{
    color: white;
    background-color: rgb(36, 2, 2);
    outline: none;
    margin-bottom: 4px;
    width: 100%;
    border: none;
    height: 40px;
    padding: 4px 0px 4px 4px;
    border-radius: 5px;
    box-sizing: border-box;
}
input[type="text"]:hover{
    letter-spacing: 2px;
    font-weight: bold;
    font-size: large;
    
}
body{
    background-color: rgb(65, 27, 27);
}




table {
    border: 1px solid black;
   font-size: large;

}




th{
   
   font-weight: bold;
   border: 1px solid black;
  
   text-align: center;
background:gray;
}

td {
   cursor: pointer;
   font-weight: bold;
   border: 1px solid black;
   
   text-align: center;
   

   
}
table tr:not(:first-child):hover{
   
background-color: gray;

}

table tr:not(:first-child):{
   background-color: ;

}

th,td {
  
}

td {
   font-weight: lighter;
}


.selected{
	background-color:lightgray; 
	font-weight: bold; 
	color: #fff;
}
.small{
    width:70px;
}


label{
  display:none;
}

.input{
  display:none;
}




.btns { 
	
    text-align: center;
    height: 35px;
    width: 100px;
    border-radius: 5px;
    border: none;
    margin:10px 10px 10px 10px;
    border: 2px solid white;
    font-size: 25px;
    cursor: pointer;
    outline: none;
   
  
  }
  .btns:hover{

    color: #fff;
    
background: rgb(36, 2, 2);



  }
  
.container{
  
  display:flex;

}
 
img{
  border: solid 2px black;
    margin:5px ;
    width: 150px;
    height: 150px;
}

.info{
    display:flex;

}
.info input{
    width:200px;
}
.text{

    margin-top:0px;
}
 </style>
</head>
  <body>
 
  <?php include('head.php'); ?>
 
 




    <div class="output">

  

        <input type="text"  onkeyup="myFunction()" id="search" placeholder="Search by title">
        <div class="info">
       <img id="pic" src=""><br>
       <div class="text">
        <p>Title
       <input type="text" id="info1" readonly></p><br>
       <p>price
       <input type="text" id="info2" readonly></p><br>
       <p>category
       <input type="text" id="info3" readonly></p>
       </div>
       </div>

        </div>




       
        


<div class="container">
        <div class="method">
<form class="" action="view.php" method="get">

      <input class="input" name="type" id="type"   type="text" value="<?php echo $type="buy"; ?>">
        <label>ID:
        <input class="input" name="id" id="id"   type="text" ></label>
        <input type="submit" name="showdata" id="sub" class="btns" value="buy" disabled/>
  
</form>
</div>
</div>

        

        

        


        

       
<table id="table"  style="width:100%">
                <thead>
                    <th style="display:none;" class="small">ID</th>
                    <th style="width:20%">Title</th>
                    <th style="display:none;" class="small">Price</th>
                    <th style="display:none;" class="small">Taxes</th>
                    <th style="display:none;" class="small">Ads</th>
                    <th style="display:none;" class="small">Discount</th>
                    <th class="small">Available amount</th>
                    <th class="small">Total Price</th>
                    <th style="display:none;"style="width:30%">Category</th>
                    <th style="display:none;" class="small">pic</th>
                </thead>
                <tbody id="tbody">
                </tbody>

                <?php
				// LOOP TILL END OF DATA
				while($rows=$result->fetch_assoc())
				{
			?>
			<tr onclick="">
				<!-- FETCHING DATA FROM EACH
					ROW OF EVERY COLUMN -->
				<td style="display:none;"><?php echo $rows['id'];?></td>
				<td><?php echo $rows['title'];?></td>
				<td style="display:none;"><?php echo $rows['price'];?></td>
				<td style="display:none;"><?php echo $rows['taxes'];?></td>
        <td style="display:none;"><?php echo $rows['ads'];?></td>
        <td style="display:none;"><?php echo $rows['discount'];?></td>
        <td><?php echo $rows['count'];?></td>
				<td><?php echo $rows['total'];?></td>
				<td style="display:none;"><?php echo $rows['category'];?></td>
                <td style="display:none;"><?php echo $rows['picture'];?></td>
			
			</tr>

			<?php
				}
			?>

            </table>
       
    

   
  </body>
</html>

<script>
function selectedRow(){
                
                var index,
                    table = document.getElementById("table");
            
                for(var i = 1; i < table.rows.length; i++)
                {
                    table.rows[i].onclick = function()
                    {
                         // remove the background from the previous selected row
                        if(typeof index !== "undefined"){
                          
							//rIndex = this.rowIndex; 

              
			 document.getElementById("id").value = this.cells[0].innerHTML;
			


         
      //enable buttoms
      document.getElementById("sub").disabled=false;

      document.getElementById("pic").src="./image/"+this.cells[9].innerHTML;
      document.getElementById("info1").value = this.cells[1].innerHTML;
      document.getElementById("info2").value = this.cells[7].innerHTML+"$";
      document.getElementById("info3").value = this.cells[8].innerHTML;

   
							//set color for selected row
                  table.rows[index].classList.toggle("selected");
                        }
                        console.log(typeof index);
                        // get the selected row index
                        index = this.rowIndex;
                        // add class selected to the row
                        this.classList.toggle("selected");
                        console.log(typeof index);
                     };
                }
                
            }
            selectedRow();
</script>

<script>


	function myFunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue ;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    //td = tr[i].getElementsByTagName("td")[0];
	td = tr[i].getElementsByTagName("td")[1];
	
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      }else {
        tr[i].style.display = "none";
      }
    }
  }
}
</script>

<script>


if(<?php echo $_GET['buy'] ?> == true){
 
    <?php $title= $_GET['title'] ?>
    <?php $amount= $_GET['amount'] ?>


alert("you have successfully buy <?php echo $amount ?> of <?php echo $title ?>");

location.href=" buy.php";

}

</script>