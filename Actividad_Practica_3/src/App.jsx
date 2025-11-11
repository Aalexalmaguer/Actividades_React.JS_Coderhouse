import { useEffect, useMemo, useState } from "react";
/**
 * React ToDo – Actividades 1 a 4 (SIN Tailwind ni Framer Motion)
 * --------------------------------------------------------------
 * 1) ToDo List básico con click => completed (usa Array.map)
 * 2) Refactor: separar contenedor (lógica) y presentación (UI pura)
 * 3) Simular backend con Promesa + setTimeout (fetchTasks)
 * 4) UX: loader sencillo y manejo de errores
 *
 * Coloca este archivo como src/App.jsx en un proyecto Vite/React.
 */

// ------------------------------ Utilidades / API falsa ------------------------------
function fetchTasks({ delayMs = 900, shouldFail = false } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) return reject(new Error("No se pudo obtener el listado (simulado)."));
      resolve([
        { id: 1, text: "Repasar hooks de React", completed: false },
        { id: 2, text: "Separar UI y lógica (presentacional vs contenedor)", completed: false },
        { id: 3, text: "Simular backend con Promesa + setTimeout", completed: false },
        { id: 4, text: "Agregar loader y manejo de errores", completed: false },
      ]);
    }, delayMs);
  });
}

// Estado inicial local (Actividad 1-2)
const initialTasks = [
  { id: 101, text: "Leer enunciado de actividades", completed: false },
  { id: 102, text: "Implementar toggle con map", completed: false },
  { id: 103, text: "Aplicar estilos según estado", completed: false },
];

// ------------------------------ Componentes presentacionales ------------------------------
function Card({ children }) {
  return (
    <div style={{
      background: "#fff",
      padding: 16,
      borderRadius: 16,
      border: "1px solid #e5e7eb",
      boxShadow: "0 1px 2px rgba(0,0,0,.04)",
    }}>
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return <h3 style={{ margin: 0, fontSize: 18 }}>{children}</h3>;
}

function Muted({ children }) {
  return <p style={{ margin: "6px 0 12px", color: "#6b7280" }}>{children}</p>;
}

function Badge({ done }) {
  return (
    <span style={{
      width: 24,
      height: 24,
      borderRadius: "9999px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 12,
      fontWeight: 700,
      background: done ? "#dcfce7" : "#fef9c3",
      color: done ? "#166534" : "#854d0e",
      marginLeft: 8,
      flex: "0 0 24px",
    }}>
      {done ? "✔" : "•"}
    </span>
  );
}

function TaskItem({ task, onToggle }) {
  return (
    <li
      onClick={() => onToggle?.(task.id)}
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 12px",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        background: task.completed ? "#f3f4f6" : "#fff",
        textDecoration: task.completed ? "line-through" : "none",
        color: task.completed ? "#6b7280" : "#111827",
        cursor: "pointer",
      }}
      title="Click para completar"
    >
      <span>{task.text}</span>
      <Badge done={task.completed} />
    </li>
  );
}

function TaskList({ tasks, onToggle, showOnlyIncomplete = true, emptyLabel = "Sin tareas" }) {
  const filtered = useMemo(
    () => (showOnlyIncomplete ? tasks.filter((t) => !t.completed) : tasks),
    [tasks, showOnlyIncomplete]
  );
  if (!filtered.length) return <p style={{ color: "#6b7280", textAlign: "center" }}>{emptyLabel}</p>;
  return (
    <ul style={{ display: "grid", gap: 8, padding: 0, margin: 0, listStyle: "none" }}>
      {filtered.map((t) => (
        <TaskItem key={t.id} task={t} onToggle={onToggle} />
      ))}
    </ul>
  );
}

