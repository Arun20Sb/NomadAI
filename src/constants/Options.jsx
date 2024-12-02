export const SelectTravelList = [
  {
    id: 1,
    title: "Just Me",
    desc: "Traveling solo is an adventure!",
    icon: "✈️",
    people: "1",
  },
  {
    id: 2,
    title: "Couple",
    desc: "A romantic getaway for two!",
    icon: "🥂",
    people: "2 people",
  },
  {
    id: 3,
    title: "Family",
    desc: "Fun times with the whole family!",
    icon: "👨‍👩‍👧‍👦",
    people: "2 to 4 people",
  },
  {
    id: 4,
    title: "Friends",
    desc: "Adventures with your best buddies!",
    icon: "🛥️",
    people: "2 to 5 people",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Traveling on a budget? Save more, spend less!",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "A balanced trip with smart spending.",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Indulge in the finest experiences!",
    icon: "💸",
  },
];

export const AI_PROMPT = `
You are a travel planning assistant. Your task is to generate a detailed travel itinerary based on the following input parameters:
- **Location**: {location}
- **Duration**: {totalDays} days
- **Traveler Details**: {traveler}
- **Budget**: {budget}
- **Travel Date**: {date}

### Instructions:
1. Respond strictly with a valid JSON object. Do not include any additional text, comments, or explanations outside the JSON object.
2. Ensure the JSON object starts with "{" and ends with "}".
3. The JSON structure should include the following keys and nested data:
   - \`hotels\` (array): A list of recommended hotels. Each hotel should include:
     - \`hotelName\`: Name of the hotel (string).
     - \`hotelAddress\`: Full address of the hotel (string).
     - \`price\`: Price per night in USD (number).
     - \`hotelImageURL\`: URL to an image of the hotel (string).
     - \`geoCoordinates\`: Object with latitude and longitude:
       - \`latitude\`: Latitude of the hotel (number).
       - \`longitude\`: Longitude of the hotel (number).
     - \`rating\`: Average user rating out of 5 (number).
     - \`description\`: A short description of the hotel (string).
     - Ensure there are at least 3 hotels and a maximum of 7 hotels in the list.
   - \`itinerary\` (array): A list of places to visit. Each place should include:
     - \`placeName\`: Name of the place (string).
     - \`placeDetails\`: A short description of the place (string).
     - \`placeImageURL\`: URL to an image of the place (string).
     - \`geoCoordinates\`: Object with latitude and longitude:
       - \`latitude\`: Latitude of the place (number).
       - \`longitude\`: Longitude of the place (number).
     - \`ticketPricing\`: Ticket price in USD (number).
     - \`timeToVisit\`: Best time to visit the place (string).
   - \`dayWisePlan\` (array): A day-by-day breakdown of activities. Each day should include:
     - \`day\`: Day number (integer).
     - \`activities\` (array): A list of activities, where each activity includes:
       - \`placeName\`: Name of the place (string).
       - \`time\`: Time allocated for the activity (string).
       - \`details\`: A short description of the activity (string).
     - Ensure each day has a minimum of 3 activities. You can include more if needed but do not restrict the number of activities to a set maximum.

4. Format the JSON for correctness and readability, ensuring it is valid for direct parsing.

### Careful Instructions, must to do:
1. Respond strictly with a valid JSON object. Do not include any additional text, comments, or explanations outside the JSON object.
2. Ensure the JSON object starts with \`{\` and ends with \`}\`.
3. Do not include backticks (\`) or formatting markers like \` \`\`\`json \`.\`
4. Format the JSON for correctness and readability, ensuring it is valid for direct parsing.
`;
