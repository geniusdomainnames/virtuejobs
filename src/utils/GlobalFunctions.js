
import { GlobalVariables } from "./GlobalVariables";


export class GlobalFunctions {
  
 

  static formatDateString(dateStr) {
    const suffixes = ['th', 'st', 'nd', 'rd'];

    // Parse the input date string assuming it's in M/D/YYYY format
    const [month, day, year] = dateStr.split('/').map(Number);
    const date = new Date(year, month - 1, day); // JS months are 0-indexed

    const days = GlobalVariables.days;
    const months = GlobalVariables.months;
    const dayOfWeek = days[date.getDay()];
    const dayOfMonth = date.getDate();

    // Determine the ordinal suffix
    const getOrdinal = (d) => {
      if (d >= 11 && d <= 13) return 'th';
      const lastDigit = d % 10;
      return suffixes[lastDigit] || 'th';
    };

    const ordinal = getOrdinal(dayOfMonth);
    const monthName = months[month - 1];
    
    // Format day with leading zero if needed
    const formattedDay = dayOfMonth.toString().padStart(2, '0');

    return `${dayOfWeek} ${formattedDay}${ordinal} ${monthName}, ${year}`;
}

static formatDateString(dateStr) {
  const suffixes = ['th', 'st', 'nd', 'rd'];

  // Parse the input date string assuming it's in M/D/YYYY format
  const [month, day, year] = dateStr.split('/').map(Number);
  const date = new Date(year, month - 1, day); // JS months are 0-indexed

  const days = GlobalVariables.days;
  const months = GlobalVariables.months;
  const dayOfWeek = days[date.getDay()];
  const dayOfMonth = date.getDate();

  // Determine the ordinal suffix
  const getOrdinal = (d) => {
    if (d >= 11 && d <= 13) return 'th';
    const lastDigit = d % 10;
    return suffixes[lastDigit] || 'th';
  };

  const ordinal = getOrdinal(dayOfMonth);
  const monthName = months[month - 1].substring(0, 3); // Get first 3 letters
  
  // Format day with leading zero if needed
  const formattedDay = dayOfMonth.toString().padStart(2, '0');

  return `${dayOfWeek} ${formattedDay}${ordinal} ${monthName}, ${year}`;
}


static stripHTML(html) {
  return html.replace(/<(?!\/?a(?=>|\s.*>))[^>]*>/g, '');
}


static cleanJSON(text) {
  if (typeof text !== "string") {
    text = String(text);
  }

  // Remove backticks or markdown wrappers if any
  return text.replace(/```(?:json)?|```/g, '').trim();
}


static cleanAndParseJSON(input) {
  // Remove ```json and ``` from the string
  const cleaned = input.replace(/^```json\s*|\s*```$/g, '').trim();

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    //console.error("Invalid JSON:", error);
    return null;
  }
}

static slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // remove non-alphanumeric chars
    .trim()
    .replace(/\s+/g, '-') // replace spaces with hyphens
};


  
}




