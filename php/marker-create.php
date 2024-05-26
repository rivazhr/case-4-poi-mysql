<?php
$mysqli = new mysqli('localhost', 'root', 'rifa', 'pemweb');

if ($mysqli->connect_error) {
  die("Connection failed: " . $mysqli->connect_error);
}

$location = $_POST['location'];
$description = $_POST['description'];
$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];

$query = "INSERT INTO case4.poi (k_latitude, k_longitude, `location`, `description`) VALUES ('$latitude', '$longitude', '$location', '$description')";

if ($mysqli->query($query)) {
  echo 'Marker saved successfully';
} else {
  echo $mysqli->error;
}

$mysqli->close();
