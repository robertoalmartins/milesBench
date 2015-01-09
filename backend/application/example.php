<?php
/**
 * Created by PhpStorm.
 * User: robertomartins
 * Date: 1/3/2015
 * Time: 12:18 AM
 */

require 'bootstrap.php';

$config = new \Doctrine\DBAL\Configuration();
$connectionManager = new connectionManager();

$conn = \Doctrine\DBAL\DriverManager::getConnection($connectionManager->getParams(), $config);

$sql = "SELECT * FROM businesspartner";
$stmt = $conn->query($sql); // Simple, but has several drawbacks
while ($row = $stmt->fetch()) {
    echo $row['name'];
}