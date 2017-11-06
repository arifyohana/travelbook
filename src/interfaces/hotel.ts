export interface IHotel {
  province_name: string;
  kecamatan_name: string;
  kelurahan_name: string;
  business_uri: string;
  photo_primary: string;
  star_rating: string;
  id: string;
  room_available: string;
  latitude: string;
  longitude: string;
  room_max_occupancies: number;
  rating: string;
  tripadvisor_avg_rating: {
    avg_rating: number
    image_url: string;
    review_count: number;
    url: string;
  },
  room_facility_name: string;
  oldprice: number;
  address: string;
  wifi: string;
  promo_name: string;
  price: number;
  total_price: number;
  regional: string;
  name: string;
  hotel_id: string;
}
