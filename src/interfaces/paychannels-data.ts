export interface IPaychannelsData {
  "id": number;
  "user-id": any;
  "paytype-id": number;
  "paypartner-id": number;
  "name": string;
  "description": string;
  "payment-info": string;
  "host": any;
  "url": any;
  "rek": string;
  "image": {
    "url": string;
    "thumb": {
      "url": string;
    },
    "medium": {
      "url": string;
    },
    "big": {
      "url": string;
    },
    "super": {
      "url": string;
    },
    "mobile": {
      "url": string;
    },
    "slider": {
      "url": string;
    },
    "slider_promo": {
      "url": string;
    }
  },
  "image-name": string;
  "image-size": number;
  "human-size": any;
  "content-type": string;
  "created-at": Date;
  "updated-at": Date;
}
