<?php
$mysqli = new mysqli('localhost', 'root', 'rifa', 'pemweb');

if ($mysqli->connect_error) {
  die("Connection failed: " . $mysqli->connect_error);
}

$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];

$query = "DELETE FROM case4.poi WHERE K_LATITUDE = '$latitude' AND K_LONGITUDE = '$longitude'";

if ($mysqli->query($query)) {
  echo 'Marker deleted';
} else {
  echo $mysqli->error;
}

$mysqli->close();
