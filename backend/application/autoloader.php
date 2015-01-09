<?php
function __autoload($class)
{
    $path = str_replace('\\', DIRECTORY_SEPARATOR, $class);
    require $path . '.php';
}