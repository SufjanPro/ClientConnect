import React, { useState, useEffect } from 'react';
import './ClientForm.css';

function ClientForm({ client, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  // Mbush formën nëse redakton klientin ekzistues
  useEffect(() => {
    if (client) {
      setFormData(client);
    }
  }, [client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      onSave(formData);
      // Resetoj formën
      setFormData({ name: '', email: '', phone: '', company: '' });
    } else {
      alert('Emri dhe emaili janë të detyrueshëm!');
    }
  };

  return (
    <div className="client-form-container">
      <div className="client-form">
        <h2>{client ? '✏️ Redakto Klientin' : '➕ Shto Klient të Ri'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Emri *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="p.sh. Shqipëri Consulting"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="p.sh. info@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Telefoni</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="p.sh. +355 69 000 0000"
            />
          </div>

          <div className="form-group">
            <label htmlFor="company">Kompania</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="p.sh. Tech Solutions"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-success">
              {client ? '💾 Përditëso' : '➕ Shto'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              ❌ Anulo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClientForm;
