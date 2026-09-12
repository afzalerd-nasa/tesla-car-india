export type DataStatus = 'Official' | 'Estimated' | 'Reported' | 'Unconfirmed';

export type AvailabilityStatus = 
  | 'Expected 2025-2026'
  | 'Under Evaluation'
  | 'Reference Only (Global)'
  | 'Not Officially Available';

export interface TeslaModel {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: 'Sedan' | 'SUV' | 'Pickup' | 'Supercar';
  bodyType: string;
  statusLabel: string;
  isOfficiallyAvailable: boolean;
  dataStatus: DataStatus;
  startingPriceInrMin: number; // in INR
  startingPriceInrMax: number;
  startingPriceDisplay: string;
  priceNote: string;
  heroImage: string;
  exteriorImage: string;
  interiorImage: string;
  overview: string;
  indianMarketInfo: string;
  wltpRangeKm: number;
  realWorldRangeKm: number;
  acceleration0to100: number; // seconds
  topSpeedKmh: number;
  seatingCapacity: number;
  driveType: string;
  batteryCapacityKwh: number;
  chargingConnector: string;
  acChargingKw: number;
  dcFastChargingKw: number;
  dcCharging10to80Min: number;
  isFeatured: boolean;
  lastUpdated: string;
}

export interface TeslaVariant {
  id: string;
  modelId: string;
  name: string;
  trim: string;
  priceInr: number;
  priceDisplay: string;
  dataStatus: DataStatus;
  acceleration0to100: number;
  topSpeedKmh: number;
  rangeWltpKm: number;
  batteryKwh: number;
  driveType: 'RWD' | 'AWD Dual Motor' | 'AWD Tri Motor' | 'Quad Motor';
  availabilityStatus: string;
  motorPowerHp: number;
  torqueNm: number;
}

export interface SpecificationDetail {
  modelId: string;
  batteryCapacity: string;
  batteryType: string;
  claimedRange: string;
  realWorldEstRange: string;
  motorConfiguration: string;
  power: string;
  torque: string;
  acceleration0to100: string;
  topSpeed: string;
  groundClearance: string;
  length: string;
  width: string;
  height: string;
  wheelbase: string;
  kerbWeight: string;
  bootSpace: string;
  frunkSpace: string;
  seatingCapacity: string;
  driveType: string;
  chargingConnector: string;
  acCharging: string;
  dcFastCharging: string;
  suspension: string;
  brakes: string;
  wheels: string;
}

export interface OnRoadPriceEstimate {
  modelId: string;
  variantId: string;
  exShowroomInr: number;
  registrationRtoInr: number; // usually 0% - 4% for EV depending on state
  insuranceInr: number;
  tcsInr: number; // 1% TCS
  fastagChargesInr: number;
  gstPercent: number; // 5% GST for EV in India (included or separate)
  stateSubsidyInr: number;
  estimatedOnRoadInr: number;
  customsDutyNote: string;
  lastUpdated: string;
}

export interface ChargingStation {
  id: string;
  city: string;
  state: string;
  locationName: string;
  chargerType: 'Tesla Destination' | 'Tesla Supercharger (Proposed)' | 'Verified Public CCS2 Hub' | 'Type 2 AC Charger';
  chargingSpeedKw: number;
  stallsCount: number;
  status: 'Operational (Partner CCS2)' | 'Proposed / In Dialogue' | 'Planned' | 'Under Construction';
  isVerifiedOperational: boolean;
  address: string;
  latitude: number;
  longitude: number;
  connectorType: string;
  navigationUrl: string;
  notes: string;
}

export interface NewsArticle {
  id: string;
  headline: string;
  slug: string;
  category: 'Tesla India' | 'New Models' | 'Prices' | 'Charging' | 'Manufacturing' | 'Government Policy' | 'EV Market' | 'Technology' | 'Software Updates';
  publishedDate: string;
  summary: string;
  fullContent: string;
  sourceName: string;
  sourceUrl: string;
  verifiedStatus: 'Verified Official' | 'Government Notification' | 'Reported by Reuters/Bloomberg' | 'Market Analysis';
  imageUrl: string;
}

export interface FAQItem {
  id: string;
  category: 'Availability & Launch' | 'Pricing & Taxes' | 'Charging & Range' | 'Features & Autopilot' | 'Comparison & Maintenance';
  question: string;
  answer: string;
  isPopular: boolean;
}

export interface ComparisonVehicle {
  id: string;
  brand: string;
  model: string;
  variant: string;
  isTesla: boolean;
  priceInr: number;
  priceDisplay: string;
  rangeClaimedKm: number;
  rangeRealWorldKm: number;
  batteryKwh: number;
  acceleration0to100: number;
  topSpeedKmh: number;
  dcFastChargingTimeMin: string;
  safetyRating: string;
  motorPowerHp: number;
  bootSpaceLiters: number;
  runningCostPerKm: number;
  warranty: string;
  serviceNetwork: string;
  keyFeatures: string[];
  pros: string[];
  cons: string[];
  imageUrl: string;
}

export interface TechFeature {
  id: string;
  title: string;
  category: 'Autopilot & FSD' | 'Connectivity & OS' | 'Powertrain & Battery' | 'Safety Architecture' | 'Convenience';
  subtitle: string;
  description: string;
  indiaAvailabilityNote: string;
  icon: string;
  highlights: string[];
}

export interface LocationInfo {
  id: string;
  city: string;
  name: string;
  type: 'Corporate Office' | 'Proposed Flagship Experience Centre' | 'Authorised Import Partner' | 'Service Evaluation Hub';
  openingStatus: 'Active Office' | 'Under Lease Evaluation' | 'Proposed';
  isOfficialTeslaEntity: boolean;
  address: string;
  contactInfo: string;
  notes: string;
  mapQuery: string;
}

export interface TimelineEvent {
  year: string;
  month: string;
  title: string;
  description: string;
  statusType: 'Milestone' | 'Policy' | 'Corporate' | 'Product';
  source: string;
}
