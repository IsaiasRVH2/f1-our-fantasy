const AuthCard = ({ title, children }) => {
  return (
    <div className="w-full max-w-md bg-slate-800 border-t-4 border-red-600 p-8 rounded-lg shadow-2xl">
      <h2 className="text-3xl font-black text-white uppercase italic mb-6 text-center tracking-tighter">
        {title}
      </h2>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

export default AuthCard;