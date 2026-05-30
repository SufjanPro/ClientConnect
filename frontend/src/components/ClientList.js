import React from 'react';
import './ClientList.css';

function ClientList({ clients, onEdit, onDelete }) {
  if (clients.length === 0) {
    return (
      <div className="empty-state">
        <h2>📭 Nuk ka klientë</h2>
        <p>Krijo klientin e parë tuaj duke klikuar në butonin "Shto Klient të Ri"</p>
      </div>
    );
  }

  return (
    <div className="client-list">
      <h2>Lista e Klientëve ({clients.length})</h2>
      <div className="table-container">
        <table className="clients-table">
          <thead>
            <tr>
              <th>Emri</th>
              <th>Email</th>
              <th>Telefoni</th>
              <th>Kompania</th>
              <th>Aksioni</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="client-name">
                  <strong>{client.name}</strong>
                </td>
                <td>{client.email}</td>
                <td>{client.phone || '-'}</td>
                <td>{client.company || '-'}</td>
                <td className="actions">
                  <button
                    className="btn-edit"
                    onClick={() => onEdit(client)}
                    title="Redakto"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => onDelete(client.id)}
                    title="Fshi"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientList;
