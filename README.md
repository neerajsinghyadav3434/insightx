# 🛒 E-Commerce Customer Intelligence System

A complete data analytics + machine learning web application that turns raw
transactional e-commerce data into actionable business insights.

---

## 📦 Project Structure

```
ecommerce_intelligence/
│
├── app.py                 ← Main Streamlit application
├── data_loader.py         ← Step 1 & 2: Load & Clean data
├── eda.py                 ← Step 3: Exploratory Data Analysis (Plotly charts)
├── rfm_segmentation.py    ← Steps 4 & 5: RFM Analysis + K-Means Clustering
├── recommendation.py      ← Step 6: Product Recommendation Engine
├── requirements.txt       ← Python dependencies
└── README.md
```

---

## 🗂️ Dataset

**Online Retail II — UCI Machine Learning Repository**

Download links:
- UCI: https://archive.ics.uci.edu/dataset/502/online+retail+ii
- Kaggle: https://www.kaggle.com/datasets/mashlyn/online-retail-ii-uci

The file is an Excel workbook (`online_retail_II.xlsx`) with ~1 million rows.

### Columns Used:
| Column | Description |
|--------|-------------|
| Invoice | Invoice number (C prefix = cancellation) |
| StockCode | Product code |
| Description | Product name |
| Quantity | Quantity per invoice |
| InvoiceDate | Date and time of invoice |
| Price | Unit price in GBP |
| Customer ID | Unique customer number |
| Country | Customer country |

---

## ⚙️ Setup & Installation

### 1. Clone / Download the project
```bash
mkdir ecommerce_intelligence
cd ecommerce_intelligence
# Copy all project files here
```

### 2. Create virtual environment (recommended)
```bash
python -m venv venv

# Activate:
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the app
```bash
streamlit run app.py
```

The app opens at **http://localhost:8501**

---

## 🚀 Usage

1. Open the app in your browser
2. In the sidebar, upload your `online_retail_II.xlsx` file
3. Use the **sidebar filters** (Country, Date Range) to slice the data
4. Navigate through the 4 tabs:

### 🏠 Tab 1 — Dashboard
- Revenue KPI cards
- Monthly revenue trend
- Revenue by day of week
- Top products & countries
- World map of global sales

### 👤 Tab 2 — Customer Segmentation
- RFM Analysis table (Recency, Frequency, Monetary)
- K-Means clustering into 4 segments:
  - 🌟 **VIP Customers** — High spend, frequent, recent
  - 💚 **Loyal Customers** — Regular buyers, decent spend
  - ⚠️ **At-Risk Customers** — Previously active, now dormant
  - 🆕 **New / Low-Value** — Infrequent or one-time buyers
- **Customer Profile Lookup** — Enter any CustomerID for full profile
- Elbow method chart (shows why k=4 is optimal)
- Download RFM table as CSV

### 🎯 Tab 3 — Recommendations
**Product-Based:**
- Search for any product
- Get "frequently bought together" recommendations
- Co-occurrence frequency bar chart

**Customer-Based:**
- Enter a CustomerID
- Get personalised recommendations based on peer segment behaviour

### 📈 Tab 4 — Insights
- Top products by revenue and quantity
- Customer purchase frequency distribution
- Monthly unique customers
- Revenue by hour of day
- Raw data explorer + download

---

## 🧠 How It Works

### RFM Analysis
| Metric | Formula | Meaning |
|--------|---------|---------|
| **Recency** | Days since last purchase | How recently did they buy? |
| **Frequency** | Unique invoice count | How often do they buy? |
| **Monetary** | Sum of TotalPrice | How much do they spend? |

Each metric is scored 1–4 using quartile ranking.
K-Means clustering groups customers based on standardised RFM values.

### Recommendation Engine
Uses **co-occurrence matrix**:
- For every invoice, records all pairs of products bought together
- For a query product, returns products most frequently bought alongside it
- Falls back to popularity ranking if no co-occurrence data exists

---

## ☁️ Deployment (Optional)

### Streamlit Cloud (Free)
1. Push code to GitHub
2. Visit https://streamlit.io/cloud
3. Connect repo → select `app.py` → Deploy

### Render
1. Push to GitHub
2. Create Web Service on https://render.com
3. Build command: `pip install -r requirements.txt`
4. Start command: `streamlit run app.py --server.port $PORT --server.address 0.0.0.0`

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| **Python 3.10+** | Core language |
| **Pandas** | Data manipulation |
| **NumPy** | Numerical operations |
| **Scikit-learn** | K-Means clustering, StandardScaler |
| **Plotly** | Interactive charts |
| **Streamlit** | Web application framework |
| **OpenPyXL** | Excel file reading |

---

## 📊 Sample Insights You'll Discover

- Which customers are at risk of churning
- Which products are most frequently bought together
- Which countries drive the most revenue
- What time of day / week sees peak sales
- How customer value distributes across segments
