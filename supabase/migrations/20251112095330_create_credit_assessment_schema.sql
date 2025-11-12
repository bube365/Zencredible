/*
  # Credit Assessment Dashboard Schema

  1. New Tables
    - `borrowers`
      - `id` (uuid, primary key)
      - `name` (text) - Borrower full name
      - `business_name` (text) - Business/company name
      - `credit_score` (integer) - Credit score out of 100
      - `default_risk` (decimal) - Default risk percentage
      - `risk_level` (text) - LOW, MEDIUM, HIGH
      - `amount_requested` (bigint) - Requested loan amount in Naira
      - `max_offer` (bigint) - Maximum loan offer in Naira
      - `expected_loss` (bigint) - Expected loss if default occurs
      - `bvn_verified` (boolean) - Bank Verification Number verification status
      - `documents_submitted` (integer) - Number of documents submitted
      - `documents_total` (integer) - Total documents required
      - `months_analyzed` (integer) - Number of months analyzed
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `financial_summary`
      - `id` (uuid, primary key)
      - `borrower_id` (uuid, foreign key)
      - `avg_monthly_inflow` (bigint) - Average monthly inflow
      - `avg_monthly_outflow` (bigint) - Average monthly outflow
      - `net_average` (bigint) - Net average cashflow
      - `inflow_status` (text) - Status description
      - `outflow_status` (text) - Status description
      - `net_status` (text) - Status description
      - `created_at` (timestamptz)

    - `ai_analysis`
      - `id` (uuid, primary key)
      - `borrower_id` (uuid, foreign key)
      - `analysis_type` (text) - Type of analysis
      - `status` (text) - success, warning, error
      - `description` (text) - Analysis description
      - `percentage` (decimal) - Percentage value if applicable
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS borrowers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  business_name text NOT NULL,
  credit_score integer NOT NULL DEFAULT 0,
  default_risk decimal(5,2) NOT NULL DEFAULT 0,
  risk_level text NOT NULL DEFAULT 'MEDIUM',
  amount_requested bigint NOT NULL DEFAULT 0,
  max_offer bigint NOT NULL DEFAULT 0,
  expected_loss bigint NOT NULL DEFAULT 0,
  bvn_verified boolean DEFAULT false,
  documents_submitted integer DEFAULT 0,
  documents_total integer DEFAULT 3,
  months_analyzed integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS financial_summary (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  borrower_id uuid NOT NULL REFERENCES borrowers(id) ON DELETE CASCADE,
  avg_monthly_inflow bigint NOT NULL DEFAULT 0,
  avg_monthly_outflow bigint NOT NULL DEFAULT 0,
  net_average bigint NOT NULL DEFAULT 0,
  inflow_status text DEFAULT '',
  outflow_status text DEFAULT '',
  net_status text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ai_analysis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  borrower_id uuid NOT NULL REFERENCES borrowers(id) ON DELETE CASCADE,
  analysis_type text NOT NULL,
  status text NOT NULL DEFAULT 'success',
  description text NOT NULL,
  percentage decimal(5,2),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE borrowers ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_summary ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_analysis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to borrowers"
  ON borrowers FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to financial_summary"
  ON financial_summary FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to ai_analysis"
  ON ai_analysis FOR SELECT
  TO public
  USING (true);

INSERT INTO borrowers (name, business_name, credit_score, default_risk, risk_level, amount_requested, max_offer, expected_loss, bvn_verified, documents_submitted, documents_total, months_analyzed)
VALUES 
  ('Chisom Okafor', 'ChiChi Fashion Boutique', 85, 2.0, 'LOW', 2500000, 2500000, 50000, true, 3, 3, 14),
  ('Adebayo Olawale', 'Bayus Electronics', 32, 85.0, 'HIGH', 5000000, 0, 4250000, true, 3, 3, 12),
  ('Fatima Bello', 'Allahu-Bukar Restaurant', 68, 20.0, 'MEDIUM', 1500000, 1480000, 296000, true, 3, 3, 13),
  ('Emmanuel Nwankwor', 'Emman Auto Parts', 82, 1.0, 'LOW', 3500000, 3500000, 35000, true, 3, 3, 15);

INSERT INTO financial_summary (borrower_id, avg_monthly_inflow, avg_monthly_outflow, net_average, inflow_status, outflow_status, net_status)
SELECT 
  id,
  850000,
  620000,
  230000,
  'Consistent pattern',
  'Within normal range',
  'Positive cashflow'
FROM borrowers WHERE name = 'Chisom Okafor';

INSERT INTO ai_analysis (borrower_id, analysis_type, status, description, percentage)
SELECT 
  id,
  'correlation',
  'success',
  'Strong correlation (92%) between sales receipts timestamps and bank deposits, indicating genuine business transactions.',
  92
FROM borrowers WHERE name = 'Chisom Okafor'
UNION ALL
SELECT 
  id,
  'cashflow',
  'success',
  'Consistent monthly cash flow pattern over 14 months with positive net income averaging ₦230,000/month.',
  NULL
FROM borrowers WHERE name = 'Chisom Okafor'
UNION ALL
SELECT 
  id,
  'round_tripping',
  'success',
  'Low round-tripping detected (8%), well within acceptable threshold. Most flagged transactions have valid business justification.',
  8
FROM borrowers WHERE name = 'Chisom Okafor'
UNION ALL
SELECT 
  id,
  'personal_usage',
  'warning',
  'Personal account usage, however, clear separation of business vs personal transactions visible in patterns.',
  NULL
FROM borrowers WHERE name = 'Chisom Okafor';