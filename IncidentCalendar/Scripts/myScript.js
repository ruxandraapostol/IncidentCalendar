const months = ["IANUARIE", "FEBRUARIE", "MARTIE", "APRILIE",
    "MAI", "IUNIE", "IULIE", "AUGUST", "SEPTEMBRIE", "OCTOMBRIE",
    "NOIEMBRIE", "DECEMBRIE",];

const date = new Date();
const todayMonth = date.getMonth();
const todayYear = date.getFullYear();
const today = date.getUTCDate();

function renderCalendar(list) {
    /* variabila pentru a stabile daca luna
     * este in trecut, prezent sau viitor*/
    var currentToday = today;

    // luna si anul afisate in tabel
    const actualMonth = date.getMonth();
    const actualYear = date.getFullYear();

    // ultima zi din luna afisata
    const lastDayOfShownMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();


    var table = document.getElementById("Table");
    rows = table.rows;

    // sterg toate coloanele inafara de prima, cea cu serviciile
    while (rows[0].cells.length > 1) {
        for (var j = 0; j < rows.length; j++) {
            rows[j].deleteCell(1);
        }
    }

    // adaug coloane cate zile sunt in luna afisata
    for (let i = 1; i <= lastDayOfShownMonth; i++) {
        var newCellDay = table.rows[0].insertCell(i);
        newCellDay.innerHTML = `${i}`;
    }

    // pentru fiecare serviciu oferit 
    for (let i = 1; i <= lastDayOfShownMonth; i++) {
        /* stabilesc daca luna afisata este trecuta, prezenta sau viitoare
         * stabilint ziua curenta fiind lastDayOfShownMonth, today sau 0*/
        if (todayMonth > actualMonth && todayYear == actualYear) {
            currentToday = lastDayOfShownMonth;
        } else if (todayMonth < actualMonth && todayYear == actualYear) {
            currentToday = 0;
        } else if (todayYear > actualYear) {
            currentToday = lastDayOfShownMonth;
        } else if (todayYear < actualYear) {
            currentToday = 0;
        }

        var backgroundColor = "#99ff99";
        if (i > currentToday) {
            backgroundColor = "#cccccc";
        }

        // parcurg fiecare rand 
        for (let j = 1, row; row = table.rows[j]; j++) {
            /* initial marchez fiecare zi fara incidente 
             * daca este in trecut si prezent sau goala altfel*/
            var cellDayService = row.insertCell(i);
            cellDayService.style.background = backgroundColor;

            if (i > currentToday) {
                continue;
            }
            var ok = 1;

            /* data curenta este indicata de anul si luna 
             * afisate impreuna cu ziua pe a carei coloana
             * suntem pozitionati*/
            var thisDate = new Date(actualYear, actualMonth, i, 21, 0, 0) / 1000;
            var mostImportantIncident = 0;
            var checkEveniment = 0;

            var newTable = document.createElement("TABLE");
            newTable.className = "table-responsive";
            var firstRow = newTable.insertRow(0);

            var cellNewTable = firstRow.insertCell(0);
            cellNewTable.innerHTML = "Tip";
            cellNewTable = firstRow.insertCell(1);
            cellNewTable.innerHTML = "Data inceput";
            cellNewTable = firstRow.insertCell(2);
            cellNewTable.innerHTML = "Data sfarsit";
            cellNewTable = firstRow.insertCell(3);
            cellNewTable.innerHTML = "Descriere";
            cellNewTable = firstRow.insertCell(4);
            cellNewTable.innerHTML = "Actiune";

            var nrTable = 1;

            /* parcurg lista de incidente care este ordonata 
             * dupa numele serviciului*/
            for (let k = 0; k < list.length; k++) {
                if (list[k].ServerName == row.cells[0].textContent) {
                    /* retinem ca am ajuns la incidentele
                     * petrecute serviciul dorit */
                    ok = 0;

                    // alert(thisDate + "   " + list[k].StartDate + "  " + list[k].EndDate + ".......");
                    /* daca data curenta este intre data de sfarsit
                     * si cea de inceput a incidentului*/
                    if (thisDate >= list[k].StartDate) {
                        if ((list[k].EndDate == -7200) || thisDate <= new Date(list[k].EndDate)) {
                            //alert(list[k].IncidentType);

                            var rowNewTable = newTable.insertRow(nrTable);
                            nrTable += 1;

                            checkEveniment = 1;
                            if (list[k].IncidentType == 2) {
                                mostImportantIncident = 2;
                            } else if (list[k].IncidentType == 1 && mostImportantIncident != 2) {
                                mostImportantIncident = 1;
                            } else {
                                mostImportantIncident = 3;
                            }

                            var type;
                            if (list[k].IncidentType == 1) {
                                cellNewTable = rowNewTable.insertCell(0);
                                type = 'Afectat Partial';
                            } else if (list[k].IncidentType == 2) {
                                cellNewTable = rowNewTable.insertCell(0);
                                type = 'Inutilizabil';
                            } else if (list[k].IncidentType == 3) {
                                cellNewTable = rowNewTable.insertCell(0);
                                type = 'Mentenanta';
                            }
                            cellNewTable.innerHTML = type;

                            cellNewTable = rowNewTable.insertCell(1);
                            var start = secondsToDate(list[k].StartDate + 86400);
                            cellNewTable.innerHTML = start;


                            cellNewTable = rowNewTable.insertCell(2);
                            var end;
                            if (list[k].EndDate == -7200) {
                                end = 'prezent';
                            } else {
                                end = secondsToDate(list[k].EndDate);
                            }
                            cellNewTable.innerHTML = end;

                            cellNewTable = rowNewTable.insertCell(3);
                            if (list[k].Description != null) {
                                cellNewTable.innerHTML = list[k].Description;
                            } else {
                                cellNewTable.innerHTML = "-";
                            }

                            cellNewTable = rowNewTable.insertCell(4);

                            var centerDiv = document.createElement("div");
                            centerDiv.className = "d-flex justify-content-center";

                            var deleteButton = document.createElement("a");
                            deleteButton.href = "#";
                            deleteButton.id = String(k * 10000 + i * 100 + j);
                            deleteButton.className = "btn input-block-level";
                            deleteButton.setAttribute("role", "button");
                            deleteButton.innerText = "Delete"

                            centerDiv.appendChild(deleteButton);
                            cellNewTable.appendChild(centerDiv);
                            
                            $(document).ready(function () {
                                $(document).on("click", `#${(k * 10000 + i * 100 + j)}`, function () {
                                    $(this).blur();
                                    $(this).parents(".popover").popover('hide');
                                    $('#myDeleteModal').modal("show");
                                    $('#myDeleteModal #DeleteId').attr("value", list[k].Id);
                                    $('#myDeleteModal #DeleteType').attr("value", type);
                                    $('#myDeleteModal #DeleteServiceName').attr("value", list[k].ServerName);
                                    $('#myDeleteModal #DeleteStart').attr("value", start);
                                    $('#myDeleteModal #DeleteEnd').attr("value", end);
                                    $('#myDeleteModal #DeleteDescription').attr("value", list[k].Description);
                                });
                            });

                        }
                    }
                } else if (ok == 0) {
                    /*daca am trecut de incidentele pentru
                     * serviciul curent ne oprim */
                    break;
                }
            }

            if (checkEveniment == 1) {
                //alert(text);
                addIncidentList(cellDayService, i, j, newTable, mostImportantIncident, row.cells[0].textContent);
            }
        }
    }

    // afisez luna si anul dorite in tabel
    document.getElementById("Month").innerHTML = `<p style="font-size: 3rem">`
        + `${months[actualMonth]} ${actualYear}</p>`;
}

