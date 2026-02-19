const BRUHL_CENTER = { lat: 50.83103, lng: 6.89497 };
const FREE_RADIUS_KM = 10;
const PRICE_PER_KM = 10;
const MAX_DISTANCE_KM = 100;

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export interface DeliveryResult {
  distanceKm: number;
  fee: number;
  tooFar: boolean;
}

export async function calculateDeliveryFee(
  street: string,
  plz: string,
  city: string
): Promise<DeliveryResult | null> {
  const query = encodeURIComponent(`${street}, ${plz} ${city}, Germany`);
  const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "KonfettiKiste-Booking/1.0" },
    });
    const data = await res.json();
    if (!data.length) return null;

    const lat = parseFloat(data[0].lat);
    const lng = parseFloat(data[0].lon);
    const distanceKm = haversineKm(BRUHL_CENTER.lat, BRUHL_CENTER.lng, lat, lng);
    const rounded = Math.ceil(distanceKm);

    return {
      distanceKm: rounded,
      fee: rounded <= FREE_RADIUS_KM ? 0 : (rounded - FREE_RADIUS_KM) * PRICE_PER_KM,
      tooFar: rounded > MAX_DISTANCE_KM,
    };
  } catch {
    return null;
  }
}
