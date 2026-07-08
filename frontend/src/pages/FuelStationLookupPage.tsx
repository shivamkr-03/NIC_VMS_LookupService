import { useEffect, useState } from 'react';
import { fetchEvents, fetchDistricts, fetchFuelStations, searchFuelStation, fetchCoupons } from '../services/api';
import type { EventDto, DistrictDto, FuelStationDto, FuelStationLookupResponse, CouponDetail } from '../types';
import { Building, ShieldCheck, CreditCard, BarChart2, AlertCircle, RefreshCw, Calendar, ArrowLeft } from 'lucide-react';
import { Captcha } from '../components/Captcha';
import { SearchableSelect } from '../components/SearchableSelect';

export const FuelStationLookupPage = () => {
  const [events, setEvents] = useState<EventDto[]>([]);
  const [districts, setDistricts] = useState<DistrictDto[]>([]);
  const [stations, setStations] = useState<FuelStationDto[]>([]);

  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedStation, setSelectedStation] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [isCaptchaValid, setIsCaptchaValid] = useState<boolean>(false);
  const [captchaResetTrigger, setCaptchaResetTrigger] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<{
    event?: string;
    district?: string;
    station?: string;
    mobileNumber?: string;
    captcha?: string;
  }>({});

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStations, setLoadingStations] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FuelStationLookupResponse | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'coupons' | 'fuel' | 'dailyRates' | 'payment'>('info');

  const [coupons, setCoupons] = useState<CouponDetail[]>([]);
  const [couponPage, setCouponPage] = useState<number>(0);
  const [hasMoreCoupons, setHasMoreCoupons] = useState<boolean>(true);
  const [couponLoading, setCouponLoading] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const loadCoupons = async (pageNum: number, isShowMore: boolean = false) => {
    if (!selectedStation) return;
    setCouponLoading(true);
    try {
      const data = await fetchCoupons(
        Number(selectedStation),
        Number(selectedEvent),
        Number(selectedDistrict),
        pageNum,
        15
      );
      if (isShowMore) {
        setCoupons(prev => [...prev, ...data]);
      } else {
        setCoupons(data);
      }
      setCouponPage(pageNum);
      setHasMoreCoupons(data.length === 15);
    } catch (err) {
      console.error('Failed to load coupons:', err);
    } finally {
      setCouponLoading(false);
    }
  };

  // Load events and districts initially
  useEffect(() => {
    Promise.all([fetchEvents(), fetchDistricts()])
      .then(([eventsData, districtsData]) => {
        setEvents(eventsData);
        setDistricts(districtsData);
        if (eventsData.length > 0) setSelectedEvent(String(eventsData[0].id));
        if (districtsData.length > 0) setSelectedDistrict(String(districtsData[0].id));
      })
      .catch(() => {
        setError('Failed to load active dropdown options.');
      });
  }, []);

  // Load stations dynamically when event or district changes
  useEffect(() => {
    if (selectedEvent && selectedDistrict) {
      setLoadingStations(true);
      fetchFuelStations(Number(selectedEvent), Number(selectedDistrict))
        .then(data => {
          setStations(data);
          if (data.length > 0) {
            setSelectedStation(String(data[0].id));
          } else {
            setSelectedStation('');
          }
        })
        .catch(() => {
          setStations([]);
          setSelectedStation('');
        })
        .finally(() => {
          setLoadingStations(false);
        });
    }
  }, [selectedEvent, selectedDistrict]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFormErrors({});

    const errors: typeof formErrors = {};
    if (!selectedEvent) {
      errors.event = 'Event selection is required.';
    }
    if (!selectedDistrict) {
      errors.district = 'District selection is required.';
    }
    if (!selectedStation) {
      errors.station = 'Fuel station selection is required.';
    }
    if (!mobileNumber.trim()) {
      errors.mobileNumber = 'Mobile number is required.';
    } else if (!/^\d{10}$/.test(mobileNumber.trim())) {
      errors.mobileNumber = 'Please enter a valid 10-digit mobile number.';
    }
    if (!isCaptchaValid) {
      errors.captcha = 'Please enter the correct Captcha code.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await searchFuelStation(
        Number(selectedEvent),
        Number(selectedDistrict),
        Number(selectedStation),
        mobileNumber.trim()
      );
      setResult(data);
      setActiveTab('info');
      setCaptchaResetTrigger(prev => !prev);
      setStatusFilter('All');
      loadCoupons(0, false);
    } catch (err: any) {
      setError(err.message || 'Fuel station lookup failed. Please check mobile number and try again.');
      setCaptchaResetTrigger(prev => !prev);
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
    if (districts.length > 0) {
      setSelectedDistrict(String(districts[0].id));
    } else {
      setSelectedDistrict('');
    }
    setSelectedStation('');
    setMobileNumber('');
    setCaptchaResetTrigger(prev => !prev);
    setFormErrors({});
    setError(null);
    setResult(null);
    setStatusFilter('All');
    setCoupons([]);
  };

  const handleBack = () => {
    setResult(null);
    setCaptchaResetTrigger(prev => !prev);
    setFormErrors({});
    setStatusFilter('All');
    setCoupons([]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Title */}
      <div style={{
        padding: '2rem 1.5rem',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderLeft: '5px solid var(--primary)',
        borderRadius: 'var(--radius-sm)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', margin: '0 0 0.5rem 0' }}>Fuel Station Lookup</h1>
        <p style={{ color: 'var(--text-muted)', margin: 0 }}>Audit fuel station accounts, coupon statistics, fuel categories, and bank payments.</p>
      </div>

      {/* Form Card */}
      {!result && (
        <div className="glass-card" style={{ borderTopColor: 'var(--primary)' }}>
          <form onSubmit={handleSearch}>
          <div className="form-row" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <div className="form-group">
              <label className="form-label">Select Event</label>
              <select 
                className="form-control"
                value={selectedEvent}
                onChange={e => {
                  setSelectedEvent(e.target.value);
                  if (formErrors.event) setFormErrors(prev => ({ ...prev, event: undefined }));
                }}
                style={{
                  borderColor: formErrors.event ? 'var(--color-danger)' : undefined,
                  boxShadow: formErrors.event ? '0 0 0 1px var(--color-danger)' : undefined
                }}
              >
                <option value="">-- Choose Event --</option>
                {events.map(ev => (
                  <option key={ev.id} value={ev.id}>{ev.name}</option>
                ))}
              </select>
              {formErrors.event && (
                <span style={{ color: 'var(--color-danger)', fontSize: '0.8rem', marginTop: '0.25rem', fontWeight: 500 }}>
                  {formErrors.event}
                </span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Select District</label>
              <SearchableSelect
                options={districts}
                value={selectedDistrict}
                onChange={val => {
                  setSelectedDistrict(val);
                  if (formErrors.district) setFormErrors(prev => ({ ...prev, district: undefined }));
                }}
                placeholder="Type to search district..."
                hasError={!!formErrors.district}
              />
              {formErrors.district && (
                <span style={{ color: 'var(--color-danger)', fontSize: '0.8rem', marginTop: '0.25rem', fontWeight: 500 }}>
                  {formErrors.district}
                </span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Select Fuel Station</label>
              <select 
                className="form-control"
                value={selectedStation}
                onChange={e => {
                  setSelectedStation(e.target.value);
                  if (formErrors.station) setFormErrors(prev => ({ ...prev, station: undefined }));
                }}
                disabled={loadingStations || stations.length === 0}
                style={{
                  borderColor: formErrors.station ? 'var(--color-danger)' : undefined,
                  boxShadow: formErrors.station ? '0 0 0 1px var(--color-danger)' : undefined
                }}
              >
                {loadingStations ? (
                  <option value="">Loading stations...</option>
                ) : stations.length === 0 ? (
                  <option value="">No stations registered</option>
                ) : (
                  <>
                    <option value="">-- Choose Fuel Pump --</option>
                    {stations.map(st => (
                      <option key={st.id} value={st.id}>{st.name}</option>
                    ))}
                  </>
                )}
              </select>
              {formErrors.station && (
                <span style={{ color: 'var(--color-danger)', fontSize: '0.8rem', marginTop: '0.25rem', fontWeight: 500 }}>
                  {formErrors.station}
                </span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Owner / Contact Mobile</label>
              <input 
                type="text"
                placeholder="10-digit number"
                className="form-control"
                value={mobileNumber}
                onChange={e => {
                  setMobileNumber(e.target.value);
                  if (formErrors.mobileNumber) setFormErrors(prev => ({ ...prev, mobileNumber: undefined }));
                }}
                style={{
                  borderColor: formErrors.mobileNumber ? 'var(--color-danger)' : undefined,
                  boxShadow: formErrors.mobileNumber ? '0 0 0 1px var(--color-danger)' : undefined
                }}
              />
              {formErrors.mobileNumber && (
                <span style={{ color: 'var(--color-danger)', fontSize: '0.8rem', marginTop: '0.25rem', fontWeight: 500 }}>
                  {formErrors.mobileNumber}
                </span>
              )}
            </div>
          </div>

          {/* Captcha Row using Text Captcha */}
          <Captcha
            onValidate={(val) => {
              setIsCaptchaValid(val);
              if (val && formErrors.captcha) {
                setFormErrors(prev => ({ ...prev, captcha: undefined }));
              }
            }}
            triggerReset={captchaResetTrigger}
          />
          {formErrors.captcha && (
            <span style={{ color: 'var(--color-danger)', fontSize: '0.8rem', display: 'block', marginTop: '-0.5rem', marginBottom: '1rem', fontWeight: 500 }}>
              {formErrors.captcha}
            </span>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" className="btn btn-secondary" onClick={handleReset} disabled={loading}>
              Reset
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading || loadingStations || stations.length === 0}>
              {loading ? (
                <>
                  <RefreshCw className="spinner" style={{ width: '1rem', height: '1rem' }} /> Loading...
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
          background: '#fef2f2',
          border: '1px solid #fee2e2',
          borderLeft: '4px solid var(--color-danger)',
          color: '#b91c1c',
          padding: '1rem',
          borderRadius: 'var(--radius-sm)'
        }}>
          <AlertCircle size={20} style={{ color: '#b91c1c', flexShrink: 0 }} />
          <span style={{ fontWeight: 500 }}>{error}</span>
        </div>
      )}

      {/* Result Display */}
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
          <div className="glass-card" style={{ borderTopColor: 'var(--primary)' }}>
          
          {/* Header summary */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
            <div>
              <span className={`badge ${result.stationInformation.active === 'Y' ? 'badge-success' : 'badge-danger'}`} style={{ marginBottom: '0.5rem' }}>
                {result.stationInformation.active === 'Y' ? 'Active' : 'Inactive'}
              </span>
              <h2 style={{ fontSize: '1.75rem', marginBottom: 0, color: 'var(--primary)', fontWeight: 800 }}>{result.stationInformation.name}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.25rem 0 0 0' }}>
                Owner: {result.stationInformation.ownerName} ({result.stationInformation.mobile})
              </p>
            </div>
            
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.2rem 0' }}>
                Oil Franchise: <strong style={{ color: 'var(--text-dark)' }}>{result.stationInformation.companyName || 'N/A'}</strong>
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.2rem 0', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.4rem' }}>
                KYC Status: <span className={`badge ${result.paymentInformation.kycStatus === 'Y' ? 'badge-success' : 'badge-warning'}`}>
                  {result.paymentInformation.kycStatus === 'Y' ? 'Verified' : 'Pending'}
                </span>
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="tabs-container">
            <button 
              className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
              onClick={() => setActiveTab('info')}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Building size={16} /> Pump Details & Bank
              </span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'coupons' ? 'active' : ''}`}
              onClick={() => setActiveTab('coupons')}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <BarChart2 size={16} /> Coupon Statistics
              </span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'fuel' ? 'active' : ''}`}
              onClick={() => setActiveTab('fuel')}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <BarChart2 size={16} /> Fuel Statistics
              </span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'dailyRates' ? 'active' : ''}`}
              onClick={() => setActiveTab('dailyRates')}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={16} /> Daily Rates
              </span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'payment' ? 'active' : ''}`}
              onClick={() => setActiveTab('payment')}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <CreditCard size={16} /> Payment Summary
              </span>
            </button>
          </div>

          {/* Tab 1: Info & Bank */}
          {activeTab === 'info' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h3 className="section-title">Contact Information</h3>
                <div className="info-list">
                  <div className="info-item">
                    <span className="info-label">Contact Person</span>
                    <span className="info-value">{result.stationInformation.contactPerson || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Contact Person Mobile</span>
                    <span className="info-value">{result.stationInformation.contactPersonMobile || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Owner Mobile</span>
                    <span className="info-value">{result.stationInformation.mobile}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="section-title">Bank Details</h3>
                {result.stationInformation.accountNo ? (
                  <div className="info-list">
                    <div className="info-item">
                      <span className="info-label">Account Holder Name</span>
                      <span className="info-value">{result.stationInformation.accountHolderName}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Account Number</span>
                      <span className="info-value">{result.stationInformation.accountNo}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Bank Name</span>
                      <span className="info-value">{result.stationInformation.bankName}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Branch Name</span>
                      <span className="info-value">{result.stationInformation.branchName}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">IFSC Code</span>
                      <span className="info-value">{result.stationInformation.ifsc}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Bank Registration Status</span>
                      <span className="info-value">
                        <span className={`badge ${result.stationInformation.bankDetailsStatus === 'Y' ? 'badge-success' : 'badge-info'}`}>
                          {result.stationInformation.bankDetailsStatus === 'Y' ? 'Approved' : 'Registered'}
                        </span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No bank account credentials registered for this station.</p>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Coupon Statistics */}
          {activeTab === 'coupons' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Upper row: Summary Stats & Pie Chart */}
              <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                {/* Left Column: Numerical Details */}
                <div style={{ flex: '1 1 450px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {/* Stats Grid */}
                  <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
                    <div className="stat-card">
                      <span className="stat-label">Total Coupons</span>
                      <span className="stat-value">{result.couponStatistics.totalCoupons} slips</span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-label">Billed Coupons</span>
                      <span className="stat-value" style={{ color: 'var(--color-success)' }}>
                        {result.couponStatistics.totalBilledCoupons} slips
                      </span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-label">Issued (Pending)</span>
                      <span className="stat-value" style={{ color: 'var(--color-warning)' }}>
                        {result.couponStatistics.totalIssuedCoupons} slips
                      </span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-label">Cancelled</span>
                      <span className="stat-value" style={{ color: 'var(--color-danger)' }}>
                        {result.couponStatistics.totalCancelledCoupons} slips
                      </span>
                    </div>
                  </div>

                  {/* Quantities */}
                  <div className="info-list">
                    <div className="info-item">
                      <span className="info-label">Total Active Fuel Quantity</span>
                      <span className="info-value">{result.couponStatistics.totalFuelQuantity.toFixed(2)} Liters/Kg</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Total Billed Fuel Quantity</span>
                      <span className="info-value" style={{ color: 'var(--primary)' }}>
                        {result.couponStatistics.totalBilledFuelQuantity.toFixed(2)} Liters/Kg
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Pie Chart */}
                <div style={{ flex: '1 1 250px', display: 'flex', justifyContent: 'center', minWidth: '250px' }}>
                  <CouponPieChart 
                    billed={result.couponStatistics.totalBilledCoupons}
                    issued={result.couponStatistics.totalIssuedCoupons}
                    cancelled={result.couponStatistics.totalCancelledCoupons}
                  />
                </div>
              </div>

              {/* Lower row: Coupon Detailed Breakdown */}
              <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                  <h3 className="section-title" style={{ margin: 0 }}>Coupon Breakdown Details</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Filter by Status:</span>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="form-control"
                      style={{
                        width: 'auto',
                        minWidth: '180px',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="All">All Statuses</option>
                      <option value="Billed">Billed</option>
                      <option value="Issued (Pending)">Issued (Pending)</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {coupons.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                    {couponLoading ? (
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                        <RefreshCw className="animate-spin" size={20} />
                        <span>Loading coupon records...</span>
                      </div>
                    ) : (
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No coupon records found.</p>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                      <table className="table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                          <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                            <th style={{ padding: '0.75rem' }}>Coupon Number</th>
                            <th style={{ padding: '0.75rem' }}>Issue Date</th>
                            <th style={{ padding: '0.75rem' }}>Fuel Type</th>
                            <th style={{ padding: '0.75rem' }}>Quantity (Ltr/Kg)</th>
                            <th style={{ padding: '0.75rem' }}>Rate (₹)</th>
                            <th style={{ padding: '0.75rem' }}>Computed Amount (₹)</th>
                            <th style={{ padding: '0.75rem' }}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(() => {
                            const displayedCoupons = coupons
                              .filter(c => statusFilter === 'All' || c.status === statusFilter)
                              .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime());

                            return displayedCoupons.map((coupon, idx) => (
                              <tr key={coupon.couponNo + '-' + idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '0.75rem', fontWeight: 'bold', fontFamily: 'monospace' }}>{coupon.couponNo}</td>
                                <td style={{ padding: '0.75rem' }}>{new Date(coupon.issueDate).toLocaleString()}</td>
                                <td style={{ padding: '0.75rem' }}>{coupon.fuelTypeName}</td>
                                <td style={{ padding: '0.75rem' }}>{coupon.qty.toFixed(2)}</td>
                                <td style={{ padding: '0.75rem' }}>{coupon.rate ? `₹${coupon.rate.toFixed(2)}` : 'N/A'}</td>
                                <td style={{ padding: '0.75rem', fontWeight: 600 }}>{coupon.amount ? `₹${coupon.amount.toFixed(2)}` : 'N/A'}</td>
                                <td style={{ padding: '0.75rem' }}>
                                  <span className={`badge ${
                                    coupon.status === 'Billed' ? 'badge-success' :
                                    coupon.status === 'Cancelled' ? 'badge-danger' : 'badge-info'
                                  }`}>
                                    {coupon.status}
                                  </span>
                                </td>
                              </tr>
                            ));
                          })()}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem', gap: '1rem', alignItems: 'center' }}>
                      {couponLoading ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                          <RefreshCw className="animate-spin" size={16} />
                          <span>Loading more...</span>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                          {hasMoreCoupons && (
                            <button
                              onClick={() => loadCoupons(couponPage + 1, true)}
                              className="btn btn-primary"
                              style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem', cursor: 'pointer' }}
                            >
                              Show More Records
                            </button>
                          )}
                          {couponPage > 0 && (
                            <button
                              onClick={() => loadCoupons(0, false)}
                              className="btn btn-secondary"
                              style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem', cursor: 'pointer' }}
                            >
                              Show Less Records
                            </button>
                          )}
                          {!hasMoreCoupons && (
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                              All {coupons.length} records loaded.
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

            </div>
          )}

          {/* Tab 3: Fuel Statistics */}
          {activeTab === 'fuel' && (
            <div>
              <h3 className="section-title">Fuel Type Breakdown</h3>
              {result.fuelStatistics.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', padding: '1rem 0' }}>No active fuel statistics compiled.</p>
              ) : (
                <div className="table-container">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Fuel Type</th>
                        <th>Total Quantity Issued</th>
                        <th>Total Amount Valued</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.fuelStatistics.map((stat, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 700 }}>{stat.fuelTypeName}</td>
                          <td>
                            <strong style={{ color: 'var(--text-dark)' }}>{stat.totalQuantity.toFixed(2)}</strong> Liters/Kg
                          </td>
                          <td>
                            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>₹{stat.totalAmount.toFixed(2)}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Tab 3.5: Daily Rates */}
          {activeTab === 'dailyRates' && (
            <div>
              <h3 className="section-title">Daily Sales & Fuel Rates</h3>
              {(!result.dailyFuelRates || result.dailyFuelRates.length === 0) ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', padding: '1rem 0' }}>No daily fuel rates or sales recorded.</p>
              ) : (
                <div className="table-container">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Fuel Type</th>
                        <th>Rate (₹)</th>
                        <th>Total Quantity Sold</th>
                        <th>Computed Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.dailyFuelRates.map((rate, i) => (
                        <tr key={i}>
                          <td>{new Date(rate.date).toLocaleDateString()}</td>
                          <td style={{ fontWeight: 700 }}>{rate.fuelTypeName}</td>
                          <td>₹{rate.rate.toFixed(2)}</td>
                          <td>
                            <strong style={{ color: 'var(--text-dark)' }}>{rate.totalQuantity.toFixed(2)}</strong> Liters/Kg
                          </td>
                          <td>
                            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>₹{rate.computedPrice.toFixed(2)}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Payment Summary */}
          {activeTab === 'payment' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Payment Metrics */}
              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-label">Final Billed Amount</span>
                  <span className="stat-value">₹{result.paymentInformation.finalBilledAmount.toFixed(2) || 0}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Total Advance Received</span>
                  <span className="stat-value" style={{ color: 'var(--color-success)' }}>
                    ₹{result.paymentInformation.totalAdvance.toFixed(2) || 0}
                  </span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Net Outstanding / Payable</span>
                  <span className="stat-value" style={{ color: '#ef4444' }}>
                    ₹{result.paymentInformation.netPayable.toFixed(2) || 0}
                  </span>
                </div>
              </div>

              {/* Owed Alert Box */}
              <div style={{
                padding: '1rem',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontWeight: 600,
                ...(result.paymentInformation.netPayable > 0 
                  ? { background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--color-success)', color: '#10b981' }
                  : result.paymentInformation.netPayable < 0
                  ? { background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--color-danger)', color: '#ef4444' }
                  : { background: 'rgba(59, 130, 246, 0.1)', border: '1px solid var(--primary)', color: '#3b82f6' })
              }}>
                <AlertCircle size={20} />
                <span>
                  {result.paymentInformation.netPayable > 0 
                    ? `Government owes Fuel Station: ₹${result.paymentInformation.netPayable.toFixed(2)}`
                    : result.paymentInformation.netPayable < 0
                    ? `Fuel Station owes Government (Refund excess advance): ₹${Math.abs(result.paymentInformation.netPayable)}`
                    : `Accounts Settled (No Dues)`}
                </span>
              </div>

              {/* Bank Transaction Reference (UTR) */}
              <div>
                <h3 className="section-title">Bank Transfer Reference (UTR)</h3>
                {result.paymentInformation.utrNo ? (
                  <div className="info-list">
                    <div className="info-item">
                      <span className="info-label">UTR Transaction Number</span>
                      <span className="info-value" style={{ fontFamily: 'monospace', color: 'var(--primary)', fontSize: '1.1rem' }}>
                        {result.paymentInformation.utrNo}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Transfer Date</span>
                      <span className="info-value">
                        {result.paymentInformation.utrDate 
                          ? new Date(result.paymentInformation.utrDate).toLocaleDateString() 
                          : 'N/A'}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">UTR Last Updated</span>
                      <span className="info-value">
                        {result.paymentInformation.utrUpdateDate 
                          ? new Date(result.paymentInformation.utrUpdateDate).toLocaleDateString() 
                          : 'N/A'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'center',
                    background: 'rgba(245, 158, 11, 0.08)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    color: '#fbbf24',
                    padding: '1rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.9rem'
                  }}>
                    <ShieldCheck size={20} />
                    <span>Payment has not been processed yet. UTR transaction details will display here once dispatched.</span>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
      )}

    </div>
  );
};

const CouponPieChart = ({ billed, issued, cancelled }: { billed: number, issued: number, cancelled: number }) => {
  const total = billed + issued + cancelled;
  const [hoveredSlice, setHoveredSlice] = useState<{ value: number, color: string, label: string } | null>(null);

  if (total === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '2rem', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.02)' }}>
        <svg width="150" height="150" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--border-color)" strokeWidth="15" />
          <text x="50" y="54" textAnchor="middle" fill="var(--text-muted)" fontSize="8" fontWeight="bold">No Coupons</text>
        </svg>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No statistics to plot</span>
      </div>
    );
  }

  const r = 35;
  const circ = 2 * Math.PI * r;

  const slices = [
    { value: billed, color: '#10b981', label: 'Billed' },
    { value: issued, color: '#fbbf24', label: 'Pending' },
    { value: cancelled, color: '#ef4444', label: 'Cancelled' },
  ].filter(s => s.value > 0);

  let accumulatedPercent = 0;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '1.5rem', 
      background: 'rgba(255, 255, 255, 0.02)', 
      padding: '1.5rem 2rem', 
      borderRadius: 'var(--radius-md)', 
      border: '1px solid var(--border-color)',
      width: '100%',
      maxWidth: '280px'
    }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: '160px', aspectRatio: '1' }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
          {slices.map((slice, index) => {
            const percent = slice.value / total;
            const strokeLength = percent * circ;
            const strokeOffset = -accumulatedPercent * circ;
            accumulatedPercent += percent;

            const isHovered = hoveredSlice?.label === slice.label;

            return (
              <circle
                key={index}
                cx="50"
                cy="50"
                r={r}
                fill="transparent"
                stroke={slice.color}
                strokeWidth={isHovered ? 18 : 15}
                strokeDasharray={`${strokeLength} ${circ}`}
                strokeDashoffset={strokeOffset}
                onMouseEnter={() => setHoveredSlice(slice)}
                onMouseLeave={() => setHoveredSlice(null)}
                style={{ 
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)', 
                  cursor: 'pointer',
                  opacity: hoveredSlice ? (isHovered ? 1 : 0.4) : 1
                }}
              />
            );
          })}
        </svg>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '80%',
          height: '80%'
        }}>
          {hoveredSlice ? (
            <>
              <div style={{ 
                fontSize: '1.6rem', 
                fontWeight: 'bold', 
                color: hoveredSlice.color, 
                lineHeight: 1.1,
                transition: 'all 0.2s ease'
              }}>
                {hoveredSlice.value}
              </div>
              <div style={{ 
                fontSize: '0.75rem', 
                color: hoveredSlice.color, 
                fontWeight: 600, 
                marginTop: '0.2rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {hoveredSlice.label}
              </div>
              <div style={{ 
                fontSize: '0.7rem', 
                color: 'var(--text-muted)', 
                marginTop: '0.1rem' 
              }}>
                {Math.round((hoveredSlice.value / total) * 100)}%
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#fff', lineHeight: 1.1 }}>
                {total}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Total Slips
              </div>
            </>
          )}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
        {slices.map((slice, index) => {
          const pct = Math.round((slice.value / total) * 100);
          const isHovered = hoveredSlice?.label === slice.label;
          return (
            <div 
              key={index} 
              onMouseEnter={() => setHoveredSlice(slice)}
              onMouseLeave={() => setHoveredSlice(null)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                gap: '1.5rem', 
                fontSize: '0.85rem',
                cursor: 'pointer',
                padding: '0.25rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                background: isHovered ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                transition: 'all 0.2s ease',
                opacity: hoveredSlice ? (isHovered ? 1 : 0.5) : 1
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: slice.color }} />
                <span style={{ color: 'var(--text-muted)' }}>{slice.label}</span>
              </div>
              <strong style={{ color: '#fff' }}>{slice.value} ({pct}%)</strong>
            </div>
          );
        })}
      </div>
    </div>
  );
};
