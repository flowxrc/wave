import WaveApp from "./classes/app";
import WaveLogicalOperator from "./classes/logicalOperator";
import WaveRuntimeStore from "./runtimeStore";

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
new WaveApp();