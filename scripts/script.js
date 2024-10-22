const mod_button = document.getElementById("modificar");
const save_button = document.getElementById("guardar");
// const url = "https://saymeddustga.github.io/schedule/schedule.json";
//const url = "schedule.json";
// const id = "schedule"
// const url = `http://127.0.0.1:8000/api/${id}/`;

const red = "#FFB7B2";
const green = "#B7D1B9";

const urlAPI = "http://127.0.0.1:8000/api/"
const opciones = {
    medicos: "medicos/",
    horarioMedicoSemanal: "horarioMedicoSemanal/",
    horaDia: "horaDia/",
    especialidades: "especialidades/",
    diaSemana: "diaSemana/"
 }

document.addEventListener("DOMContentLoaded", async function() {
    try {

        const responseMedicos = await fetch(urlAPI + opciones.medicos + "0/");
        const dataMedicos = await responseMedicos.json();

        const responseHorario = await fetch(urlAPI+ opciones.horarioMedicoSemanal);
        const dataHorario = await responseHorario.json();

        const filteredArr = dataHorario.filter(function(item) { return item.idMedico == dataMedicos.id; });

        // console.log(filteredArr)

        const responseHoraDia = await fetch(urlAPI + opciones.horaDia);
        const dataHoraDia = await responseHoraDia.json();

        const responseEspecialidades = await fetch(urlAPI + opciones.especialidades + dataMedicos.especialidad);
        const dataEspecialidades = await responseEspecialidades.json();

        const responseDiaSemana = await fetch(urlAPI + opciones.diaSemana);
        const dataDiaSemana = await responseDiaSemana.json();

        // console.log(dataMedicos, dataHorario, dataHoraDia, dataEspecialidades, dataDiaSemana)

        const name = document.getElementById("nombreMedico")
        name.innerText = `Horario de ${dataMedicos.name}, ${dataEspecialidades.name}`

        Object.entries(filteredArr).forEach(([number, horario]) => {
            //console.log(dataHoraDia[horario.idHoraDia])
            const noSpacesTime = dataHoraDia[horario.idHoraDia].name.replace(/\s/g, "").replace(/:/g, "");
            const selectorString = `table tr > td#${dataDiaSemana[horario.idDiaSemana].name}${noSpacesTime.toLowerCase()} > input[type="checkbox"]`;
            const checkbox = document.querySelector(selectorString);

            if (dataHoraDia[horario.idHoraDia].seLabora && dataDiaSemana[horario.idDiaSemana].seLabora)
            {
                checkbox.checked = true;
                const parent = checkbox.parentNode;
                parent.style.background = green;
                const label = this.createElement("label");
                label.textContent = "Disponible";
                parent.appendChild(label);
            } else {
                checkbox.checked = false;
                const parent = checkbox.parentNode;
                parent.style.background = red;
                const label = this.createElement("label");
                label.textContent = "No Disponible";
                parent.appendChild(label);
            }
            checkbox.style.visibility = "hidden";
            checkbox.addEventListener("change", function() {
                if (this.checked) {
                    const parent = this.parentNode;
                    parent.style.background = green;
                    parent.querySelector('label').textContent = "Disponible";
                } else {
                    const parent = this.parentNode;
                    parent.style.background = red;
                    parent.querySelector('label').textContent = "No Disponible";
                }
            });
        })
    } catch (error) {
        console.error("Error fetching or parsing JSON file:", error);
    }
});

// document.addEventListener("DOMContentLoaded", async function() {
//     try {
//         const response = await fetch(url);
//         const data = await response.json();

//         console.log(data)

//         Object.entries(data).forEach(([day, schedule]) => {
//             Object.entries(schedule).forEach(([time, available]) => {
//                 const noSpacesTime = time.replace(/\s/g, "").replace(/:/g, "");
//                 const selectorString = `table tr > td#${day}${noSpacesTime.toLowerCase()} > input[type="checkbox"]`;
//                 const checkbox = document.querySelector(selectorString);

//                 if (available) {
//                     checkbox.checked = true;
//                     const parent = checkbox.parentNode;
//                     parent.style.background = green;
//                     const label = this.createElement("label");
//                     label.textContent = "Disponible";
//                     parent.appendChild(label);

//                 } else {
//                     checkbox.checked = false;
//                     const parent = checkbox.parentNode;
//                     parent.style.background = red;
//                     const label = this.createElement("label");
//                     label.textContent = "No Disponible";
//                     parent.appendChild(label);
//                 }
//                 checkbox.style.visibility = "hidden";
//                 checkbox.addEventListener("change", function() {
//                     if (this.checked) {
//                         const parent = this.parentNode;
//                         parent.style.background = green;
//                         parent.querySelector('label').textContent = "Disponible";
//                     } else {
//                         const parent = this.parentNode;
//                         parent.style.background = red;
//                         parent.querySelector('label').textContent = "No Disponible";
//                     }
//                 });
//             });
//         });
//     } catch (error) {
//         console.error("Error fetching or parsing JSON file:", error);
//     }
// });

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
        const response = await fetch('http://127.0.0.1:8000/api/update-json/3/', {
            method: 'POST',
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
    const checkboxs = document.querySelectorAll('table input[type="checkbox"]');
    checkboxs.forEach((element) => {
        element.style.visibility = "hidden";
    })
    save_button.disabled = true;
    mod_button.disabled = false;

    const updatedData = {
        id: 3,
        name: "10:00 AM",
        seLabora: false
    };

    updateJsonData(updatedData)
});