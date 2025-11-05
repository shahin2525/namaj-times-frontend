export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000/api/v1'


export async function fetchPrayerTimes(location?: { lat: number; lng: number }) {
const params = location ? `?lat=${location.lat}&lng=${location.lng}` : ''
const res = await fetch(`${API_BASE}/prayer-times${params}`, { cache: 'no-store' })
if (!res.ok) throw new Error('Failed to fetch prayer times')
return res.json()
}