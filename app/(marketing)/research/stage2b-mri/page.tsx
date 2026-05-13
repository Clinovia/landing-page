// app/(marketing)/research/stage2b-mri/page.tsx
import Link from "next/link";

const SHAP_FEATURES = [
  { feature: "Hippocampus", mean_abs_shap: 0.2016, pct: 100 },
  { feature: "ICV", mean_abs_shap: 0.0782, pct: 39 },
  { feature: "AGE", mean_abs_shap: 0.0652, pct: 32 },
  { feature: "WholeBrain", mean_abs_shap: 0.0117, pct: 6 },
  { feature: "Ventricles", mean_abs_shap: 0.0082, pct: 4 },
  { feature: "Entorhinal", mean_abs_shap: 0.0039, pct: 2 },
  { feature: "APOE4", mean_abs_shap: 0.0009, pct: 0.4 },
  { feature: "WholeBrain_slope", mean_abs_shap: 0.00022, pct: 0.1 },
  { feature: "Hippocampus_slope", mean_abs_shap: 0.000063, pct: 0.03 },
];

const FEATURE_LABELS: Record<string, { label: string; description: string }> = {
  Hippocampus:       { label: "Hippocampal Volume",         description: "Primary structural marker of neurodegeneration in Alzheimer's disease" },
  ICV:               { label: "Intracranial Volume (ICV)",  description: "Normalization reference for brain volume measurements" },
  AGE:               { label: "Age",                        description: "Age-adjusted residual accounts for expected atrophy trajectory" },
  WholeBrain:        { label: "Whole Brain Volume",         description: "Global atrophy marker" },
  Ventricles:        { label: "Ventricular Volume",         description: "Enlargement associated with parenchymal loss" },
  Entorhinal:        { label: "Entorhinal Cortex Volume",   description: "Early Alzheimer's involvement site; trans-entorhinal staging" },
  APOE4:             { label: "APOE ε4 Allele Count",       description: "Genetic risk modifier" },
  WholeBrain_slope:  { label: "Whole Brain Atrophy Rate",   description: "Longitudinal slope — rate of global atrophy" },
  Hippocampus_slope: { label: "Hippocampal Atrophy Rate",   description: "Longitudinal slope — rate of hippocampal volume loss" },
};

