import React from 'react';

export default ({ index, isOn, onChange, colorOne, colorTwo }) => {
  const style = `
    .switch-checkbox${index} {
      height: 0;
      width: 0;
      visibility: hidden;
    }
    
    .switch-label${index} {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      width: 50px;
      height: 30px;
      background: grey;
      border-radius: 100px;
      position: relative;
      transition: background-color .2s;
    }
    
    .switch-label${index} .switch-button${index} {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: 25px;
      height: 25px;
      border-radius: 45px;
      transition: 0.2s;
      background: #fff;
      box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
    }
    
    .switch-checkbox${index}:checked + .switch-label${index} .switch-button${index} {
      left: calc(100% - 2px);
      transform: translateX(-100%);
    }
    
    .switch-label${index}:active .switch-button${index} {
      width: 25px;
    }
  `;

  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <style>{style}</style>
      <input
        checked={isOn}
        onChange={onChange}
        className={`switch-checkbox${index}`}
        id={`switch${index}`}
        type="checkbox"
      />
      <label
        style={{ background: isOn ? colorOne : colorTwo }}
        className={`switch-label${index} shadow`}
        htmlFor={`switch${index}`}
      >
        <span className={`switch-button${index}`} />
      </label>
    </div>
  );
};