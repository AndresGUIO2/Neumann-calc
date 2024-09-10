import React from 'react';

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
