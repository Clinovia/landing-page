// app/(marketing)/research/stage2a-plasma/page.tsx
import Link from "next/link";

const SHAP_FEATURES = [
  { feature: "PLASMA_PTAU217",      importance: 1.1412, pct: 100 },
  { feature: "PLASMA_ABETA_RATIO",  importance: 1.0538, pct: 92  },
  { feature: "PLASMA_NfL",          importance: 0.2757, pct: 24  },
  { feature: "APOE4",               importance: 0.2690, pct: 24  },
  { feature: "PLASMA_GFAP",         importance: 0.1974, pct: 17  },
  { feature: "AGE",                 importance: 0.0463, pct: 4   },
  { feature: "EDUCATION",           importance: 0.0178, pct: 2   },
  { feature: "MMSE",                importance: 0.0048, pct: 0.4 },
];

const FEATURE_LABELS: Record<string, { label: string; description: string; group: string }> = {
  PLASMA_PTAU217: {
    label: "Plasma p-tau217",
    description: "Phosphorylated tau 217 — the strongest plasma predictor of amyloid PET positivity in current literature. Elevated levels reflect early tau phosphorylation downstream of amyloid accumulation.",
    group: "Plasma Biomarker",
  },
  PLASMA_ABETA_RATIO: {
    label: "Plasma Aβ42/40 Ratio",
    description: "Ratio of amyloid beta 42 to amyloid beta 40 peptides. A lower ratio reflects preferential sequestration of Aβ42 into amyloid plaques, making it an indirect blood-based marker of amyloid burden.",
    group: "Plasma Biomarker",
  },
  PLASMA_NfL: {
    label: "Neurofilament Light Chain (NfL)",
    description: "A non-specific marker of axonal damage and neurodegeneration. Elevated NfL is associated with faster progression across multiple neurodegenerative conditions including AD.",
    group: "Plasma Biomarker",
  },
  APOE4: {
    label: "APOE ε4 Allele Count",
    description: "Number of APOE ε4 alleles (0, 1, or 2). The strongest genetic risk factor for late-onset Alzheimer's disease, influencing amyloid clearance and accumulation rate.",
    group: "Genetic",
  },
  PLASMA_GFAP: {
    label: "GFAP",
    description: "Glial fibrillary acidic protein — a marker of astrocyte activation and neuroinflammation. Elevated in early Alzheimer's disease, often preceding symptom onset.",
    group: "Plasma Biomarker",
  },
  AGE: {
    label: "Age",
    description: "Age in years. Amyloid accumulation accelerates with age; older patients have higher prior probability of PET positivity independent of biomarker values.",
    group: "Demographic",
  },
  EDUCATION: {
    label: "Years of Education",
    description: "Total years of formal education. Associated with cognitive reserve; higher education may delay symptom expression but does not reduce amyloid burden.",
    group: "Demographic",
  },
  MMSE: {
    label: "MMSE Score",
    description: "Mini-Mental State Examination. Contributed minimal importance in this model — amyloid burden is not strongly correlated with current cognitive status in early disease stages.",
    group: "Cognitive",
  },
};

const GROUP_COLORS: Record<string, string> = {
  "Plasma Biomarker": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  Genetic:            "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  Demographic:        "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  Cognitive:          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
};

const FOLD_AUCS = [0.9642, 0.9092, 0.9342, 0.8660, 0.9016];

export default function Stage2aPlasmaWhitepaperPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-20 pb-16 space-y-16 text-foreground">

      {/* ── Breadcrumb ── */}
      <nav className="text-sm text-muted-foreground">
        <Link href="/research" className="hover:underline">Research</Link>
        <span className="mx-2">›</span>
        <span>Stage 2A — Plasma Amyloid Triage</span>
      </nav>

      {/* ── Title ── */}
      <header className="space-y-4 border-b border-border pb-10">
        <div className="flex flex-wrap gap-2 text-xs font-medium text-muted-foreground uppercase tracking-widest">
          <span className="px-2 py-0.5 rounded bg-muted">White Paper</span>
          <span className="px-2 py-0.5 rounded bg-muted">Plasma Biomarker</span>
          <span className="px-2 py-0.5 rounded bg-muted">Amyloid (A)</span>
          <span className="px-2 py-0.5 rounded bg-muted">XGBoost</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight leading-tight">
          Stage 2A — Plasma Amyloid Triage
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          A sensitivity-optimized XGBoost classifier for predicting amyloid PET
          positivity from blood-based biomarkers and clinical covariates, validated
          against FBB and AV45 PET imaging in the ADNI cohort.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {[
            { label: "Mean AUC (CV)",  value: "0.915" },
            { label: "Sensitivity",    value: "90.0%" },
            { label: "Specificity",    value: "73.7%" },
            { label: "Threshold",      value: "0.217" },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-lg border border-border p-4 text-center">
              <p className="text-2xl font-bold text-[#1B4D3E]">{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </header>

      {/* ── 1. Clinical Rationale ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Clinical Rationale</h2>
        <p className="text-muted-foreground leading-relaxed">
          Amyloid PET imaging is the gold standard for detecting cerebral amyloid
          burden, a defining pathological feature of Alzheimer's disease. However,
          PET access is severely limited in community settings: scanners are
          concentrated in tertiary academic centers, costs range from ₩800,000 to
          ₩2,000,000 per scan in Korea, and reimbursement under NHI is restricted
          to specific indications requiring specialist referral.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Blood-based biomarkers — particularly plasma p-tau217 and the Aβ42/40
          ratio — have demonstrated strong concordance with amyloid PET positivity
          in recent large-scale studies. Stage 2A operationalizes this evidence into
          a triage classifier: patients with high plasma amyloid probability are
          flagged for confirmatory PET or alternative pathway routing, while low-risk
          patients are spared unnecessary imaging.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          The model is calibrated for high sensitivity (90.0%) to minimize missed
          amyloid-positive cases at this triage stage. False positives — patients
          flagged as amyloid-positive who are PET-negative — proceed to the fusion
          layer where MRI neurodegeneration data and clinical context can recalibrate
          the overall risk estimate.
        </p>
      </section>

      {/* ── 2. Dataset ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Dataset and Cohort</h2>
        <p className="text-muted-foreground leading-relaxed">
          The model was trained on ADNI participants who had both plasma biomarker
          measurements and amyloid PET imaging available. PET positivity was
          determined using standardized uptake value ratio (SUVR) thresholds for
          two tracers: florbetaben (FBB) and florbetapir (AV45).
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-2">Parameter</th>
                <th className="text-left px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Dataset",              "ADNI (adnimerge.csv + PET imaging data)"],
                ["Total samples",        "396"],
                ["PET tracer — FBB",     "251 participants (63.4%)"],
                ["PET tracer — AV45",    "145 participants (36.6%)"],
                ["Amyloid positive",     "40.4% (160 participants)"],
                ["Amyloid negative",     "59.6% (236 participants)"],
                ["Validation strategy",  "5-fold stratified cross-validation"],
                ["Features",             "8 plasma biomarkers + clinical covariates"],
              ].map(([k, v]) => (
                <tr key={k}>
                  <td className="px-4 py-2 font-medium text-foreground">{k}</td>
                  <td className="px-4 py-2 text-muted-foreground">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 px-4 py-3">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <span className="font-semibold">Multi-tracer design:</span> Combining
            FBB and AV45 PET data increases sample size and tracer diversity, but
            introduces inter-tracer variability in SUVR thresholds. Both tracers
            were harmonized to a binary amyloid-positive/negative label using
            published tracer-specific cutoffs before model training.
          </p>
        </div>
      </section>

      {/* ── 3. Target Definition ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">3. Target Definition</h2>
        <p className="text-muted-foreground leading-relaxed">
          The binary target variable represents amyloid PET positivity, defined
          using tracer-specific SUVR thresholds established in the ADNI imaging
          protocol. A value of 1 indicates amyloid-positive (A+); 0 indicates
          amyloid-negative (A−).
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-2">Class</th>
                <th className="text-left px-4 py-2">Label</th>
                <th className="text-left px-4 py-2">Count</th>
                <th className="text-left px-4 py-2">Proportion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-2 font-medium text-foreground">0</td>
                <td className="px-4 py-2 text-muted-foreground">Amyloid Negative (A−)</td>
                <td className="px-4 py-2 text-muted-foreground">236</td>
                <td className="px-4 py-2 text-muted-foreground">59.6%</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-foreground">1</td>
                <td className="px-4 py-2 text-muted-foreground">Amyloid Positive (A+)</td>
                <td className="px-4 py-2 text-muted-foreground">160</td>
                <td className="px-4 py-2 text-muted-foreground">40.4%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 4. Feature Set ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">4. Feature Set</h2>
        <p className="text-muted-foreground leading-relaxed">
          The model uses four plasma biomarkers and four clinical covariates.
          All plasma measurements were obtained from a single blood draw and
          processed using standard ADNI protocols. Missing values were median-imputed
          with binary missingness indicators retained.
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-2">Feature</th>
                <th className="text-left px-4 py-2">Group</th>
                <th className="text-left px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {SHAP_FEATURES.map(({ feature }) => {
                const meta = FEATURE_LABELS[feature];
                return (
                  <tr key={feature}>
                    <td className="px-4 py-2 font-medium text-foreground font-mono text-xs">
                      {feature}
                    </td>
                    <td className="px-4 py-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${GROUP_COLORS[meta.group]}`}>
                        {meta.group}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-muted-foreground text-xs leading-relaxed">
                      {meta.description}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 5. Model Architecture ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">5. Model Architecture</h2>
        <p className="text-muted-foreground leading-relaxed">
          An XGBoost gradient-boosted tree classifier was trained using 5-fold
          stratified cross-validation for robust performance estimation. The
          classification threshold was optimized post-training to achieve 90%
          sensitivity on the validation folds, reflecting the screening-first
          design philosophy of Stage 2A.
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-2">Parameter</th>
                <th className="text-left px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Algorithm",                 "XGBoost (gradient boosted trees)"],
                ["Validation",                "5-fold stratified cross-validation"],
                ["Classification threshold",  "0.2169 (sensitivity-optimized)"],
                ["Sensitivity target",        "≥ 0.90"],
                ["Feature count",             "8 (+ missingness indicators)"],
              ].map(([k, v]) => (
                <tr key={k}>
                  <td className="px-4 py-2 font-medium text-foreground">{k}</td>
                  <td className="px-4 py-2 text-muted-foreground">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cross-validation fold chart */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">
            Cross-Validation AUC by Fold
          </p>
          <div className="space-y-2">
            {FOLD_AUCS.map((auc, i) => {
              const pct = Math.round(auc * 100);
              const color = auc >= 0.93
                ? "bg-[#1B4D3E]"
                : auc >= 0.90
                ? "bg-emerald-500"
                : "bg-amber-500";
              return (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Fold {i + 1}</span>
                    <span className="tabular-nums font-medium text-foreground">{auc.toFixed(4)}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${color}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground pt-1">
            <span>Mean AUC: <strong className="text-foreground">0.9150</strong></span>
            <span>Std: <strong className="text-foreground">± 0.0329</strong></span>
          </div>
        </div>

        <div className="rounded-lg border border-purple-200 bg-purple-50 dark:bg-purple-950/20 dark:border-purple-800 px-4 py-3">
          <p className="text-sm text-purple-800 dark:text-purple-200">
            <span className="font-semibold">Threshold design:</span> A threshold of
            0.2169 means the model flags amyloid positivity when estimated probability
            exceeds 21.7%. This aggressive threshold catches 90% of true
            amyloid-positive cases at the cost of a 26.3% false positive rate —
            acceptable in a pipeline where false positives receive MRI gating
            (Stage 2B) and fusion-layer recalibration before any clinical action
            is taken.
          </p>
        </div>
      </section>

      {/* ── 6. Feature Importance ── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">6. Feature Importance (XGBoost)</h2>
        <p className="text-muted-foreground leading-relaxed">
          Feature importance was computed using XGBoost's built-in gain-based
          importance metric, which measures the average improvement in the loss
          function brought by a feature across all splits where it is used.
          Unlike mean absolute SHAP, gain-based importance is not sample-averaged
          and reflects structural contribution to the tree ensemble.
        </p>

        <div className="space-y-4">
          {SHAP_FEATURES.map(({ feature, importance, pct }) => {
            const meta = FEATURE_LABELS[feature];
            const isNegligible = importance < 0.01;
            return (
              <div key={feature} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-foreground">{meta.label}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${GROUP_COLORS[meta.group]}`}>
                      {meta.group}
                    </span>
                    {isNegligible && (
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800">
                        minimal
                      </span>
                    )}
                  </div>
                  <span className="tabular-nums text-muted-foreground text-xs shrink-0">
                    {importance.toFixed(4)}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isNegligible ? "bg-muted-foreground/20" : "bg-[#1B4D3E]"
                    }`}
                    style={{ width: `${Math.max(pct, 0.3)}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{meta.description}</p>
              </div>
            );
          })}
        </div>

        <div className="rounded-lg border border-border bg-muted/30 px-4 py-4 space-y-3">
          <p className="text-sm font-semibold text-foreground">Key findings</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              {
                heading: "p-tau217 and Aβ42/40 dominate",
                text: "Plasma p-tau217 (importance = 1.141) and Aβ42/40 ratio (1.054) together account for approximately 75% of total model gain. This is consistent with the recent literature establishing p-tau217 as the single most accurate blood-based predictor of amyloid PET positivity, outperforming p-tau181 and Aβ42/40 alone.",
              },
              {
                heading: "NfL and GFAP as secondary signals",
                text: "NfL (0.276) and GFAP (0.197) contribute meaningfully as markers of neurodegeneration and neuroinflammation respectively. Their contribution likely reflects co-pathology — amyloid-positive patients tend to have elevated neurodegeneration markers — rather than direct amyloid burden.",
              },
              {
                heading: "APOE4 as genetic prior",
                text: "APOE4 (0.269) contributes at a similar level to NfL, reflecting its strong association with amyloid accumulation rate. It is particularly informative in borderline plasma biomarker cases where the genetic risk prior shifts the probability estimate meaningfully.",
              },
              {
                heading: "MMSE near-zero importance",
                text: "MMSE (0.005) contributes essentially nothing, consistent with the known dissociation between amyloid burden and current cognitive status in early and preclinical AD. Patients with high amyloid load may have normal MMSE scores, making it unreliable as an amyloid triage feature.",
              },
            ].map(({ heading, text }) => (
              <li key={heading} className="flex gap-2">
                <span className="text-[#1B4D3E] mt-0.5 shrink-0">•</span>
                <span><strong className="text-foreground">{heading}: </strong>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 7. Performance ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">7. Model Performance</h2>
        <p className="text-muted-foreground leading-relaxed">
          Performance was estimated via 5-fold stratified cross-validation. The
          mean AUC of 0.915 (± 0.033) indicates strong and consistent discrimination
          across folds. Fold 4 showed the lowest AUC (0.866), likely reflecting
          sampling variability in a relatively small dataset (n = 396).
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Mean AUC",    value: "0.915",  note: "5-fold CV" },
            { label: "AUC Std",     value: "±0.033", note: "Cross-fold variance" },
            { label: "Sensitivity", value: "90.0%",  note: "At threshold 0.217" },
            { label: "Specificity", value: "73.7%",  note: "At threshold 0.217" },
          ].map(({ label, value, note }) => (
            <div key={label} className="rounded-lg border border-border p-4 text-center space-y-1">
              <p className="text-2xl font-bold text-[#1B4D3E]">{value}</p>
              <p className="text-xs font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{note}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-border bg-muted/30 px-4 py-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">Specificity trade-off: </span>
            At 73.7% specificity, approximately 1 in 4 amyloid-negative patients
            will be flagged as high-risk at this stage. This is an intentional
            design choice: Stage 2A is a triage tool, not a confirmatory test.
            False positives are resolved by the MRI gate (Stage 2B) and the
            fusion layer before any clinical decision is finalized.
          </p>
        </div>
      </section>

      {/* ── 8. Pipeline Integration ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">8. Pipeline Integration</h2>
        <p className="text-muted-foreground leading-relaxed">
          Stage 2A runs in parallel with Stage 2B (MRI neurodegeneration gate)
          following a HIGH_RISK_PROGRESSOR flag from Stage 1. Its output feeds
          into three downstream systems:
        </p>
        <div className="space-y-3">
          {[
            {
              tool: "Risk Stratification (Tool 2)",
              description: "amyloid_positive_probability is the primary input for tier assignment. Values ≥ 0.85 combined with N+ from Stage 2B trigger URGENT routing. Values ≥ 0.70 alone trigger HIGH_RISK.",
              color: "border-purple-200 bg-purple-50 dark:bg-purple-950/20 dark:border-purple-800",
              label: "text-purple-700 dark:text-purple-300",
            },
            {
              tool: "PET Cost-Benefit Simulator (Tool 4)",
              description: "The amyloid probability and diagnostic uncertainty score from Stage 2A are the primary inputs to the PET value calculation. Probabilities in the 0.40–0.70 range yield the highest PET value scores — confirmatory imaging changes management most in this zone.",
              color: "border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800",
              label: "text-amber-700 dark:text-amber-300",
            },
            {
              tool: "Uncertainty Guard (Tool 6)",
              description: "Conflicting signals between Stage 2A (high amyloid probability) and Stage 2B (N−) trigger an inter-stage conflict flag. The model confidence score contributes to the borderline probability and CI width rules.",
              color: "border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800",
              label: "text-red-700 dark:text-red-300",
            },
          ].map(({ tool, description, color, label }) => (
            <div key={tool} className={`rounded-lg border px-4 py-4 space-y-1.5 ${color}`}>
              <p className={`text-sm font-semibold ${label}`}>{tool}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 9. Limitations ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">9. Limitations</h2>
        <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
          {[
            "The training dataset is small (n = 396). Cross-validation AUC variance (±0.033) reflects this — performance estimates carry meaningful uncertainty and could shift in larger independent cohorts.",
            "Plasma biomarker measurements are platform-dependent. p-tau217 and Aβ42/40 values vary across assay platforms (Elecsys, Lumipulse, Simoa, ALZpath). The model was trained on ADNI-specific assay outputs and may require recalibration for different laboratory platforms.",
            "The FBB and AV45 PET tracers have different SUVR thresholds for amyloid positivity. While tracer-specific cutoffs were applied, residual inter-tracer variability may introduce noise in the training labels.",
            "ADNI participants are highly selected — mostly MCI patients who consented to amyloid PET imaging. This induces referral bias: the model may underperform in unselected primary care populations where amyloid prevalence and biomarker distributions differ.",
            "Pre-analytical variability in plasma collection (time to centrifugation, freeze-thaw cycles, tube type) significantly affects p-tau217 and Aβ42/40 measurements. Deployment requires strict pre-analytical standardization.",
            "The model does not currently incorporate longitudinal plasma biomarker trajectories. A single time-point measurement captures current burden but not the rate of change, which is an independent predictor of progression.",
            "This tool is intended for research-use clinical decision support only. It is not cleared as a medical device and must not be used as a standalone diagnostic instrument.",
          ].map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-[#1B4D3E] mt-0.5 shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 10. References ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">10. References</h2>
        <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
          {[
            "Ashton NJ, et al. Plasma p-tau217 in Alzheimer's disease: a key biomarker for diagnosis and prognosis. Nat Med. 2024;30(2):387–394.",
            "Janelidze S, et al. Plasma P-tau217 in Alzheimer's disease: a prospective, multicohort, phase 3 diagnostic accuracy study. Lancet Neurol. 2021;20(6):468–478.",
            "Hansson O, et al. Blood biomarkers for Alzheimer's disease in clinical practice and trials. Nat Aging. 2023;3:506–519.",
            "Schindler SE, et al. High-precision plasma β-amyloid 42/40 predicts current and future brain amyloidosis. Neurology. 2019;93(17):e1647–e1659.",
            "Simrén J, et al. The diagnostic and prognostic capabilities of plasma biomarkers in Alzheimer's disease. Alzheimers Dement. 2021;17(7):1145–1156.",
            "Jack CR Jr, et al. NIA-AA Research Framework: Toward a biological definition of Alzheimer's disease. Alzheimers Dement. 2018;14(4):535–562.",
            "Petersen RC, et al. Alzheimer's Disease Neuroimaging Initiative (ADNI): Clinical characterization. Neurology. 2010;74(3):201–209.",
            "Chen T, Guestrin C. XGBoost: A scalable tree boosting system. KDD. 2016:785–794.",
          ].map((ref, i) => (
            <li key={i} className="flex gap-2">
              <span className="shrink-0 font-medium text-foreground">[{i + 1}]</span>
              <span>{ref}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border pt-8 text-xs text-muted-foreground space-y-1">
        <p>⚠️ Research-use clinical decision support prototype. Not a medical device.</p>
        <p>Model trained on ADNI data. ADNI is funded by NIA, NIBIB, and multiple industry partners.</p>
        <p>© Clinovia. All rights reserved.</p>
      </footer>

    </div>
  );
}