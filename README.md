BIC Calendar
============

ca - BIC Calendar es un simple calendari per marcar esdeveniments. Un plugin de jQuery i Twitter Bootstrap.

en - BIC Calendar is a simple calendar to mark events, a jQuery plugin and Twitter Bootstrap.


Dependencias
------------

- ~jQuery 1.7.2
- ~Twitter Bootstrap 2.0


Options
-------

- dias (array)
	- default: ["l", "m", "x", "j", "v", "s", "d"]

- nombresMes (array)
	- default: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

- show_days (boolean)
	- default: true

- popover_options (`popover Twitter Bootstrap<http://twitter.github.com/bootstrap/javascript.html#popovers>`_ object)

- tooltip_options (`tooltip Twitter Bootstrap<http://twitter.github.com/bootstrap/javascript.html#tooltips>`_ object)

- req_ajax (object)
	- req_ajax.type (string) {'get', 'post'}
	- req_ajax.url (string)

- events (array of event array)
	- req_ajax.type (string) {'get', 'post'}
	- req_ajax.url (string)

- Event (array)
	- 0 (string): date
	ex: "17/8/1989"
	- 1 (string): title
	ex: "Event Barberà"
	- 2 (string): link
	ex: "http://google.es"
	- 3 (string): color
	ex: "#333"
	- 4 (string): html popover
	ex: "Text for the content of popover...description of event...image..."


Use example
-----------

Note that each event of the exemple have a diferent behavior

- The blue event have a hover popover
["27/$mes/$ano", 'Getting Contacts Barcelona', 'http://gettingcontacts.com/events/view/barcelona', 'red']
- The green event have a click popover
["7/$mes/$ano", '2º Getting Contacts Alaquás', 'http://gettingcontacts.com/events/view/alaquas', 'blue', 'contingut popover']
- The red event have a hover tooltip ["17/$mes/$ano", '4º Getting Contacts Barberà', '#', '#3B4', 'contingut popover']

	$(document).ready( function(){

		mesos = ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Dicembre"];

		dias = ["L", "M", "M", "J", "V", "S", "D"];

	    $('#calendari_lateral1').bic_calendar({
	        nombresMes: mesos,
	        dias: dias,
	        req_ajax: {
	        	type: 'get',
	        	url: 'index.php'
	        }
	    });
	} );

	$mes = $_GET['mes'];
	$ano = $_GET['ano'];

	$array = array(
		array("27/$mes/$ano", 'Getting Contacts Barcelona', 'http://gettingcontacts.com/events/view/barcelona'),
		array("7/$mes/$ano", '2º Getting Contacts Alaquás', 'http://gettingcontacts.com/events/view/alaquas', '#3B4', 'contingut popover'),
		array("17/$mes/$ano", '4º Getting Contacts Barberà', '#', '#3B4', 'contingut popover')
	);

	echo json_encode($array);


Showcase
--------

[http://gettingcontacts.com](http://gettingcontacts.com)

[http://bic.cat/bic_calendar](http://bic.cat/bic_calendar)
