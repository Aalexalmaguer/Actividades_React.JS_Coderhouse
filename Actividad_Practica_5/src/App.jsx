import React, { useState, createContext, useContext } from 'react';

// --- Constantes y Datos Iniciales ---

// Opciones de prioridad para el dropdown
// Usado por Task y Select
const PRIORITY_OPTIONS = [
  { id: 'opt-1', text: 'Baja', value: '1' },
  { id: 'opt-2', text: 'Media', value: '2' },
  { id: 'opt-3', text: 'Alta', value: '3' },
];

// Datos de ejemplo
const INITIAL_TASKS = [
  { id: 1, text: 'Configurar el enrutador', completed: false, priority: '2' },
  { id: 2, text: 'Crear componente Login', completed: true, priority: '3' },
  { id: 3, text: 'Refactorizar el Select', completed: false, priority: '1' },
];

// --- Contexto para las Tareas (Implícito en Act 3) ---
const TasksContext = createContext();

// --- Componente Select (Actividad 4) ---
// Componente reutilizable para el dropdown
const Select = ({ options, defaultValue, onSelect }) => {
  return (
    <select
      className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e) => onSelect(e.target.value)}
      value={defaultValue}
    >
      {options.map((option) => (
        <option key={option.id} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

// --- Componente Button (Implícito en Act 3) ---
// Un componente de botón reutilizable
const Button = ({ children, onClick, colorClass = 'bg-blue-500 hover:bg-blue-600' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-semibold text-white rounded-md transition-colors duration-200 ${colorClass}`}
    >
      {children}
    </button>
  );
};

// --- Componente Task (Actividad 3, modificado por Act 4) ---
// Muestra una sola tarea y usa el componente Select refactorizado.
const Task = ({ task }) => {
  const { id, text, completed, priority } = task;
  const { handleChangeTaskState, handleChangeTaskPriority } = useContext(TasksContext);

  const handlePriorityChange = (newPriority) => {
    handleChangeTaskPriority(id, newPriority);
  };

  const handleToggleComplete = () => {
    handleChangeTaskState(id);
  };

  return (
    <article className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white shadow-md rounded-lg gap-4">
      <div className="flex-1">
        <h3 className={`text-lg font-medium ${completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {text}
        </h3>
      </div>
      <div className="w-full sm:w-32">
        {/* Aquí usamos el componente Select refactorizado de la Actividad 4 */}
        <Select
          options={PRIORITY_OPTIONS}
          defaultValue={priority}
          onSelect={handlePriorityChange}
        />
      </div>
      <div className="w-full sm:w-auto">
        <Button
          onClick={handleToggleComplete}
          colorClass={completed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'}
        >
          {completed ? 'Pendiente' : 'Completar'}
        </Button>
      </div>
    </article>
  );
};

// --- Componente TodoList (Actividad 1 y 3) ---
// Muestra la lista de tareas y provee el contexto
const TodoList = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const handleChangeTaskPriority = (taskId, newPriority) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, priority: newPriority } : task
    ));
    console.log(`Cambiando prioridad de tarea ${taskId} a ${newPriority}`);
  };

  const handleChangeTaskState = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <TasksContext.Provider value={{ tasks, handleChangeTaskState, handleChangeTaskPriority }}>
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Mis Tareas</h2>
        {tasks.map(task => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </TasksContext.Provider>
  );
};

// --- Componente Home (Actividad 1) ---
const Home = () => (
  <div>
    <h2 className="text-3xl font-bold text-gray-800">Bienvenido a tu App de Tareas</h2>
    <p className="mt-4 text-lg text-gray-600">
      Usa la barra de navegación para moverte entre tus tareas o para iniciar sesión.
    </p>
  </div>
);

// --- Componente Login (Actividad 2) ---
// Formulario de inicio de sesión que guarda el estado de los inputs.
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos de login:', { email, password });
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <Button type="submit" colorClass="w-full bg-blue-600 hover:bg-blue-700">
          Login
        </Button>
      </form>
    </div>
  );
};

// --- Componente NavButton (Helper para Navbar) ---
// ¡Movido FUERA del componente Navbar para evitar el error!
const NavButton = ({ page, setPage, children }) => (
  <button
    onClick={() => setPage(page)}
    className="text-lg font-medium text-gray-100 hover:text-white px-3 py-2 rounded-md transition-colors"
  >
    {children}
  </button>
);

// --- Componente Navbar (Actividad 1) ---
// Barra de navegación para cambiar entre "páginas"
const Navbar = ({ setPage }) => {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg mb-8">
      <div className="container mx-auto flex justify-center space-x-4">
        {/* Ahora usa el componente NavButton corregido */}
        <NavButton page="home" setPage={setPage}>Home</NavButton>
        <NavButton page="tasks" setPage={setPage}>Tasks</NavButton>
        <NavButton page="login" setPage={setPage}>Login</NavButton>
      </div>
    </nav>
  );
};

// --- Componente Principal App ---
// Este componente gestiona la navegación principal
export default function App() {
  const [page, setPage] = useState('home');

  // Función para renderizar el contenido de la página actual
  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home />;
      case 'tasks':
        return <TodoList />;
      case 'login':
        return <Login />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar setPage={setPage} />
      <main className="container mx-auto p-4">
        {renderPage()}
      </main>
    </div>
  );
}