<?php
function __autoload($class)
{
    $vendorDir = '/../vendor';
    $namespace = array(
        'Doctrine\\ORM' => '/../lib/',
        'Doctrine\\ORM\\Repository' => '/../lib/',
        'Doctrine\\ORM\\Event' => '/../lib/',
        'Doctrine\\ORM\\Proxy' => '/../lib/',
        'Doctrine\\ORM\\Id' => '/../lib/',
        'Doctrine\\ORM\\Query' => '/../lib/',
        'Doctrine\\ORM\\Persisters' => '/../lib/',
        'Doctrine\\ORM\\Mapping' => '/../lib/',
        'Doctrine\\ORM\\Mapping\\Driver' => '/../lib/',
        'Doctrine\\ORM\\Internal\\Hydration' => '/../lib/',
        'Doctrine\\ORM\\Internal' => '/../lib/',
        'Doctrine\\DBAL' => $vendorDir . '/doctrine/dbal/lib/',
        'Doctrine\\DBAL\\Driver' => $vendorDir . '/doctrine/dbal/lib/',
        'Doctrine\\DBAL\\Driver\\PDOMySql' => $vendorDir . '/doctrine/dbal/lib/',
        'Doctrine\\DBAL\\Query\\Expression' => $vendorDir . '/doctrine/dbal/lib/',
        'Doctrine\\DBAL\\Platforms' => $vendorDir . '/doctrine/dbal/lib/',
        'Doctrine\\DBAL\\Exception' => $vendorDir . '/doctrine/dbal/lib/',
        'Doctrine\\DBAL\\Types' => $vendorDir . '/doctrine/dbal/lib/',
        'Doctrine\\Common\\Lexer' => $vendorDir . '/doctrine/lexer/lib/',
        'Doctrine\\Common\\Inflector' => $vendorDir . '/doctrine/inflector/lib/',
        'Doctrine\\Common\\Collections' => $vendorDir . '/doctrine/collections/lib/',
        'Doctrine\\Common\\Collections\\Expr' => $vendorDir . '/doctrine/collections/lib/',
        'Doctrine\\Common\\Cache' => $vendorDir . '/doctrine/cache/lib/',
        'Doctrine\\Common\\Annotations' => $vendorDir . '/doctrine/annotations/lib/',
        'Doctrine\\Common\\Annotations\\Annotation' => $vendorDir . '/doctrine/annotations/lib/',
        'Doctrine\\Common\\Persistence' => $vendorDir . '/doctrine/common/lib/',
        'Doctrine\\Common\\Persistence\\Mapping' => $vendorDir . '/doctrine/common/lib/',
        'Doctrine\\Common\\Persistence\\Mapping\\Driver' => $vendorDir . '/doctrine/common/lib/',
        'Doctrine\\Common\\Proxy' => $vendorDir . '/doctrine/common/lib/',
        'Doctrine\\Common\\Proxy\\Exception' => $vendorDir . '/doctrine/common/lib/',
        'Doctrine\\Common\\Util' => $vendorDir . '/doctrine/common/lib/',
        'Doctrine\\Common' => $vendorDir . '/doctrine/common/lib/'
    );

    $path = str_replace('\\', DIRECTORY_SEPARATOR, $class);
    if (substr($path,0,8) == "Doctrine") {
        $namespaceClass = substr($path,0,strrpos($path,strrchr($path,DIRECTORY_SEPARATOR)));
        $pathClass = $namespace[$namespaceClass];
        require $pathClass.$path.'.php';
    } else if (substr($path,0,10) == "MilesBench") {
        require $path . '.php';
    } else {
        require 'MilesBench\\Model\\'.$path . '.php';
    }
}

