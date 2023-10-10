"use client";

export default function FormOption({ title, selections, value, onChange }) {
  return (
    <div className="">
      <label
        htmlFor={title}
        className="text-gray-600 text-md font-bold mb-2 self-start capitalize"
      >
        {title}
      </label>
      <select
        name={title}
        id={title}
        value={value}
        onChange={onChange}
        className="block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
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
