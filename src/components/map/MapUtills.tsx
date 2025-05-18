export const handleFitToPath = (
  mapRef: any,
  deliveryLocation: any,
  pickupLocation: any,
  deliveryPartnerLocation: any,
  hasAccepted: any,
  hasPickedUp: any,
) => {
  if (mapRef && deliveryLocation && pickupLocation) {
    mapRef.fitToCoordinates(
      [
        hasAccepted ? deliveryPartnerLocation : deliveryLocation,
        hasPickedUp ? deliveryPartnerLocation : pickupLocation,
      ],
      {
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
        animated: true,
      },
    );
  }
};
