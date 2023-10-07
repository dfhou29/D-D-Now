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
            <label className="text-1xl">{key}</label>
            <NestedObject
              obj={value}
              path={currentPath}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          </div>
        ) : (
          <div key={key} className="flex flex-row justify-center">
            <label className="text-1xl">{key}</label>
            {/* <input
              type="text"
              value={value as string}
              onChange={(event) => handleUpdate(event, currentPath)}
            /> */}
            <p>{value as string}</p>
            <button
              className="bg-gray-500 hover:bg-blue-700 text-white py-2 px-3 rounded-full"
              onClick={() => handleDelete(currentPath)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
