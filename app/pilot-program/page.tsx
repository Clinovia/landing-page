export default function PilotProgram() {
  return (
    <section className="py-20 bg-white text-[#1B4D3E]">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-14">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Start a Paid Pilot with Clinovia.ai
          </h1>
          <p className="text-lg md:text-xl font-normal text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Validate our AI models on your de-identified patient cohort or historical trial data. 
            Our pilot programs are designed for CROs, pharmaceutical R&amp;D teams, and academic 
            research centers working in <strong>cardiology, Alzheimer’s disease, or MCI (Mild Cognitive Impairment)</strong>.
          </p>
        </div>

        {/* What’s Included */}
        <div className="mb-14">
          <h2 className="text-2xl font-semibold mb-4">What’s Included</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-700 leading-relaxed">
            <li>Secure upload of de-identified data (CSV, DICOM, or structured EHR exports)</li>
            <li>
              AI analysis using one of our research-use-only (RUO) models:
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li><strong>Cardiology Risk Assessor</strong> (ASCVD, CH₂VC-D2, BP-based risk)</li>
                <li><strong>Alzheimer’s Classifier</strong> (trained on ADNI data: ADAS, CDR, MOCA, etc.)</li>
                <li><strong>MCI-to-Alzheimer’s Converter</strong> (in development – early access available)</li>
              </ul>
            </li>
            <li>A detailed PDF report with risk scores, cohort stratification, and performance benchmarks</li>
            <li>A 60-minute strategy session to interpret results and discuss integration</li>
          </ul>
        </div>

        {/* Pilot Details */}
        <div className="mb-14">
          <h2 className="text-2xl font-semibold mb-4">Pilot Details</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-700 leading-relaxed">
            <li><strong>Investment:</strong> $10,000–$25,000 (based on scope and data size)</li>
            <li><strong>Timeline:</strong> Results delivered in 2–3 weeks</li>
            <li>
              <strong>Data Policy:</strong> Your data is encrypted in transit and at rest, 
              never stored beyond 30 days, and used solely for this pilot. We sign a Data Use Agreement (DUA).
            </li>
          </ul>
          <p className="text-sm text-gray-600 mt-4 italic">
            *All tools are for <strong>Research Use Only (RUO)</strong> and not intended for clinical diagnosis.*
          </p>
        </div>

        {/* CTA */}
        <div className="text-center mb-10">
          <h3 className="text-2xl font-semibold mb-4">Ready to Proceed?</h3>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Please complete the form below. We’ll respond within 1 business day with a custom proposal.
          </p>
        </div>

        {/* Form Embed */}
        <div className="max-w-3xl mx-auto">
          {/* Replace the src below with your actual Tally or custom form URL */}
          <iframe
            src="https://tally.so/r/mOOY8g"
            width="100%"
            height="600"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Clinovia Pilot Request Form"
            className="rounded-2xl shadow-md border border-gray-200"
          ></iframe>
        </div>

        {/* Back to Demos */}
        <div className="text-center mt-14">
          <a
            href="/#demos"
            className="inline-block px-8 py-3 bg-[#1B4D3E] text-white font-semibold rounded-full hover:bg-[#2a5f4e] transition-colors shadow-md hover:shadow-lg"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            ← Back to Demos
          </a>
        </div>
      </div>
    </section>
  );
}
