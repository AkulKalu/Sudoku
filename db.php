<?php
$conn = new mysqli('localhost','root','', 'sudoku');
if($conn->error) {
    echo $conn->error;
}
?>