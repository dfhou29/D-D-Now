import OptionCard from "./OptionCard";

export default function OptionCardGroup({
  optionName,
  label,
  items,
  character,
  setCharacter,
  register,
  setValue,
}) {
  const handleUpdateItem = (event, index) => {
    const value = event.target.value;
    const storedItems = [...items];
    storedItems[index] = value;
    // console.log(storedItems);
    setCharacter((prev) => ({
      ...prev,
      [optionName]: storedItems,
    }));
    setValue(optionName, storedItems);
  };

  // const handleUpdateIteminObj = (event, innerIndex, level) => {
  //   const value = event.target.value;
  //   const storedItems = { ...items };

  //   if (storedItems[level]) {
  //     storedItems[level][innerIndex] = value;
  //     console.log(storedItems[level][innerIndex]);
  //     console.log("value", value);
  //   }

  //   setCharacter((prev) => ({
  //     ...prev,
  //     [optionName]: [...storedItems],
  //   }));
  // };

  const handleDeleteItem = (index) => {
    const storedItems = [...items];

    storedItems.splice(index, 1);

    setCharacter((prev) => ({
      ...prev,
      [optionName]: [...storedItems],
    }));

    setValue(optionName, storedItems);
  };

  const handleAddItem = () => {
    const storedItems = [...items, ""];

    setCharacter((prev) => ({
      ...prev,
      [optionName]: [...storedItems],
    }));

    setValue(optionName, storedItems);
  };

  const renderArr = () => {
    return character[optionName].map((item, index) => (
      <OptionCard
        register={register}
        index={index}
        key={index}
        value={item}
        label={optionName}
        handleUpdateItem={handleUpdateItem}
        handleDeleteItem={handleDeleteItem}
      />
    ));
  };

  // const renderObj = () => {
  //   return Object.keys(character[optionName]).map((level, outerIndex) => (
  //     <div key={outerIndex}>
  //       <label>
  //         <span>{level}</span>
  //         {character[optionName][level].map((spell, innerIndex) => (
  //           <OptionCard
  //             optionName={optionName}
  //             register={register}
  //             key={innerIndex}
  //             index={innerIndex}
  //             value={spell}
  //             onChange={(event) =>
  //               handleUpdateIteminObj(event, innerIndex, level)
  //             }
  //             onDelete={null}
  //           />
  //         ))}
  //       </label>
  //     </div>
  //   ));
  // };

  return (
    <div>
      <label>
        <p>{label}</p>
        {renderArr()}
      </label>
      <button type="button" onClick={handleAddItem}>
        Add {label}
      </button>
    </div>
  );
}
