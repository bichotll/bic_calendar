<?php

$mes = $_GET['mes'];
$ano = $_GET['ano'];

$array = array(
	array("27/$mes/$ano", 'Getting Contacts Barcelona', 'http://gettingcontacts.com/events/view/barcelona'),
	array("7/$mes/$ano", '2º Getting Contacts Alaquás', 'http://gettingcontacts.com/events/view/alaquas', '#3B4', 'contingut popover<img src="http://gettingcontacts.com/upload/news/estiu_productiu.png" >'),
	array("17/$mes/$ano", '4º Getting Contacts Barberà', '#', '#3B4', 'contingut popover<img src="http://gettingcontacts.com/upload/news/estiu_productiu.png" >')
);

echo json_encode($array);

?>