
import React, { useState } from 'react';
import { predictSalary }   from '../api';

export default function PredictPage() {
  const [inputs, setInputs] = useState({
    educationLevel: '',
    yearsOfExperience: '',
    country: ''
  });
  const [result, setResult] = useState(null);
  const [error, setError]   = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setResult(null);

 
    const payload = {
      educationLevel: Number(inputs.educationLevel),
      yearsOfExperience: Number(inputs.yearsOfExperience),
      country: inputs.country.trim()
    };

    try {
      const { predictedSalary } = await predictSalary(payload);
      setResult(predictedSalary);
    } catch (err) {
      console.error(err);
      setError('Prediction failed. Please check your inputs.');
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Predict Salary</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.5rem', maxWidth: '300px' }}>
        <label>
          Education Level
          <input
            name="educationLevel"
            type="number"
            min="0"
            value={inputs.educationLevel}
            onChange={handleChange}
            placeholder="e.g. 1, 2, 3…"
          />
        </label>
        <label>
          Years of Experience
          <input
            name="yearsOfExperience"
            type="number"
            min="0"
            value={inputs.yearsOfExperience}
            onChange={handleChange}
            placeholder="e.g. 5"
          />
        </label>
        <label>
          Country
          <input
            name="country"
            type="text"
            value={inputs.country}
            onChange={handleChange}
            placeholder="e.g. USA"
          />
        </label>
        <button type="submit">Predict</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result != null && (
        <p style={{ marginTop: '1rem' }}>
          <strong>Estimated Salary:</strong> ${Number(result).toLocaleString()}
        </p>
      )}
    </div>
  );
}
