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
     * @var \MilesBench\Db\EntityManager
     */
    private $entityManager;

    /**
     * Singleton Pattern
     * 
     * @param \MilesBench\Db\EntityManager $entityManager
     */
    private function __construct() {}

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
     * @return \MilesBench\Db\EntityManager
     */
    public function getEntityManager() {
        return $this->entityManager;
    }

    /**
     * 
     * @param \MilesBench\Db\EntityManager $entityManager
     */
    //public function setEntityManager(\MilesBench\Db\EntityManager $entityManager) {
      //  $this->entityManager = $entityManager;
    //}

}