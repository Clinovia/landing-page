import Image from "next/image";
import Link from "next/link";

export default function Stage2aPlasmaWhitePaperPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p className="text-sm uppercase tracking-[0.2em] text-green-400 font-semibold">
            Research White Paper
          </p>

          <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight tracking-tight">
            Stage 2a Plasma Biomarker Model
          </h1>

          <p className="mt-6 text-xl text-gray-300 leading-relaxed max-w-3xl">
            Plasma biomarker-informed amyloid risk stratification using
            multimodal blood biomarkers and clinical variables derived from
            PET-validated Alzheimer&apos;s disease cohorts.
          </p>

          {/* Metrics */}
          <div className="mt-10 flex flex-wrap gap-4">
            {[
              ["Mean AUC", "0.915"],
              ["Sensitivity", "0.900"],
              ["Specificity", "0.737"],
              ["Samples", "396"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm"
              >
                <p className="text-sm text-gray-400">{label}</p>
                <p className="text-2xl font-bold text-green-400">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section>
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Left */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                Overview
              </h2>

              <div className="space-y-5 text-gray-300 leading-relaxed">
                <p>
                  The Clinovia Stage 2a model is a plasma biomarker-informed
                  progression and amyloid risk stratification system designed
                  to support scalable longitudinal neurodegenerative screening.
                </p>

                <p>
                  The model integrates plasma Alzheimer&apos;s disease biomarkers,
                  genetic risk variables, and clinical features to estimate
                  amyloid-associated neurodegenerative risk using PET-validated
                  reference cohorts.
                </p>

                <p>
                  Stage 2a functions as the intermediate biomarker layer within
                  the broader Clinovia multimodal longitudinal brain health
                  intelligence platform.
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold mb-6">
                Model Summary
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-gray-400">Validation Type</span>
                  <span>PET-Validated</span>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-gray-400">Samples</span>
                  <span>396</span>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-gray-400">Features</span>
                  <span>8</span>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-gray-400">Cross Validation</span>
                  <span>5-Fold</span>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-gray-400">Positive Class Ratio</span>
                  <span>0.404</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Target</span>
                  <span>Amyloid Risk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PET Sources */}
      <section className="border-t border-white/10 border-b border-white/10 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-6 py-16">
          
          <h2 className="text-3xl font-bold">
            PET Reference Cohorts
          </h2>

          <p className="mt-5 text-gray-300 leading-relaxed max-w-3xl">
            Plasma biomarker predictions were benchmarked against
            PET-confirmed amyloid imaging cohorts using both FBB-PET
            and AV45-PET reference standards.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mt-10">
            
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <p className="text-sm text-gray-400">
                FBB-PET Cohort
              </p>

              <p className="mt-3 text-4xl font-bold text-green-400">
                251
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <p className="text-sm text-gray-400">
                AV45-PET Cohort
              </p>

              <p className="mt-3 text-4xl font-bold text-green-400">
                145
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cross Validation */}
      <section>
        <div className="max-w-5xl mx-auto px-6 py-16">
          
          <h2 className="text-3xl font-bold mb-10">
            Cross-Validation Performance
          </h2>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              ["Fold 1", "0.9642"],
              ["Fold 2", "0.9092"],
              ["Fold 3", "0.9342"],
              ["Fold 4", "0.8660"],
              ["Fold 5", "0.9016"],
            ].map(([fold, auc]) => (
              <div
                key={fold}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
              >
                <p className="text-sm text-gray-400">{fold}</p>
                <p className="mt-3 text-2xl font-bold text-green-400">
                  {auc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-green-500/20 bg-green-500/5 p-8">
            <p className="text-sm uppercase tracking-wide text-green-400 font-semibold">
              Mean Cross-Validated Performance
            </p>

            <h3 className="mt-4 text-4xl font-bold">
              AUC 0.9150 ± 0.0329
            </h3>

            <p className="mt-5 text-gray-300 leading-relaxed max-w-3xl">
              The model demonstrated strong and stable discriminative
              performance across cross-validation folds, suggesting robust
              plasma biomarker signal for amyloid-associated risk estimation.
            </p>
          </div>
        </div>
      </section>

      {/* SHAP */}
      <section className="border-t border-white/10 border-b border-white/10 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-6 py-16">
          
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold">
              Biomarker Importance Analysis
            </h2>

            <p className="mt-5 text-gray-300 leading-relaxed">
              Plasma pTau217 and plasma amyloid-beta ratio emerged as the
              dominant predictive signals, consistent with current biomarker
              trajectory models in Alzheimer&apos;s disease research.
            </p>
          </div>

          <div className="mt-12 rounded-3xl overflow-hidden border border-white/10 bg-black">
            <Image
              src="/images/stage2a_shap_bar.png"
              alt="Stage 2a Plasma SHAP Importance"
              width={1400}
              height={900}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Key Biomarkers */}
      <section>
        <div className="max-w-5xl mx-auto px-6 py-16">
          
          <h2 className="text-3xl font-bold mb-10">
            Key Plasma Biomarkers
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Plasma pTau217",
              "Plasma Amyloid-Beta Ratio",
              "Plasma Neurofilament Light (NfL)",
              "Plasma GFAP",
              "APOE ε4",
              "Age",
            ].map((feature) => (
              <div
                key={feature}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <p className="font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Integration */}
      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-6 py-16">
          
          <h2 className="text-3xl font-bold">
            Role Within the Clinovia Platform
          </h2>

          <p className="mt-6 text-gray-300 leading-relaxed max-w-3xl">
            Stage 2a functions as the plasma biomarker intelligence layer
            within the Clinovia multimodal longitudinal architecture.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-gray-400 font-semibold">
                Stage 1
              </p>

              <h3 className="mt-3 text-xl font-semibold">
                Clinical Progression
              </h3>

              <p className="mt-3 text-gray-300 text-sm leading-relaxed">
                Cognitive and neuropsychological progression prediction.
              </p>
            </div>

            <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6">
              <p className="text-sm text-green-400 font-semibold">
                Stage 2a
              </p>

              <h3 className="mt-3 text-xl font-semibold">
                Plasma Biomarkers
              </h3>

              <p className="mt-3 text-gray-300 text-sm leading-relaxed">
                Plasma biomarker-informed amyloid risk stratification.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-gray-400 font-semibold">
                Stage 2b
              </p>

              <h3 className="mt-3 text-xl font-semibold">
                MRI Neurodegeneration
              </h3>

              <p className="mt-3 text-gray-300 text-sm leading-relaxed">
                Structural neurodegeneration trajectory analysis using MRI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          
          <h2 className="text-3xl md:text-4xl font-bold">
            Plasma Biomarker Intelligence for Early Detection
          </h2>

          <p className="mt-6 text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Clinovia integrates plasma biomarkers, cognition, and imaging
            into a longitudinal multimodal brain health intelligence platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href="/clinical/alzheimer"
              className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 transition-colors px-8 py-3 rounded-full font-semibold"
            >
              Explore Platform
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center border border-white/15 hover:border-white/30 px-8 py-3 rounded-full text-white/80 hover:text-white transition-colors"
            >
              Back to Home
            </Link>
          </div>

          <p className="mt-12 text-xs text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Research use only. Clinovia is investigational and is not approved
            for clinical diagnosis or treatment decision-making.
          </p>
        </div>
      </section>
    </main>
  );
}