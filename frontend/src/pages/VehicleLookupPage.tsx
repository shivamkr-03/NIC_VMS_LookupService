import { useEffect, useState, useRef } from 'react';
import { fetchEvents, searchVehicle } from '../services/api';
import type { EventDto, VehicleLookupResponse } from '../types';
import { FileText, Calendar, Compass, Fuel, AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

export const VehicleLookupPage = () => {
  const [events, setEvents] = useState<EventDto[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [regNumber, setRegNumber] = useState<string>('');
  const [engChassisNumber, setEngChassisNumber] = useState<string>('');
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VehicleLookupResponse | null>(null);
  const [activeTab, setActiveTab] = useState<'primary' | 'possession' | 'logbooks' | 'coupons'>('primary');

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Load events dropdown
  useEffect(() => {
    fetchEvents()
      .then(data => {
        setEvents(data);
        if (data.length > 0) {
          setSelectedEvent(String(data[0].id));
        }
      })
      .catch(() => {
        setError('Failed to load active events list.');
      });
  }, []);

  const handleSearch = async (e:any) => {
    e.preventDefault();
    setError(null);

    if (!selectedEvent || !regNumber.trim() || !engChassisNumber.trim()) {
      setError('Please fill in all search fields.');
      return;
    }

    if (!recaptchaToken) {
      setError('Please complete the Captcha validation.');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await searchVehicle(
        Number(selectedEvent),
        regNumber.trim().toUpperCase(),
        engChassisNumber.trim()
      );
      setResult(data);
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
      setActiveTab('primary');

    } catch (err: any) {
      setError(err.message || 'Vehicle lookup failed. Verify credentials and try again.');
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (events.length > 0) {
      setSelectedEvent(String(events[0].id));
    } else {
      setSelectedEvent('');
    }
    setRegNumber('');
    setEngChassisNumber('');
    setRecaptchaToken(null);
    recaptchaRef.current?.reset();
    setError(null);
    setResult(null);
  };

  const handleBack = () => {
    setResult(null);
    setRecaptchaToken(null);
    recaptchaRef.current?.reset();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '2rem' }}>Vehicle Information Lookup</h1>
        <p style={{ color: 'var(--text-muted)' }}>Retrieve administrative, allocation, logbook, and fuel details for any vehicle.</p>
      </div>

      {/* Form Card */}
      {!result && (
        <div className="glass-card">
          <form onSubmit={handleSearch}>
          <div className="form-row" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <div className="form-group">
              <label className="form-label">Select Event</label>
              <select 
                className="form-control"
                value={selectedEvent}
                onChange={e => setSelectedEvent(e.target.value)}
              >
                <option value="">-- Choose Event --</option>
                {events.map(ev => (
                  <option key={ev.id} value={ev.id}>{ev.name}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Registration Number</label>
              <input 
                type="text"
                placeholder="e.g. JH01AB1234"
                className="form-control"
                value={regNumber}
                onChange={e => setRegNumber(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Engine / Chassis Number</label>
              <input 
                type="text"
                placeholder="Enter last digits or full code"
                className="form-control"
                value={engChassisNumber}
                onChange={e => setEngChassisNumber(e.target.value)}
              />
            </div>
          </div>

          {/* Captcha Row using Google reCAPTCHA */}
          <div style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={(import.meta.env.VITE_RECAPTCHA_SITE_KEY as string) || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
              onChange={(val) => setRecaptchaToken(val)}
            />
          </div>

          {/* Buttons Row */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" className="btn btn-secondary" onClick={handleReset} disabled={loading}>
              Reset
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <RefreshCw className="spinner" style={{ width: '1rem', height: '1rem' }} /> Searching...
                </>
              ) : 'Submit'}
            </button>
          </div>
        </form>
      </div>
      )}

      {/* Error Alert */}
      {error && (
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid var(--color-danger)',
          color: '#f87171',
          padding: '1rem',
          borderRadius: 'var(--radius-sm)'
        }}>
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Search Result */}
      {result && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={handleBack}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <ArrowLeft size={16} /> Back to Lookup Form
            </button>
          </div>
          <div className="glass-card">
          
          {/* Header Summary */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
            <div>
              <span className="badge badge-success" style={{ marginBottom: '0.5rem' }}>{result.primaryDetails.status || 'Active'}</span>
              <h2 style={{ fontSize: '1.75rem', marginBottom: 0 }}>{result.primaryDetails.registrationNo}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Owner: {result.primaryDetails.ownerName} ({result.primaryDetails.ownerMobile})</p>
            </div>
            
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Vehicle Type: <strong style={{ color: '#fff' }}>{result.primaryDetails.vehicleType}</strong></p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Class: <strong style={{ color: '#fff' }}>{result.primaryDetails.vehicleClassName || 'N/A'}</strong></p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Fuel: <strong style={{ color: '#fff' }}>{result.primaryDetails.fuelTypeName || 'N/A'}</strong></p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="tabs-container">
            <button 
              className={`tab-btn ${activeTab === 'primary' ? 'active' : ''}`}
              onClick={() => setActiveTab('primary')}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={16} /> Primary Details
              </span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'possession' ? 'active' : ''}`}
              onClick={() => setActiveTab('possession')}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={16} /> Possession Details
              </span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'logbooks' ? 'active' : ''}`}
              onClick={() => setActiveTab('logbooks')}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Compass size={16} /> Logbooks ({result.logbooks.length})
              </span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'coupons' ? 'active' : ''}`}
              onClick={() => setActiveTab('coupons')}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Fuel size={16} /> Fuel Coupons ({result.fuelCoupons.length})
              </span>
            </button>
          </div>

          {/* Tab 1: Primary Details */}
          {activeTab === 'primary' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h3 className="section-title">Technical Registry</h3>
                <div className="info-list">
                  <div className="info-item">
                    <span className="info-label">Engine Number</span>
                    <span className="info-value">{result.primaryDetails.engineNo}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Chassis Number</span>
                    <span className="info-value">{result.primaryDetails.chassisNo}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Seating Capacity</span>
                    <span className="info-value">{result.primaryDetails.seatCapacity} seats</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">RTO Region</span>
                    <span className="info-value">{result.primaryDetails.rtoName || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="section-title">Allocated Staff</h3>
                <div className="info-list">
                  <div className="info-item">
                    <span className="info-label">Driver Name</span>
                    <span className="info-value">{result.primaryDetails.driverName || 'Not Assigned'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Driver Mobile</span>
                    <span className="info-value">{result.primaryDetails.driverMobile || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Helper Name</span>
                    <span className="info-value">{result.primaryDetails.helperName || 'Not Assigned'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Helper Mobile</span>
                    <span className="info-value">{result.primaryDetails.helperMobile || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="section-title">Acquisition Origin</h3>
                <div className="info-list">
                  <div className="info-item">
                    <span className="info-label">Captured From</span>
                    <span className="info-value">{result.primaryDetails.captureFromPlace || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Possession Details */}
          {activeTab === 'possession' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Possession Stats */}
              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-label">Daily Rent Rate</span>
                  <span className="stat-value" style={{ color: 'var(--primary)' }}>
                    ₹{result.possessionDetails.ratePerDay || 0}
                  </span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Total Days</span>
                  <span className="stat-value">
                    {result.possessionDetails.totalPossessionDays?.toFixed(0) || 0} days
                  </span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Total Hours</span>
                  <span className="stat-value">
                    {result.possessionDetails.totalPossessionHours || 0} hrs
                  </span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Net Payable Amount</span>
                  <span className="stat-value" style={{ color: 'var(--accent)' }}>
                    ₹{result.possessionDetails.netPayable?.toFixed(2) || result.possessionDetails.proposedAmount || 0}
                  </span>
                </div>
              </div>

              {/* Timeframes */}
              <div className="info-list">
                <div className="info-item">
                  <span className="info-label">Acquisition (Capture) Date/Time</span>
                  <span className="info-value">
                    {new Date(result.possessionDetails.captureDateTime).toLocaleString()}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Release Date/Time</span>
                  <span className="info-value">
                    {result.possessionDetails.releaseDateTime 
                      ? new Date(result.possessionDetails.releaseDateTime).toLocaleString() 
                      : 'Still in Possession'}
                  </span>
                </div>
              </div>

              {/* Segments Table */}
              <div>
                <h3 className="section-title">Timeline Segments</h3>
                {result.possessionDetails.segments.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', padding: '1rem 0' }}>No separate possession segments recorded.</p>
                ) : (
                  <div className="table-container">
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th>Start Time</th>
                          <th>End Time</th>
                          <th>Hours</th>
                          <th>Days</th>
                          <th>Segment Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.possessionDetails.segments.map((seg, i) => (
                          <tr key={i}>
                            <td>{new Date(seg.fromDateTime).toLocaleString()}</td>
                            <td>{seg.toDateTime ? new Date(seg.toDateTime).toLocaleString() : 'Active'}</td>
                            <td>{seg.hours ?? '-'} hrs</td>
                            <td>{seg.days ?? '-'} days</td>
                            <td>
                              <span className="badge badge-info">{seg.type || 'Duty'}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Tab 3: Logbooks */}
          {activeTab === 'logbooks' && (
            <div>
              <h3 className="section-title">Trip Entries</h3>
              {result.logbooks.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', padding: '1rem 0' }}>No travel logs registered for this vehicle.</p>
              ) : (
                <div className="table-container">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Date & Time</th>
                        <th>Trip Route (From &rarr; Via &rarr; To)</th>
                        <th>Odometer (Start &rarr; End)</th>
                        <th>Distance</th>
                        <th>Assigned Officer</th>
                        <th>Head of Account</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.logbooks.map(log => (
                        <tr key={log.id}>
                          <td>{new Date(log.dateTime).toLocaleString()}</td>
                          <td>
                            <div style={{ fontWeight: 600 }}>{log.fromPlace} &rarr; {log.toPlace}</div>
                            {log.via && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Via: {log.via}</div>}
                          </td>
                          <td>{log.meterFromKm} km &rarr; {log.meterToKm} km</td>
                          <td>
                            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{log.distanceInKm} km</span>
                          </td>
                          <td>{log.officerName || 'N/A'}</td>
                          <td>
                            <span className="badge badge-info">{log.headName || 'General Duty'}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Coupons */}
          {activeTab === 'coupons' && (
            <div>
              <h3 className="section-title">Fuel Slips</h3>
              {result.fuelCoupons.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', padding: '1rem 0' }}>No fuel coupons issued to this vehicle.</p>
              ) : (
                <div className="table-container">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Coupon No.</th>
                        <th>Issue Date</th>
                        <th>Fuel Station</th>
                        <th>Fuel Type</th>
                        <th>Quantity</th>
                        <th>Rate / Amount</th>
                        <th>Status</th>
                        <th>Reason / Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.fuelCoupons.map(coupon => (
                        <tr key={coupon.id}>
                          <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{coupon.couponNo}</td>
                          <td>{new Date(coupon.issueDate).toLocaleDateString()}</td>
                          <td>{coupon.fuelStationName || 'N/A'}</td>
                          <td>{coupon.fuelTypeName || 'N/A'}</td>
                          <td style={{ fontWeight: 600 }}>{coupon.qty} Liters</td>
                          <td>
                            {coupon.fuelRate ? (
                              <>
                                <div>₹{coupon.amount}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>@ ₹{coupon.fuelRate}/L</div>
                              </>
                            ) : '-'}
                          </td>
                          <td>
                            <span className={`badge ${
                              coupon.status === 'B' ? 'badge-success' : 
                              coupon.status === 'C' ? 'badge-danger' : 'badge-warning'
                            }`}>
                              {coupon.status === 'B' ? 'Billed' : coupon.status === 'C' ? 'Cancelled' : 'Issued'}
                            </span>
                          </td>
                          <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{coupon.reason || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
      )}

    </div>
  );
};
