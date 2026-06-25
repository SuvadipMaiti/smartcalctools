const asyncHandler = require('express-async-handler');
const Models = require('../models');
const Calculator = Models.Calculator;
const User = Models.User;
const TagCalculator = Models.TagCalculator;
const Tag = Models.Tag;
const Validator = require('fastest-validator');
const { Op } = require('sequelize');
var Sequelize = require('sequelize');
const fs = require('fs');
const moment = require('moment');

// @desc Calculate Bmi
// @route POST /api/tool/tool-bmi
// @access Private
// @Author Suvadip Maiti
const toolBmiCalculate = asyncHandler(async (req, res) => {
  var age = req.body.age;
  var gender = req.body.gender;
  var height = req.body.height;
  var weight = req.body.weight;
  // validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      age: Number(age),
      gender: gender,
      height: Number(height),
      weight: Number(weight),
    },
    {
      age: { type: 'number', integer: true, min: 1, max: 150, convert: true },
      gender: { type: 'string', empty: false, enum: ['Male', 'Female'] },
      height: { type: 'number', min: 30, max: 300, convert: true },
      weight: { type: 'number', min: 2, max: 800, convert: true },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end
  const toolBmiData = calculateBMIWithAgeGender(weight, height, age, gender);
  // console.log(`BMI: ${toolBmiData.bmi}, Category: ${toolBmiData.category}`);
  // console.log(toolBmiData);
  res.status(200).json({
    message: 'Bmi Calculate sucessfully',
    status: true,
    data: toolBmiData,
  });
});

// BMI calculation functions
const calculateBMI = (weight, height) => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  return parseFloat(bmi.toFixed(1));
};

const getBMICategory = (bmi, age, gender) => {
  let category = '';
  let message = '';
  let color = '';

  if (age < 18) {
    if (gender === 'Male') {
      if (bmi < 18) {
        category = 'Underweight';
        color = '#3498db';
        message = `Your BMI indicates that you are underweight for your age and gender. 
It's important to ensure you get sufficient calories, protein, and nutrients for proper growth. 
Focus on balanced meals with whole grains, dairy, lean proteins, and healthy fats. 
Regular physical activity is good, but avoid excessive cardio until weight is in a healthy range.`;
      } else if (bmi < 24) {
        category = 'Healthy weight';
        color = '#2ecc71';
        message = `Your BMI is within the healthy range for boys your age. 
Maintain a balanced diet rich in vegetables, fruits, whole grains, and lean proteins. 
Stay active daily and continue regular exercise to support healthy growth and development.`;
      } else if (bmi < 29) {
        category = 'Overweight';
        color = '#f1c40f';
        message = `Your BMI indicates you are slightly above the healthy weight range. 
Consider limiting sugary snacks and beverages, and increase physical activity. 
Incorporate more fruits, vegetables, and whole grains into your diet. 
Monitor your growth and aim to achieve a healthier BMI over time.`;
      } else {
        category = 'Obese';
        color = '#e74c3c';
        message = `Your BMI indicates obesity, which increases risk for health issues such as diabetes, high blood pressure, and joint problems. 
It's important to consult a healthcare professional. 
Adopt a structured plan for nutrition, activity, and lifestyle. 
Focus on gradual weight reduction, increased physical activity, and balanced meals.`;
      }
    } else {
      // Female
      if (bmi < 17.5) {
        category = 'Underweight';
        color = '#3498db';
        message = `Your BMI indicates you are underweight for your age and gender. 
Ensure adequate nutrition including proteins, dairy, fruits, and whole grains. 
Proper nutrition supports growth, bone development, and energy levels. 
Avoid skipping meals and maintain a consistent eating schedule.`;
      } else if (bmi < 23) {
        category = 'Healthy weight';
        color = '#2ecc71';
        message = `Your BMI is within the healthy range for girls your age. 
Continue with a balanced diet, regular physical activity, and adequate sleep. 
Engage in activities that promote bone and muscle strength. 
Maintaining a healthy lifestyle now benefits long-term health.`;
      } else if (bmi < 28) {
        category = 'Overweight';
        color = '#f1c40f';
        message = `Your BMI indicates you are above the healthy range. 
Consider reducing high-calorie snacks, processed foods, and sugary drinks. 
Increase daily physical activity such as walking, swimming, or sports. 
Gradually adopt healthy habits to reach and maintain a healthy BMI.`;
      } else {
        category = 'Obese';
        color = '#e74c3c';
        message = `Your BMI indicates obesity, which can affect growth and health. 
Seek advice from a healthcare professional for a safe and structured plan. 
Focus on gradual weight loss, balanced nutrition, and consistent physical activity. 
Early intervention can prevent future health complications.`;
      }
    }
  } else {
    // Adults
    if (bmi < 18.5) {
      category = 'Underweight';
      color = '#3498db';
      message = `Your BMI is below the normal range. Being underweight may lead to nutrient deficiencies, decreased immunity, and lower muscle strength. 
Focus on nutrient-dense foods such as lean proteins, whole grains, dairy, fruits, and healthy fats. 
Avoid skipping meals and consider consulting a nutritionist for guidance.`;
    } else if (bmi < 25) {
      category = 'Normal weight';
      color = '#2ecc71';
      message = `Your BMI is within the healthy range. Maintain your current lifestyle with a balanced diet, regular exercise, and adequate sleep. 
Incorporate strength and cardio exercises to sustain overall health, energy, and vitality. 
Continue monitoring your weight periodically to stay within the healthy range.`;
    } else if (bmi < 30) {
      category = 'Overweight';
      color = '#f1c40f';
      message = `Your BMI indicates you are overweight, which may increase risk for heart disease, diabetes, and joint issues. 
Reduce consumption of processed foods, sugary drinks, and high-fat meals. 
Increase physical activity with daily exercise and incorporate strength training. 
Gradual weight loss through sustainable lifestyle changes is recommended.`;
    } else {
      category = 'Obese';
      color = '#e74c3c';
      message = `Your BMI falls in the obese range, which can significantly increase the risk of chronic diseases such as heart disease, diabetes, and hypertension. 
It's crucial to seek guidance from healthcare professionals. 
Adopt a structured nutrition plan, increase physical activity gradually, and set achievable health goals. 
Monitoring progress and staying consistent are key to long-term health improvements.`;
    }
  }

  return { category, message, color };
};

