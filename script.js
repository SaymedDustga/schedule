/*$(document).ready(function() {
    $.getJSON("horarios.json", function(data) {
        $.each(data, function(day, schedule) {
            $.each(schedule, function(time, available) {
                var checkbox = $("table#schedule td:contains('" + day + "')").siblings().first(); // Encuentra la celda correspondiente al día y selecciona el primer checkbox

                if (available) {
                    checkbox.find("input[type='checkbox']").prop("checked", true); // Marca el checkbox si el horario está disponible
                } else {
                    checkbox.find("input[type='checkbox']").prop("checked", false); // Desmarca el checkbox si el horario no está disponible
                }
            });
        });
    });
});*/

document.addEventListener("DOMContentLoaded", async function() {
    try {
        // const response = await fetch("C:\\Users\\Saymed Dustga\\Desktop\\Semestre B2024\\Ingenieria del Software\\Development\\schedule.json");
        // const response = await fetch("C:/Users/Saymed Dustga/Desktop/Semestre B2024/Ingenieria del Software/Development/schedule.json");
        const response = await fetch("schedule.json");
        const data = await response.json();

        console.log("test");

        Object.entries(data).forEach(([day, schedule]) => {
            Object.entries(schedule).forEach(([time, available]) => {
                const checkbox = document.querySelector(`table#schedule td:contains('${day}')`).nextElementSibling.querySelector("input[type='checkbox']");
                if (available) {
                    checkbox.checked = true;
                } else {
                    checkbox.checked = false;
                }
            });
        });
    } catch (error) {
        console.error("Error fetching or parsing JSON file:", error);
    }
});