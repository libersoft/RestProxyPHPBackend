<?php

require_once __DIR__.'/../vendor/Silex/silex.phar';
require_once __DIR__.'/../vendor/Idiorm/idiorm.php';

$app = new Silex\Application();

$app->register(new Silex\Provider\MonologServiceProvider(), array(
    'monolog.logfile'       => __DIR__.'/../log/development.log',
    'monolog.class_path'    => __DIR__.'/../vendor/Monolog/src',
));

ORM::configure('mysql:host=localhost;dbname=idiorm');
ORM::configure('username', 'root');
ORM::configure('password', 'toor');

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app->get('/{class}', function (Request $request, $class) use ($app) {
    $page = $request->get('page');
    $start = $request->get('start');
    $limit = $request->get('limit');

    $result = array();

    try {
        $result['data'] = array();

        $objects = ORM::for_table($class)
                ->offset($start)
                ->limit($limit)
                ->find_many();
        foreach ($objects as $object) {
            $result['data'][] = $object->as_array();
        }
        $result['total'] = count($objects);

        $result['success'] = true;
    } catch (Exception $exc) {
        $app['monolog']->addError($exc->getMessage());
        $result['message'] = $exc->getMessage();
        $result['success'] = false;
    }

    return new Response(
        json_encode($result),
        200,
        array('Content-Type' => 'application/json')
    );
});

$app->put('/{class}/{id}', function (Request $request, $class, $id) use ($app) {
    $result = array();

    try {
        $object = ORM::for_table($class)->find_one($id);
        $values = json_decode($request->getContent());

        foreach ($values as $k => $v)  {
            $object->set($k, $v);
        }

        $object->save();
        $result['data'][] = $object->as_array();

        $result['success'] = true;
    } catch (Exception $exc) {
        $app['monolog']->addError($exc->getMessage());
        $result['message'] = $exc->getMessage();
        $result['success'] = false;
    }

    return new Response(
        json_encode($result),
        200,
        array('Content-Type' => 'application/json')
    );
});

$app->post('/{class}', function (Request $request, $class) use ($app) {
    $result = array();

    try {
        $object = ORM::for_table($class)->create();
        $values = json_decode($request->getContent());

        foreach ($values as $k => $v)  {
            $object->set($k, $v);
        }

        $object->save();
        $result['data'][] = $object->as_array();

        $result['success'] = true;
    } catch (Exception $exc) {
        $app['monolog']->addError($exc->getMessage());
        $result['message'] = $exc->getMessage();
        $result['success'] = false;
    }

    return new Response(
        json_encode($result),
        200,
        array('Content-Type' => 'application/json')
    );
});

$app->delete('/{class}/{id}', function ($class, $id) use ($app) {
    $result = array();

    try {
        $object = ORM::for_table($class)->find_one($id);
        $result['data'] = $object->as_array();

        $object->delete();
        $result['success'] = true;
    } catch (Exception $exc) {
        $app['monolog']->addError($exc->getMessage());
        $result['message'] = $exc->getMessage();
        $result['success'] = false;
    }

    return new Response(
        json_encode($result),
        200,
        array('Content-Type' => 'application/json')
    );
});

return $app;