// functie de trecere la luna anterioara
function prev(list) {
    date.setMonth(date.getMonth() - 1);
    renderCalendar(list);
};

// functie de trecere la luna precedenta
function next(list) {
    date.setMonth(date.getMonth() + 1);
    renderCalendar(list);
};


function addIncidentList(cell, i, j, newTable, colorIndex, serviceName) {
    if (colorIndex == 3) {
        cell.style.background = "#ffff80";
    } else if (colorIndex == 1) {
        cell.style.background = "#ffa366"
    } else {
        cell.style.background = "#ff6666";
    }

    var popupId = String(i * 100 + j);

    // alert(text);
    var newTitle = document.createElement("a");
    var popTitle = 'Lista Incidentelor' +'<a href="#" data-toggle="modal"'
        + ' data-target="#myModal" data-remote="false" id="addButton" class="btn '
        + 'input-block-level"><span class="glyphicon glyphicon-plus"'
        + 'style="font-size: 20px"></span></a>';

    var popTitleButton = document.createElement("a");
    popTitleButton.href = "#";
    popTitleButton.setAttribute("data-toggle", "modal");
    popTitleButton.setAttribute("data-remote", "false");
    popTitleButton.id = "addButton";
    popTitleButton.className = "btn input-block-level";
    popTitleButton.innerHTML = '<span class="glyphicon glyphicon-plus"style="font-size: 20px"></span>';


    var centerDiv = document.createElement("div");
    centerDiv.className = "d-flex justify-content-center";

    var popupButton = document.createElement("a");
    popupButton.href = "#";
    popupButton.className = "btn input-block-level";
    popupButton.setAttribute("role", "button");
    popupButton.setAttribute("data-toggle", "popover");
    popupButton.id = popupId;

    centerDiv.appendChild(popupButton);
    cell.appendChild(centerDiv);

    $(document).ready(function () {
        $(`#${popupId}`).popover({
            html: true,
            title: popTitle,
            content: newTable
        });

        $(`#${popupId}`).on('shown.bs.popover', function () {
            $($(this).next()).css('max-width', 500);
        });

        $(document).on("click", '.popover #addButton', function () {
            $(this).parents(".popover").popover('hide');
            $('#myModal').modal("show");
            $('#myModal #TextBoxServerName2').attr("value", serviceName);
        });
    });
}

function secondsToDate(secs) {
    var t = new Date(1970, 0, 1, 0, 0, 0);
    t.setSeconds(secs);

    var dateMonth = t.getMonth();
    var dateYear = t.getFullYear();
    var dateDay = t.getUTCDate();
    var hour = t.getHours();
    var minutes = t.getMinutes();

    if (minutes < 10) {
        return `${dateDay} ${months[dateMonth]} ${dateYear} ${hour}:0${minutes}`;
    } else {
        return `${dateDay} ${months[dateMonth]} ${dateYear} ${hour}:${minutes}`;
    }
}