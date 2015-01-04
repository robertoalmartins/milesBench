<?php
/**
 * Created by PhpStorm.
 * User: robertomartins
 * Date: 1/4/2015
 * Time: 6:09 PM
 */

require '/../bootstrap.php';

use Doctrine\ORM\Tools\EntityGenerator;
ini_set("display_errors", "On");

// config
$config = new \Doctrine\ORM\Configuration();
$config->setMetadataDriverImpl($config->newDefaultAnnotationDriver(__DIR__ . '/Entities'));
$config->setMetadataCacheImpl(new \Doctrine\Common\Cache\ArrayCache);
$config->setProxyDir(__DIR__ . '/Proxies');
$config->setProxyNamespace('Proxies');

$connectionManager = new connectionManager();

$em = \Doctrine\ORM\EntityManager::create($connectionManager->getParams(), $config);

// custom datatypes (not mapped for reverse engineering)
$em->getConnection()->getDatabasePlatform()->registerDoctrineTypeMapping('set', 'string');
$em->getConnection()->getDatabasePlatform()->registerDoctrineTypeMapping('enum', 'string');

// fetch metadata
$driver = new \Doctrine\ORM\Mapping\Driver\DatabaseDriver(
    $em->getConnection()->getSchemaManager()
);
$em->getConfiguration()->setMetadataDriverImpl($driver);
$cmf = new \Doctrine\ORM\Tools\DisconnectedClassMetadataFactory($em);
$cmf->setEntityManager($em);
$classes = $driver->getAllClassNames();
$metadata = $cmf->getAllMetadata();
$generator = new EntityGenerator();
$generator->setUpdateEntityIfExists(true);
$generator->setGenerateStubMethods(true);
$generator->setGenerateAnnotations(true);
$generator->generate($metadata, __DIR__ . '/../Model/entitiesBase');
print 'Done!';
?>