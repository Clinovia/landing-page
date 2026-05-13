// app/(marketing)/research/stage1-clinical/page.tsx
import Link from "next/link";

const SHAP_FEATURES = [
  { feature: "MMSE",                mean_abs_shap: 0.1045, pct: 100 },
  { feature: "RAVLT_immediate",     mean_abs_shap: 0.0956, pct: 91  },
  { feature: "EcogSPTotal",         mean_abs_shap: 0.0842, pct: 81  },
  { feature: "APOE4",               mean_abs_shap: 0.0376, pct: 36  },
  { feature: "EcogMem_discrepancy", mean_abs_shap: 0.0263, pct: 25  },
  { feature: "AGE",                 mean_abs_shap: 0.0180, pct: 17  },
  { feature: "RAVLT_forgetting",    mean_abs_shap: 0.0170, pct: 16  },
  { feature: "PTEDUCAT",            mean_abs_shap: 0.0162, pct: 15  },
  { feature: "PTGENDER",            mean_abs_shap: 0.0,    pct: 0   },
];

const FEATURE_LABELS: Record<string, { label: string; description: string; group: string }> = {
  MMSE: {
    label: "MMSE Score",
    description: "Mini-Mental State Examination — global cognitive screening tool (0–30). Lower scores indicate greater impairment.",
    group: "Cognitive",
  },
  RAVLT_immediate: {
    label: "RAVLT Immediate Recall",
    description: "Rey Auditory Verbal Learning Test — sum of trials 1–5. Measures verbal learning capacity; strongly sensitive to hippocampal dysfunction.",
    group: "Memory",
  },
  EcogSPTotal: {
    label: "ECog Study Partner Total",
    description: "Everyday Cognition scale rated by a study partner across 6 cognitive domains (1 = normal, 4 = impaired). Provides informant-based functional assessment.",
    group: "Functional",
  },
  APOE4: {
    label: "APOE ε4 Allele Count",
    description: "Number of APOE ε4 alleles (0, 1, or 2). The strongest genetic risk factor for late-onset Alzheimer's disease.",
    group: "Genetic",
  },
  EcogMem_discrepancy: {
    label: "ECog Memory Discrepancy",
    description: "Difference between patient self-rating and study partner rating on memory subscale (Pt − SP). Positive values indicate anosognosia — lack of insight into cognitive decline.",
    group: "Functional",
  },
  AGE: {
    label: "Age",
    description: "Age in years. Risk of progression increases non-linearly with age across the MCI population.",
    group: "Demographic",
  },
  RAVLT_forgetting: {
    label: "RAVLT Forgetting Score",
    description: "Trial 5 minus delayed recall — measures retention loss over a delay interval. Elevated scores indicate accelerated forgetting.",
    group: "Memory",
  },
  PTEDUCAT: {
    label: "Years of Education",
    description: "Total years of formal education. Higher education is associated with greater cognitive reserve, potentially delaying symptom expression.",
    group: "Demographic",
  },
  PTGENDER: {
    label: "Sex",
    description: "Biological sex (0 = female, 1 = male). Contributed zero SHAP importance in this model — sex did not independently predict 24-month progression in this cohort.",
    group: "Demographic",
  },
};

