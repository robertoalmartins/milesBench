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
     * @var \Doctrine\ORM\EntityManager
     */
    private $entityManager;

    /**
     * Singleton Pattern
     * 
     * @param \Doctrine\ORM\EntityManager $entityManager
     */
    private function __construct() {
        
        $config = new \Doctrine\ORM\Configuration();
        $config->setMetadataDriverImpl($config->newDefaultAnnotationDriver(__DIR__ . '/MilesBench/Model', false));
        //$config->setMetadataCacheImpl(new \Doctrine\Common\Cache\ArrayCache);
        $config->setProxyDir(__DIR__ . '/MilesBench/Model');
        $config->setProxyNamespace('Model');
        $this->entityManager = \Doctrine\ORM\EntityManager::create(\MilesBench\Config\connectionManager::$devParams, $config);
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
     * @return \Doctrine\ORM\EntityManager
     */
    public function getEntityManager() {
        return $this->entityManager;
    }

    /**
     * 
     * @param \Doctrine\ORM\EntityManager $entityManager
     */
    public function setEntityManager(\Doctrine\ORM\EntityManager $entityManager) {
        $this->entityManager = $entityManager;
    }

}