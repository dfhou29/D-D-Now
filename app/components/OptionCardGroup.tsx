import OptionCard from "./OptionCard";

export default function OptionCardGroup({
  optionName,
  label,
  register,
  setValue,
  getValues,
}) {
  const handleUpdateItem = (event, index) => {
    const currentItems = getValues(optionName);
    console.log("currentItems:", currentItems);
    const inputValue = event.target.value;
    const updatedItems = [...currentItems];
    console.log("updateditem -update", updatedItems);
    updatedItems[index] = inputValue;
    console.log("updateditem -after-update", updatedItems);
    // setValue(`${optionName}[${index}]`, inputValue);
    setValue(optionName, updatedItems);
    console.log(getValues());
  };

  const handleDeleteItem = (e, index) => {
    e.preventDefault();
    console.log(optionName);
    const currentItems = getValues(optionName);
    console.log("currentItems:", currentItems);
    const updatedItems = currentItems.filter((element, i) => i !== index);
    console.log("updateditem -after-update", updatedItems);
    setValue(optionName, updatedItems);
    console.log(getValues());
  };

  const handleAddItem = () => {
    const currentItems = getValues(optionName) || [];
    console.log("currentItems:", currentItems);
    const updatedItems = [...currentItems, ""];
    setValue(optionName, updatedItems);
  };

  const renderArr = () => {
    const currentItems = getValues(optionName);
    return currentItems.map((item, index) => (
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
