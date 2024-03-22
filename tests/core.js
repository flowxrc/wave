import * as colorette from "colorette";

function runTest(method, target, ...args) {
    const startTime = Date.now();
    const returnedValue = method(...args);
    const result = returnedValue === target;

    console.log(colorette.green("[Test]"), method.name, result ? colorette.green("completed") : colorette.red("failed"),
    "in", colorette.yellowBright(Date.now() - startTime), colorette.gray("ms"),
    colorette.gray("\nExpected result:"), target, colorette.gray("\nActual result:"), returnedValue, "\n");

    return result;
};

function expect(method) {
    return {
        toBe: function (target) {
            return runTest(method, target);
        },
        withParams: function (...args) {
            return {
                toBe: function(target) {
                    return runTest(method, target, ...args);
                }
            }
        }
    }
};

export default expect;