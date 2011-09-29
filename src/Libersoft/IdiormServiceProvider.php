<?php

namespace Libersoft;

require_once __DIR__.'/../../vendor/Idiorm/idiorm.php';

use Silex\Application;
use Silex\ServiceProviderInterface;

class IdiormServiceProvider implements ServiceProviderInterface
{
    public function register(Application $app)
    {
        $app['idiorm'] = $app->share(function () use ($app) {
            \ORM::configure($app['idiorm.dsn']);
            \ORM::configure('username', $app['idiorm.username']);
            \ORM::configure('password', $app['idiorm.password']);
            \ORM::configure('driver_options', array(
                \PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
            ));

            return new IdiormWrapper();
        });
    }
}

class IdiormWrapper
{
    public function getTable($tableName)
    {
        return \ORM::for_table($tableName);
    }

    public function getDb()
    {
        return \ORM::get_db();
    }
}
