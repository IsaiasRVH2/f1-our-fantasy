const Input = ({ label, error, ...props }) => {
  return (
    <div className="flex flex-col w-full space-y-1">
      {label && (
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full p-3 rounded bg-slate-700 border-2 transition-all outline-none text-white
          ${error ? 'border-red-500' : 'border-transparent focus:border-red-600'}`}
      />
      {error && <span className="text-red-500 text-[10px] font-bold uppercase">{error}</span>}
    </div>
  );
};

export default Input;