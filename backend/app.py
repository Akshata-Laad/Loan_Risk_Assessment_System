import sklearn
import sys

print(f"SKLEARN VERSION: {sklearn.__version__}")
print(f"PYTHON PATH: {sys.executable}")

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}})

# @app.after_request
# def after_request(response):
#     response.headers["Access-Control-Allow-Origin"] = "*"
#     response.headers["Access-Control-Allow-Headers"] = "*"
#     response.headers["Access-Control-Allow-Methods"] = "*"
#     return response

model = joblib.load("loan_model.pkl")


@app.route("/")
def home():
    return "Loan Approval API is Running!"


@app.route("/predict", methods=["POST", "OPTIONS"])
def predict():
    try:
        data = request.get_json()
        defaults = {
            "Gender": "Male",
            "Marital_Status": "Single",
            "Dependents": 0,
            "Education_Level": "Graduate",
        }

        for key, value in defaults.items():
            if key not in data:
                data[key] = value

        income = float(data.get("Monthly_Income", 0))
        emi = float(data.get("Existing_EMI", 0))
        other_debt = float(data.get("Other_Debt", 0))

        if income > 0:
            dti = (emi + other_debt) / income
        else:
            dti = 0

        data["DTI_Ratio"] = dti
        data["Loan_Amount"] = float(data["Loan_Amount"])
        data["Loan_Term"] = float(data["Loan_Term"])

        features = pd.DataFrame([data])
        print("============== DEBUG INFO ==============")
        print("DATA RECEIVED:", data)
        print("COLUMNS SENT:", features.columns.tolist())

        if hasattr(model, "feature_names_in_"):
            print("MODEL EXPECTS:", model.feature_names_in_.tolist())

            print("CLASSES:", model.classes_)
            print("RAW PROBA:", model.predict_proba(features))
            print("========================================")

        # prob = model.predict_proba(features)[0][1]
        proba = model.predict_proba(features)[0]
        prob = max(proba)

        reasons = []

        credit_score = float(data.get("Credit_Score", 0))
        loan_amount = float(data.get("Loan_Amount", 0))
        income = float(data.get("Monthly_Income", 0))

        if credit_score < 650:
            reasons.append("Low Credit Score")

        if dti > 0.5:
            reasons.append("High Debt-to-Income Ratio")

        if income > 0 and loan_amount > income * 15:
            reasons.append("Loan amount is high compared to income")

        if len(reasons) == 0:
            reasons.append("Strong financial profile")

        print("PROBA RAW:", model.predict_proba(features))
        print("PROB VALUE:", prob)

        if prob > 0.8:
            risk = "Low Risk"
        elif prob > 0.5:
            risk = "Medium Risk"
        else:
            risk = "High Risk"

        return jsonify(
            {
                "Approval Probability": round(float(prob) * 100, 2),
                "Risk Category": risk,
                "Reasons": reasons,
            }
        )

    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run(debug=True)
