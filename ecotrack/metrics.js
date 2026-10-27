export function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

export function calculateMetrics({
    water,
    energy,
    people
}) {

    const residents = Math.max(
        1,
        Number(people) || 1
    );

    const waterConsumption =
        Math.max(0, Number(water) || 0);

    const energyConsumption =
        Math.max(0, Number(energy) || 0);

    const waterPerPerson =
        waterConsumption * 1000 / 30 / residents;

    const energyPerPerson =
        energyConsumption / 30 / residents;

    /*
     * Valores utilizados apenas para demonstração.
     */

    const waterPrice = 5.20;
    const energyPrice = 0.82;

    const monthlyCost =
        waterConsumption * waterPrice +
        energyConsumption * energyPrice;

    const possibleSavings =
        Math.max(0, waterConsumption - 10) * waterPrice +
        Math.max(0, energyConsumption - 150) * energyPrice;

    const waterScore =
        clamp(
            100 -
            Math.max(0, waterPerPerson - 100) * 0.35,
            0,
            100
        );

    const energyScore =
        clamp(
            100 -
            Math.max(0, energyPerPerson - 2) * 12,
            0,
            100
        );

    const score = Math.round(
        clamp(
            (waterScore + energyScore) / 2,
            0,
            100
        )
    );

    return {
        waterPerPerson,
        energyPerPerson,
        monthlyCost,
        possibleSavings,
        score
    };
}

export function getScoreDescription(score) {

    if (score >= 80) {

        return {
            title: "Excelente desempenho",
            description:
                "O consumo estimado apresenta bons níveis de eficiência."
        };

    }

    if (score >= 60) {

        return {
            title: "Bom desempenho",
            description:
                "Pequenos ajustes podem melhorar ainda mais a eficiência."
        };

    }

    return {
        title: "Necessidade de redução",
        description:
            "O consumo estimado está acima dos parâmetros recomendados."
    };
}
