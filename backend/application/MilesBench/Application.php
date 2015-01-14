<?php

namespace MilesBench;
/**
 * Description of Application
 *
 * @author tulio
 */
class Application {

    /**
     *
     * @var Application
     */
    private static $instance;

    /**
     *
     * @var \Doctrine\DBAL\Connection
     */
    private $connectionManager;

    /**
     * Singleton Pattern
     * 
     * @param \Doctrine\DBAL\Connection $connectionManager
     */
    private function __construct() {
        $config = new \Doctrine\DBAL\Configuration();
        $conn = \Doctrine\DBAL\DriverManager::getConnection(\MilesBench\Config\connectionManager::$devParams, $config);
        $this->connectionManager = $conn;
    }

    /**
     * 
     * @return Application
     */
    public static function getInstance() {
        if(self::$instance === null) {
            self::$instance = new Application();
        }

        return self::$instance;
    }

    /**
     * 
     * @return \Doctrine\ORM\ConnectionManager
     */
    public function getConnectionManager() {
        return $this->connectionManager;
    }

    /**
     * 
     * @param \Doctrine\ORM\ConnectionManager $connectionManager
     */
    public function setConnectionManager(\Doctrine\DBAL\Connection $connectionManager) {
        $this->connectionManager = $connectionManager;
    }

}