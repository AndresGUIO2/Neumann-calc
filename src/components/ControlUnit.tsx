import React from 'react';

interface ControlUnitProps {
  pc: string;
  mar: string;
  ir: string;
  ibr: string;
  pcActive: boolean;
  marActive: boolean;
  irActive: boolean;
  ibrActive: boolean;
}

const ControlUnit: React.FC<ControlUnitProps> = ({
  pc,
  mar,
  ir,
  ibr,
  pcActive,
  marActive,
  irActive,
  ibrActive,
}) => {
  return (
    <div className="component control-unit">
      <h2>Unidad de Control</h2>
      <div className={`register pc ${pcActive ? 'active' : ''}`}>
        <span>PC:</span> {pc}
      </div>
      <div className={`register mar ${marActive ? 'active' : ''}`}>
        <span>MAR:</span> {mar}
      </div>
      <div className={`register ir ${irActive ? 'active' : ''}`}>
        <span>IR:</span> {ir}
      </div>
      <div className={`register ibr ${ibrActive ? 'active' : ''}`}>
        <span>IBR:</span> {ibr}
      </div>
    </div>
  );
};

export default ControlUnit;
