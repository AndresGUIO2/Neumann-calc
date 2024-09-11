import React from 'react';

/**
 * The ALU component is a React functional component that displays the output value and can be styled
 * based on its active state.
 * @param  - The ALU component takes in two props:
 * @returns The ALU component is being returned. It is a functional React component that displays the
 * ALU (Arithmetic Logic Unit) with its output value and an active/inactive state based on the
 * `isActive` prop.
 */
interface ALUProps {
  output: string;
  isActive: boolean;
}

const ALU: React.FC<ALUProps> = ({ output, isActive }) => {
  return (
    <div className={`component alu ${isActive ? 'active' : ''}`}>
      <h2>ALU</h2>
      <div className="output">AC: {output}</div>
    </div>
  );
};

export default ALU;
