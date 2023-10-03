"use client";

export default function FormOption({ title, selections, value, onChange }) {
  return (
    <>
      <label htmlFor={title}>{title}: </label>
      <select name={title} id={title} value={value} onChange={onChange}>
        {selections.map((selection, index) => {
          if (selection.optgroup) {
            return (
              <optgroup label={selection.optgroup} key={index}>
                {selection.options &&
                  selection.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
              </optgroup>
            );
          } else {
            return selection.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ));
          }
        })}
      </select>
    </>
  );
}
