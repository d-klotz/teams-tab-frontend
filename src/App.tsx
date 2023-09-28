import React, { useState, useEffect } from 'react';

interface Ticket {
  id: number;
  title: string;
  description: string;
}

const Helpdesk: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [currentTicket, setCurrentTicket] = useState<Ticket>({ id: 0, title: '', description: '' });

  // Load tickets from local storage on component mount
  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem('tickets') || '[]') as Ticket[];
    setTickets(storedTickets);
  }, []);

  // Save tickets to local storage whenever tickets change
  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  const addTicket = () => {
    if (currentTicket.id) {
      // Edit existing ticket
      const updatedTickets = tickets.map((ticket) =>
        ticket.id === currentTicket.id ? currentTicket : ticket
      );
      setTickets(updatedTickets);
    } else {
      // Create a new ticket
      const newTicket: Ticket = {
        id: Date.now(),
        title: currentTicket.title,
        description: currentTicket.description,
      };
      setTickets([...tickets, newTicket]);
    }

    setCurrentTicket({ id: 0, title: '', description: '' });
    setShowPopup(false);
  };

  const deleteTicket = (id: number) => {
    const updatedTickets = tickets.filter((ticket) => ticket.id !== id);
    setTickets(updatedTickets);
  };

  const editTicket = (id: number) => {
    const ticketToEdit = tickets.find((ticket) => ticket.id === id);
    if (ticketToEdit) {
      setCurrentTicket(ticketToEdit);
      setShowPopup(true);
    }
  };

  const tableCellStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'center',
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h1>Helpdesk Tickets End-user view</h1>
      <button
        style={{
          backgroundColor: 'green',
          color: 'white',
          padding: '10px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={() => setShowPopup(true)}
      >
        Create Ticket bla bla
      </button>

      {showPopup && (
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '5px',
              boxShadow: '0px 0px 10px 0px #000000',
            }}
          >
            <h2>{currentTicket.id ? 'Edit Ticket' : 'Create Ticket'}</h2>
            <input
              type="text"
              placeholder="Title"
              style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
              value={currentTicket.title}
              onChange={(e) => setCurrentTicket({ ...currentTicket, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              style={{ width: '100%', height: '100px', padding: '5px' }}
              value={currentTicket.description}
              onChange={(e) => setCurrentTicket({ ...currentTicket, description: e.target.value })}
            />
            <button
              style={{
                backgroundColor: 'green',
                color: 'white',
                padding: '10px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '10px',
              }}
              onClick={addTicket}
            >
              {currentTicket.id ? 'Save' : 'Create'}
            </button>
            <button
              style={{
                backgroundColor: 'red',
                color: 'white',
                padding: '10px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableCellStyle}>Title</th>
            <th style={tableCellStyle}>Description</th>
            <th style={tableCellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td style={tableCellStyle}>{ticket.title}</td>
              <td style={tableCellStyle}>{ticket.description}</td>
              <td style={tableCellStyle}>
                <button
                  style={{
                    backgroundColor: 'blue',
                    color: 'white',
                    padding: '5px 10px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginRight: '5px',
                  }}
                  onClick={() => editTicket(ticket.id)}
                >
                  Edit
                </button>
                <button
                  style={{
                    backgroundColor: 'red',
                    color: 'white',
                    padding: '5px 10px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                  onClick={() => deleteTicket(ticket.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Helpdesk;