

export const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
export const QUARTER_RANGE = ["Q1-Q2", "Q2-Q3", "Q3-Q4"];
export const STATUS_ENUM = Object.freeze({
    "On Track": "green",
    "Not On Track": "red",
    "In Progress": "orange"
});
export const IT_PILLARS_ENUM = Object.freeze({
    "Differentiate Customer Experience": "white",
    "Enable Workforce": "blue",
    "Accelerate Critical Business Capabilities": "orange",
    "Integrate Tech Across Banners": "yellow",
    "Secure and Stabilize IT Platforms": "purple"
});
export const BUSINESS_VALUES_ENUM = Object.freeze({
    "Business Process Automation": "BPA",
    "Digital Customer Engagement": "DCA",
    "Drive Sales & B2B Penetration": "$$",
    "Improve Pro Customer Experience": "CX",
    "Improve TM Experience": "TMX",
    "Independents Growth/Retention": "IG",
    "Modernize Architecture/Platform": "MAP",
    "Operational Cost Savings": "OCS",
    "Reduce Support Calls": "RSC",
    "Strategic Account Growth/Retention": "SAG",
    "Team Member Productivity": "TMP"
});
export const BUBBLE_GROW_EFFECT_TIMER = 500;

export const MONTH_MAPPING_ENUM = Object.freeze({
    1: "JAN",
    2: "FEB",
    3: "MAR",
    4: "APR",
    5: "MAY",
    6: "JUN",
    7: "JUL",
    8: "AUG",
    9: "SEP",
    10: "OCT",
    11: "NOV",
    12: "DEC"
});

export const QUARTER_MAPPING_ENUM = Object.freeze({
    "JAN": "Q1",
    "FEB": "Q1",
    "MAR": "Q1",
    "APR": "Q2",
    "MAY": "Q2",
    "JUN": "Q2",
    "JUL": "Q3",
    "AUG": "Q3",
    "SEP": "Q3",
    "OCT": "Q4",
    "NOV": "Q4",
    "DEC": "Q4"
});

export const QUARTER_MONTH_MAPPING_ENUM = Object.freeze({
    "Q1-Q2": ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP"],
    "Q2-Q3": ["APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
    "Q3-Q4": ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC", "JAN", "FEB", "MAR"],
    //TO-DO update to Q4 2020, Q1 2021 & slice of Q2 2021. Temp asked. Need to revert
    "Q4-Q1": ["OCT", "NOV", "DEC", "JAN", "FEB", "MAR", "APR"]
});

export const EXCEL_FILE_TYPES = [".csv", ".xlsm", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];
export const EXCEL_TO_JSON_CONFIG = Object.freeze({
    "raw": false,
    "defval": null
});


export const MONTH_ROMAN_MAPPING_ENUM = Object.freeze({
    "JAN": 1,
    "FEB": 2,
    "MAR": 3,
    "APR": 4,
    "MAY": 5,
    "JUN": 6,
    "JUL": 7,
    "AUG": 8,
    "SEP": 9,
    "OCT": 10,
    "NOV": 11,
    "DEC": 12
});

export const DATE_MARGIN_MAPPING_ENUM = Object.freeze({
    5: "3%",
    10: "7%",
    15: "15%",
    20: "21%",
    25: "26%",
    30: "31%"
});


export const EXCEL_DOS = [
    "Data file should be a valid Excel file with acceptable extensions are <strong>.xls, .xlsx, .xlsm, .csv, .xlsb, .xltx, .xltm</strong>",
    "Follow correct Column naming conventions and Data formatting.",
    "Data entry for <strong>Projection_Date</Strong> column should be in <strong>'MMM-YYYY'</strong> format.",
    "Always choose values from dropdown wherever it is applicable."
];


export const EXCEL_DONTS = [
    "Do not fill data in incorrect format.",
    "<strong>Column headers are readonly</strong>. Do not try to modify them.",
    "Do not make any <strong>configuration</strong> or <strong>VBA script</strong> changes in Macro-Enabled Excel.",
    "Do not make changes in <strong>Projection_Date</strong> data format."
]

