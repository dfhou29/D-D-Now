export default function NestedObject({
  obj,
  handleUpdate,
  handleDelete,
  path,
}) {
  return (
    <div>
      {Object.entries(obj).map(([key, value]) => {
        const currentPath = [...path, key];

        return typeof value === "object" ? (
          <div key={key}>
            <label>{key}</label>
            <NestedObject
              obj={value}
              path={currentPath}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
            {/* <button onClick={() => handleDelete(currentPath)}>Delete</button> */}
          </div>
        ) : (
          <div key={key}>
            <label>{key}</label>
            <input
              type="text"
              value={value as string}
              onChange={(event) => handleUpdate(event, currentPath)}
            />
            <button onClick={() => handleDelete(currentPath)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}
