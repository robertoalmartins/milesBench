<?php
function __autoload($class)
{
    $ds = DIRECTORY_SEPARATOR;
    $vendorDir = '..'.$ds.'vendor';
    $namespace = array(
        'Doctrine\\ORM' => '..'.$ds.'lib'.$ds,
        'Doctrine\\ORM\\Repository' => '..'.$ds.'lib'.$ds,
        'Doctrine\\ORM\\Event' => '..'.$ds.'lib'.$ds,
        'Doctrine\\ORM\\Proxy' => '..'.$ds.'lib'.$ds,
        'Doctrine\\ORM\\Id' => '..'.$ds.'lib'.$ds,
        'Doctrine\\ORM\\Query' => '..'.$ds.'lib'.$ds,
        'Doctrine\\ORM\\Query\\AST' => '..'.$ds.'lib'.$ds,
        'Doctrine\\ORM\\Query\\Exec' => '..'.$ds.'lib'.$ds,
        'Doctrine\\ORM\\Persisters' => '..'.$ds.'lib'.$ds,
        'Doctrine\\ORM\\Mapping' => '..'.$ds.'lib'.$ds,
        'Doctrine\\ORM\\Mapping\\Driver' => '..'.$ds.'lib'.$ds,
        'Doctrine\\ORM\\Internal\\Hydration' => '..'.$ds.'lib'.$ds,
        'Doctrine\\ORM\\Internal' => '..'.$ds.'lib'.$ds,
        'Doctrine\\DBAL' => $vendorDir . $ds.'doctrine'.$ds.'dbal'.$ds.'lib'.$ds,
        'Doctrine\\DBAL\\Driver' => $vendorDir . $ds.'doctrine'.$ds.'dbal'.$ds.'lib'.$ds,
        'Doctrine\\DBAL\\Driver\\PDOMySql' => $vendorDir . $ds.'doctrine'.$ds.'dbal'.$ds.'lib'.$ds,
        'Doctrine\\DBAL\\Query\\Expression' => $vendorDir . $ds.'doctrine'.$ds.'dbal'.$ds.'lib'.$ds,
        'Doctrine\\DBAL\\Query' => $vendorDir . $ds.'doctrine'.$ds.'dbal'.$ds.'lib'.$ds,
        'Doctrine\\DBAL\\Platforms' => $vendorDir . $ds.'doctrine'.$ds.'dbal'.$ds.'lib'.$ds,
        'Doctrine\\DBAL\\Exception' => $vendorDir . $ds.'doctrine'.$ds.'dbal'.$ds.'lib'.$ds,
        'Doctrine\\DBAL\\Types' => $vendorDir . $ds.'doctrine'.$ds.'dbal'.$ds.'lib'.$ds,
        'Doctrine\\Common\\Lexer' => $vendorDir . $ds.'doctrine'.$ds.'lexer'.$ds.'lib'.$ds,
        'Doctrine\\Common\\Inflector' => $vendorDir . $ds.'doctrine'.$ds.'inflector'.$ds.'lib'.$ds,
        'Doctrine\\Common\\Collections' => $vendorDir . $ds.'doctrine'.$ds.'collections'.$ds.'lib'.$ds,
        'Doctrine\\Common\\Collections\\Expr' => $vendorDir . $ds.'doctrine'.$ds.'collections'.$ds.'lib'.$ds,
        'Doctrine\\Common\\Cache' => $vendorDir . $ds.'doctrine'.$ds.'cache'.$ds.'lib'.$ds,
        'Doctrine\\Common\\Annotations' => $vendorDir . $ds.'doctrine'.$ds.'annotations'.$ds.'lib'.$ds,
        'Doctrine\\Common\\Annotations\\Annotation' => $vendorDir . $ds.'doctrine'.$ds.'annotations'.$ds.'lib'.$ds,
        'Doctrine\\Common\\Persistence' => $vendorDir . $ds.'doctrine'.$ds.'common'.$ds.'lib'.$ds,
        'Doctrine\\Common\\Persistence\\Mapping' => $vendorDir . $ds.'doctrine'.$ds.'common'.$ds.'lib'.$ds,
        'Doctrine\\Common\\Persistence\\Mapping\\Driver' => $vendorDir . $ds.'doctrine'.$ds.'common'.$ds.'lib'.$ds,
        'Doctrine\\Common\\Proxy' => $vendorDir . $ds.'doctrine'.$ds.'common'.$ds.'lib'.$ds,
        'Doctrine\\Common\\Proxy\\Exception' => $vendorDir . $ds.'doctrine'.$ds.'common'.$ds.'lib'.$ds,
        'Doctrine\\Common\\Util' => $vendorDir . $ds.'doctrine'.$ds.'common'.$ds.'lib'.$ds,
        'Doctrine\\Common' => $vendorDir . $ds.'doctrine'.$ds.'common'.$ds.'lib'.$ds
    );

    $path = str_replace('\\', DIRECTORY_SEPARATOR, $class);
    if (substr($path,0,8) == "Doctrine") {
        $namespaceClass = substr($path,0,strrpos($path,strrchr($path,DIRECTORY_SEPARATOR)));
        $pathClass = $namespace[str_replace('/','\\',$namespaceClass)];
        require $pathClass.$path.'.php';
    } else if (substr($path,0,10) == "MilesBench") {
        require $path . '.php';
    } else {
        require '../application/MilesBench/Model/'.$path . '.php';
    }
}

