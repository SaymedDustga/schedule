const mod_button = document.getElementById("modificar");
const save_button = document.getElementById("guardar");

const red = "#FFB7B2";
const green = "#B7D1B9";

const urlAPI = "https://is-team-b.onrender.com/doctors/"

const days_translation_eng_spa = {
	"monday" : "Lunes",
	"tuesday" :"Martes",
	"wednesday" :"Miércoles",
	"thursday" :"Jueves",
	"friday" : "Viernes",
	"saturday" :"Sabado",
	"sunday" :"Domingo"
}

const days_translation_spa_eng = {
	"lunes" : "monday",
	"martes" :"tuesday",
	"miércoles" :"wednesday",
	"jueves" :"thursday",
	"viernes" : "friday",
	"sabado" :"saturday",
	"domingo" :"sunday"
}

document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch(urlAPI + "1/schedule");
        const dataDoctor = await response.json();

        const name = document.getElementById("nombreMedico");
        name.innerText = `Horario de ${dataDoctor.name}, ${dataDoctor.specialty}`;

        Object.entries(dataDoctor.weekly_medical_schedule).forEach(([day_name, data]) => {
            Object.entries(data).forEach(([is_work, schedule]) => {
                Object.entries(schedule).forEach(([time, available]) => {
                    let h = parseInt(time.substring(0, 2));
                    const text = (h >= 12) ? "00PM" : "00AM";
                    if (h > 12) {
                        h = h - 12;
                    }
                    const finalString = ((h < 10) ? '0' + h : h) + text;
                    const selectorString = `table tr > td#${days_translation_eng_spa[day_name].toLowerCase()}${finalString.toLowerCase()} > input[type="checkbox"]`;
                    const checkbox = document.querySelector(selectorString);

                    if (available && is_work) {
                        checkbox.checked = true;
                        const parent = checkbox.parentNode;
                        parent.style.background = green;
                        const label = this.createElement("label");
                        label.textContent = "Asignado";
                        parent.appendChild(label);
                    } else {
                        checkbox.checked = false;
                        const parent = checkbox.parentNode;
                        parent.style.background = red;
                        const label = this.createElement("label");
                        label.textContent = "No Asignado";
                        parent.appendChild(label);
                    }
                    checkbox.style.visibility = "hidden";
                    checkbox.addEventListener("change", function() {
                        if (this.checked) {
                            const parent = this.parentNode;
                            parent.style.background = green;
                            parent.querySelector('label').textContent = "Asignado";
                        } else {
                            const parent = this.parentNode;
                            parent.style.background = red;
                            parent.querySelector('label').textContent = "No Asignado";
                        }
                    });
                });
            });
        });
    } catch (error) {
        console.error("Error fetching or parsing JSON file:", error);
    }
});

mod_button.addEventListener("click", function() {
    const checkboxs = document.querySelectorAll('table input[type="checkbox"]');
    checkboxs.forEach((element) => {
        element.style.visibility = "visible";
    })
    save_button.disabled = false;
    mod_button.disabled = true;
});

