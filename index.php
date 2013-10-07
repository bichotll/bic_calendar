<?php

header('Access-Control-Allow-Origin: *');

$ano = $_GET['ano'];

$array = array(
    array(
        date => "27/2/$ano",
        title => 'Getting Contacts Barcelona - test1',
        //link => 'http://gettingcontacts.com/events/view/barcelona',
        color => 'red'
    ),
    array(
        date => "25/5/$ano",
        title => 'test2',
        //link => 'http://gettingcontacts.com/events/view/barcelona',
        color => 'pink'
    ),
    array(
        date => "20/6/$ano",
        title => 'test2',
        //link => 'http://gettingcontacts.com/events/view/barcelona',
        color => 'green'
    ),
    array(
        date => "7/10/$ano",
        title => 'test3',
        //removed for this example
        //link => 'http://gettingcontacts.com/events/view/barcelona',
        color => 'blue',
        'class' => 'miclasse ',
        content => 'contingut popover<img src="http://gettingcontacts.com/upload/news/estiu_productiu.png'
    ),
);

echo json_encode($array);
?>
