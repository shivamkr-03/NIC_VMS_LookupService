import type {
  EventDto,
  DistrictDto,
  FuelStationDto,
  VehicleLookupResponse,
  FuelStationLookupResponse,
  CouponDetail
} from '../types';

const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:8082/api';

export async function fetchEvents(): Promise<EventDto[]> {
  const res = await fetch(`${BASE_URL}/public/events`);
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
}

export async function fetchDistricts(): Promise<DistrictDto[]> {
  const res = await fetch(`${BASE_URL}/public/districts`);
  if (!res.ok) throw new Error('Failed to fetch districts');
  return res.json();
}

export async function fetchFuelStations(eventId: number, districtId: number): Promise<FuelStationDto[]> {
  const res = await fetch(`${BASE_URL}/public/fuelstations?eventId=${eventId}&districtId=${districtId}`);
  if (!res.ok) throw new Error('Failed to fetch fuel stations');
  return res.json();
}

export async function searchVehicle(
  eventId: number,
  registrationNumber: string,
  engineOrChassisNumber: string
): Promise<VehicleLookupResponse> {
  const res = await fetch(`${BASE_URL}/public/vehicle/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventId, registrationNumber, engineOrChassisNumber })
  });
  
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Vehicle lookup failed' }));
    throw new Error(err.message || 'Vehicle lookup failed');
  }
  return res.json();
}

export async function searchFuelStation(
  eventId: number,
  districtId: number,
  stationId: number,
  mobileNumber: string
): Promise<FuelStationLookupResponse> {
  const res = await fetch(`${BASE_URL}/public/fuelstation/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventId, districtId, stationId, mobileNumber })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Fuel station lookup failed' }));
    throw new Error(err.message || 'Fuel station lookup failed');
  }
  return res.json();
}

export async function fetchCoupons(
  fuelstationId: number,
  eventId: number,
  districtId: number,
  page: number,
  size: number
): Promise<CouponDetail[]> {
  const res = await fetch(
    `${BASE_URL}/public/fuelstation/coupons?fuelstationId=${fuelstationId}&eventId=${eventId}&districtId=${districtId}&page=${page}&size=${size}`
  );
  if (!res.ok) throw new Error('Failed to fetch coupons');
  return res.json();
}
