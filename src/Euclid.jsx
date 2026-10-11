import { useState, useEffect } from "react";

// Algoritmul lui Euclid: returnează cmmdc-ul și pașii intermediari.
// La fiecare pas: a = q · b + r, apoi (a, b) devine (b, r), până când b = 0.
const euclid = (a, b) => {
  const steps = [];

  while (b !== 0) {
    const q = Math.floor(a / b);
    const r = a % b;
    steps.push({ a, b, q, r });
    a = b;
    b = r;
  }

  return { gcd: a, steps };
};

const styles = {
  container: {
    maxWidth: 480,
    margin: "40px auto",
    padding: "0 16px",
    fontFamily: "system-ui, sans-serif",
  },
  inputs: { display: "flex", gap: 12, marginBottom: 16 },
  label: { display: "flex", flexDirection: "column", flex: 1, gap: 4 },
  input: { padding: 8, fontSize: 18 },
  error: { color: "crimson" },
  result: { fontSize: 24, fontWeight: 600, margin: "16px 0" },
  step: { fontFamily: "monospace", fontSize: 16, margin: "4px 0" },
};

const Euclid = () => {
  // Valorile din câmpurile de input (le ținem ca string-uri)
  const [a, setA] = useState("48");
  const [b, setB] = useState("18");

  // Datele calculate
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState("");

  // Efect 1: recalculează cmmdc de fiecare dată când se schimbă a sau b
  useEffect(() => {
    const x = Number(a);
    const y = Number(b);

    if (a.trim() === "" || b.trim() === "") {
      setError("Introdu ambele numere.");
      setResult(null);
      setSteps([]);
      return;
    }

    if (!Number.isSafeInteger(x) || !Number.isSafeInteger(y)) {
      setError("Folosește doar numere întregi.");
      setResult(null);
      setSteps([]);
      return;
    }

    if (x === 0 && y === 0) {
      setError("cmmdc(0, 0) nu este definit.");
      setResult(null);
      setSteps([]);
      return;
    }

    const { gcd, steps } = euclid(Math.abs(x), Math.abs(y));
    setError("");
    setResult(gcd);
    setSteps(steps);
  }, [a, b]);

  // Efect 2: afișează rezultatul în titlul tab-ului din browser
  useEffect(() => {
    document.title = result !== null ? `cmmdc = ${result}` : "Euclid";
  }, [result]);

  return (
    <div style={styles.container}>
      <header className="app-header">
        <span className="app-header__eyebrow">CALCULATOR MATEMATIC</span>
        <h1>Algoritmul lui Euclid</h1>
        <p>Găsește cmmdc-ul și urmărește fiecare pas al calculului.</p>
      </header>

      <div style={styles.inputs}>
        <label style={styles.label}>
          a
          <input
            style={styles.input}
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
          />
        </label>
        <label style={styles.label}>
          b
          <input
            style={styles.input}
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
          />
        </label>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {result !== null && (
        <>
          <p style={styles.result}>
            cmmdc({a}, {b}) = {result}
          </p>

          <h2>Pașii</h2>
          {steps.length === 0 ? (
            <p>b este 0, deci cmmdc este chiar a.</p>
          ) : (
            steps.map((s, i) => (
              <p key={i} style={styles.step}>
                {s.a} = {s.q} · {s.b} + {s.r}
              </p>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default Euclid;
