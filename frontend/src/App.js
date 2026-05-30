import React, { useState, useEffect } from 'react';
import './App.css';
import ClientList from './components/ClientList';
import ClientForm from './components/ClientForm';
import axios from 'axios';

function App() {
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [loading, setLoading] = useState(false);

  // Merr klientët nga backend
  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Gabim në marrjen e klientëve:', error);
    }
    setLoading(false);
  };

  // Ngarkoji klientët kur komponenti montohet
  useEffect(() => {
    fetchClients();
  }, []);

  // Shto ose përditëso klient
  const handleSaveClient = async (clientData) => {
    try {
      if (editingClient) {
        // Përditëso klient ekzistues
        await axios.put(`/api/clients/${editingClient.id}`, clientData);
      } else {
        // Krijo klient të ri
        await axios.post('/api/clients', clientData);
      }
      fetchClients();
      setShowForm(false);
      setEditingClient(null);
    } catch (error) {
      console.error('Gabim në ruajen e klientit:', error);
    }
  };

  // Fshi klient
  const handleDeleteClient = async (id) => {
    if (window.confirm('A je i sigurt që dëshiron të fshish këtë klient?')) {
      try {
        await axios.delete(`/api/clients/${id}`);
        fetchClients();
      } catch (error) {
        console.error('Gabim në fshirjen e klientit:', error);
      }
    }
  };

  // Redakto klient
  const handleEditClient = (client) => {
    setEditingClient(client);
    setShowForm(true);
  };

  // Anulo redaktimin
  const handleCancelEdit = () => {
    setShowForm(false);
    setEditingClient(null);
  };

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1>🤝 ClientConnect</h1>
          <p>Menaxhim Relacionesh me Klientët</p>
        </div>
      </header>

      <main className="container">
        {/* Butoni për shtim klienti */}
        <div className="button-group">
          {!showForm && (
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              + Shto Klient të Ri
            </button>
          )}
        </div>

        {/* Forma për shtim/redaktim */}
        {showForm && (
          <ClientForm
            client={editingClient}
            onSave={handleSaveClient}
            onCancel={handleCancelEdit}
          />
        )}

        {/* Lista e klientëve */}
        {loading ? (
          <p className="loading">Po ngarkohet...</p>
        ) : (
          <ClientList
            clients={clients}
            onEdit={handleEditClient}
            onDelete={handleDeleteClient}
          />
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2026 ClientConnect. Të gjitha të drejtat e rezervuara.</p>
      </footer>
    </div>
  );
}

export default App;
