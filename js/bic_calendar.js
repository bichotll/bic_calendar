/*
 *
 * bic calendar
 * Autor: bichotll
 * Web-autor: bic.cat
 * Web script: http://bichotll.github.io/bic_calendar/
 * Llicència Apache
 *
 */

$.fn.bic_calendar = function(options) {

    var opts = $.extend({}, $.fn.bic_calendar.defaults, options);

    this.each(function() {

        var calendar;
        var daysMonthLayer;
        var textMonthYearCurrentLayer = $('<div class="visualmonthyear"></div>');

        var calendarId = "bic_cal_" + Math.floor(Math.random() * 99999).toString(36);

        var events = opts.events;

        var days;
        if (typeof opts.days != "undefined")
            days = opts.days;
        else
            days = ["l", "m", "x", "j", "v", "s", "d"];

        var monthName;
        if (typeof opts.monthName != "undefined")
            monthName = opts.monthName;
        else
            monthName = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        var showDays;
        if (typeof opts.showDays != "undefined")
            showDays = opts.showDays;
        else
            showDays = true;

        var popoverOptions;
        if (typeof opts.popoverOptions != "undefined")
            popoverOptions = opts.popoverOptions;
        else
            popoverOptions = {placement: 'top'};

        var tooltipOptions;
        if (typeof opts.tooltipOptions != "undefined")
            tooltipOptions = opts.tooltipOptions;
        else
            tooltipOptions = {placement: 'top'};

        var reqAjax;
        if (typeof opts.reqAjax != "undefined")
            reqAjax = opts.reqAjax;
        else
            reqAjax = false;



        //element called
        var elem = $(this);


        showCalendar();



        /*** functions ***/

        /**
         * print calendar
         */
        function showCalendar() {

            //layer with the days of the month (literals)
            daysMonthLayer = $('<table class="table">');

            listListeralsWeek();

            //Date obj to calc the day
            var objFecha = new Date();
            //check if input has a date writed down
            var textoFechaEscrita = elem.val();
            if (textoFechaEscrita != "") {
                if (validateWritedDate(textoFechaEscrita)) {
                    var arrayFechaEscrita = textoFechaEscrita.split("/");
                    //check if year has two digits
                    if (arrayFechaEscrita[2].length == 2) {
                        if (arrayFechaEscrita[2].charAt(0) == "0") {
                            arrayFechaEscrita[2] = arrayFechaEscrita[2].substring(1);
                        }
                        arrayFechaEscrita[2] = parseInt(arrayFechaEscrita[2]);
                        if (arrayFechaEscrita[2] < 50)
                            arrayFechaEscrita[2] += 2000;
                    }
                    objFecha = new Date(arrayFechaEscrita[2], arrayFechaEscrita[1] - 1, arrayFechaEscrita[0])
                }
            }

            //current year n current month
            var month = objFecha.getMonth();
            var year = objFecha.getFullYear();

            //show the days of the month n year configured
            showMonthDays(month, year);

            //next-previous month controllers
            var nextMonthButton = $('<td><a href="#" class="button-month-next"><i class="glyphicon glyphicon-arrow-right" ></i></a></td>');
            nextMonthButton.click(function(e) {
                e.preventDefault();
                month = (month + 1) % 12;
                if (month == 0)
                    year++;
                changeMonth(month, year);
            })
            var previousMonthButton = $('<td><a href="#" class="button-month-previous"><i class="glyphicon glyphicon-arrow-left" ></i></a></td>');
            previousMonthButton.click(function(e) {
                e.preventDefault();
                month = (month - 1);
                if (month == -1) {
                    year--;
                    month = 11;
                }
                changeMonth(month, year);
            })

            //show the current year n current month text layer
            var capaTextoMesAno = $('<table class="table header"><tr></tr></table>');
            var yearMonthControlTextLayer = $('<td colspan=5 class="monthAndYear span6"></td>');
            capaTextoMesAno.append(previousMonthButton);
            capaTextoMesAno.append(yearMonthControlTextLayer);
            capaTextoMesAno.append(nextMonthButton);
            yearMonthControlTextLayer.append(textMonthYearCurrentLayer);

            //calendar n border
            calendar = $('<div class="bic_calendar" id="' + calendarId + '" ></div>');
            calendar.prepend(capaTextoMesAno);
            //calendar.append(capaDiasSemana);
            //daysMonthLayer.prepend(capaDiasSemana);
            calendar.append(daysMonthLayer);

            //insert calendar in the document
            elem.append(calendar);

            checkEvents(month, year);
        }

        function changeMonth(month, year) {
            daysMonthLayer.empty();
            listListeralsWeek();
            showMonthDays(month, year);
            checkEvents(month, year);
        }

        /**
         * show literals of the week
         */
        function listListeralsWeek() {
            if (showDays != false) {
                var capaDiasSemana = $('<tr class="days-month" >');
                var codigoInsertar = '';
                $(days).each(function(indice, valor) {
                    codigoInsertar += '<td';
                    if (indice == 0) {
                        codigoInsertar += ' class="primero"';
                    }
                    if (indice == 6) {
                        codigoInsertar += ' class="domingo ultimo"';
                    }
                    codigoInsertar += ">" + valor + '</td>';
                });
                codigoInsertar += '</tr>';
                capaDiasSemana.append(codigoInsertar);

                daysMonthLayer.append(capaDiasSemana);
            }
        }

        /**
         * show the days of the month
         */
        function showMonthDays(month, year) {

            //show in textMonthYearCurrentLayer the month and the year that it will print
            textMonthYearCurrentLayer.text(monthName[month] + " " + year);

            //show days of the month
            var daysCounter = 1;

            //calc the date of the first day of this month
            var firstDay = calcNumberDayWeek(1, month, year);

            //calc the last day of this month
            var lastDayMonth = lastDay(month, year);

            var nMonth = month + 1;

            var daysMonthLayerString = "";

            //print the first row of the week
            for (var i = 0; i < 7; i++) {
                if (i < firstDay) {
                    var dayCode = "";
                    if (i == 0)
                        dayCode += "<tr>";
                    //if the first day of the week i is menor than the number of the first day of the week it doesn't print nothing inside
                    dayCode += '<td class="invalid-day';
                    if (i == 0)
                        dayCode += " primero";
                    dayCode += '"></td>';
                } else {
                    var dayCode = "";
                    if (i == 0)
                        dayCode += '<tr>';
                    dayCode += '<td id="' + calendarId + '_' + daysCounter + "_" + nMonth + "_" + year + '" ';
                    if (i == 0)
                        dayCode += ' class="primero"';
                    if (i == 6)
                        dayCode += ' class="ultimo domingo"';
                    dayCode += '><a>' + daysCounter + '</a></span>';
                    if (i == 6)
                        dayCode += '</tr>';
                    daysCounter++;
                }
                daysMonthLayerString += dayCode
            }

            //check all the other days until end of the month
            var currentWeekDay = 1;
            while (daysCounter <= lastDayMonth) {
                var dayCode = "";
                if (currentWeekDay % 7 == 1)
                    dayCode += "<tr>";
                dayCode += '<td id="' + calendarId + '_' + daysCounter + "_" + nMonth + "_" + year + '" ';
                //if we are in the beginning of the week it add class first
                if (currentWeekDay % 7 == 1)
                    dayCode += ' class="first"';
                //if we are in the end and it's sunday last
                if (currentWeekDay % 7 == 0)
                    dayCode += ' class="sunday last"';
                dayCode += '><a>' + daysCounter + '</a></td>';
                if (currentWeekDay % 7 == 0)
                    dayCode += "</tr>";
                daysCounter++;
                currentWeekDay++;
                daysMonthLayerString += dayCode
            }

            //check if the empty cells it have yet to write of the last week of the month
            currentWeekDay--;
            if (currentWeekDay % 7 != 0) {
                dayCode = "";
                for (var i = (currentWeekDay % 7) + 1; i <= 7; i++) {
                    var dayCode = "";
                    dayCode += '<td class="invalid-day';
                    if (i == 7)
                        dayCode += ' ultimo'
                    dayCode += '"></td>';
                    if (i == 7)
                        dayCode += '</tr>'
                    daysMonthLayerString += dayCode
                }
            }

            daysMonthLayer.append(daysMonthLayerString);
        }
        
        /**
         * calc the number of the week day
         */
        function calcNumberDayWeek(day, month, year) {
            var objFecha = new Date(year, month, day);
            var numDia = objFecha.getDay();
            if (numDia == 0)
                numDia = 6;
            else
                numDia--;
            return numDia;
        }

        /**
         * check if a date is correct
         * 
         * @thanks http://kevin.vanzonneveld.net
         * @thanks http://www.desarrolloweb.com/manuales/manual-librerias-phpjs.html
         */
        function checkdate(m, d, y) {
            return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
        }

        /**
         * return last day of a date (month n year)
         */
        function lastDay(month, year) {
            var lastDayValue = 28;
            while (checkdate(month + 1, lastDayValue + 1, year)) {
                lastDayValue++;
            }
            return lastDayValue;
        }

        function validateWritedDate(fecha) {
            var arrayFecha = fecha.split("/");
            if (arrayFecha.length != 3)
                return false;
            return checkdate(arrayFecha[1], arrayFecha[0], arrayFecha[2]);
        }

        function checkEvents(month, year) {
            if (reqAjax != false) {
                //peticio ajax
                $.ajax({
                    type: reqAjax.type,
                    url: reqAjax.url,
                    data: {mes: month + 1, ano: year},
                    dataType: 'json'
                }).done(function(data) {

                    events = [];

                    $.each(data, function(k, v) {
                        events.push(data[k]);
                    });

                    markEvents(month, year);

                });
            } else {
                markEvents(month, year);
            }
        }

        function markEvents(month, year) {
            var temporalMonth = month + 1;

            for (var i = 0; i < events.length; i++) {

                if (events[i][0].split('/')[1] == temporalMonth && events[i][0].split('/')[2] == year) {

                    $('#' + calendarId + '_' + events[i][0].replace(/\//g, "_")).addClass('event');

                    $('#' + calendarId + '_' + events[i][0].replace(/\//g, "_") + ' a').attr('data-original-title', events[i][1]);

                    //bg
                    if (events[i][3])
                        $('#' + calendarId + '_' + events[i][0].replace(/\//g, "_")).css('background', events[i][3]);

                    //link
                    if (events[i][2] == '' || events[i][2] == '#') {
                        if (events[i][4] != '') {
                            $('#' + calendarId + '_' + events[i][0].replace(/\//g, "_") + ' a').attr('data-trigger', 'manual');
                            $('#' + calendarId + '_' + events[i][0].replace(/\//g, "_") + ' a').addClass('manual_popover');
                        } else {
                            $('#' + calendarId + '_' + events[i][0].replace(/\//g, "_") + ' a').attr('href', 'javascript:false;');
                        }
                    } else {
                        $('#' + calendarId + '_' + events[i][0].replace(/\//g, "_") + ' a').attr('href', events[i][2]);
                    }


                    //tooltip vs popover
                    if (events[i][4]) {
                        $('#' + calendarId + '_' + events[i][0].replace(/\//g, "_")).addClass('event_popover');
                        $('#' + calendarId + '_' + events[i][0].replace(/\//g, "_") + ' a').attr('rel', 'popover');
                        $('#' + calendarId + '_' + events[i][0].replace(/\//g, "_") + ' a').attr('data-content', events[i][4]);
                    } else {
                        $('#' + calendarId + '_' + events[i][0].replace(/\//g, "_")).addClass('event_tooltip');
                        $('#' + calendarId + '_' + events[i][0].replace(/\//g, "_") + ' a').attr('rel', 'tooltip');
                    }
                }
            }

            $('#' + calendarId + ' ' + '.event_tooltip a').tooltip(tooltipOptions);
            $('#' + calendarId + ' ' + '.event_popover a').popover(popoverOptions);

            $('.manual_popover').click(function() {
                $(this).popover('toggle');
            });
        }

        /*** --functions-- ***/



    });
    return this;
};
