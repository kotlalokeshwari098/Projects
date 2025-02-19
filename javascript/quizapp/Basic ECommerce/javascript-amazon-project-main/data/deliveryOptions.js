import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

// storing the id in cart so when i select i know which option i choose see in cart.js

export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
}, {
    id: 2,
    deliveryDays: 3,
    priceCents: 499
}, {
    id: 3,
    deliveryDays: 1,
    priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;
    deliveryOptions.forEach((option) => {
        if (option.id == deliveryOptionId) {
            deliveryOption = option;
        }
    })
    return deliveryOption || deliveryOptions[0];
}
// to use in ordersummary.js and paymentsummmary.js


// here we are not considering weekends when calculating delivery date even it comes in between while counting it is skipped and added to next day
export function calculateDeliveryDate(deliveryOption) {
    const today = dayjs();
    let datesToAdd = deliveryOption.deliveryDays;
    let daysAdded = 0; // Track the number of valid days added
    let deliveryDate = today;
    while (daysAdded < datesToAdd) {
        deliveryDate = deliveryDate.add(1, 'day'); // Add one day at a time
        const dayString = deliveryDate.format('dddd'); // Get the day of the week

        // Skip weekends
        if (dayString === 'Saturday' || dayString === 'Sunday') {
            continue;
        }

        daysAdded++; // Only increment if it's a weekday
    }

    const dateString = deliveryDate.format("dddd, MMMM D");
    return dateString;
}

