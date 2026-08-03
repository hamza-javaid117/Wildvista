const EXTRA_SERVICE_PRICES = {
    privateRoom: 12000,
    jeepSafari: 5000,
    bonfire: 2000,
    airportPickup: 3000,
    photography: 4000,
};

export const calculateBookingTotals = ({ tourPricePerAdult = 0, adults = 0, children = 0, extraServices = [] }) => {
    const adultCount = Math.max(0, Number(adults) || 0);
    const childCount = Math.max(0, Number(children) || 0);
    const adultTotal = Number(tourPricePerAdult || 0) * adultCount;
    const childOriginalTotal = Number(tourPricePerAdult || 0) * childCount;
    const childDiscountedTotal = childOriginalTotal * 0.7;
    const extraServicesTotal = (extraServices || []).reduce((sum, service) => sum + (EXTRA_SERVICE_PRICES[service] || 0), 0);
    const originalPrice = adultTotal + childOriginalTotal + extraServicesTotal;
    const discountedPrice = adultTotal + childDiscountedTotal + extraServicesTotal;

    return {
        adultTotal,
        childOriginalTotal,
        childDiscountedTotal,
        extraServicesTotal,
        originalPrice,
        discountedPrice,
    };
};
