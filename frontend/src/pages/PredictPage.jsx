import { useState } from 'react';

export default function PredictPage() {
  const [form,    setForm]    = useState({ education: '', experience: '', country: '' });
  const [result,  setResult]  = useState(null);
  const [error,   setError]   = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/predict', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          education_level:  Number(form.education),
          years_experience: Number(form.experience),
          country:          form.country.trim(),
        }),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setResult(data.predicted_salary);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Predict Salary</h2>

      <form onSubmit={handleSubmit} className="predict-form">
        <label>
          Education Level
          <input
            name="education"
            type="number"
            value={form.education}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Years Experience
          <input
            name="experience"
            type="number"
            value={form.experience}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Country
          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Predicting…' : 'Predict'}
        </button>
      </form>

      {error  && <p style={{ color: 'red' }}>Error: {error}</p>}
      {result != null && <p>Predicted salary: ${result.toLocaleString()}</p>}
    </>
  );
}
