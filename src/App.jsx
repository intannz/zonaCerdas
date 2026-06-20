import AppRouter from './routes/AppRouter';
// TODO: Uncomment saat AuthContext sudah selesai dibuat
// import { AuthProvider } from './shared/contexts/AuthContext';

function App() {
  return (
    // <AuthProvider>
      <AppRouter />
    // </AuthProvider>
  );
}

export default App;