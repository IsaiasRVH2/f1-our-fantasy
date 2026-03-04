import ConnectionStatus from '../components/base/ConnectionStatus';

const HealthCheck = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tighter uppercase italic">
          F1 Fantasy TCG
        </h1>
        <p className="text-slate-400 font-mono">Telemetry System Check...</p>
      </header>
      
      <main className="bg-slate-900 p-6 rounded-lg border border-slate-800 shadow-2xl">
        <ConnectionStatus />
      </main>
      
      <footer className="mt-12 text-slate-500 text-sm font-light">
        Developed by Isaias Ricardo Valdivia - 2026
      </footer>
    </div>
  );
};

export default HealthCheck;