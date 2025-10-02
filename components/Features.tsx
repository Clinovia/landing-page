// components/Features.tsx
export default function Features() {
  return (
    <section
      id="features"
      className="py-16 bg-gray-50 w-full"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-green-900">
          Research Use Only (RUO) Solutions
        </h2>
        <p className="mt-4 text-lg text-center text-green-800/90">
          Clinovia demos are intended for Research Use Only (RUO). They are
          designed to support hospitals, contract research organizations (CROs),
          and pharmaceutical companies in advancing cardiovascular and
          neurological research.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Hospitals */}
          <div className="rounded-2xl bg-white shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-green-900">Hospitals</h3>
            <p className="mt-4 text-green-800">
              Hospitals can use Clinovia’s AI diagnostic tools to conduct clinical
              research, explore new methods for assessing cardiovascular risk,
              and study cognitive decline in controlled environments.
            </p>
          </div>

          {/* CROs */}
          <div className="rounded-2xl bg-white shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-green-900">Contract Research Organizations</h3>
            <p className="mt-4 text-green-800">
              CROs can integrate Clinovia demos into their study pipelines to
              provide advanced analytics, validate biomarkers, and generate
              explainable insights for sponsors.
            </p>
          </div>

          {/* Pharma */}
          <div className="rounded-2xl bg-white shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-green-900">Pharmaceutical Companies</h3>
            <p className="mt-4 text-green-800">
              Pharmaceutical companies can leverage Clinovia’s AI models to
              support drug discovery, clinical trial stratification, and
              post-market research focused on cardiology and neurology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