async function updateJsonData(updatedData) {
    try {
        const response = await fetch(urlAPI + "1/schedule", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        console.log(response)

        if (!response.ok) {
            throw new Error('Error en la actualización: ' + response.statusText);
        }

        const result = await response.json();
        console.log('Actualización exitosa:', result);
    } catch (error) {
        console.error('Error al actualizar:', error);
    }
}

save_button.addEventListener("click", function() {
    const upData ={
        "time" : {
            "monday" :
            {
                "07:00" : true,
                "08:00" : true,
                "09:00" : true,
                "10:00" : false,
                "11:00" : false,
                "12:00" : false,
                "13:00" : false,
                "14:00" : false,
                "15:00" : false,
                "16:00" : false,
                "17:00" : false,
                "18:00" : true,
                "19:00" : false
            },
            "tuesday" :
            {
                "07:00" : true,
                "08:00" : true,
                "09:00" : true,
                "10:00" : false,
                "11:00" : false,
                "12:00" : false,
                "13:00" : false,
                "14:00" : false,
                "15:00" : false,
                "16:00" : false,
                "17:00" : false,
                "18:00" : false,
                "19:00" : false
            },
            "wednesday" :
            {
                "07:00" : true,
                "08:00" : true,
                "09:00" : true,
                "10:00" : false,
                "11:00" : false,
                "12:00" : false,
                "13:00" : false,
                "14:00" : false,
                "15:00" : false,
                "16:00" : false,
                "17:00" : false,
                "18:00" : false,
                "19:00" : false
            },
            "thursday" :
            {
                "07:00" : true,
                "08:00" : true,
                "09:00" : true,
                "10:00" : false,
                "11:00" : false,
                "12:00" : false,
                "13:00" : false,
                "14:00" : false,
                "15:00" : false,
                "16:00" : false,
                "17:00" : false,
                "18:00" : false,
                "19:00" : false
            },
            "friday" :
            {
                "07:00" : true,
                "08:00" : true,
                "09:00" : true,
                "10:00" : false,
                "11:00" : false,
                "12:00" : false,
                "13:00" : false,
                "14:00" : false,
                "15:00" : false,
                "16:00" : false,
                "17:00" : false,
                "18:00" : false,
                "19:00" : false
            }
        }
    };
    const checkboxs = document.querySelectorAll('table input[type="checkbox"]');
    checkboxs.forEach((element) => {
        element.style.visibility = "hidden";
        const elmData = element.parentElement;
        const idData = elmData.id.match(/[a-zA-ZáéíóúÁÉÍÓÚ]+/g);
        const idTimeData = elmData.id.match(/[0-9]+/g);
        // console.log(parseInt(idTimeData[0].substring(0,2)));
        const time = parseInt(idTimeData[0].substring(0,2));
        // console.log(elmData.childNodes[3].textContent);
        upData["time"][days_translation_spa_eng[idData[0]]][(time < 12 && idData[1] == "pm") ? time + 12 + ":00" : ((time < 10) ? "0":"") + time + ":00"] = (elmData.childNodes[3].innerText == "Asignado");
        // console.log(idData[1]);
        // console.log((time < 12 && idData[1] == "pm") ? time + 12 + ":00" : ((time < 10) ? "0":"") + time + ":00");
        // console.log(element.parentElement);
    })
    save_button.disabled = true;
    mod_button.disabled = false;

    console.log(upData);

    // const updatedData = {
    //     "time" : {
    //         "monday" :
    //         {
    //             "07:00" : true,
    //             "08:00" : true,
    //             "09:00" : true,
    //             "10:00" : false,
    //             "11:00" : false,
    //             "12:00" : false,
    //             "13:00" : false,
    //             "14:00" : false,
    //             "15:00" : false,
    //             "16:00" : false,
    //             "17:00" : false,
    //             "18:00" : true,
    //             "19:00" : false
    //         },
    //         "tuesday" :
    //         {
    //             "07:00" : true,
    //             "08:00" : true,
    //             "09:00" : true,
    //             "10:00" : false,
    //             "11:00" : false,
    //             "12:00" : false,
    //             "13:00" : false,
    //             "14:00" : false,
    //             "15:00" : false,
    //             "16:00" : false,
    //             "17:00" : false,
    //             "18:00" : false,
    //             "19:00" : false
    //         },
    //         "wednesday" :
    //         {
    //             "07:00" : true,
    //             "08:00" : true,
    //             "09:00" : true,
    //             "10:00" : false,
    //             "11:00" : false,
    //             "12:00" : false,
    //             "13:00" : false,
    //             "14:00" : false,
    //             "15:00" : false,
    //             "16:00" : false,
    //             "17:00" : false,
    //             "18:00" : false,
    //             "19:00" : false
    //         },
    //         "thursday" :
    //         {
    //             "07:00" : true,
    //             "08:00" : true,
    //             "09:00" : true,
    //             "10:00" : false,
    //             "11:00" : false,
    //             "12:00" : false,
    //             "13:00" : false,
    //             "14:00" : false,
    //             "15:00" : false,
    //             "16:00" : false,
    //             "17:00" : false,
    //             "18:00" : false,
    //             "19:00" : false
    //         },
    //         "friday" :
    //         {
    //             "07:00" : true,
    //             "08:00" : true,
    //             "09:00" : true,
    //             "10:00" : false,
    //             "11:00" : false,
    //             "12:00" : false,
    //             "13:00" : false,
    //             "14:00" : false,
    //             "15:00" : false,
    //             "16:00" : false,
    //             "17:00" : false,
    //             "18:00" : false,
    //             "19:00" : false
    //         }
    //     }
    // };

    // updateJsonData(updatedData)
    updateJsonData(upData);
});