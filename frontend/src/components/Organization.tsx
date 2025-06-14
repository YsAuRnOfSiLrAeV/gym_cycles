export default function Organization() {
    return (
      <div className="flex-1 bg-[#eeeeee] border-t-12 border-[#D0D0D0]">
            <div className="relative rounded-xl mt-8 lg:mx-8 bg-white p-4 lg:p-8 text-gray-800 text-[17px] leading-relaxed">
          <h1 className="text-3xl font-poppins font-semibold mb-8">Organization of Training</h1>
  
          <p className="mb-4">
            To achieve high results in powerlifting, the training process must be built systematically. The main structural unit of the program is the <strong className="text-[#6a4133]">macrocycle</strong> - the full period of the athlete's preparation, which usually lasts from 3 to 6 months. The macrocycle is divided into <strong className="text-[#6a4133]">mesocycles</strong>, which in turn are divided into <strong className="text-[#6a4133]">microcycles</strong>.
          </p>
  
          <h2 className="text-2xl font-poppins font-semibold mt-6 mb-3">Macrocycle</h2>
          <ul className="list-disc pl-6 space-y-2 mb-4 marker:text-[#6a4133]">
            <li><strong className="text-[#6a4133]">Hypertrophy (6-12 weeks):</strong> increase in muscle volume, development of technique.</li>
            <li><strong className="text-[#6a4133]">Strength (8-12 weeks):</strong> growth of maximal strength, fewer repetitions, more weight.</li>
            <li><strong className="text-[#6a4133]">Peaking phase (2-3 weeks):</strong> preparation for a peaking session or competition, heavy singles and doubles.</li>
            <li><strong className="text-[#6a4133]">Recovery (1-2 weeks):</strong> load reduction, CNS regeneration.</li>
          </ul>
  
          <h2 className="text-2xl font-poppins font-semibold mt-6 mb-3">Mesocycle</h2>
          <p className="mb-4">
            This is a block of 3-12 weeks with one main goal: hypertrophy, strength, endurance, or recovery. It dictates the character of the microcycles.
          </p>
  
          <h2 className="text-2xl font-poppins font-semibold mt-6 mb-3">Microcycle</h2>
          <p className="mb-4">
            The smallest structural unit, usually one week. Includes 2-5 training sessions adapted to the mesocycle's objectives.
          </p>
  
          <h2 className="text-2xl font-poppins font-semibold mt-6 mb-3">Alternative periodization models</h2>
          <ul className="list-disc pl-6 space-y-2 mb-4 marker:text-[#6a4133]">
            <li><strong className="text-[#6a4133]">DUP (Duplicate):</strong> alternating load types throughout the week.</li>
            <li><strong className="text-[#6a4133]">Block:</strong> each block focuses on one quality, others are maintained.</li>
            <li><strong className="text-[#6a4133]">Reverse:</strong> first peak strength, then hypertrophy. Relevant when quick results are needed.</li>
            <li><strong className="text-[#6a4133]">Autoregulation:</strong> load is formed based on well-being or bar velocity (RPE, velocity-based).</li>
          </ul>
  
          <h2 className="text-2xl font-poppins font-semibold mt-6 mb-3">Functional cycle: PR Test ➜ Hypertrophy ➜ Strength ➜ PR Test</h2>
          <p className="mb-4">
            This model reflects a living, working approach to the cycle between PR tests. It allows maintaining form, adapting the program to real conditions, and constantly growing.
          </p>
          <ol className="list-decimal pl-6 space-y-2 marker:text-[#6a4133]">
            <li><strong className="text-[#6a4133]">PR Test:</strong> testing 1RM, analysis of technical and strength weaknesses.</li>
            <li><strong className="text-[#6a4133]">Hypertrophy:</strong> building muscle mass, improving technique.</li>
            <li><strong className="text-[#6a4133]">Strength:</strong> developing maximum strength based on the new foundation.</li>
            <li><strong className="text-[#6a4133]">PR Test:</strong> new testing and beginning of the next cycle.</li>
          </ol>
        </div>
      </div>
    );
  }