// Full calculation function
function calculateBMIWithAgeGender(weight, height, age, gender) {
  const bmi = calculateBMI(weight, height);
  const { category, message, color } = getBMICategory(bmi, age, gender);
  return { bmi, category, message, color };
}

// @desc Calculate Emi
// @route POST /api/tool/tool-emi
// @access Private
// @Author Suvadip Maiti
const toolEmiCalculate = asyncHandler(async (req, res) => {
  var loanAmount = req.body.loanAmount;
  var interest = req.body.interest;
  var tenure = req.body.tenure;
  // validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      loanAmount: Number(loanAmount),
      interest: Number(interest),
      tenure: Number(tenure),
    },
    {
      loanAmount: { type: 'number', min: 1, integer: true, convert: true },
      interest: { type: 'number', min: 1, max: 50, convert: true },
      tenure: { type: 'number', min: 1, max: 1000, convert: true },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end

  const toolEmiData = calculateEMI(loanAmount, interest, tenure);
  // console.log(toolEmiData);
  res.status(200).json({
    message: 'Emi Calculate sucessfully',
    status: true,
    data: toolEmiData,
  });
});

// Full calculation function
function calculateEMI(loanAmount, interest, tenure) {
  // EMI calculation
  const P = Number(loanAmount);
  const annualRate = Number(interest);
  const n = Number(tenure); // months
  const r = annualRate / 12 / 100; // monthly interest rate

  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalAmount = emi * n;
  const totalInterest = totalAmount - P;

  const schedule = [];
  let remainingBalance = loanAmount;
  let totalInterestPaid = 0;
  for (let month = 1; month <= n; month++) {
    const interestPaid = remainingBalance * r;
    const principalPaid = emi - interestPaid;
    remainingBalance -= principalPaid;
    totalInterestPaid += interestPaid;
    schedule.push({
      month,
      emi: parseFloat(emi.toFixed(2)),
      principalPaid: parseFloat(principalPaid.toFixed(2)),
      interestPaid: parseFloat(interestPaid.toFixed(2)),
      remainingBalance: parseFloat(
        remainingBalance > 0 ? remainingBalance.toFixed(2) : 0
      ),
    });
  }

  return {
    principalAmount: P,
    monthlyEMI: parseFloat(emi.toFixed(2)),
    totalInterest: parseFloat(totalInterest.toFixed(2)),
    totalPayment: parseFloat(totalAmount.toFixed(2)),
    schedule: schedule,
  };
}

// @desc Calculate Bmr
// @route POST /api/tool/tool-bmr
// @access Private
// @Author Suvadip Maiti
const toolBmrCalculate = asyncHandler(async (req, res) => {
  var age = req.body.age;
  var gender = req.body.gender;
  var height = req.body.height;
  var weight = req.body.weight;
  // validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      age: Number(age),
      gender: gender,
      height: Number(height),
      weight: Number(weight),
    },
    {
      age: { type: 'number', integer: true, min: 1, max: 150, convert: true },
      gender: { type: 'string', empty: false, enum: ['Male', 'Female'] },
      height: { type: 'number', min: 30, max: 300, convert: true },
      weight: { type: 'number', min: 2, max: 800, convert: true },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end
  const toolBmrData = calculateBMRWithDetails(weight, height, age, gender);
  // console.log(toolBmrData);
  res.status(200).json({
    message: 'Bmr Calculate sucessfully',
    status: true,
    data: toolBmrData,
  });
});

// Full calculation with detailed explanation
function calculateBMRWithDetails(weight, height, age, gender) {
  const bmr = calculateBMR(weight, height, age, gender);
  const tdeeResults = calculateAllTDEEForBmr(bmr);

  let message = `
<h2>⚡ Basal Metabolic Rate (BMR) & TDEE Report</h2>

<h3>🧮 Your BMR: <span style="color:#2ecc71">${bmr} calories/day</span></h3>
<p>
This is the minimum energy your body requires to stay alive at rest — 
supporting breathing, circulation, organ function, and cell repair.
</p>

<h3>🏃 Your Total Daily Energy Expenditure (TDEE):</h3>
<p>
TDEE represents how many calories you burn daily based on your lifestyle 
and activity level. Below are the personalized values:
</p>
`;

  tdeeResults.forEach((r) => {
    message += `
<div style="margin:12px 0; padding:10px; border-left:5px solid #3498db; background:#f9f9f9">
  <strong>➡️ ${r.activity} lifestyle</strong>  
  <br/><em>${r.description}</em>
  <ul>
    <li>Maintain weight: <b>${r.maintain} kcal/day</b></li>
    <li>Safe weight loss (~0.5kg/week): <b>${r.loseWeight} kcal/day</b></li>
    <li>Healthy weight gain (~0.5kg/week): <b>${r.gainWeight} kcal/day</b></li>
  </ul>
</div>
`;
  });

  return { bmr, tdeeResults, message };
}

