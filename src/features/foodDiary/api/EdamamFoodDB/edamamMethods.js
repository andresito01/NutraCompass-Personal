import apiKeys from "./keys.js";

const API_ID = apiKeys.edamamConfig.app_id;
const API_KEY = apiKeys.edamamConfig.app_key;
const PARSER_BASE_URL = "https://api.edamam.com/api/food-database/v2/parser";
const NUTRIENTS_BASE_URL =
  "https://api.edamam.com/api/food-database/v2/nutrients";

// Search Edamam Food Database API for foods according to user search values
export async function searchFood(searchTerm) {
  const url = `${PARSER_BASE_URL}?ingr=${searchTerm}&app_id=${API_ID}&app_key=${API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    let processedData = [];
    if (
      // typeof data.hints.food === "object" &&
      // Array.isArray(data.hints.measures)
      data.hints
    ) {
      processedData = await Promise.all(
        data.hints.map(async (foodItem) => {
          if (
            typeof foodItem.food === "object" &&
            Array.isArray(foodItem.measures)
          ) {
            const ingredientsParam = {
              ingredients: [
                {
                  quantity: 1,
                  measureURI: foodItem.measures[0]?.uri || "",
                  foodId: foodItem.food?.foodId || "",
                },
              ],
            };

            const nutrients = await searchForFoodItemNutrients(
              ingredientsParam
            );

            // Use helper methods here
            const processedDataSchema = {
              foodId: foodItem.food?.foodId,
              foodLabel: foodItem.food?.label,
              foodCategory: foodItem.food?.category,
              foodBrand: foodItem.food?.brand,
              numberOfServings: 1,
              activeMeasure: foodItem.measures[0],
              measures: foodItem?.measures,
              nutrients: {
                ...processCoreNutrients(nutrients, 1),
                vitamins: processVitamins(nutrients, 1),
                minerals: processMinerals(nutrients, 1),
              },
            };

            return processedDataSchema;
          }
        })
      );
    }

    // Remove duplicates based on foodId
    const uniqueResultsMap = new Map();
    processedData.forEach((item) => {
      if (!uniqueResultsMap.has(item.foodId)) {
        uniqueResultsMap.set(item.foodId, item);
      }
    });
    processedData = Array.from(uniqueResultsMap.values());

    console.log("Processing finished.");
    return processedData;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

// Search Edamam Food Database API for a specific food item through its barcode
export async function searchFoodByBarcode(code) {
  const url = `${PARSER_BASE_URL}?upc=${code}&app_id=${API_ID}&app_key=${API_KEY}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    let processedData = [];
    if (
      // typeof data.hints.food === "object" &&
      // Array.isArray(data.hints.measures)
      data.hints
    ) {
      processedData = await Promise.all(
        data.hints.map(async (foodItem) => {
          if (
            typeof foodItem.food === "object" &&
            Array.isArray(foodItem.measures)
          ) {
            const ingredientsParam = {
              ingredients: [
                {
                  quantity: 1,
                  measureURI: foodItem.measures[0]?.uri || "",
                  foodId: foodItem.food?.foodId || "",
                },
              ],
            };

            const nutrients = await searchForFoodItemNutrients(
              ingredientsParam
            );

            // Use helper methods here
            const processedDataSchema = {
              foodId: foodItem.food?.foodId,
              foodLabel: foodItem.food?.label,
              foodCategory: foodItem.food?.category,
              foodBrand: foodItem.food?.brand,
              numberOfServings: 1,
              activeMeasure: foodItem.measures[0],
              measures: foodItem?.measures,
              nutrients: {
                ...processCoreNutrients(nutrients, 1),
                vitamins: processVitamins(nutrients, 1),
                minerals: processMinerals(nutrients, 1),
              },
            };

            return processedDataSchema;
          }
        })
      );
    }

    // Remove duplicates based on foodId
    const uniqueResultsMap = new Map();
    processedData.forEach((item) => {
      if (!uniqueResultsMap.has(item.foodId)) {
        uniqueResultsMap.set(item.foodId, item);
      }
    });
    processedData = Array.from(uniqueResultsMap.values());

    console.log("Processing finished.");
    return processedData;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

/**
 * ingredients param object format
{
  "ingredients": [
    {
      "quantity": 0,
      "measureURI": "string",
      "qualifiers": [
        "string"
      ],
      "foodId": "string"
    }
  ]
}
 */

// Get a food item's nutrient information
export async function searchForFoodItemNutrients(ingredients) {
  // console.log("Ingredient Param: ", JSON.stringify(ingredients, null, 2));
  const url = `${NUTRIENTS_BASE_URL}?ingredients=${encodeURIComponent(
    JSON.stringify(ingredients)
  )}&app_id=${API_ID}&app_key=${API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingredients),
    });
    // console.log("Response: " + JSON.stringify(response));
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
    // Process the data as needed, e.g., display the food items
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

// HELPER METHODS

// Helper function to process raw Edamam Api nutrient response data
function processNutrientData(nutrientData, keysToFilter, numberOfServings) {
  if (!nutrientData) {
    console.log("Nutrient data is null, empty, or undefined.");
    return {};
  }

  const defaultQuantity = "NA"; // You can adjust the default value accordingly

  const searchEverything = !keysToFilter || keysToFilter.length === 0;

  const nutrients = {};

  Object.entries(nutrientData?.totalNutrients).forEach(([key, value]) => {
    if (searchEverything || (keysToFilter && keysToFilter.includes(key))) {
      const quantity = parseFloat(value.quantity);
      nutrients[key] = {
        label: getNutrientLabel(key),
        quantity: !isNaN(quantity) ? quantity.toFixed(2) : "0.00",
        unit: value.unit,
      };
    }
  });

  Object.entries(nutrientData?.totalDaily).forEach(([key, value]) => {
    const matchingNutrient = nutrients[key];
    if (matchingNutrient) {
      const totalDailyQuantity = parseFloat(value.quantity);
      matchingNutrient.totalDaily = {
        quantity: !isNaN(totalDailyQuantity)
          ? totalDailyQuantity.toFixed(2)
          : "0.00",
      };
    }
  });

  return nutrients;
}

function processNutrientDataWithDefaults(
  nutrientData,
  keysToFilter,
  numberOfServings
) {
  if (!nutrientData) {
    console.log("Nutrient data is null, empty, or undefined.");
    return {};
  }

  const defaultQuantity = "--"; // You can adjust the default value accordingly

  const nutrients = {};

  keysToFilter.forEach((key) => {
    const value = nutrientData?.totalNutrients?.[key];
    const totalDailyValue = nutrientData?.totalDaily?.[key];

    const quantity = parseFloat(value?.quantity);
    const totalDailyQuantity = parseFloat(totalDailyValue?.quantity) || 0;

    nutrients[key] = {
      label: getNutrientLabel(key),
      quantity: !isNaN(quantity) ? quantity.toFixed(2) : defaultQuantity,
      unit: value?.unit || "",
    };

    if (nutrients[key] && totalDailyValue) {
      nutrients[key].totalDaily = {
        quantity: !isNaN(totalDailyQuantity)
          ? totalDailyQuantity.toFixed(2)
          : defaultQuantity,
      };
    }
  });

  return nutrients;
}

// Helper function to process new nutrient data
export function processCoreNutrients(nutrientData, numberOfServings) {
  const coreNutrientKeys = [
    "ENERC_KCAL",
    "CHOCDF",
    "PROCNT",
    "FAT",
    "FASAT",
    "FATRN",
    "FAPU",
    "FAMS",
    "CHOLE",
    "FIBTG",
    "SUGAR",
  ];
  return processNutrientDataWithDefaults(
    nutrientData,
    coreNutrientKeys,
    numberOfServings
  );
}

export function processVitamins(nutrientData, numberOfServings) {
  const vitaminKeys = [
    "VITA_RAE",
    "VITC",
    "VITD",
    "TOCPHA",
    "VITK1",
    "THIA",
    "RIBF",
    "NIA",
    "VITB6A",
    "FOLDFE",
    "VITB12",
  ];
  return processNutrientDataWithDefaults(
    nutrientData,
    vitaminKeys,
    numberOfServings
  );
}

export function processMinerals(nutrientData, numberOfServings) {
  const mineralKeys = ["CA", "FE", "MG", "P", "K", "NA", "ZN"];
  return processNutrientDataWithDefaults(
    nutrientData,
    mineralKeys,
    numberOfServings
  );
}

// Helper function to process nutrient data for activeFoodItem
function processActiveFoodItemNutrientData(nutrient, numberOfServings) {
  if (!nutrient) {
    console.log("Nutrient data is null, empty, or undefined.");
    return {};
  }

  const quantity = parseFloat(nutrient.quantity);

  const processedNutrient = {
    label: nutrient.label,
    quantity: !isNaN(quantity) ? (quantity * numberOfServings).toFixed(2) : "-",
    unit: nutrient?.unit || "",
  };

  // If the nutrient has totalDaily, process it
  if (nutrient.totalDaily) {
    const totalDailyQuantity = parseFloat(nutrient.totalDaily.quantity);
    processedNutrient.totalDaily = {
      quantity: !isNaN(totalDailyQuantity)
        ? (totalDailyQuantity * numberOfServings).toFixed(2)
        : "-",
    };
  }

  return processedNutrient;
}

// Function to process activeFoodItem for number of servings update
export function processActiveFoodItemNumberOfServingsUpdate(
  activeFoodItem,
  numberOfServings
) {
  if (!activeFoodItem) {
    console.log("Active food item is null, empty, or undefined.");
    return {};
  }

  if (isNaN(numberOfServings)) {
    numberOfServings = 0;
  }

  const nutrients = activeFoodItem.nutrients;
  const processedNutrients = {};

  // Iterate over the keys in activeFoodItem.nutrients
  for (const key in nutrients) {
    if (nutrients.hasOwnProperty(key)) {
      if (key === "vitamins" || key === "minerals") {
        // If the nutrient is "vitamins" or "minerals", process each item inside
        processedNutrients[key] = {};
        for (const nestedKey in nutrients[key]) {
          if (nutrients[key].hasOwnProperty(nestedKey)) {
            processedNutrients[key][nestedKey] =
              processActiveFoodItemNutrientData(
                nutrients[key][nestedKey],
                numberOfServings
              );
          }
        }
      } else {
        // Process individual nutrient
        processedNutrients[key] = processActiveFoodItemNutrientData(
          nutrients[key],
          numberOfServings
        );
      }
    }
  }

  return processedNutrients;
}

const getNutrientLabel = (nutrientKey) => {
  switch (nutrientKey) {
    case "ENERC_KCAL":
      return "Calories";
    case "CHOCDF":
      return "Total Carbohydrate";
    case "PROCNT":
      return "Protein";
    case "FAT":
      return "Total Fat";
    case "FASAT":
      return "Saturated Fat";
    case "FATRN":
      return "Trans Fat";
    case "FAPU":
      return "Polyunsaturated Fat";
    case "FAMS":
      return "Monounsaturated Fat";
    case "CHOLE":
      return "Cholesterol";
    case "FIBTG":
      return "Dietary Fiber";
    case "SUGAR":
      return "Total Sugar";
    case "VITA_RAE":
      return "Vitamin A";
    case "VITC":
      return "Vitamin C";
    case "VITD":
      return "Vitamin D";
    case "TOCPHA":
      return "Vitamin E";
    case "VITK1":
      return "Vitamin K1";
    case "THIA":
      return "Thiamin (Vitamin B1)";
    case "RIBF":
      return "Riboflavin (Vitamin B2)";
    case "NIA":
      return "Niacin (Vitamin B3)";
    case "VITB6A":
      return "Vitamin B6";
    case "FOLDFE":
      return "Folate (Vitamin B9)";
    case "VITB12":
      return "Vitamin B12";
    case "CA":
      return "Calcium";
    case "FE":
      return "Iron";
    case "MG":
      return "Magnesium";
    case "P":
      return "Phosphorus";
    case "K":
      return "Potassium";
    case "NA":
      return "Sodium";
    case "ZN":
      return "Zinc";
    default:
      return "Unknown Nutrient";
  }
};
