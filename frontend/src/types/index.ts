export interface EventDto {
  id: number;
  name: string;
}

export interface DistrictDto {
  id: number;
  name: string;
}

export interface FuelStationDto {
  id: number;
  name: string;
}

// Vehicle Lookup Interfaces
export interface PrimaryDetailsDto {
  vehicleId: number;
  registrationNo: string;
  ownerName: string;
  ownerMobile: string;
  vehicleType: string;
  engineNo: string;
  chassisNo: string;
  seatCapacity: number;
  status: string;
  rtoName?: string;
  vehicleClassName?: string;
  fuelTypeName?: string;
  driverName?: string;
  driverMobile?: string;
  helperName?: string;
  helperMobile?: string;
  captureFromPlace?: string;
}

export interface PossessionSegmentDto {
  fromDateTime: string;
  toDateTime?: string;
  hours?: number;
  days?: number;
  type?: string;
}

export interface PossessionDetailsDto {
  captureDateTime: string;
  releaseDateTime?: string;
  totalPossessionHours?: number;
  totalPossessionDays?: number;
  ratePerDay?: number;
  proposedAmount?: number;
  netPayable?: number;
  segments: PossessionSegmentDto[];
}

export interface LogbookDto {
  id: number;
  dateTime: string;
  meterFromKm: number;
  meterToKm: number;
  distanceInKm: number;
  fromPlace?: string;
  via?: string;
  toPlace?: string;
  startDateTime?: string;
  endDateTime?: string;
  officerName?: string;
  headName?: string;
}

export interface FuelCouponDto {
  id: number;
  couponNo: string;
  issueDate: string;
  qty: number;
  fuelRate?: number;
  amount?: number;
  status?: string;
  validUpto?: string;
  reason?: string;
  fuelStationName?: string;
  fuelTypeName?: string;
}

export interface VehicleLookupResponse {
  primaryDetails: PrimaryDetailsDto;
  possessionDetails: PossessionDetailsDto;
  logbooks: LogbookDto[];
  fuelCoupons: FuelCouponDto[];
}

// Fuel Station Lookup Interfaces
export interface FuelStationInfoDto {
  id: number;
  name: string;
  ownerName: string;
  mobile: string;
  contactPerson?: string;
  contactPersonMobile?: string;
  companyName?: string;
  active: string;
  accountHolderName?: string;
  accountNo?: string;
  ifsc?: string;
  bankName?: string;
  branchName?: string;
  bankDetailsStatus?: string;
}

export interface CouponStatsDto {
  totalCoupons: number;
  totalBilledCoupons: number;
  totalCancelledCoupons: number;
  totalIssuedCoupons: number;
  totalFuelQuantity: number;
  totalBilledFuelQuantity: number;
}

export interface FuelStatsDto {
  fuelTypeName: string;
  totalQuantity: number;
  totalAmount: number;
}

export interface FuelStationPaymentDto {
  totalAdvance: number;
  finalBilledAmount: number;
  netPayable: number;
  utrNo?: string;
  utrDate?: string;
  utrUpdateDate?: string;
  kycStatus?: string;
}

export interface DailyFuelRateDto {
  date: string;
  fuelTypeName: string;
  rate: number;
  totalQuantity: number;
  computedPrice: number;
}

export interface FuelStationLookupResponse {
  stationInformation: FuelStationInfoDto;
  couponStatistics: CouponStatsDto;
  fuelStatistics: FuelStatsDto[];
  dailyFuelRates: DailyFuelRateDto[];
  paymentInformation: FuelStationPaymentDto;
}

export interface CouponDetail {
  couponNo: string;
  qty: number;
  rate: number;
  amount: number;
  status: string;
  rawStatus: string;
  issueDate: string;
  fuelTypeName: string;
}
