<?php

function getFormData($method) {

    // GET или POST: данные возвращаем как есть
    if ($method === 'GET') return $_GET;
    if ($method === 'POST') return $_POST;

    // PUT, PATCH или DELETE
    $data = array();
    $exploded = explode('&', file_get_contents('php://input'));

    foreach($exploded as $pair) {
        $item = explode('=', $pair);
        if (count($item) == 2) {
            $data[urldecode($item[0])] = urldecode($item[1]);
        }
    }

    return $data;
}
if ($method === 'POST' && empty($urlData)) {
    // Добавляем товар в базу...

    // Выводим ответ клиенту
    echo json_encode(array(
        'method' => 'POST',
        'id' => rand(1, 100),
        'formData' => $formData
    ));

    return;
}
?>