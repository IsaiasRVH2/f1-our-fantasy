import ConnectionStatus from './components/base/ConnectionStatus';

function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
          F1 Fantasy TCG
        </h1>
        <p className="text-slate-600">Checking backend connection</p>
      </header>
      
      <main>
        <ConnectionStatus />
      </main>
      
      <footer className="mt-12 text-slate-400 text-sm">
        Developed by Isaias Ricardo Valdivia - 2026
      </footer>
    </div>
  );
}

export default App;