const GROUP_COLORS: Record<string, string> = {
  Cognitive:   "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  Memory:      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  Functional:  "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  Genetic:     "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  Demographic: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

export default function Stage1ClinicalWhitepaperPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-20 pb-16 space-y-16 text-foreground">

      {/* ── Breadcrumb ── */}
      <nav className="text-sm text-muted-foreground">
        <Link href="/research" className="hover:underline">Research</Link>
        <span className="mx-2">›</span>
        <span>Stage 1 — Clinical Progression Model</span>
      </nav>

      {/* ── Title ── */}
      <header className="space-y-4 border-b border-border pb-10">
        <div className="flex flex-wrap gap-2 text-xs font-medium text-muted-foreground uppercase tracking-widest">
          <span className="px-2 py-0.5 rounded bg-muted">White Paper</span>
          <span className="px-2 py-0.5 rounded bg-muted">Clinical Screening</span>
          <span className="px-2 py-0.5 rounded bg-muted">24-Month Progression Risk</span>
          <span className="px-2 py-0.5 rounded bg-muted">XGBoost</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight leading-tight">
          Stage 1 — Clinical Progression Model
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          A sensitivity-optimized XGBoost classifier for estimating 24-month
          MCI-to-Alzheimer's progression risk using routinely available clinical
          and neuropsychological variables, trained on the ADNI cohort.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {[
            { label: "AUC",           value: "0.916" },
            { label: "Sensitivity",   value: "89.9%" },
            { label: "Specificity",   value: "80.1%" },
            { label: "Accuracy",      value: "82.3%" },
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
          Mild Cognitive Impairment (MCI) is a heterogeneous syndrome sitting between
          normal aging and dementia. Approximately 10–15% of MCI patients progress to
          Alzheimer's disease per year, but individual progression trajectories vary
          substantially. Identifying high-risk patients at the point of clinical
          screening — before costly biomarker testing — has significant implications
          for care pathway efficiency and early intervention.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Stage 1 serves as the entry gate to the pipeline. It uses only variables
          available in a standard outpatient neurology or primary care encounter:
          demographic information, MMSE, a validated caregiver-rated functional scale
          (ECog), and two components of the Rey Auditory Verbal Learning Test (RAVLT).
          No blood draws, imaging, or genetic testing are required at this stage.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          The model is calibrated for high sensitivity (89.9%) rather than balanced
          accuracy, reflecting the asymmetric cost of false negatives in a screening
          context: missing a high-risk patient delays intervention, while false
          positives are caught and corrected by the downstream plasma and MRI stages.
        </p>
      </section>

      {/* ── 2. Dataset ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Dataset and Cohort</h2>
        <p className="text-muted-foreground leading-relaxed">
          The model was trained on the Alzheimer's Disease Neuroimaging Initiative
          (ADNI) dataset. The analytic sample comprised 2,430 participants after
          preprocessing, with a 24-month progression label derived from longitudinal
          follow-up visits.
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
                ["Dataset",             "ADNI (adnimerge.csv)"],
                ["Total samples",       "2,430"],
                ["Progressors (N)",     "547 (22.5%)"],
                ["Non-progressors (N)", "1,883 (77.5%)"],
                ["Train / Test",        "80% / 20% stratified"],
                ["Class imbalance",     "Handled via scale_pos_weight"],
                ["Input dimensionality","9 clinical features + missingness indicators"],
              ].map(([k, v]) => (
                <tr key={k}>
                  <td className="px-4 py-2 font-medium text-foreground">{k}</td>
                  <td className="px-4 py-2 text-muted-foreground">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 3. Target Definition ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">3. Target Definition</h2>
        <p className="text-muted-foreground leading-relaxed">
          The binary target variable <code className="px-1 rounded bg-muted text-sm">Target_24m</code> was
          defined as cognitive progression within 24 months of the baseline visit,
          operationalized as a transition from MCI to dementia or Alzheimer's disease
          diagnosis as recorded in the ADNI longitudinal assessment data.
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
                <td className="px-4 py-2 text-muted-foreground">Low Risk Monitor</td>
                <td className="px-4 py-2 text-muted-foreground">1,883</td>
                <td className="px-4 py-2 text-muted-foreground">77.5%</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-foreground">1</td>
                <td className="px-4 py-2 text-muted-foreground">High Risk Progressor</td>
                <td className="px-4 py-2 text-muted-foreground">547</td>
                <td className="px-4 py-2 text-muted-foreground">22.5%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 px-4 py-3">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <span className="font-semibold">Design note:</span> The 24-month window
            was chosen to align with standard ADNI follow-up intervals and to capture
            clinically actionable near-term progression risk. Longer horizons (36–48
            months) would increase progressor prevalence but reduce the actionability
            of the prediction for treatment initiation decisions.
          </p>
        </div>
      </section>

      {/* ── 4. Features ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">4. Feature Set</h2>
        <p className="text-muted-foreground leading-relaxed">
          All nine input features are available from a standard outpatient clinical
          encounter. Missing values were median-imputed with binary missingness
          indicators retained as auxiliary features. No imaging or laboratory values
          are required.
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
          An XGBoost gradient-boosted tree classifier was trained with sensitivity
          optimization. The classification threshold was set not at the default 0.5
          but at the value that achieves approximately 90% sensitivity on the
          validation set, reflecting the screening-first clinical philosophy of Stage 1.
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-2">Hyperparameter</th>
                <th className="text-left px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Algorithm",              "XGBoost (gradient boosted trees)"],
                ["Classification threshold","0.1082 (sensitivity-optimized)"],
                ["Sensitivity target",     "≥ 0.90"],
                ["Class imbalance",        "scale_pos_weight = N_negative / N_positive"],
                ["Validation strategy",    "80/20 stratified train/test split"],
              ].map(([k, v]) => (
                <tr key={k}>
                  <td className="px-4 py-2 font-medium text-foreground">{k}</td>
                  <td className="px-4 py-2 text-muted-foreground">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-lg border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800 px-4 py-3">
          <p className="text-sm text-green-800 dark:text-green-200">
            <span className="font-semibold">Threshold design:</span> A threshold of
            0.1082 means the model flags a patient as high-risk whenever its estimated
            progression probability exceeds 10.8%. This aggressive threshold accepts
            a higher false positive rate (19.9%) in exchange for catching 90% of true
            progressors. False positives proceed to Stage 2a and 2b where they are
            corrected by biomarker evidence.
          </p>
        </div>
      </section>

      {/* ── 6. SHAP Feature Importance ── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">6. Feature Importance (SHAP)</h2>
        <p className="text-muted-foreground leading-relaxed">
          SHAP (SHapley Additive exPlanations) values quantify each feature's
          average contribution to the model output across the test set. Values
          reflect mean absolute SHAP — larger values indicate greater influence
          on the progression probability estimate, regardless of direction.
        </p>

        <div className="space-y-4">
          {SHAP_FEATURES.map(({ feature, mean_abs_shap, pct }) => {
            const meta = FEATURE_LABELS[feature];
            const isZero = mean_abs_shap === 0;
            return (
              <div key={feature} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-foreground">{meta.label}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${GROUP_COLORS[meta.group]}`}>
                      {meta.group}
                    </span>
                    {isZero && (
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500">
                        no contribution
                      </span>
                    )}
                  </div>
                  <span className="tabular-nums text-muted-foreground text-xs shrink-0">
                    {mean_abs_shap.toFixed(4)}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${isZero ? "bg-muted-foreground/20" : "bg-[#1B4D3E]"}`}
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
                feature: "MMSE and RAVLT",
                text: "The top three features — MMSE, RAVLT Immediate Recall, and ECog Study Partner Total — together account for approximately 75% of total SHAP importance. All three measure cognitive function from different angles: global screening, verbal memory capacity, and informant-reported functional decline.",
              },
              {
                feature: "ECog Memory Discrepancy",
                text: "The discrepancy between self-rated and informant-rated memory captures anosognosia — a clinically significant marker of disease progression that is often missed in self-report instruments alone. Its presence in the top five features validates its inclusion.",
              },
              {
                feature: "APOE4",
                text: "APOE4 contributes meaningfully (SHAP = 0.038) despite being a static genetic variable. This reflects its role as a strong prior for amyloid accumulation and progression risk, particularly in the MCI population.",
              },
              {
                feature: "Sex (PTGENDER)",
                text: "Sex contributed zero SHAP importance in this model. This does not imply sex is clinically irrelevant — it may be captured indirectly through correlated features such as education or ECog scores — but it did not independently drive predictions in this cohort.",
              },
            ].map(({ feature, text }) => (
              <li key={feature} className="flex gap-2">
                <span className="text-[#1B4D3E] mt-0.5 shrink-0">•</span>
                <span><strong className="text-foreground">{feature}: </strong>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 7. Performance ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">7. Model Performance</h2>
        <p className="text-muted-foreground leading-relaxed">
          Performance was evaluated on a held-out 20% stratified test set. The
          sensitivity-optimized threshold (0.1082) achieves the target recall of
          89.9% on progressors while maintaining 80.1% specificity — meaning 1 in 5
          non-progressors is flagged for downstream biomarker workup, which is
          acceptable in a gated pipeline where false positives incur the cost of
          a blood test rather than immediate treatment.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "AUC",         value: "0.916", note: "Discrimination" },
            { label: "Sensitivity", value: "89.9%", note: "True positive rate" },
            { label: "Specificity", value: "80.1%", note: "True negative rate" },
            { label: "Accuracy",    value: "82.3%", note: "Overall" },
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
            <span className="font-semibold text-foreground">AUC interpretation: </span>
            An AUC of 0.916 indicates that the model correctly ranks a randomly
            selected progressor above a randomly selected non-progressor 91.6% of
            the time — substantially better than chance and competitive with published
            clinical prediction models for MCI progression using similar feature sets.
          </p>
        </div>
      </section>

      {/* ── 8. Pipeline Integration ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">8. Pipeline Integration</h2>
        <p className="text-muted-foreground leading-relaxed">
          Stage 1 output determines the downstream routing decision for each patient:
        </p>
        <div className="space-y-3">
          {[
            {
              outcome: "HIGH_RISK_PROGRESSOR",
              action: "Patient proceeds to Stage 2a (plasma biomarker triage) and Stage 2b (MRI neurodegeneration gate) in parallel. Both stages run simultaneously to minimize time-to-diagnosis.",
              color: "border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800",
              labelColor: "text-red-700 dark:text-red-300",
            },
            {
              outcome: "LOW_RISK_MONITOR",
              action: "Patient is placed on a 12-month clinical monitoring schedule. No immediate biomarker testing is triggered. The Stage 1 result is logged for longitudinal tracking.",
              color: "border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800",
              labelColor: "text-green-700 dark:text-green-300",
            },
          ].map(({ outcome, action, color, labelColor }) => (
            <div key={outcome} className={`rounded-lg border px-4 py-4 space-y-1.5 ${color}`}>
              <p className={`text-sm font-semibold font-mono ${labelColor}`}>{outcome}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{action}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Stage 1 output also feeds directly into the decision support layer
          (Tools 1–6), contributing to risk stratification tier assignment,
          NHI diagnosis code suggestions, and the uncertainty flag engine.
          The <code className="px-1 rounded bg-muted text-xs">progression_probability</code> field
          is used as an amyloid probability proxy when Stage 2a plasma data is unavailable.
        </p>
      </section>

      {/* ── 9. Limitations ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">9. Limitations</h2>
        <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
          {[
            "The model was trained exclusively on ADNI data. ADNI participants are predominantly highly educated, English-speaking, and North American. Performance in Korean community clinic populations — where educational norms, neuropsychological test administration, and MCI referral patterns differ — requires prospective validation.",
            "ECog requires a reliable study partner (family member or caregiver). In patients without an available informant, the ECog subscores cannot be obtained, reducing model completeness. Missingness indicators partially mitigate this but do not fully compensate.",
            "The RAVLT is a verbal memory test and may underperform in patients with primary language other than English, or in those with hearing impairment or low premorbid literacy.",
            "The 24-month outcome window creates a survivor bias: patients who died, withdrew, or were lost to follow-up before month 24 are excluded, which may overestimate model performance in real-world populations with higher attrition.",
            "The sensitivity-optimized threshold (0.1082) produces a 19.9% false positive rate. In populations with lower MCI-to-AD base rates than ADNI, the positive predictive value will be lower, and more patients will be unnecessarily routed to biomarker testing.",
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
            "Petersen RC, et al. Alzheimer's Disease Neuroimaging Initiative (ADNI): Clinical characterization. Neurology. 2010;74(3):201–209.",
            "Folstein MF, Folstein SE, McHugh PR. Mini-Mental State: a practical method for grading the cognitive state of patients for the clinician. J Psychiatr Res. 1975;12(3):189–198.",
            "Rey A. L'examen clinique en psychologie. Paris: Presses Universitaires de France; 1958.",
            "Amariglio RE, et al. Everyday Cognition (ECog): Scale development and psychometric properties. Neuropsychology. 2011;25(4):531–544.",
            "Corder EH, et al. Gene dose of apolipoprotein E type 4 allele and the risk of Alzheimer's disease in late onset families. Science. 1993;261(5123):921–923.",
            "Lundberg SM, Lee SI. A unified approach to interpreting model predictions. Advances in Neural Information Processing Systems. 2017;30.",
            "Chen T, Guestrin C. XGBoost: A scalable tree boosting system. KDD. 2016:785–794.",
            "Mitchell AJ, Shiri-Feshki M. Rate of progression of mild cognitive impairment to dementia — meta-analysis of 41 robust inception cohort studies. Acta Psychiatr Scand. 2009;119(4):252–265.",
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