function Loader() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 0" }}>
      <div style={{
        width: 16,
        height: 16,
        border: "2px solid #d1d5db",
        borderTopColor: "transparent",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }} />
      <span style={{ color: "#6b7280" }}>Cargando tareas…</span>
      <style>{`@keyframes spin { from { transform: rotate(0) } to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}

function ErrorMessage({ message, onRetry }) {
  return (
    <div style={{ background: "#fee2e2", color: "#991b1b", padding: 10, borderRadius: 10, border: "1px solid #fecaca" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <span>{message}</span>
        {onRetry && (
          <button onClick={onRetry} style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #fca5a5", background: "#fff" }}>
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
}

// ------------------------------ Contenedores (lógica de estado) ------------------------------
function TaskListContainerBasico() {
  const [tasks, setTasks] = useState(initialTasks);
  const handleToggle = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };
  return (
    <section>
      <SectionTitle>Actividad 1 – Lista (incompletas)</SectionTitle>
      <Muted>Click para marcar como completada. Se ocultan las completadas.</Muted>
      <TaskList tasks={tasks} onToggle={handleToggle} showOnlyIncomplete emptyLabel="Todo listo ✨" />
      <p style={{ color: "#9ca3af", fontSize: 12, marginTop: 6 }}>(Actualiza estado con map)</p>
    </section>
  );
}

function TaskListContainerRefactor() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(true);
  const handleToggle = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };
  return (
    <section>
      <SectionTitle>Actividad 2 – Contenedor + Presentacional</SectionTitle>
      <Muted>Separación de responsabilidades: UI sin lógica de estado.</Muted>
      <label style={{ display: "inline-flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
        <input
          type="checkbox"
          checked={showOnlyIncomplete}
          onChange={(e) => setShowOnlyIncomplete(e.target.checked)}
        />
        Mostrar sólo incompletas
      </label>
      <TaskList
        tasks={tasks}
        onToggle={handleToggle}
        showOnlyIncomplete={showOnlyIncomplete}
        emptyLabel={showOnlyIncomplete ? "No hay pendientes 🎉" : "Sin tareas"}
      />
    </section>
  );
}

function TaskListContainerAsync() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [onlyIncomplete, setOnlyIncomplete] = useState(true);
  const [simulateFail, setSimulateFail] = useState(false);

  const loadTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchTasks({ delayMs: 900, shouldFail: simulateFail });
      setTasks(data);
    } catch (err) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simulateFail]);

  const handleToggle = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  return (
    <section>
      <SectionTitle>Actividades 3 & 4 – Lista Asíncrona</SectionTitle>
      <Muted>Simula fetch con Promesa + setTimeout. Incluye loader y manejo de errores.</Muted>

      <div style={{ display: "flex", gap: 12, alignItems: "center", margin: "6px 0 12px" }}>
        <label style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
          <input type="checkbox" checked={onlyIncomplete} onChange={(e) => setOnlyIncomplete(e.target.checked)} />
          Mostrar sólo incompletas
        </label>
        <label style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
          <input type="checkbox" checked={simulateFail} onChange={(e) => setSimulateFail(e.target.checked)} />
          Forzar error
        </label>
        <button onClick={loadTasks} style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff" }}>Recargar</button>
      </div>

      {loading && <Loader />}
      {!loading && error && <ErrorMessage message={error} onRetry={loadTasks} />}
      {!loading && !error && (
        <TaskList
          tasks={tasks}
          onToggle={handleToggle}
          showOnlyIncomplete={onlyIncomplete}
          emptyLabel={onlyIncomplete ? "No hay pendientes 🎉" : "Sin tareas"}
        />
      )}
    </section>
  );
}

// ------------------------------ App de demostración ------------------------------
export default function App() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24, color: "#111827", fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, 'Helvetica Neue', Arial, 'Apple Color Emoji', 'Segoe UI Emoji'" }}>
      <header style={{ marginBottom: 18 }}>
        <h1 style={{ margin: 0, fontSize: 24 }}>ToDo List – Actividades 1 a 4</h1>
        <p style={{ margin: "6px 0 0", color: "#6b7280" }}>
          Ejemplo completo: contenedor básico, separación de presentación, fetch simulado con Promesa
          y mejora de UX (loader + errores).
        </p>
      </header>

      <div style={{ display: "grid", gap: 18 }}>
        <Card>
          <TaskListContainerBasico />
        </Card>
        <Card>
          <TaskListContainerRefactor />
        </Card>
        <Card>
          <TaskListContainerAsync />
        </Card>
      </div>

      <footer style={{ marginTop: 24, color: "#9ca3af", fontSize: 12 }}>
        Sugerencia: En un repo real, separa componentes presentacionales (components/) y contenedores (containers/). La función fetchTasks podría vivir en services/api.js.
      </footer>
    </main>
  );
}
