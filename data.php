<?php

require_once __DIR__.'/vendor/silex.phar';
require_once __DIR__.'/vendor/idiorm/idiorm.php';

$app = new Silex\Application();
$app['debug'] = true;

$app->register(new Silex\Provider\MonologServiceProvider(), array(
    'monolog.logfile'       => __DIR__.'/development.log',
    'monolog.class_path'    => __DIR__.'/vendor/monolog/src',
));

ORM::configure('mysql:host=localhost;dbname=idiorm');
ORM::configure('username', 'root');
ORM::configure('password', 'toor');

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app->get('/clients', function () use ($app) {
    $result = array();

    try {
        $result['clients'] = array();

        foreach (ORM::for_table('client')->find_many() as $client) {
            $result['clients'][] = $client->as_array();
        }

        $result['success'] = true;
    } catch (Exception $exc) {
        $app['monolog']->addError($exc->getMessage());
        $result['success'] = false;
    }

    return new Response(
        json_encode($result),
        200,
        array('Content-Type' => 'application/json')
    );
});

$app->put('/clients/{id}', function (Request $request, $id) use ($app) {
    $result = array();

    try {
        $client = ORM::for_table('client')->find_one($id);
        $values = json_decode($request->getContent());

        foreach ($values as $k => $v)  {
            $client->set($k, $v);
        }

        $client->save();

        $result['success'] = true;
    } catch (Exception $exc) {
        $app['monolog']->addError($exc->getMessage());
        $result['success'] = false;
    }

    return new Response(
        json_encode($result),
        200,
        array('Content-Type' => 'application/json')
    );
});

$app->post('/clients', function (Request $request) use ($app) {
    $result = array();

    try {
        $client = ORM::for_table('client')->create();
        $values = json_decode($request->getContent());

        foreach ($values as $k => $v)  {
            $client->set($k, $v);
        }

        $client->save();

        $result['success'] = true;
    } catch (Exception $exc) {
        $app['monolog']->addError($exc->getMessage());
        $result['success'] = false;
    }

    return new Response(
        json_encode($result),
        200,
        array('Content-Type' => 'application/json')
    );
});

$app->delete('/clients/{id}', function () use ($app) {
    $result = array();

    try {
        $client = ORM::for_table('client')->find_one($id);
        $client->delete();

        $result['success'] = true;
    } catch (Exception $exc) {
        $app['monolog']->addError($exc->getMessage());
        $result['success'] = false;
    }

    return new Response(
        json_encode($result),
        200,
        array('Content-Type' => 'application/json')
    );
});

$app->run();
