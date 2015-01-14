<?php
function __autoload($class)
{
    $vendorDir = '/../vendor';
    $namespace = array(
        'Doctrine\\ORM' => '/../lib/',
        'Doctrine\\DBAL' => $vendorDir . '/doctrine/dbal/lib/',
        'Doctrine\\DBAL\\Driver' => $vendorDir . '/doctrine/dbal/lib/',
        'Doctrine\\DBAL\\Query\\Expression' => $vendorDir . '/doctrine/dbal/lib/',
        'Doctrine\\DBAL\\Platforms' => $vendorDir . '/doctrine/dbal/lib/',
        'Doctrine\\DBAL\\Exception' => $vendorDir . '/doctrine/dbal/lib/',
        'Doctrine\\Common\\Lexer' => $vendorDir . '/doctrine/lexer/lib/',
        'Doctrine\\Common\\Inflector' => $vendorDir . '/doctrine/inflector/lib/',
        'Doctrine\\Common\\Collections' => $vendorDir . '/doctrine/collections/lib/',
        'Doctrine\\Common\\Cache' => $vendorDir . '/doctrine/cache/lib/',
        'Doctrine\\Common\\Annotations' => $vendorDir . '/doctrine/annotations/lib/',
        'Doctrine\\Common' => $vendorDir . '/doctrine/common/lib/'
    );

    $path = str_replace('\\', DIRECTORY_SEPARATOR, $class);
    if (substr($path,0,8) == "Doctrine") {
        $namespaceClass = substr($path,0,strpos($path,strrchr($path,DIRECTORY_SEPARATOR)));
        $pathClass = $namespace[$namespaceClass];
        require $pathClass.$path.'.php';
    } else {
        require $path . '.php';
    }
}

