import React, { useState } from "react";
import ALU from "./ALU";
import ControlUnit from "./ControlUnit";
import Memory from "./Memory";
import { VonNeumannCalculator } from "../von-neumann-calculator/von-neumann-calculator";
import { convertExpression } from "../utils/expression-converter";
import { IComponentsState } from "../interfaces/components-state";

const Calculator: React.FC = () => {
  const initialSteps: IComponentsState[] = [
    {
      display: "",
      memory: {
        "0000": null,
        "0001": null,
        "0010": null,
        "0011": null,
        "0100": null,
        "0101": null,
        "0110": null,
        "0111": null,
        "1000": null,
        "1001": null,
        "1010": null,
        "1011": null,
        "1100": null,
        "1101": null,
        "1110": null,
        "1111": null,
      },
      address_memory_on: null,
      pc: "0000",
      pc_on: false,
      mar: "0000",
      mar_on: false,
      ibr: "00000000",
      ibr_on: false,
      ir: "00000000",
      ir_on: false,
      ac: "00000000",
      ac_on: false,
      cal_on: false,
      codop: null,
      codop_on: false,
      re: "00000000",
      re_on: false,
      pc_mar: false,
      mar_memory: false,
      memory_mbr: false,
      mbr_ibr: false,
      ibr_ir: false,
      mbr_cal: false,
      ac_cal: false,
      cal_ac: false,
      cal_mbr: false,
    },
  ];

  const [steps, setSteps] = useState<IComponentsState[]>(initialSteps);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [hasExecuted, setHasExecuted] = useState(false);

  const handleExecute = () => {
    if (hasExecuted) return;

    const vonNeumannCalculator = new VonNeumannCalculator();
    const expression = convertExpression(inputValue);

    const newSteps = [...initialSteps];
    setSteps(newSteps);
    setCurrentStepIndex(0);

    if (vonNeumannCalculator.loadProgram(expression, newSteps)) {
      vonNeumannCalculator.run(newSteps);
      setSteps(newSteps);
      setHasExecuted(true); // Marca como ejecutado para evitar múltiples ejecuciones
    } else {
      alert("Error al cargar el programa. Verifica la expresión ingresada.");
    }
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const currentStep = steps[currentStepIndex];

  return (
    <div className="calculator">
      <div className="input-section">
        <input
          type="text"
          placeholder="Ingresa una instrucción (e.g., 1+1)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleExecute}>Ejecutar</button>
        <button onClick={handlePrev} disabled={currentStepIndex === 0}>
          Atrás
        </button>
        <button
          onClick={handleNext}
          disabled={currentStepIndex === steps.length - 1}
        >
          Siguiente
        </button>
      </div>
      <div className="components-grid">
        <div className="left-column">
          <ALU output={currentStep.ac} isActive={currentStep.ac_on} />
          <ControlUnit
            pc={currentStep.pc}
            mar={currentStep.mar}
            ir={currentStep.ir}
            ibr={currentStep.ibr}
            pcActive={currentStep.pc_on}
            marActive={currentStep.mar_on}
            irActive={currentStep.ir_on}
            ibrActive={currentStep.ibr_on}
          />
        </div>
        <div className="right-column">
          <Memory
            content={currentStep.memory}
            activeCell={currentStep.address_memory_on || ""}
          />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
