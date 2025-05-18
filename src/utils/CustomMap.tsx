export const customMapStyle = [
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.business',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];

export const customMapStyleLight = [
  {
    elementType: 'geometry',
    stylers: [{color: '#ffffff'}],
  },
  {
    elementType: 'labels.icon',
    stylers: [{visibility: 'off'}],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{color: '#616161'}],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{color: '#f5f5f5'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#eeeeee'}],
  },
];
