import { useState } from "react";
import { BookText, ScanSearch, Search } from "lucide-react";
import { toast } from "react-toastify";

const symptoms = [
  "Abdominal pain", "Chest pain", "Constipation", "Cough", "Breath difficulty",
  "Red eye", "Foot pain", "Foot swelling", "Headache", "Heart palpitation",
  "Knee pain", "Hip pain", "Low back pain", "Nasal congestion", "Neck pain"
];

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');



export default function SearchSection() {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  // Simulated condition results
  const getConditionsByLetter = (letter) => {
    if (!letter) return [];
    return ["Asthma", "Allergy", "Anemia"].filter(condition =>
      condition.startsWith(letter)
    );
  };

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleAnalyze = () => {
    toast.info(`Analyzing: ${selectedSymptoms.join(", ")}`)
  };

  const conditions = getConditionsByLetter(selectedLetter);

  return (
    <section className="bg-white py-16 px-4 md:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Health Information
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Search by condition name or explore common symptoms to find relevant health information.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Alphabetical Search */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
              <BookText className="w-5 h-5 mr-2 text-indigo-600" />
              Search by Alphabet
            </h3>

            <div className="flex flex-wrap gap-2">
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  className={`w-10 h-10 flex items-center justify-center border font-medium rounded-lg transition-all ${
                    selectedLetter === letter
                      ? "bg-indigo-100 border-indigo-500 text-indigo-700"
                      : "border-gray-300 text-gray-700 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-medium text-gray-800">Search Results</h4>
                <span className="text-sm text-gray-500">{conditions.length} results</span>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-5 min-h-[150px]">
                {selectedLetter ? (
                  conditions.length ? (
                    <ul className="list-disc list-inside text-gray-700">
                      {conditions.map((condition, idx) => (
                        <li key={idx}>{condition}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400">No conditions found for “{selectedLetter}”</p>
                  )
                ) : (
                  <p className="text-gray-400 text-center">
                    Select a letter above to view conditions
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Symptom Checker */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
              <ScanSearch className="w-5 h-5 mr-2 text-indigo-600" />
              Symptom Checker
            </h3>

            <p className="text-gray-600 mb-6">
              Select symptoms to explore possible conditions and treatment options.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {symptoms.map((symptom, index) => (
                <button
                  key={index}
                  onClick={() => toggleSymptom(symptom)}
                  className={`border p-3 rounded-lg text-sm transition-all shadow-sm focus:outline-none ${
                    selectedSymptoms.includes(symptom)
                      ? "bg-indigo-100 border-indigo-500 text-indigo-700"
                      : "bg-white border-gray-200 text-gray-700 hover:border-indigo-300 hover:text-indigo-700"
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>

            <div className="mt-8">
              <button
                onClick={handleAnalyze}
                className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md flex items-center justify-center"
              >
                <Search className="w-5 h-5 mr-2" />
                Analyze Symptoms
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
