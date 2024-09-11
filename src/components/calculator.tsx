import React, { useState } from "react";
import ALU from "./ALU";
import ControlUnit from "./ControlUnit";
import Memory from "./Memory";
import { VonNeumannCalculator } from "../von-neumann-calculator/von-neumann-calculator";
import { convertExpression } from "../utils/expression-converter";
import { IComponentsState } from "../interfaces/components-state";

/**
 * The `Calculator` function in TypeScript React sets up a simulation of a Von Neumann calculator with
 * step-by-step execution and memory visualization.
 * @returns The `Calculator` component is being returned. It is a functional component in React that
 * renders a calculator interface. The component includes input for entering instructions, buttons for
 * executing, navigating through steps, and displays various components like ALU, ControlUnit, and
 * Memory based on the current step data.
 */
const Calculator: React.FC = () => {
  const initialSteps: IComponentsState[] = [
    {
      display: "", // Este es el atributo que se mostrará en el input cuando la calculadora se esté ejecutando.
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
  const [inputReadOnly, setInputReadOnly] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(true);

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

  // Función para recargar la página
  const handleRefresh = () => {
    window.location.reload();
  };

  const currentStep = steps[currentStepIndex];

  return (
    <div className="calculator">
      <div className="input-section">
        <input
          type="text"
          placeholder="Ingresa una instrucción (e.g., 1+1)"
          value={currentStep.display ? currentStep.display : inputValue}
          onChange={(e) => {
            const regex = /^(?![-+*/\.])(?!.*[-+*/\.]{2})[-+*/0-9\s]*(?:\.[0-9]+[-+*/0-9\s]*)*$/;

            //const regex = /^(?!\.)[-+*/0-9\s]*(?:\.[0-9]+[-+*/0-9\s]*)*$/;

            if (regex.test(e.target.value) || e.target.value === "") {
              setInputValue(e.target.value);
              setButtonDisabled(e.target.value === "" ? true : false);
            } else {
              e.stopPropagation();
            }
          }}
          disabled={inputReadOnly || hasExecuted} // Si se ejecuta, el input es solo de lectura
        />

        <button
          onClick={() => {
            handleExecute();
            setInputReadOnly(true);
          }}
          disabled={isButtonDisabled}
        >
          Ejecutar
        </button>
        <button
          onClick={handlePrev}
          disabled={currentStepIndex === 0 || isButtonDisabled}
        >
          Atrás
        </button>
        <button
          onClick={handleNext}
          disabled={currentStepIndex === steps.length - 1 || isButtonDisabled}
        >
          Siguiente
        </button>
        <button onClick={handleRefresh}>Refrescar</button>
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