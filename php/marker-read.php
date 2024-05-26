<?php

$mysqli = new mysqli('localhost', 'root', 'rifa', 'pemweb');

if ($mysqli->connect_error) {
  die("Connection failed: " . $mysqli->connect_error);
}

$sql = "SELECT * FROM CASE4.POI";
$query = $mysqli->query($sql);

if ($query) {
  while ($row = $query->fetch_assoc()) {
    echo $row['K_LATITUDE'] . ',' . $row['K_LONGITUDE'] . ',' . $row['LOCATION'] . ',' . $row['DESCRIPTION'] . "\n";
  }
}

$mysqli->close();
