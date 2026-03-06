const DriverCard = ({ driver }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl hover:border-emerald-500/50 transition-colors">
      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
        {driver.team_name}
      </div>
      <div className="text-lg font-bold text-white">
        {driver.full_name}
      </div>
      <div className="text-sm text-emerald-400 mt-2 font-mono">
        [{driver.abbreviation}]
      </div>
    </div>
  );
};

export default DriverCard;