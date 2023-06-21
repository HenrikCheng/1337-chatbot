const IngridientInput = ({ value, onChange }) => {
  return (
    <div className="flex flex-row items-start">
      <input
        type="text"
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white block w-full p-2.5"
        placeholder="Ingridiens"
        required
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default IngridientInput;
