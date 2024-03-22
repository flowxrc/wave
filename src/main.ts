import WaveApp from "./classes/app.ts";
import WaveLogicalOperator from "./classes/logicalOperator.ts";
import WaveRuntimeStore from "./runtimeStore.ts";

function initializeLogicalOperators() {
    WaveRuntimeStore.logicalOperators.push(new WaveLogicalOperator(" = ", (data, compareWith) => {
        return data == compareWith;
    }));
    
    WaveRuntimeStore.logicalOperators.push(new WaveLogicalOperator(" > ", (data, compareWith) => {
        return data > compareWith;
    }));
    
    WaveRuntimeStore.logicalOperators.push(new WaveLogicalOperator(" >= ", (data, compareWith) => {
        return data >= compareWith;
    }));
    
    WaveRuntimeStore.logicalOperators.push(new WaveLogicalOperator(" < ", (data, compareWith) => {
        return data < compareWith;
    }));
    
    WaveRuntimeStore.logicalOperators.push(new WaveLogicalOperator( " <= ", (data, compareWith) => {
        return data <= compareWith;
    }));
};

initializeLogicalOperators();

// For bundling
export default WaveApp;