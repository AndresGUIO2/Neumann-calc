import React from 'react';

interface MemoryProps {
  content: { [key: string]: string | null };
  activeCell: string | null;
}

const Memory: React.FC<MemoryProps> = ({ content, activeCell }) => {
  return (
    <div className="component memory">
      <h2>Memoria Principal</h2>
      <table>
        <thead>
          <tr>
            <th>Dirección</th>
            <th>Instrucción</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(content).sort().map((address) => (
            <tr
              key={address}
              className={address === activeCell ? 'active' : ''}
            >
              <td>{address}</td>
              <td>{content[address] !== null ? content[address] : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Memory;
