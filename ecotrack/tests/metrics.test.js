import test from "node:test";
import assert from "node:assert/strict";

import {
    clamp,
    calculateMetrics,
    getScoreDescription
} from "../metrics.js";

test("clamp limita valores inferiores", () => {

    assert.equal(
        clamp(-10, 0, 100),
        0
    );

});

test("clamp limita valores superiores", () => {

    assert.equal(
        clamp(150, 0, 100),
        100
    );

});

test("clamp mantém valores dentro do intervalo", () => {

    assert.equal(
        clamp(50, 0, 100),
        50
    );

});

test("calcula consumo de água por pessoa", () => {

    const result =
        calculateMetrics({
            water: 12,
            energy: 180,
            people: 3
        });

    assert.equal(
        result.waterPerPerson,
        133.33333333333334
    );

});

test("calcula consumo de energia por pessoa", () => {

    const result =
        calculateMetrics({
            water: 12,
            energy: 180,
            people: 3
        });

    assert.equal(
        result.energyPerPerson,
        2
    );

});

test("calcula custo mensal", () => {

    const result =
        calculateMetrics({
            water: 12,
            energy: 200,
            people: 2
        });

    assert.equal(
        result.monthlyCost,
        226.4
    );

});

test("pontuação permanece entre 0 e 100", () => {

    const result =
        calculateMetrics({
            water: 30,
            energy: 600,
            people: 1
        });

    assert.ok(
        result.score >= 0 &&
        result.score <= 100
    );

});

test("classifica desempenho excelente", () => {

    const result =
        getScoreDescription(90);

    assert.equal(
        result.title,
        "Excelente desempenho"
    );

});

test("classifica desempenho intermediário", () => {

    const result =
        getScoreDescription(70);

    assert.equal(
        result.title,
        "Bom desempenho"
    );

});

test("classifica desempenho baixo", () => {

    const result =
        getScoreDescription(30);

    assert.equal(
        result.title,
        "Necessidade de redução"
    );

});
