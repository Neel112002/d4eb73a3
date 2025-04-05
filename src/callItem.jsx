import React from 'react';

const CallItem = ({
  id,
  is_archived,
  date,
  number,
  contact,
  note,
  time,
  count,
  handleArchiveToggle,
}) => {
  return (
    <div className="call-item p-2 mb-3 rounded shadow-sm bg-white">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <small className="text-uppercase text-muted fw-semibold">{date}</small>
      </div>

      <div className="d-flex align-items-center justify-content-between bg-light rounded p-2">
        <div className="d-flex align-items-center gap-3">
          {/* ✅ Archive Checkbox */}
          <input
            type="checkbox"
            checked={!!is_archived}
            onChange={() => handleArchiveToggle(id, !is_archived)}
            className="form-check-input z-9999999"
          />

          <i className="ti ti-phone-off text-danger"></i>

          <div className="d-flex flex-column">
            <div className="fw-bold">
              {number || contact}
              {count > 1 && <span className="badge bg-danger ms-2">{count}</span>}
            </div>
            <small className="text-muted">{note}</small>
          </div>
        </div>

        <div>
          <span className="text-muted small fw-semibold">{time}</span>
          <span className="badge text-bg-light ms-1">PM</span>
        </div>
      </div>
    </div>
  );
};

export default CallItem;
