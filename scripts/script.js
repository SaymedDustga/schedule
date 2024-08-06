const mod_button = document.getElementById("modificar");
const save_button = document.getElementById("guardar");
const url = "https://saymeddustga.github.io/schedule/schedule.json";
//const url = "schedule.json";

const red = "#FFB7B2";
const green = "#B7D1B9";

document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        Object.entries(data).forEach(([day, schedule]) => {
            Object.entries(schedule).forEach(([time, available]) => {
                const noSpacesTime = time.replace(/\s/g, "").replace(/:/g, "");
                const selectorString = `table tr > td#${day}${noSpacesTime.toLowerCase()} > input[type="checkbox"]`;
                const checkbox = document.querySelector(selectorString);

                if (available) {
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

save_button.addEventListener("click", function() {
    const checkboxs = document.querySelectorAll('table input[type="checkbox"]');
    checkboxs.forEach((element) => {
        element.style.visibility = "hidden";
    })
    save_button.disabled = true;
    mod_button.disabled = false;
});