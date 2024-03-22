import WaveLogicalOperator from "../classes/logicalOperator";

declare global {
    type LogicalOperatorHandler = (data: any, compareWith: any) => boolean;

    interface iWaveRuntimeStore {
        logicalOperators: WaveLogicalOperator[];
    }
}