export default function Stage2bMRIWhitepaperPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-20 pb-16 space-y-16 text-foreground">

      {/* ── Breadcrumb ── */}
      <nav className="text-sm text-muted-foreground">
        <Link href="/research" className="hover:underline">Research</Link>
        <span className="mx-2">›</span>
        <span>Stage 2B — MRI Neurodegeneration Gate</span>
      </nav>

      {/* ── Title ── */}
      <header className="space-y-4 border-b border-border pb-10">
        <div className="flex flex-wrap gap-2 text-xs font-medium text-muted-foreground uppercase tracking-widest">
          <span className="px-2 py-0.5 rounded bg-muted">White Paper</span>
          <span className="px-2 py-0.5 rounded bg-muted">MRI Biomarker</span>
          <span className="px-2 py-0.5 rounded bg-muted">Neurodegeneration (N)</span>
          <span className="px-2 py-0.5 rounded bg-muted">XGBoost</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight leading-tight">
          Stage 2B — MRI Neurodegeneration Gate
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          A longitudinal-hybrid XGBoost classifier for structural MRI-based
          detection of neurodegeneration (N+) in the Alzheimer's continuum,
          trained and validated on the ADNI cohort.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {[
            { label: "AUC",         value: "0.993" },
            { label: "Accuracy",    value: "97.3%" },
            { label: "Sensitivity", value: "88.9%" },
            { label: "Specificity", value: "98.8%" },
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
          The AT(N) biomarker framework classifies Alzheimer's pathology along three
          axes: amyloid (A), tau (T), and neurodegeneration (N). The neurodegeneration
          axis — assessed via structural MRI — captures downstream atrophy that
          correlates with symptom severity and progression rate.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Stage 2B serves as the neurodegeneration gate in our three-stage pipeline.
          It takes baseline MRI volumes and longitudinal atrophy trajectories as input
          and outputs a binary N+/N− classification alongside a continuous risk
          probability. This result feeds directly into the decision support layer,
          where it modulates treatment pathway routing, PET cost-benefit simulation,
          and uncertainty flagging.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Critically, Stage 2B does not require a positive amyloid signal to fire.
          Neurodegeneration can precede or occur independently of amyloid positivity,
          and detecting it early — even in amyloid-negative patients — may redirect
          clinical attention toward alternative neurodegenerative diagnoses.
        </p>
      </section>

      {/* ── 2. Dataset ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Dataset and Cohort</h2>
        <p className="text-muted-foreground leading-relaxed">
          The model was trained on the Alzheimer's Disease Neuroimaging Initiative
          (ADNI) dataset. Baseline visits were extracted using VISCODE = "bl",
          yielding 2,430 participants after merging with longitudinal slope estimates.
          Participants with missing target labels were excluded.
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
                ["Dataset",         "ADNI (adnimerge.csv)"],
                ["Total samples",   "2,430"],
                ["Train / Test",    "80% / 20% stratified"],
                ["N+ prevalence",   "14.8% (class imbalance handled via scale_pos_weight)"],
                ["Baseline visit",  "VISCODE = bl"],
                ["Longitudinal",    "Slope computed from all available MRI timepoints"],
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
          Neurodegeneration status (N+) was defined using an age-adjusted hippocampal
          volume residual, operationalized as follows:
        </p>
        <ol className="space-y-2 text-muted-foreground list-decimal list-inside leading-relaxed">
          <li>
            Hippocampal volume was normalized by intracranial volume (ICV) to produce
            a size-corrected ratio.
          </li>
          <li>
            A linear regression model was fitted to predict normalized hippocampal
            volume from age, establishing an expected value per age.
          </li>
          <li>
            The residual (observed minus expected) was z-scored across the cohort.
          </li>
          <li>
            Participants with a hippocampal z-score below −1.0 were classified as N+
            (neurodegeneration present). This threshold was chosen to balance
            sensitivity and specificity, avoiding over-identification at the extreme
            tails of the normative distribution.
          </li>
        </ol>
        <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 px-4 py-3">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <span className="font-semibold">Design note:</span> This is a data-driven
            neurodegeneration proxy, not a histopathological ground truth. The z-score
            threshold of −1.0 was selected empirically to achieve clinically meaningful
            sensitivity while maintaining high specificity for this triage application.
          </p>
        </div>
      </section>

      {/* ── 4. Feature Engineering ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">4. Feature Engineering</h2>
        <p className="text-muted-foreground leading-relaxed">
          The feature set combines baseline MRI volumes with longitudinal atrophy
          trajectories (slopes), computed by fitting a linear regression of volume
          against time (in days from first visit) for each participant. Missing slope
          values — arising when fewer than two timepoints were available — were median
          imputed, with binary missingness indicators retained as auxiliary features.
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-2">Feature Group</th>
                <th className="text-left px-4 py-2">Features</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Baseline MRI volumes", "Hippocampus, Entorhinal, Ventricles, WholeBrain, ICV"],
                ["Longitudinal slopes",  "Hippocampus_slope, Ventricles_slope, WholeBrain_slope"],
                ["Covariates",           "AGE, APOE4"],
                ["Missingness indicators", "One binary indicator per feature (10 total)"],
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

      {/* ── 5. Model Architecture ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">5. Model Architecture</h2>
        <p className="text-muted-foreground leading-relaxed">
          An XGBoost gradient-boosted tree classifier was trained with the following
          hyperparameters. Class imbalance (14.8% N+) was addressed via
          <code className="mx-1 px-1 rounded bg-muted text-sm">scale_pos_weight</code>
          set to the ratio of negative to positive training examples.
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
                ["n_estimators",      "400"],
                ["max_depth",         "4"],
                ["learning_rate",     "0.05"],
                ["subsample",         "0.9"],
                ["colsample_bytree",  "0.9"],
                ["scale_pos_weight",  "Negative / Positive ratio (≈5.75)"],
                ["eval_metric",       "logloss"],
                ["Classification threshold", "0.5 (balanced operating point)"],
              ].map(([k, v]) => (
                <tr key={k}>
                  <td className="px-4 py-2 font-medium text-foreground">{k}</td>
                  <td className="px-4 py-2 text-muted-foreground">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-muted-foreground leading-relaxed text-sm">
          Unlike Stage 2A (which uses a sensitivity-forced threshold of ~0.90),
          Stage 2B operates at a balanced threshold of 0.5. This reflects a different
          clinical trade-off: false positives in the neurodegeneration gate trigger
          additional workup rather than immediate therapy, making balanced precision
          more appropriate than maximal recall.
        </p>
      </section>

      {/* ── 6. SHAP Feature Importance ── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">6. Feature Importance (SHAP)</h2>
        <p className="text-muted-foreground leading-relaxed">
          SHAP (SHapley Additive exPlanations) values were computed using a
          kernel explainer on a 100-sample background subset. Mean absolute SHAP
          values reflect each feature's average contribution to the model output
          across the test set.
        </p>

        <div className="space-y-3">
          {SHAP_FEATURES.map(({ feature, mean_abs_shap, pct }) => {
            const meta = FEATURE_LABELS[feature];
            const isSlope = feature.includes("slope");
            return (
              <div key={feature} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="font-medium text-foreground">
                      {meta?.label ?? feature}
                    </span>
                    {isSlope && (
                      <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        longitudinal
                      </span>
                    )}
                  </div>
                  <span className="tabular-nums text-muted-foreground text-xs">
                    {mean_abs_shap.toFixed(4)}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#1B4D3E] transition-all duration-700"
                    style={{ width: `${Math.max(pct, 0.5)}%` }}
                  />
                </div>
                {meta?.description && (
                  <p className="text-xs text-muted-foreground">{meta.description}</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="rounded-lg border border-border bg-muted/30 px-4 py-4 space-y-2">
          <p className="text-sm font-semibold text-foreground">Key findings</p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-[#1B4D3E] mt-0.5 shrink-0">•</span>
              <span>
                <strong className="text-foreground">Hippocampal volume</strong> dominates
                the model (SHAP = 0.202), accounting for more than twice the combined
                contribution of all other features. This is consistent with the
                established primacy of hippocampal atrophy as an AD neurodegeneration marker.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#1B4D3E] mt-0.5 shrink-0">•</span>
              <span>
                <strong className="text-foreground">ICV and age</strong> are the next
                most important features, reflecting the normalization structure of the
                target variable (age-adjusted hippocampal volume residual).
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#1B4D3E] mt-0.5 shrink-0">•</span>
              <span>
                <strong className="text-foreground">Longitudinal slopes</strong>
                (Hippocampus_slope, WholeBrain_slope) show low SHAP values in this
                model. This may reflect that cross-sectional volume at baseline is
                already a strong predictor when the target is also
                defined from baseline volume, reducing the marginal value of slopes.
                Their contribution is expected to increase in prospective settings
                with longer follow-up.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#1B4D3E] mt-0.5 shrink-0">•</span>
              <span>
                <strong className="text-foreground">APOE4</strong> contributes minimally
                (SHAP = 0.0009) to the MRI-based model, consistent with its role as
                a genetic risk modifier rather than a direct structural marker.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ── 7. Performance ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">7. Model Performance</h2>
        <p className="text-muted-foreground leading-relaxed">
          Performance was evaluated on a held-out 20% stratified test set (n = 486).
          The model achieves near-perfect AUC (0.993) with high specificity, meaning
          the false positive rate is very low — a desirable property for a gating
          classifier that triggers additional downstream workup.
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-2">Class</th>
                <th className="text-left px-4 py-2">Precision</th>
                <th className="text-left px-4 py-2">Recall</th>
                <th className="text-left px-4 py-2">F1</th>
                <th className="text-left px-4 py-2">Support</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["N− (no neurodegeneration)", "0.98", "0.99", "0.98", "414"],
                ["N+ (neurodegeneration)",    "0.93", "0.89", "0.91",  "72"],
                ["Macro avg",                 "0.95", "0.94", "0.95", "486"],
                ["Weighted avg",              "0.97", "0.97", "0.97", "486"],
              ].map(([cls, p, r, f, s]) => (
                <tr key={cls}>
                  <td className="px-4 py-2 font-medium text-foreground">{cls}</td>
                  <td className="px-4 py-2 text-muted-foreground">{p}</td>
                  <td className="px-4 py-2 text-muted-foreground">{r}</td>
                  <td className="px-4 py-2 text-muted-foreground">{f}</td>
                  <td className="px-4 py-2 text-muted-foreground">{s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 8. Clinical Integration ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">8. Clinical Integration</h2>
        <p className="text-muted-foreground leading-relaxed">
          Stage 2B output feeds into three downstream decision support tools:
        </p>
        <div className="space-y-3">
          {[
            {
              tool: "Risk Stratification (Tool 2)",
              description: "N+ status elevates the patient to HIGH_RISK or URGENT tier regardless of amyloid probability, reflecting the clinical urgency of confirmed neurodegeneration.",
            },
            {
              tool: "Treatment Pathway Router (Tool 3)",
              description: "N+ triggers neurology referral pathways and may activate ChEI eligibility evaluation under NHI benefit codes, subject to confirmed dementia diagnosis.",
            },
            {
              tool: "Uncertainty Guard (Tool 6)",
              description: "Conflicting signals between Stage 2A (plasma amyloid) and Stage 2B (MRI neurodegeneration) — e.g. N+ with low amyloid probability — trigger an inter-stage conflict flag and route the case for specialist review.",
            },
          ].map(({ tool, description }) => (
            <div key={tool} className="rounded-lg border border-border px-4 py-4 space-y-1">
              <p className="text-sm font-semibold text-foreground">{tool}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 9. Limitations ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">9. Limitations</h2>
        <ul className="space-y-2 text-muted-foreground text-sm leading-relaxed">
          {[
            "The model was trained exclusively on ADNI data, which skews toward older, highly educated, predominantly North American participants. Performance may differ in Korean community clinic populations with different demographic and comorbidity profiles.",
            "The neurodegeneration target is a surrogate derived from hippocampal volume z-scores, not a pathologically confirmed ground truth. It captures one dimension of neurodegeneration and may miss tau-driven or non-hippocampal atrophy patterns.",
            "Longitudinal slopes showed low SHAP importance in this model. This is partly an artifact of the target definition (which is also cross-sectional at baseline). A prospective retraining on incident neurodegeneration outcomes would better evaluate slope utility.",
            "MRI acquisition protocols vary across sites and scanner generations. Volumetric features are sensitive to field strength, voxel size, and segmentation software. Deployment requires protocol harmonization or domain adaptation.",
            "The model does not incorporate tau PET, CSF biomarkers, or white matter hyperintensity burden, which are established neurodegeneration markers in the research literature.",
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
            "Jack CR Jr, et al. NIA-AA Research Framework: Toward a biological definition of Alzheimer's disease. Alzheimers Dement. 2018;14(4):535–562.",
            "Petersen RC, et al. Alzheimer's Disease Neuroimaging Initiative (ADNI): Clinical characterization. Neurology. 2010;74(3):201–209.",
            "Lundberg SM, Lee SI. A unified approach to interpreting model predictions. Advances in Neural Information Processing Systems. 2017;30.",
            "Chen T, Guestrin C. XGBoost: A scalable tree boosting system. KDD. 2016:785–794.",
            "Jack CR Jr, et al. Hypothetical model of dynamic biomarkers of the Alzheimer's pathological cascade. Lancet Neurol. 2010;9(1):119–128.",
            "Frisoni GB, et al. The clinical use of structural MRI in Alzheimer disease. Nat Rev Neurol. 2010;6(2):67–77.",
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