"use client";

export default function FormOption({ title, selections, value, onChange }) {
  return (
    <div className="flex flex-row justify-start">
      <label htmlFor={title} className="text-grey-700 text-sm font-bold mb-2">
        {title}:
      </label>
      <select
        name={title}
        id={title}
        value={value}
        onChange={onChange}
        className="w-40"
      >
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
    </div>
  );
}
