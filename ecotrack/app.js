import {
    calculateMetrics,
    clamp,
    getScoreDescription
} from "./metrics.js";

const defaults = {
    water: 12.4,
    energy: 185,
    people: 3
};

const water = document.getElementById("water");
const energy = document.getElementById("energy");
const people = document.getElementById("people");

const waterValue = document.getElementById("waterValue");
const energyValue = document.getElementById("energyValue");
const costValue = document.getElementById("costValue");

const waterOutput = document.getElementById("waterOutput");
const energyOutput = document.getElementById("energyOutput");
const peopleOutput = document.getElementById("peopleOutput");

const waterProgress =
    document.getElementById("waterProgress");

const energyProgress =
    document.getElementById("energyProgress");

const costProgress =
    document.getElementById("costProgress");

const score =
    document.getElementById("score");

const scoreCircle =
    document.getElementById("scoreCircle");

const scoreTitle =
    document.getElementById("scoreTitle");

const scoreDescription =
    document.getElementById("scoreDescription");

const waterPerPerson =
    document.getElementById("waterPerPerson");

const energyPerPerson =
    document.getElementById("energyPerPerson");

const recommendation =
    document.getElementById("recommendation");

const message =
    document.getElementById("message");

function formatCurrency(value) {

    return value.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL",
            maximumFractionDigits: 0
        }
    );
}

function render() {

    const values = {
        water: Number(water.value),
        energy: Number(energy.value),
        people: Number(people.value)
    };

    const metrics = calculateMetrics(values);

    waterValue.textContent =
        `${values.water.toFixed(1).replace(".", ",")} m³`;

    energyValue.textContent =
        `${values.energy} kWh`;

    costValue.textContent =
        formatCurrency(metrics.monthlyCost);

    waterOutput.textContent =
        `${values.water.toFixed(1).replace(".", ",")} m³`;

    energyOutput.textContent =
        `${values.energy} kWh`;

    peopleOutput.textContent =
        `${values.people} ${
            values.people === 1
                ? "pessoa"
                : "pessoas"
        }`;

    waterProgress.style.width =
        `${clamp(
            values.water / 30 * 100,
            0,
            100
        )}%`;

    energyProgress.style.width =
        `${clamp(
            values.energy / 600 * 100,
            0,
            100
        )}%`;

    costProgress.style.width =
        `${clamp(
            metrics.monthlyCost / 500 * 100,
            0,
            100
        )}%`;

    score.textContent =
        metrics.score;

    const degrees =
        metrics.score * 3.6;

    scoreCircle.style.background =
        `conic-gradient(
            var(--primary) 0deg,
            var(--primary) ${degrees}deg,
            var(--border) ${degrees}deg,
            var(--border) 360deg
        )`;

    const description =
        getScoreDescription(metrics.score);

    scoreTitle.textContent =
        description.title;

    scoreDescription.textContent =
        description.description;

    waterPerPerson.textContent =
        `${Math.round(
            metrics.waterPerPerson
        )} L`;

    energyPerPerson.textContent =
        `${metrics.energyPerPerson.toFixed(1).replace(".", ",")} kWh`;

    if (metrics.waterPerPerson > 140) {

        recommendation.textContent =
            "Recomenda-se reduzir o consumo de água, principalmente durante o banho e atividades domésticas.";

    } else if (metrics.energyPerPerson > 3) {

        recommendation.textContent =
            "Recomenda-se reduzir o consumo de energia por meio do uso mais eficiente dos equipamentos.";

    } else {

        recommendation.textContent =
            "O consumo estimado está dentro de uma faixa adequada. Continue acompanhando os indicadores.";

    }
}

function restoreDefaults() {

    water.value = defaults.water;
    energy.value = defaults.energy;
    people.value = defaults.people;

    render();

    message.textContent =
        "Valores padrão restaurados.";
}

function saveSimulation() {

    const data = {
        water: Number(water.value),
        energy: Number(energy.value),
        people: Number(people.value)
    };

    localStorage.setItem(
        "ecotrack-simulation",
        JSON.stringify(data)
    );

    message.textContent =
        "Simulação salva no navegador.";
}

function loadSimulation() {

    try {

        const saved =
            JSON.parse(
                localStorage.getItem(
                    "ecotrack-simulation"
                )
            );

        if (!saved) {
            return;
        }

        water.value =
            clamp(saved.water, 2, 30);

        energy.value =
            clamp(saved.energy, 50, 600);

        people.value =
            clamp(saved.people, 1, 8);

    } catch {

        localStorage.removeItem(
            "ecotrack-simulation"
        );
    }
}

water.addEventListener("input", render);
energy.addEventListener("input", render);
people.addEventListener("input", render);

document
    .getElementById("resetButton")
    .addEventListener(
        "click",
        restoreDefaults
    );

document
    .getElementById("saveButton")
    .addEventListener(
        "click",
        saveSimulation
    );

document
    .getElementById("themeButton")
    .addEventListener(
        "click",
        () => {

            document.body.classList.toggle("dark");

            const dark =
                document.body.classList.contains("dark");

            localStorage.setItem(
                "ecotrack-theme",
                dark ? "dark" : "light"
            );
        }
    );

if (
    localStorage.getItem("ecotrack-theme") === "dark"
) {
    document.body.classList.add("dark");
}

loadSimulation();
render();
