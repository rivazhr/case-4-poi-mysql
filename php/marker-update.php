<?php
$mysqli = new mysqli('localhost', 'root', 'rifa', 'pemweb');

if ($mysqli->connect_error) {
  die("Connection failed: " . $mysqli->connect_error);
}

$oldLat = $_POST['oldLat'];
$oldLng = $_POST['oldLng'];
$newLat = $_POST['newLat'];
$newLng = $_POST['newLng'];
$location = $_POST['location'];
$description = $_POST['description'];

$query = "UPDATE case4.poi SET K_LATITUDE = '$newLat', K_LONGITUDE = '$newLng', `LOCATION` = '$location', `DESCRIPTION` = '$description' WHERE K_LATITUDE = '$oldLat' AND K_LONGITUDE = '$oldLng'";

if ($mysqli->query($query)) {
  echo 'Change saved successfully';
} else {
  echo $mysqli->error;
}

$mysqli->close();
