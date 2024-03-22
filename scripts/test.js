// Wave
import WaveStore from "../dist/compiled/classes/store.js";
import WaveParser from "../dist/compiled/extra/parser.js";

// Test core
import expect from "../tests/core.js";

// Testing store
const testStore = new WaveStore({
    data: {
        count: 10
    }
});

// Tests
expect(WaveParser.parseArgument).withParams("x", testStore).toBe(undefined);
expect(WaveParser.parseArgument).withParams("count", testStore).toBe(10);
expect(WaveParser.parseArgument).withParams("true", testStore).toBe(true);
expect(WaveParser.parseArgument).withParams("false", testStore).toBe(false);