<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=utf-8");

class Ajax
{
    const NOSPAM = 'USITVFrWAN';

    public function onSubscribe()
    {
        $message = 'error';
        if (isset($_POST['from']) && isset($_POST['to']) && isset($_POST['message']) && isset($_POST['subscribe']) && isset($_POST['nospam']) && $_POST['nospam'] === self::NOSPAM && isset($_POST['type'])) {
            $from = '"' . trim(strip_tags($_POST['from'])) . '"';
            $to = '"' . trim(strip_tags($_POST['to'])) . '"';
            $message = '"' . trim(strip_tags($_POST['message'])) . '"';
            $isSubscribe = '"' . trim(strip_tags($_POST['subscribe'])) . '"';

            $arr = [
                $from,
                $to,
                $message,
                date('d.m.Y H:i:s')
            ];

            $string = implode(';', $arr) .  "\n";

            $filename = '/var/www/2nova2020new-year/data.csv';
            if (file_exists($filename) && file_put_contents($filename, $string, FILE_APPEND | LOCK_EX)) {
                $message = 'success';
            }
        }
        return ['message' => $message, 'data' => null];
    }
}

$output = [
    'status' => 0,
    'message' => null,
    'data' => null
];

if (isset($_POST['handler'])) {
    $handler = trim($_POST['handler']);
    $ajax = new Ajax();
    if (method_exists($ajax, $handler)) {

        $result = $ajax->{$handler}();

        $output = [
            'status' => 1,
            'message' => $result['message'],
            'data' => $result['data'],
        ];
    }
}

echo json_encode($output);

die();
