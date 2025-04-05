import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

import Header from './Header.jsx';
import Footer from './footer.jsx';
import CallItem from './CallItem.jsx';

const BASE_URL = 'https://aircall-api.onrender.com';

const App = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  const fetchCalls = () => {
    setLoading(true); // Start loading before fetching
    fetch(`${BASE_URL}/activities`)
      .then((res) => {
        if (!res.ok) throw new Error('Server waking up...');
        return res.json();
      })
      .then((data) => {
        setCalls(data);
        setLoading(false); // ✅ Stop loading
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false); // ✅ Important! Stop loading on error too
        setTimeout(() => window.location.reload(), 5000);
      });
  };
  

  useEffect(() => {
    fetchCalls();
  }, []);

  // ✅ Toggle archive state and update locally
  const handleArchiveToggle = (id, archive) => {
    // ✅ Optimistically update UI
    setCalls(prevCalls =>
      prevCalls.map(call =>
        call.id === id ? { ...call, is_archived: archive } : call
      )
    );
  
    // ✅ Send request to backend
    fetch(`${BASE_URL}/activities/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ is_archived: archive }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to update archive status');
        return res.json();
      })
      .then(() => {
        // ✅ Fetch fresh copy in the background (optional)
        fetchCalls();
      })
      .catch((err) => {
        console.error('Archive toggle failed:', err);
      });
  };
  
  

  const filteredCalls = calls.filter((call) => call.is_archived === showArchived);

  return (
    <div className="container">
      <Header />
      <div className="container-view">
        <div className="d-flex justify-content-between align-items-center mb-3 px-3">
          <button
            className={`btn btn-sm ${!showArchived ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setShowArchived(false)}
          >
            Inbox
          </button>
          <button
            className={`btn btn-sm ${showArchived ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => setShowArchived(true)}
          >
            Archived
          </button>
        </div>

        {loading && <p className="text-center">Loading call activities...</p>}
        {error && <p className="text-center text-danger">Server is waking up, retrying in a few seconds...</p>}

        {filteredCalls.map((call) => (
          <CallItem
            key={call.id}
            id={call.id}
            is_archived={call.is_archived}
            date={new Date(call.created_at).toDateString()}
            number={call.from}
            contact={call.to || 'Unknown'}
            note={`tried to call on ${call.via}`}
            time={new Date(call.created_at).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
            count={1}
            handleArchiveToggle={handleArchiveToggle}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);

export default App;