// 🔹 BMR calculation using Mifflin-St Jeor Equation
function calculateAllTDEEForBmr(weight, height, age, gender) {
  let bmr;
  if (gender.toLowerCase() === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  return parseFloat(bmr.toFixed(1));
}

// 🔹 TDEE calculation with descriptions
function calculateAllTDEE(bmr) {
  const activityLevels = {
    Sedentary: {
      factor: 1.2,
      desc: 'Little to no exercise. Example: desk job, studying, TV, gaming.',
    },
    Light: {
      factor: 1.375,
      desc: 'Light exercise 1–3 days/week. Example: walking, yoga, casual cycling.',
    },
    Moderate: {
      factor: 1.55,
      desc: 'Moderate exercise 3–5 days/week. Example: jogging, swimming, gym workouts.',
    },
    Active: {
      factor: 1.725,
      desc: 'Hard exercise 6–7 days/week. Example: sports training, daily running, weightlifting.',
    },
    VeryActive: {
      factor: 1.9,
      desc: 'Very intense exercise or physical job. Example: athletes, construction, military training.',
    },
  };

  const results = [];

  for (const [level, info] of Object.entries(activityLevels)) {
    const tdee = parseFloat((bmr * info.factor).toFixed(1));
    results.push({
      activity: level,
      description: info.desc,
      tdee,
      maintain: tdee,
      loseWeight: Math.max(tdee - 500, 1200), // safe lower limit
      gainWeight: tdee + 500,
    });
  }

  return results;
}

// @desc Calculate Tdee
// @route POST /api/tool/tool-tdee
// @access Private
// @Author Suvadip Maiti
const toolTdeeCalculate = asyncHandler(async (req, res) => {
  var age = req.body.age;
  var gender = req.body.gender;
  var height = req.body.height;
  var weight = req.body.weight;
  // validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      age: Number(age),
      gender: gender,
      height: Number(height),
      weight: Number(weight),
    },
    {
      age: { type: 'number', integer: true, min: 1, max: 150, convert: true },
      gender: { type: 'string', empty: false, enum: ['Male', 'Female'] },
      height: { type: 'number', min: 30, max: 300, convert: true },
      weight: { type: 'number', min: 2, max: 800, convert: true },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end
  const toolTdeeData = calculateTDEEWithDetails(weight, height, age, gender);
  // console.log(toolTdeeData);
  res.status(200).json({
    message: 'Tdee Calculate sucessfully',
    status: true,
    data: toolTdeeData,
  });
});

// Full calculation with detailed explanation
function calculateTDEEWithDetails(weight, height, age, gender) {
  const bmr = calculateBMRForTdee(weight, height, age, gender);
  const tdeeResults = calculateAllTDEE(bmr);

  let message = `
<h2>⚡ Total Daily Energy Expenditure (TDEE) & BMR Report</h2>

<h3>🧮 Your Basal Metabolic Rate (BMR): <span style="color:#2ecc71">${bmr} kcal/day</span></h3>
<p>
BMR represents the calories your body needs at rest to maintain vital functions 
like breathing, circulation, organ function, and cellular repair.
</p>

<h3>🏃 Total Daily Energy Expenditure (TDEE):</h3>
<p>
TDEE estimates the calories you burn each day based on your activity level. 
Here are the personalized values for different lifestyles:
</p>
`;

  tdeeResults.forEach((r) => {
    message += `
<div style="margin:12px 0; padding:12px; border-left:5px solid #3498db; background:#f9f9f9; border-radius:6px;">
  <strong>➡️ ${r.activity} lifestyle</strong>  
  <br/><em>${r.description}</em>
  <ul>
    <li>Maintain weight: <b>${r.maintain} kcal/day</b></li>
    <li>Safe weight loss (~0.5 kg/week): <b>${r.loseWeight} kcal/day</b></li>
    <li>Healthy weight gain (~0.5 kg/week): <b>${r.gainWeight} kcal/day</b></li>
  </ul>
</div>
`;
  });

  return { bmr, tdeeResults, message };
}

// 🔹 BMR calculation using Mifflin-St Jeor Equation
function calculateBMRForTdee(weight, height, age, gender) {
  let bmr;
  if (gender.toLowerCase() === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  return parseFloat(bmr.toFixed(1));
}

// 🔹 TDEE calculation with descriptions
function calculateAllTDEE(bmr) {
  const activityLevels = {
    Sedentary: {
      factor: 1.2,
      desc: 'Minimal activity, mostly sitting. Examples: desk work, studying, TV, gaming.',
    },
    Light: {
      factor: 1.375,
      desc: 'Light activity 1–3 days/week. Examples: walking, yoga, casual cycling.',
    },
    Moderate: {
      factor: 1.55,
      desc: 'Moderate activity 3–5 days/week. Examples: jogging, swimming, gym workouts.',
    },
    Active: {
      factor: 1.725,
      desc: 'High activity 6–7 days/week. Examples: sports training, running, weightlifting.',
    },
    VeryActive: {
      factor: 1.9,
      desc: 'Very high activity or physical job. Examples: professional athletes, construction work, military training.',
    },
  };

  const results = [];

  for (const [level, info] of Object.entries(activityLevels)) {
    const tdee = parseFloat((bmr * info.factor).toFixed(1));
    results.push({
      activity: level,
      description: info.desc,
      tdee,
      maintain: tdee,
      loseWeight: Math.max(tdee - 500, 1200),
      gainWeight: tdee + 500,
    });
  }

  return results;
}

// @desc Calculate Calorie
// @route POST /api/tool/tool-calorie
// @access Private
// @Author Suvadip Maiti
const toolCalorieCalculate = asyncHandler(async (req, res) => {
  var age = req.body.age;
  var gender = req.body.gender;
  var height = req.body.height;
  var weight = req.body.weight;
  // validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      age: Number(age),
      gender: gender,
      height: Number(height),
      weight: Number(weight),
    },
    {
      age: { type: 'number', integer: true, min: 1, max: 150, convert: true },
      gender: { type: 'string', empty: false, enum: ['Male', 'Female'] },
      height: { type: 'number', min: 30, max: 300, convert: true },
      weight: { type: 'number', min: 2, max: 800, convert: true },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end
  const toolCalorieData = calculateCalorieNeedsWithLevels(
    weight,
    height,
    age,
    gender
  );
  // console.log(toolCalorieData);
  res.status(200).json({
    message: 'Calorie Calculate sucessfully',
    status: true,
    data: toolCalorieData,
  });
});

// Full calculation with detailed explanation for Calorie needs
function calculateCalorieNeedsWithLevels(weight, height, age, gender) {
  const bmr = calculateBMRForCalories(weight, height, age, gender);
  const calorieResults = calculateAllActivityCaloriesLevels(bmr);

  let message = `
<h2>⚡ Daily Calorie Needs & Activity Report</h2>

<h3>🧮 Basal Metabolic Rate (BMR): <span style="color:#2ecc71">${bmr} kcal/day</span></h3>
<p>
BMR represents the calories your body needs at rest for vital functions like breathing, circulation, 
organ function, and cellular repair.
</p>

<h3>🏃 Calories burned based on activity levels:</h3>
<p>
Below are estimated daily calories for different activity levels and weight management goals:
</p>
`;

  calorieResults.forEach((r) => {
    message += `
<div style="margin:12px 0; padding:12px; border-left:5px solid ${r.color}; background:#f9f9f9; border-radius:6px;">
  <strong>➡️ ${r.activity} lifestyle</strong>  
  <br/><em>${r.description}</em>
  <ul>
    <li>Maintain weight: <b>${r.maintain} kcal/day</b></li>
    <li>Mild weight loss (~0.25-0.5 kg/week): <b>${r.mildLoss} kcal/day</b></li>
    <li>Moderate weight loss (~0.5 kg/week): <b>${r.moderateLoss} kcal/day</b></li>
    <li>Extreme weight loss (~0.75-1 kg/week): <b>${r.extremeLoss} kcal/day</b></li>
    <li>Healthy weight gain (~0.5 kg/week): <b>${r.gainWeight} kcal/day</b></li>
  </ul>
</div>
`;
  });

  return { bmr, calorieResults, message };
}

// 🔹 BMR calculation using Mifflin-St Jeor Equation
function calculateBMRForCalories(weight, height, age, gender) {
  let bmr;
  if (gender.toLowerCase() === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  return parseFloat(bmr.toFixed(1));
}

// 🔹 Calculate calories for all activity levels with multiple weight-loss levels
function calculateAllActivityCaloriesLevels(bmr) {
  const activityLevels = {
    Sedentary: {
      factor: 1.2,
      color: '#3498db',
      desc: 'Minimal activity, mostly sitting. Examples: desk work, studying, TV, gaming.',
    },
    Light: {
      factor: 1.375,
      color: '#2ecc71',
      desc: 'Light activity 1–3 days/week. Examples: walking, yoga, casual cycling.',
    },
    Moderate: {
      factor: 1.55,
      color: '#f1c40f',
      desc: 'Moderate activity 3–5 days/week. Examples: jogging, swimming, gym workouts.',
    },
    Active: {
      factor: 1.725,
      color: '#e67e22',
      desc: 'High activity 6–7 days/week. Examples: sports training, running, weightlifting.',
    },
    VeryActive: {
      factor: 1.9,
      color: '#e74c3c',
      desc: 'Very high activity or physical job. Examples: professional athletes, construction work, military training.',
    },
  };

  const results = [];

  for (const [level, info] of Object.entries(activityLevels)) {
    const tdee = parseFloat((bmr * info.factor).toFixed(1));
    results.push({
      activity: level,
      description: info.desc,
      color: info.color,
      maintain: tdee,
      mildLoss: Math.max(tdee - 250, 1200),
      moderateLoss: Math.max(tdee - 500, 1200),
      extremeLoss: Math.max(tdee - 750, 1200),
      gainWeight: tdee + 500,
    });
  }

  return results;
}

// @desc Calculate Bfp
// @route POST /api/tool/tool-bfp
// @access Private
// @Author Suvadip Maiti
const toolBfpCalculate = asyncHandler(async (req, res) => {
  var age = req.body.age;
  var gender = req.body.gender;
  var height = req.body.height;
  var weight = req.body.weight;
  var waist = req.body.waist;
  var neck = req.body.neck;
  var hip = req.body.hip;
  // validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      age: Number(age),
      gender: gender,
      height: Number(height),
      weight: Number(weight),
      waist: Number(waist),
      neck: Number(neck),
      hip: gender === 'Female' ? Number(hip) : 0,
    },
    {
      age: { type: 'number', integer: true, min: 1, max: 150, convert: true },
      gender: { type: 'string', empty: false, enum: ['Male', 'Female'] },
      height: { type: 'number', min: 30, max: 300, convert: true },
      weight: { type: 'number', min: 2, max: 800, convert: true },
      waist: { type: 'number', min: 2, max: 400, convert: true },
      neck: { type: 'number', min: 2, max: 100, convert: true },
      hip: { type: 'number', min: 0, max: 300, optional: true, convert: true },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end
  const toolBfpData = calculateBFPWithDetails(
    age,
    gender,
    height,
    weight,
    waist,
    neck,
    hip
  );
  // console.log(toolBfpData);
  res.status(200).json({
    message: 'Bfp Calculate sucessfully',
    status: true,
    data: toolBfpData,
  });
});

function calculateBFPWithDetails(
  age,
  gender,
  height,
  weight,
  waist,
  neck,
  hip = null
) {
  // normalize inputs
  weight = Number(weight);
  height = Number(height); // cm
  age = Number(age);
  waist = Number(waist);
  neck = Number(neck);
  hip = hip == null ? null : Number(hip);
  gender = gender;

  const round1 = (v) => parseFloat(Number(v).toFixed(1));

  // Safety checks
  const invalidInput = (v) => !isFinite(v) || v <= 0;
  if (
    [weight, height, age, waist, neck].some(invalidInput) ||
    (gender !== 'Male' && gender !== 'Female')
  ) {
    throw new Error(
      'Invalid inputs — ensure weight,height,age,waist,neck are positive numbers and gender is "Male" or "Female".'
    );
  }

  let bfp = NaN;
  let method = 'U.S. Navy';

  // Helper: safe log10 check (argument must be > 0)
  const safeLog10 = (x) => {
    if (!(isFinite(x) && x > 0)) return NaN;
    return Math.log10(x);
  };

  // Try Navy method first
  if (gender === 'Male') {
    const diff = waist - neck;
    const L1 = safeLog10(diff);
    const L2 = safeLog10(height);
    if (!isNaN(L1) && !isNaN(L2)) {
      // SI formula (metric cm)
      const denom = 1.0324 - 0.19077 * L1 + 0.15456 * L2;
      if (denom > 0) {
        bfp = 495 / denom - 450;
      }
    }
  } else {
    // female
    if (hip != null && !invalidInput(hip)) {
      const sum = waist + hip - neck;
      const L1 = safeLog10(sum);
      const L2 = safeLog10(height);
      if (!isNaN(L1) && !isNaN(L2)) {
        const denom = 1.29579 - 0.35004 * L1 + 0.221 * L2;
        if (denom > 0) {
          bfp = 495 / denom - 450;
        }
      }
    } else {
      // no hip measurement -> cannot use Navy for females
      bfp = NaN;
    }
  }

  // If Navy failed (NaN/infinite/unreasonable), fallback to BMI-based formula
  if (!isFinite(bfp) || isNaN(bfp) || bfp <= 0 || bfp > 80) {
    method = 'BMI fallback';
    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);
    if (gender === 'Male') {
      // adult male formula
      bfp = 1.2 * bmi + 0.23 * age - 16.2;
    } else {
      // adult female formula
      bfp = 1.2 * bmi + 0.23 * age - 5.4;
    }
  }

  // clamp and round
  bfp = Math.max(0, Math.min(80, bfp)); // keep in sane range
  bfp = round1(bfp);

  // Fat mass and lean mass (kg)
  const fatMass = round1((bfp / 100) * weight);
  const leanMass = round1(weight - fatMass);

  // Determine category & message (friendly, actionable)
  let category = '';
  let message = '';
  let color = '';

  if (gender === 'Male') {
    // commonly used ranges for men
    if (bfp < 6) {
      category = 'Essential fat';
      color = '#3498db';
      message =
        'Very low body fat. Typically seen in elite athletes. Maintain adequate nutrition; prolonged very low body fat can affect health.';
    } else if (bfp < 14) {
      category = 'Athlete';
      color = '#2ecc71';
      message =
        'Athletic range — lean with good muscle definition. Maintain balanced protein intake and resistance training to preserve lean mass.';
    } else if (bfp < 18) {
      category = 'Fitness';
      color = '#27ae60';
      message =
        'Fitness range — healthy and active. Continue regular exercise and a balanced diet to sustain performance and health.';
    } else if (bfp < 25) {
      category = 'Average';
      color = '#f1c40f';
      message =
        'Average body fat. Consider small lifestyle adjustments (diet quality, consistent exercise) if you want to reduce fat and improve fitness.';
    } else {
      category = 'Obese';
      color = '#e74c3c';
      message =
        'High body fat. Associated with higher risk of metabolic and cardiovascular conditions. Consult a healthcare professional for a safe plan.';
    }
  } else {
    // female categories
    if (bfp < 14) {
      category = 'Essential fat';
      color = '#3498db';
      message =
        'Very low body fat — typical of elite athletes. Prolonged very low levels may affect hormonal health; monitor carefully.';
    } else if (bfp < 21) {
      category = 'Athlete';
      color = '#2ecc71';
      message =
        'Athletic range — lean and fit. Support with adequate calories, protein, and strength training.';
    } else if (bfp < 25) {
      category = 'Fitness';
      color = '#27ae60';
      message =
        'Fitness range — healthy for active women. Maintain balanced nutrition and regular exercise.';
    } else if (bfp < 32) {
      category = 'Average';
      color = '#f1c40f';
      message =
        'Average body fat. Moderate improvements in diet and activity can lower fat and improve wellbeing.';
    } else {
      category = 'Obese';
      color = '#e74c3c';
      message =
        'High body fat. Increased risk for metabolic conditions — consider medical advice and a structured plan.';
    }
  }

  // Build result
  return {
    bfp, // percentage (one decimal)
    fatMass, // kg
    leanMass, // kg
    category,
    message,
    color,
    method, // 'Navy' or 'BMI fallback'
  };
}

// @desc Calculate Ibw
// @route POST /api/tool/tool-ibw
// @access Private
// @Author Suvadip Maiti
const toolIbwCalculate = asyncHandler(async (req, res) => {
  var age = req.body.age;
  var gender = req.body.gender;
  var height = req.body.height;
  // validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      age: Number(age),
      gender: gender,
      height: Number(height),
    },
    {
      age: { type: 'number', integer: true, min: 1, max: 150, convert: true },
      gender: { type: 'string', empty: false, enum: ['Male', 'Female'] },
      height: { type: 'number', min: 30, max: 300, convert: true },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end
  const toolIbwData = calculateIBWWithDetails(height, age, gender);
  // console.log(toolIbwData);
  res.status(200).json({
    message: 'Ibw Calculate sucessfully',
    status: true,
    data: toolIbwData,
  });
});

// IBW calculation function with plain text message
function calculateIBWWithDetails(height, age, gender) {
  let ibw = 0;

  // Devine formula (kg)
  const method =
    'Devine Formula (1950s, widely used for calculating ideal body weight)';
  const healthyBMIRange = '18.5 - 24.9'; // standard adult BMI range

  if (gender === 'Male') {
    ibw = 50 + 0.9 * (height - 152); // height in cm
  } else {
    ibw = 45.5 + 0.9 * (height - 152);
  }

  ibw = parseFloat(ibw.toFixed(1));

  // Generate plain text message
  let message = `Your ideal body weight (IBW) is approximately ${ibw} kg based on your height and gender.
Method used: ${method}
Healthy BMI range: ${healthyBMIRange}.`;

  if (age < 40) {
    message +=
      ' Maintain your weight with a balanced diet and regular exercise to support overall health and energy levels.';
  } else if (age >= 40 && age < 60) {
    message +=
      ' Focus on maintaining lean mass with strength training and adequate protein intake while staying within your ideal weight range.';
  } else {
    message +=
      ' At this age, preserving muscle mass and bone health is essential. Follow a balanced diet, moderate exercise, and regular health checkups to maintain a healthy weight.';
  }

  // Optional: define a category and color for display purposes
  const category =
    ibw < 50 ? 'Below Average' : ibw <= 70 ? 'Average' : 'Above Average';
  const color = ibw < 50 ? '#3498db' : ibw <= 70 ? '#2ecc71' : '#f1c40f';

  return { ibw, category, message, color, method, healthyBMIRange };
}

// @desc Calculate Hrz
// @route POST /api/tool/tool-hrz
// @access Private
// @Author Suvadip Maiti
const toolHrzCalculate = asyncHandler(async (req, res) => {
  var age = req.body.age;
  // validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      age: Number(age),
    },
    {
      age: { type: 'number', integer: true, min: 1, max: 150, convert: true },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end
  const toolHrzData = calculateHeartRateZonesWithDetails(age);
  // console.log(toolHrzData);
  res.status(200).json({
    message: 'Hrz Calculate sucessfully',
    status: true,
    data: toolHrzData,
  });
});

// Heart Rate Zone calculation
function calculateHeartRateZonesWithDetails(age) {
  const hrMax = 220 - Number(age); // Maximum heart rate
  const method =
    'HRmax formula: 220 − age (widely used to estimate maximum heart rate)';

  const zones = [
    {
      name: 'Very Light / Warm-up',
      minPercent: 50,
      maxPercent: 60,
      purpose:
        'Gentle movement, recovery, beginners. Improves circulation and prepares the body for more intense exercise.',
      example: 'Light walking, slow cycling',
    },
    {
      name: 'Light / Fat-Burning',
      minPercent: 60,
      maxPercent: 70,
      purpose:
        'Supports weight management and endurance. Body primarily uses fat as energy.',
      example: 'Brisk walking, easy jogging',
    },
    {
      name: 'Moderate / Cardio',
      minPercent: 70,
      maxPercent: 80,
      purpose:
        'Improves aerobic capacity and cardiovascular efficiency. Burns more calories and strengthens heart and lungs.',
      example: 'Jogging, moderate cycling, swimming',
    },
    {
      name: 'Hard / Anaerobic',
      minPercent: 80,
      maxPercent: 90,
      purpose:
        'Increases cardiovascular strength and muscular endurance. Ideal for interval training and performance improvement.',
      example: 'Running, high-intensity cycling, circuit training',
    },
    {
      name: 'Maximum / Very Hard',
      minPercent: 90,
      maxPercent: 100,
      purpose:
        'Short bursts only. Improves speed and peak performance. Not recommended for prolonged periods or beginners.',
      example: 'Sprinting, competitive sports, HIIT intervals',
    },
  ];

  // Construct card-style message
  let message = `
<div style="font-family:Arial, sans-serif; max-width:600px; margin:auto;">
  <h2 style="text-align:center; color:#e74c3c;">❤️ Heart Rate Zone Report</h2>
  <div style="padding:10px; margin-bottom:20px; border:2px solid #2ecc71; border-radius:8px; background:#f0f9f0;">
    <h3 style="margin:0; color:#27ae60;">🧮 Maximum Heart Rate (HRmax): ${hrMax} BPM</h3>
    <p style="margin:5px 0;"><b>Method used:</b> ${method}</p>
    <p>Heart rate zones help you train safely and effectively based on your age and fitness goals. Below are your personalized zones:</p>
  </div>
`;

  zones.forEach((zone) => {
    const minBPM = Math.round(hrMax * (zone.minPercent / 100));
    const maxBPM = Math.round(hrMax * (zone.maxPercent / 100));

    message += `
  <div style="margin-bottom:15px; padding:12px; border-left:5px solid #3498db; background:#f9f9f9; border-radius:6px; box-shadow:0 2px 5px rgba(0,0,0,0.1);">
    <strong style="font-size:16px;">${zone.name} (${zone.minPercent}-${zone.maxPercent}% HRmax | ${minBPM}-${maxBPM} BPM)</strong>
    <p style="margin:5px 0;"><b>Purpose:</b> ${zone.purpose}</p>
    <p style="margin:5px 0;"><b>Example activities:</b> ${zone.example}</p>
  </div>
`;
  });

  message += `
  <div style="padding:10px; border:1px dashed #95a5a6; border-radius:6px; background:#fefefe;">
    <p>Use these zones to tailor your workouts according to your fitness goals: endurance, fat loss, or peak performance.</p>
    <p>Always warm up before intense training and listen to your body.</p>
  </div>
</div>
`;

  return { hrMax, method, message };
}

// @desc Calculate Wi
// @route POST /api/tool/tool-wi
// @access Private
// @Author Suvadip Maiti
const toolWiCalculate = asyncHandler(async (req, res) => {
  var age = req.body.age;
  var weight = req.body.weight;
  // validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      age: Number(age),
      weight: Number(weight),
    },
    {
      age: { type: 'number', integer: true, min: 1, max: 150, convert: true },
      weight: { type: 'number', min: 2, max: 800, convert: true },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end
  const toolWiData = calculateWaterIntakeByActivity(weight, age);
  // console.log(toolWiData);
  res.status(200).json({
    message: 'Wi Calculate sucessfully',
    status: true,
    data: toolWiData,
  });
});

// Water Intake Calculator with activity-based breakdown
function calculateWaterIntakeByActivity(weight, age) {
  // Base water intake per kg (ml)
  const baseWaterMl = weight * 35;

  // Activity multipliers
  const activityLevels = {
    Sedentary: {
      factor: 1,
      desc: 'Minimal activity: sitting, studying, light chores.',
    },
    Light: {
      factor: 1.1,
      desc: 'Light activity: walking, yoga, casual cycling.',
    },
    Moderate: {
      factor: 1.25,
      desc: 'Moderate activity: jogging, gym workouts, swimming.',
    },
    Heavy: {
      factor: 1.4,
      desc: 'High activity: running, intense sports, heavy labor.',
    },
  };

  // Generate message
  let message = `
<h2>💧 Daily Water Intake Recommendations</h2>
<p>Your recommended water intake is calculated based on your <b>weight (${weight} kg)</b> and <b>age (${age} years)</b>. Staying hydrated supports metabolism, energy, and overall health.</p>
`;

  for (const [level, info] of Object.entries(activityLevels)) {
    const totalMl = baseWaterMl * info.factor;
    const totalLiters = parseFloat((totalMl / 1000).toFixed(2));
    message += `
<div style="margin:12px 0; padding:12px; border-left:5px solid #3498db; background:#f9f9f9; border-radius:6px;">
  <strong>➡️ ${level} activity</strong>  
  <br/><em>${info.desc}</em>
  <ul>
    <li>Recommended intake: <b>${totalLiters} liters/day</b></li>
  </ul>
</div>
`;
  }

  message += `<p>💡 Spread your water intake throughout the day. Include water-rich foods like fruits and vegetables. Individual needs may vary based on climate, health, and exercise intensity.</p>`;

  return {
    baseWaterMl,
    message,
  };
}

// @desc Calculate Pi
// @route POST /api/tool/tool-pi
// @access Private
// @Author Suvadip Maiti
const toolPiCalculate = asyncHandler(async (req, res) => {
  var age = req.body.age;
  var gender = req.body.gender;
  var height = req.body.height;
  var weight = req.body.weight;
  // validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      age: Number(age),
      gender: gender,
      height: Number(height),
      weight: Number(weight),
    },
    {
      age: { type: 'number', integer: true, min: 1, max: 150, convert: true },
      gender: { type: 'string', empty: false, enum: ['Male', 'Female'] },
      height: { type: 'number', min: 30, max: 300, convert: true },
      weight: { type: 'number', min: 2, max: 800, convert: true },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end
  const toolPiData = calculateProteinIntake(weight, height, age, gender);
  console.log(toolPiData);
  res.status(200).json({
    message: 'Pi Calculate sucessfully',
    status: true,
    data: toolPiData,
  });
});

function calculateProteinIntake(weight, height, age, gender) {
  // WHO recommends ~0.8 g/kg/day for adults as baseline
  let multiplier = 0.8; // sedentary baseline
  if (gender.toLowerCase() === 'male') multiplier = 0.9; // slightly higher for males
  if (age < 18) multiplier = 1.0; // growing teens need more protein

  const baseProteinG = weight * multiplier;
  const proteinRecommended = parseFloat(baseProteinG.toFixed(1));

  const activityLevels = {
    Sedentary: {
      factor: 1,
      desc: 'Minimal activity: sitting, studying, light chores.',
    },
    Light: {
      factor: 1.2,
      desc: 'Light activity: walking, yoga, casual cycling.',
    },
    Moderate: {
      factor: 1.5,
      desc: 'Moderate activity: jogging, gym workouts, swimming.',
    },
    Heavy: {
      factor: 1.8,
      desc: 'High activity: running, intense sports, strength training.',
    },
  };

  let message = `
<h2>🍗 Protein Intake Recommendations</h2>
<p>Calculated based on <b>weight: ${weight} kg</b>, <b>height: ${height} cm</b>, <b>age: ${age} years</b>, <b>gender: ${gender}</b>.</p>
<p><b>Method used:</b> WHO guidelines for protein intake (~0.8 g/kg/day for adults, adjusted for age and gender)</p>
`;

  for (const [level, info] of Object.entries(activityLevels)) {
    const protein = parseFloat((baseProteinG * info.factor).toFixed(1));
    const minProtein = Math.floor(protein * 0.95);
    const maxProtein = Math.ceil(protein * 1.05);
    message += `
<div style="margin:12px 0; padding:12px; border-left:5px solid #e67e22; background:#f9f9f9; border-radius:6px;">
  <strong>➡️ ${level} activity</strong>  
  <br/><em>${info.desc}</em>
  <ul>
    <li>Recommended intake: <b>${protein} grams/day</b> (approx. ${minProtein}-${maxProtein} g/day)</li>
    <li>Purpose: Supports muscle maintenance, growth, and overall health</li>
    <li>Example sources: Eggs, dairy, lean meats, fish, legumes, nuts</li>
  </ul>
</div>
`;
  }

  message += `<p>💡 Spread protein intake across meals. Adjust based on fitness goals, activity, and individual needs.</p>`;

  return { proteinRecommended, message };
}

// @desc Calculate Sip
// @route POST /api/tool/tool-sip
// @access Private
// @Author Suvadip Maiti
const toolSipCalculate = asyncHandler(async (req, res) => {
  var loanAmount = req.body.loanAmount;
  var interest = req.body.interest;
  var tenure = req.body.tenure;
  // validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      loanAmount: Number(loanAmount),
      interest: Number(interest),
      tenure: Number(tenure),
    },
    {
      loanAmount: { type: 'number', min: 1, integer: true, convert: true },
      interest: { type: 'number', min: 1, max: 50, convert: true },
      tenure: { type: 'number', min: 1, max: 1000, convert: true },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end

  const toolSipData = calculateEMI(loanAmount, interest, tenure);
  // console.log(toolSipData);
  res.status(200).json({
    message: 'Sip Calculate sucessfully',
    status: true,
    data: toolSipData,
  });
});

// @desc Calculate Ci
// @route POST /api/tool/tool-ci
// @access Private
// @Author Suvadip Maiti
const toolCiCalculate = asyncHandler(async (req, res) => {
  var loanAmount = req.body.loanAmount;
  var interest = req.body.interest;
  var tenure = req.body.tenure;
  // validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      loanAmount: Number(loanAmount),
      interest: Number(interest),
      tenure: Number(tenure),
    },
    {
      loanAmount: { type: 'number', min: 1, integer: true, convert: true },
      interest: { type: 'number', min: 1, max: 50, convert: true },
      tenure: { type: 'number', min: 1, max: 1000, convert: true },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end

  const toolCiData = calculateEMI(loanAmount, interest, tenure);
  // console.log(toolCiData);
  res.status(200).json({
    message: 'Ci Calculate sucessfully',
    status: true,
    data: toolCiData,
  });
});

// @desc Calculate Fd
// @route POST /api/tool/tool-fd
// @access Private
// @Author Suvadip Maiti
const toolFdCalculate = asyncHandler(async (req, res) => {
  var loanAmount = req.body.loanAmount;
  var interest = req.body.interest;
  var tenure = req.body.tenure;
  // validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      loanAmount: Number(loanAmount),
      interest: Number(interest),
      tenure: Number(tenure),
    },
    {
      loanAmount: { type: 'number', min: 1, integer: true, convert: true },
      interest: { type: 'number', min: 1, max: 50, convert: true },
      tenure: { type: 'number', min: 1, max: 1000, convert: true },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end

  const toolFdData = calculateEMI(loanAmount, interest, tenure);
  // console.log(toolFdData);
  res.status(200).json({
    message: 'Fd Calculate sucessfully',
    status: true,
    data: toolFdData,
  });
});

// @desc Calculate Rd
// @route POST /api/tool/tool-rd
// @access Private
// @Author Suvadip Maiti
const toolRdCalculate = asyncHandler(async (req, res) => {
  var loanAmount = req.body.loanAmount;
  var interest = req.body.interest;
  var tenure = req.body.tenure;
  // validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      loanAmount: Number(loanAmount),
      interest: Number(interest),
      tenure: Number(tenure),
    },
    {
      loanAmount: { type: 'number', min: 1, integer: true, convert: true },
      interest: { type: 'number', min: 1, max: 50, convert: true },
      tenure: { type: 'number', min: 1, max: 1000, convert: true },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end

  const toolRdData = calculateEMI(loanAmount, interest, tenure);
  // console.log(toolRdData);
  res.status(200).json({
    message: 'Rd Calculate sucessfully',
    status: true,
    data: toolRdData,
  });
});

// @desc Calculate Roi
// @route POST /api/tool/tool-roi
// @access Private
// @Author Suvadip Maiti
const toolRoiCalculate = asyncHandler(async (req, res) => {
  var loanAmount = req.body.loanAmount;
  var interest = req.body.interest;
  var tenure = req.body.tenure;
  // validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      loanAmount: Number(loanAmount),
      interest: Number(interest),
      tenure: Number(tenure),
    },
    {
      loanAmount: { type: 'number', min: 1, integer: true, convert: true },
      interest: { type: 'number', min: 1, max: 50, convert: true },
      tenure: { type: 'number', min: 1, max: 1000, convert: true },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end

  const toolRoiData = calculateEMI(loanAmount, interest, tenure);
  // console.log(toolRoiData);
  res.status(200).json({
    message: 'Roi Calculate sucessfully',
    status: true,
    data: toolRoiData,
  });
});

// @desc Calculate Ts
// @route POST /api/tool/tool-ts
// @access Private
// @Author Suvadip Maiti
const toolTsCalculate = asyncHandler(async (req, res) => {
  var loanAmount = req.body.loanAmount;
  var interest = req.body.interest;
  var tenure = req.body.tenure;
  // validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      loanAmount: Number(loanAmount),
      interest: Number(interest),
      tenure: Number(tenure),
    },
    {
      loanAmount: { type: 'number', min: 1, integer: true, convert: true },
      interest: { type: 'number', min: 1, max: 50, convert: true },
      tenure: { type: 'number', min: 1, max: 1000, convert: true },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end

  const toolTsData = calculateEMI(loanAmount, interest, tenure);
  // console.log(toolTsData);
  res.status(200).json({
    message: 'Ts Calculate sucessfully',
    status: true,
    data: toolTsData,
  });
});

// @desc Calculate Dr
// @route POST /api/tool/tool-dr
// @access Private
// @Author Suvadip Maiti
const toolDrCalculate = asyncHandler(async (req, res) => {
  var loanAmount = req.body.loanAmount;
  var interest = req.body.interest;
  var tenure = req.body.tenure;
  // validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      loanAmount: Number(loanAmount),
      interest: Number(interest),
      tenure: Number(tenure),
    },
    {
      loanAmount: { type: 'number', min: 1, integer: true, convert: true },
      interest: { type: 'number', min: 1, max: 50, convert: true },
      tenure: { type: 'number', min: 1, max: 1000, convert: true },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end

  const toolDrData = calculateEMI(loanAmount, interest, tenure);
  // console.log(toolDrData);
  res.status(200).json({
    message: 'Dr Calculate sucessfully',
    status: true,
    data: toolDrData,
  });
});

// @desc Calculate Sig
// @route POST /api/tool/tool-sig
// @access Private
// @Author Suvadip Maiti
const toolSigCalculate = asyncHandler(async (req, res) => {
  var loanAmount = req.body.loanAmount;
  var interest = req.body.interest;
  var tenure = req.body.tenure;
  // validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      loanAmount: Number(loanAmount),
      interest: Number(interest),
      tenure: Number(tenure),
    },
    {
      loanAmount: { type: 'number', min: 1, integer: true, convert: true },
      interest: { type: 'number', min: 1, max: 50, convert: true },
      tenure: { type: 'number', min: 1, max: 1000, convert: true },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end

  const toolSigData = calculateEMI(loanAmount, interest, tenure);
  // console.log(toolSigData);
  res.status(200).json({
    message: 'Sig Calculate sucessfully',
    status: true,
    data: toolSigData,
  });
});

module.exports = {
  toolBmiCalculate: toolBmiCalculate,
  toolBmrCalculate: toolBmrCalculate,
  toolTdeeCalculate: toolTdeeCalculate,
  toolCalorieCalculate: toolCalorieCalculate,
  toolBfpCalculate: toolBfpCalculate,
  toolIbwCalculate: toolIbwCalculate,
  toolHrzCalculate: toolHrzCalculate,
  toolWiCalculate: toolWiCalculate,
  toolPiCalculate: toolPiCalculate,
  toolEmiCalculate: toolEmiCalculate,
  toolSipCalculate: toolSipCalculate,
  toolCiCalculate: toolCiCalculate,
  toolFdCalculate: toolFdCalculate,
  toolRdCalculate: toolRdCalculate,
  toolRoiCalculate: toolRoiCalculate,
  toolTsCalculate: toolTsCalculate,
  toolDrCalculate: toolDrCalculate,
  toolSigCalculate: toolSigCalculate,
};
