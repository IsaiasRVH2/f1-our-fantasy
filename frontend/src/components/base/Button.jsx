const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      {...props}
      className={`w-full bg-red-600 hover:bg-red-700 active:transform active:scale-95 
      text-white font-black uppercase py-3 px-6 rounded transition-all duration-200 
      shadow-lg shadow-red-900/20 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;