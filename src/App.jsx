import React, { useState, useRef, useEffect } from 'react';
import { 
  BookOpen, 
  Target, 
  ListChecks, 
  Loader2, 
  AlertCircle,
  FileText,
  GraduationCap,
  Calendar,
  Layers,
  Settings2,
  Lightbulb
} from 'lucide-react';

// Embedded Budget of Work (BoW) Database extracted from uploaded PDFs
// Embedded Budget of Work (BoW) Database extracted from uploaded PDFs
const bowDatabase = {
  "Mathematics": {
    "Grade 7": {
      "First Term": {
        "1": "Measurement and Geometry: Draw and describe regular and irregular polygons with 5, 6, 8, or 10 sides, based on measurements of sides and angles, using a ruler and protractor. Draw triangles, quadrilaterals, and regular polygons (5, 6, 8, or 10 sides) with given angle measures.",
        "2": "Measurement and Geometry: Describe and explain the relationships between angle pairs based on their measures. Classify polygons according to the number of sides, whether they are regular or irregular, and whether they are convex or non-convex.",
        "3": "Measurement and Geometry: Deduce the relationship between the exterior angle and adjacent interior angle of a polygon. Determine the measures of angles and the number of sides of polygons.",
        "4": "Number and Algebra: Solve problems involving: a. percentage increase b. percentage decrease. Solve money problems involving percentages (e. g., discount, commission, sales tax, simple interest).",
        "5": "Number and Algebra: Create a financial plan.",
        "6": "Number and Algebra: Identify and explain the uses of rates. Solve problems involving rates (e.g., speed).",
        "7": "Number and Algebra: Describe given rational numbers as fractions, decimals, or percentages. Order rational numbers on a number line.",
        "8 to 9": "Number and Algebra: Perform operations on rational numbers.",
        "10": "Number and Algebra: Determine the square roots of perfect squares and the cube roots of perfect cubes. Identify irrational numbers involving square roots and cube roots, and their locations on the number line."
      },
      "Second Term": {
        "1 to 2": "Measurement and Geometry: Convert units of measure within the International System of Units (SI) and across different systems of measure.",
        "3": "Measurement and Geometry: Explain inductively the volume of a cylinder using the area of a circle, leading to the identification of the formula. Find the volume of a cylinder. Solve problems involving the volumes of cylinders.",
        "4": "Measurement and Geometry: Explore inductively the volume of square and rectangular pyramids using rectangular prisms, leading to the identification of the formula. Estimate volumes of square and rectangular pyramids. Solve problems involving volumes of square or rectangular pyramids.",
        "5": "Number and Algebra: Describe sets and their subsets, the union of sets, and the intersection of sets. Illustrate sets and their subsets, the union of sets, and the intersection of sets, through the use of Venn diagrams.",
        "6": "Number and Algebra: Illustrate the different subsets of real numbers. Data and Probability: Investigate different data collection and sampling techniques.",
        "7 to 8": "Data and Probability: Organize statistical data in a frequency distribution table. Use appropriate graphs to represent organized data: pie graph, bar graph, line graph, and stem-and-leaf plot. Interpret statistical graphs.",
        "9": "Number and Algebra: Describe the set of integers. Use positive and negative numbers to describe directions or opposites in real-life situations.",
        "10": "Number and Algebra: Locate integers on the number line. Compare and order integers."
      },
      "Third Term": {
        "1": "Number and Algebra: Add and subtract integers; using concrete models (e.g., counters, integer chips), pictorial models (e.g., bar models, number lines), and with integers written as numerals.",
        "2": "Number and Algebra: Multiply and divide integers. Simplify numerical expressions involving integers using number properties and the order of operations (GEMDAS).",
        "3": "Number and Algebra: Identify the absolute value of an integer, and its meaning on the number line. Solve simple equations represented by bar models to find unknowns.",
        "4": "Number and Algebra: Distinguish a variable from a constant in an algebraic expression. Evaluate algebraic expressions given the value/s of the variable/s.",
        "5": "Number and Algebra: Translate verbal phrases into algebraic expressions. Illustrate the properties of equality.",
        "6": "Number and Algebra: Solve one variable in terms of the other variables in a formula. Write equations in algebraic form.",
        "7": "Number and Algebra: Find the value of an unknown in an equation where the unknown is non-negative. Solve problems involving algebraic expressions and formulas.",
        "8": "Data and Probability: Collect data from experiments (e.g., number of heads obtained when tossing a coin, a number of times, number of prime numbers obtained when rolling a die a number of times). Express outcomes in words and/or symbols, and represent outcomes in tables and/or graphs.",
        "9": "Data and Probability: Solve problems using the outcomes of experiments. Write numbers in scientific notation to represent very large or very small numbers, and vice versa.",
        "10": "Data and Probability: Perform operations on numbers expressed in scientific notation."
      }
    },
    "Grade 8": {
      "First Term": {
        "5": "Number and Algebra: Recognize and solve problems involving linear inequalities in two variables.",
        "6": "Data and Probability: Calculate the measures of variability (range, mean deviation, and standard deviation) for ungrouped data. Draw conclusions from statistical data using the measures of variability. Investigate, interpret, and analyze graphs from primary data.",
        "7": "Data and Probability: Investigate, interpret, and analyze graphs from secondary data. Differentiate theoretical from experimental probability by conducting an experiment or an investigation.",
        "8": "Data and Probability: Describe the sample space of an experiment. Use the Fundamental Counting Principle to determine the number of possible outcomes of an experiment.",
        "9": "Data and Probability: Calculate the theoretical probability of a single event by listing all possible outcomes. Describe probability as a measure of the chance of an event occurring.",
        "10": "Data and Probability: Calculate the probability of simple combined events by listing, or by possibility diagrams or tree diagrams. Solve problems involving experimental probability and/or theoretical probability using the Fundamental Counting Principle."
      }
    },
    "Grade 9": {
      "First Term": {
        "1": "Measurement and Geometry: Illustrate and describe point, line, ray, line segment, angle, and plane using models and geometric representations.",
        "5": "Measurement and Geometry: Solve problems involving the perpendicular bisector theorem, isosceles triangle theorem, theorems on equilateral triangles, and the midline theorem.",
        "6": "Measurement and Geometry: Explain theorems on triangle inequalities and apply these theorems in comparing measures in a triangle.",
        "7": "Measurement and Geometry: Determine the values of the sine, cosine, and tangent trigonometric ratios corresponding to the angles of the special triangles. Find the values of the sine, cosine, and tangent ratios of any acute angle. Use trigonometric ratios in solving right triangles.",
        "8": "Measurement and Geometry: Illustrate angles of elevation and angles of depression. Solve real-life problems involving right triangles through the application of the trigonometric ratios.",
        "9": "Data and Probability: Interpret and analyze data from the digital media that are in tabular or graphical form to assess whether the data may be misleading. Illustrate simple and compound events.",
        "10": "Data and Probability: Determine the probabilities of simple and compound events. Solve problems involving probabilities of simple and compound events."
      }
    },
    "Grade 10": {
      "First Term": {
        "1": "Measurement and Geometry: Apply laws of sines in solving oblique triangles, including ambiguous cases.",
        "6": "Number and Algebra: Solve real-life problems involving: a. compound interest b. depreciation",
        "7": "Measurement and Geometry: Establish properties and relationships for central angles, inscribed angles, secants, and tangents, of a circle. Solve problems involving: a. central angles b. inscribed angles c. angles formed by two intersecting chords d. angles formed by two secants intersecting outside the circle e. angles formed by two intersecting tangents f. angles formed by intersecting secant and tangent. Establish properties and relationships for chords, secants, and tangents.",
        "8": "Measurement and Geometry: Establish properties and relationships for central angles, inscribed angles, secants, and tangents, of a circle. Solve problems involving: a. central angles b. inscribed angles c. angles formed by two intersecting chords d. angles formed by two secants intersecting outside the circle e. angles formed by two intersecting tangents f. angles formed by intersecting secant and tangent. Establish properties and relationships for chords, secants, and tangents.",
        "9": "Measurement and Geometry: Solve problems involving lengths of: a. intersecting chords b. two secant segments intersecting outside a circle c. two intersecting tangent segments. Define sectors and segments of a circle and find their areas.",
        "10": "Measurement and Geometry: Solve problems involving area of a sector of a circle, segment of a circle, and shaded regions in other figures that involve sectors or segments."
      }
    }
  }
};

export default function App() {
  const [subject, setSubject] = useState("Mathematics");
  const [grade, setGrade] = useState("Grade 7");
  const [term, setTerm] = useState("First Term");
  const [week, setWeek] = useState("1");
  const [isWholeTerm, setIsWholeTerm] = useState(false);
  const [sessionsCount, setSessionsCount] = useState(4);
  const [competency, setCompetency] = useState("");
  const [isAutoLoaded, setIsAutoLoaded] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const exportRef = useRef(null);

  const exampleCompetency = "Draw and describe regular and irregular polygons with 5, 6, 8, or 10 sides, based on measurements of sides and angles, using a ruler and protractor.";

  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  useEffect(() => {
    if (isWholeTerm) {
      const termData = bowDatabase[subject]?.[grade]?.[term];
      if (termData) {
        const allCompetencies = Object.entries(termData)
          .sort(([weekA], [weekB]) => Number(weekA) - Number(weekB))
          .map(([weekNum, comp]) => `[Week ${weekNum}] ${comp}`)
          .join('\n\n');
        setCompetency(allCompetencies);
        setIsAutoLoaded(true);
        setSessionsCount(40);
      } else {
        setCompetency("");
        setIsAutoLoaded(false);
        setSessionsCount(40);
      }
    } else {
      const autoCompetency = bowDatabase[subject]?.[grade]?.[term]?.[week];
      if (autoCompetency) {
        setCompetency(autoCompetency);
        setIsAutoLoaded(true);
        setSessionsCount(4);
      } else {
        setCompetency("");
        setIsAutoLoaded(false);
        setSessionsCount(4);
      }
    }
  }, [subject, grade, term, week, isWholeTerm]);

  const handleUnpack = async (e) => {
    e.preventDefault();
    if (!competency.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    const contextScope = isWholeTerm 
      ? `- Scope: ENTIRE TERM (All Competencies)` 
      : `- Week No.: Week ${week}`;

    const competencyLabel = isWholeTerm 
      ? `Learning Competencies (Full Term):` 
      : `Learning Competency:`;

    const promptText = `wedoIT Solutions - UNPACKING OF LEARNING COMPETENCIES
    Continuous Session-Based Pacing Framework

    SECTION 1 — ROLE
    Act as an expert from wedoIT Solutions, a DepEd curriculum specialist, instructional coach, and pacing architect with mastery of the MATATAG K-10 Curriculum, Revised Bloom's Taxonomy, and DO No. 31, s. 2012. You are fluent in the Learning Area Frameworks, especially the Mathematical Proficiency Framework (Kilpatrick et al., 2001) which includes:
    - Conceptual Understanding (CU)
    - Procedural Fluency (PF)
    - Strategic Competence (SC)
    - Adaptive Reasoning (AR)
    - Productive Disposition (PD)

    SECTION 2 — METHODOLOGY & RULES
    1. Core Principle (Strict): Unpacking does not go beyond the intent of the competency. Every learning objective stays within the scope explicitly outlined in the LC. No extra or unrelated elements are added.
    2. Session Allocation: Unpack the given Budget of Work (BoW) learning data into exactly ${sessionsCount} continuous, session-ready instructional days. ${isWholeTerm ? "Since this is a FULL TERM, logically distribute the sessions across the provided weeks." : ""}
    3. Vertical Alignment: Prior knowledge and succeeding LCs must dictate scaffolding in Session 1 and the bridge to the next competency in the final session.
    4. Deepening Sessions: Add these to complex LCs to allow for justification or advanced application within the original LC's intent. Do not introduce new concepts.
    5. K-S-A Objectives Definition:
       - K (Knowledge) — what to KNOW.
       - S (Skills) — what to DO.
       - A (Attitude/Values) — how to think/act.
       Objectives must build progressively sequentially in increasing levels (from Remember to Apply/Analyze/Create).

    CONTEXT:
    - Subject: ${subject}
    - Grade Level: ${grade}
    - Term: ${term}
    ${contextScope}
    - Target Number of Sessions: ${sessionsCount}
    - ${competencyLabel}
    """
    ${competency.trim()}
    """
    
    TASK:
    Based on the MATATAG Curriculum Guide and the principles above, provide exactly ${sessionsCount} unpacked sessions. Output strictly in professional, DepEd-standard English.`;

    const payload = {
      contents: [{ parts: [{ text: promptText }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            unpackedTitle: { type: "STRING", description: "A short, descriptive title for this unpacked competency or term guide" },
            frameworkFocus: { type: "STRING", description: "Brief note on the primary Bloom's Taxonomy/Proficiency focus" },
            sessions: { 
              type: "ARRAY", 
              description: `Exactly ${sessionsCount} session objects`,
              items: { 
                type: "OBJECT",
                properties: {
                  sessionNumber: { type: "INTEGER" },
                  sessionTopic: { type: "STRING", description: "Specific topic for this session" },
                  knowledgeObjective: { type: "STRING", description: "Knowledge (K) objective (e.g., 'Identify...', 'Describe...')" },
                  skillObjective: { type: "STRING", description: "Skill (S) objective (e.g., 'Calculate...', 'Draw...')" },
                  attitudeObjective: { type: "STRING", description: "Attitude/Values (A) objective" }
                },
                required: ["sessionNumber", "sessionTopic", "knowledgeObjective", "skillObjective", "attitudeObjective"]
              }
            }
          },
          required: ["unpackedTitle", "frameworkFocus", "sessions"]
        }
      }
    };

    let retries = 5;
    let delays = [1000, 2000, 4000, 8000, 16000];

    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch('/api/unpack', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          let detail = "";
          try {
            const errBody = await response.json();
            detail = errBody?.error?.message || errBody?.error || "";
            if (typeof detail === "object") detail = JSON.stringify(detail);
          } catch {
            detail = await response.text().catch(() => "");
          }

          // Client/auth errors (400/401/403/404) won't fix themselves — surface immediately.
          if ([400, 401, 403, 404].includes(response.status)) {
            setError(`Gemini request rejected (HTTP ${response.status}). ${detail || "Check that GEMINI_API_KEY is valid, the Generative Language API is enabled, and the key has no HTTP-referrer restriction."}`);
            setIsLoading(false);
            return;
          }
          throw new Error(`API Error ${response.status}: ${detail}`);
        }

        const data = await response.json();
        const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (textResponse) {
          const parsedResult = JSON.parse(textResponse);
          if (parsedResult.sessions && parsedResult.sessions.length > 0) {
             setResult(parsedResult);
             break; 
          } else {
             throw new Error("AI returned empty sessions.");
          }
        } else {
          throw new Error("Invalid response format from API");
        }
      } catch (err) {
        if (i === retries - 1) {
          setError(`Failed to unpack competency after multiple attempts. ${err?.message ? `(${err.message}) ` : ""}${isWholeTerm ? "Generating a whole term is complex; try reducing the session count slightly and try again." : "Please ensure the competency is clear and try again."}`);
        } else {
          await delay(delays[i]);
        }
      }
    }
    
    setIsLoading(false);
  };

  const handleExportWord = () => {
    if (!exportRef.current) return;
    
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Unpacked Competency</title><style>body { font-family: 'Arial', sans-serif; } table { border-collapse: collapse; width: 100%; } th, td { border: 1px solid black; padding: 8px; text-align: left; } th { background-color: #f2f2f2; }</style></head><body>";
    const footer = "</body></html>";
    const html = header + exportRef.current.innerHTML + footer;
    
    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const weekLabel = isWholeTerm ? "WholeTerm" : `W${week}`;
    link.download = `wedoIT_Solutions_${subject}_G${grade.replace(/\D/g,'')}_${weekLabel}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const loadExample = () => {
    setSubject("Mathematics");
    setGrade("Grade 7");
    setTerm("First Term");
    setWeek("1");
    setIsWholeTerm(false);
    setSessionsCount(4); 
    setCompetency(exampleCompetency);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      {/* Header */}
      <div className="bg-blue-900 text-white border-b-4 border-yellow-500">
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0 border-2 border-yellow-400 overflow-hidden shadow-sm relative">
              <img 
                src="image_c34821.png" 
                alt="wedoIT Solutions Logo" 
                className="absolute inset-0 w-full h-full object-contain p-0.5 z-10 bg-white"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
                <span className="font-bold text-blue-900 text-[11px] leading-none tracking-tight">wedo</span>
                <span className="font-black text-yellow-500 text-lg leading-none mt-0.5">IT</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">wedoIT Solutions</h1>
              <p className="text-blue-200 text-sm md:text-base font-medium">Unpacking of Learning Competencies</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 space-y-8">
        
        {/* Input Form Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-100/50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
            <Settings2 size={20} className="text-blue-700" />
            <h2 className="font-semibold text-slate-800">Competency Configuration</h2>
          </div>
          
          <form onSubmit={handleUnpack} className="p-6 md:p-8 space-y-6">
            
            {/* Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Subject</label>
                <select 
                  value={subject} 
                  onChange={e => setSubject(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-colors text-sm"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                  <option value="Filipino">Filipino</option>
                  <option value="Araling Panlipunan">Araling Panlipunan</option>
                  <option value="MAPEH">MAPEH</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Grade Level</label>
                <select 
                  value={grade} 
                  onChange={e => setGrade(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-colors text-sm"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i+1} value={`Grade ${i+1}`}>Grade {i+1}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Term</label>
                <select 
                  value={term} 
                  onChange={e => setTerm(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-colors text-sm"
                >
                  <option value="First Term">Term 1</option>
                  <option value="Second Term">Term 2</option>
                  <option value="Third Term">Term 3</option>
                </select>
              </div>
              <div className={`space-y-2 transition-opacity ${isWholeTerm ? 'opacity-50' : 'opacity-100'}`}>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Week No.</label>
                <input 
                  type="number" 
                  min="1" max="40"
                  value={week} 
                  onChange={e => setWeek(e.target.value)}
                  disabled={isWholeTerm}
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-colors text-sm disabled:bg-slate-100 disabled:cursor-not-allowed"
                  required={!isWholeTerm}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide" title="Number of sessions to unpack into">Target Sessions</label>
                <input 
                  type="number" 
                  min="1" max="50"
                  value={sessionsCount} 
                  onChange={e => setSessionsCount(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-colors text-sm font-semibold text-blue-700"
                  required
                />
              </div>

              {/* Toggle Switch row */}
              <div className="col-span-1 md:col-span-3 lg:col-span-5 flex items-center justify-between p-4 bg-blue-50/50 border border-blue-100 rounded-xl mt-2">
                <div>
                  <h3 className="font-bold text-blue-900 text-sm">Unpack Whole Term</h3>
                  <p className="text-xs text-blue-700/80">Generates a complete pacing guide for all competencies in the selected quarter.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsWholeTerm(!isWholeTerm)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${isWholeTerm ? 'bg-blue-600' : 'bg-slate-300'}`}
                  role="switch"
                  aria-checked={isWholeTerm}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isWholeTerm ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>

            {/* Competency Textarea */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label htmlFor="competency" className="block text-sm font-bold text-slate-700 flex items-center gap-2">
                  <BookOpen size={18} className="text-blue-600"/>
                  Budget of Work (BoW) Learning {isWholeTerm ? 'Competencies' : 'Competency'}
                </label>
                {isAutoLoaded && (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-md flex items-center gap-1">
                    <ListChecks size={14} />
                    Auto-loaded from BoW
                  </span>
                )}
              </div>
              <textarea
                id="competency"
                rows={isWholeTerm ? 8 : 3}
                value={competency}
                onChange={(e) => {
                  setCompetency(e.target.value);
                  setIsAutoLoaded(false);
                }}
                placeholder={isWholeTerm ? "Paste all learning competencies for the entire term here..." : "Paste the target learning competency here or select a mapped Grade/Week to auto-load..."}
                className={`w-full p-4 rounded-xl border ${isAutoLoaded ? 'border-emerald-400 bg-emerald-50 focus:border-emerald-500 focus:ring-emerald-500' : 'border-slate-300 bg-slate-50 focus:border-blue-500 focus:ring-blue-500'} focus:bg-white focus:ring-2 transition-all duration-300 resize-y text-slate-800 text-sm md:text-base`}
                disabled={isLoading}
                required
              />
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={loadExample}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1.5 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50"
                disabled={isLoading}
              >
                <Lightbulb size={16} />
                Load Grade 7 Math Example
              </button>
              
              <button
                type="submit"
                disabled={isLoading || !competency.trim()}
                className="w-full sm:w-auto px-8 py-3 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    {isWholeTerm ? "Generating Whole Term..." : "wedoIT Solutions is Unpacking..."}
                  </>
                ) : (
                  <>
                    <Layers size={20} />
                    Unpack for {sessionsCount} Sessions
                  </>
                )}
              </button>
            </div>
            {isLoading && isWholeTerm && (
              <p className="text-center text-xs text-slate-500 mt-2 animate-pulse">
                Generating a full quarter pacing guide usually takes 30-45 seconds...
              </p>
            )}
          </form>
        </section>

        {/* Error State */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700 animate-in fade-in slide-in-from-bottom-2">
            <AlertCircle className="shrink-0 mt-0.5" size={20} />
            <p className="font-medium text-sm">{error}</p>
          </div>
        )}

        {/* Results & Export Section */}
        {result && !isLoading && (
          <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                  <ListChecks size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Session-Based Pacing Plan</h2>
                  <p className="text-sm text-slate-500">Successfully unpacked into {result.sessions.length} sessions.</p>
                </div>
              </div>
              
              <button 
                onClick={handleExportWord}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
              >
                <FileText size={18} />
                Download .docx
              </button>
            </div>

            {/* Visual Display of Results (not the export block) */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 bg-slate-50 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-1">{result.unpackedTitle}</h3>
                <p className="text-sm text-slate-600 flex items-center gap-2">
                  <Target size={16} className="text-blue-500"/> 
                  <span className="font-medium">Framework Focus:</span> {result.frameworkFocus}
                </p>
              </div>
              
              <div className="divide-y divide-slate-100 max-h-[800px] overflow-y-auto">
                {result.sessions.map((session, idx) => (
                  <div key={idx} className="p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 font-bold text-sm rounded-full flex items-center gap-1">
                        <Calendar size={14} />
                        Session {session.sessionNumber}
                      </span>
                      <h4 className="font-bold text-slate-800 text-lg">{session.sessionTopic}</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Knowledge (K)</p>
                        <p className="text-sm text-slate-700">{session.knowledgeObjective}</p>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Skill (S)</p>
                        <p className="text-sm text-slate-700">{session.skillObjective}</p>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Attitude (A)</p>
                        <p className="text-sm text-slate-700">{session.attitudeObjective}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hidden Export Div - Formatted specifically for Word Document conversion */}
            <div className="hidden">
              <div ref={exportRef}>
                <h2 style={{ textAlign: 'center', fontFamily: 'Arial' }}>wedoIT Solutions</h2>
                <h3 style={{ textAlign: 'center', fontFamily: 'Arial', color: '#444' }}>Session-Based Pacing Plan</h3>
                <hr />
                <p><strong>Subject:</strong> {subject}<br/>
                <strong>Grade Level:</strong> {grade}<br/>
                <strong>Term:</strong> {term}<br/>
                <strong>Scope:</strong> {isWholeTerm ? "Whole Term Unpacking" : `Week ${week}`}<br/>
                <strong>Learning Competency Focus:</strong> <br/><span style={{ fontSize: '10pt', fontStyle: 'italic', display: 'block', padding: '10px', background: '#f9f9f9', border: '1px solid #ccc' }}>{competency.replace(/\n/g, '<br/>')}</span></p>
                
                <p><strong>Unpacked Title:</strong> {result.unpackedTitle}<br/>
                <strong>Framework Focus:</strong> {result.frameworkFocus}</p>
                <br/>
                
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black', fontFamily: 'Arial' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#e0e0e0' }}>
                      <th style={{ border: '1px solid black', padding: '8px' }}>Session</th>
                      <th style={{ border: '1px solid black', padding: '8px' }}>Topic</th>
                      <th style={{ border: '1px solid black', padding: '8px' }}>Knowledge (K)</th>
                      <th style={{ border: '1px solid black', padding: '8px' }}>Skill (S)</th>
                      <th style={{ border: '1px solid black', padding: '8px' }}>Attitude/Values (A)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.sessions.map((session, idx) => (
                      <tr key={idx}>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}><strong>{session.sessionNumber}</strong></td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>{session.sessionTopic}</td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>{session.knowledgeObjective}</td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>{session.skillObjective}</td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>{session.attitudeObjective}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <br/><br/><br/>
                
                {/* Mandatory AI Use Declaration */}
                <div style={{ fontFamily: 'Arial', fontSize: '11pt', border: '1px solid #ccc', padding: '15px' }}>
                  <h3 style={{ textAlign: 'center', margin: '0 0 10px 0' }}>AI USE DECLARATION</h3>
                  <h4 style={{ textAlign: 'center', margin: '0 0 15px 0' }}>FOR TEACHER AI USE DECLARATION</h4>
                  <p style={{ textAlign: 'justify', lineHeight: '1.5' }}>
                    I used an AI Assistant to generate unpacked learning competencies with session-based pacing plans (.docx) for {subject} {grade} {term} for the purposes of curriculum unpacking, lesson planning, and instructional pacing. The prompt used was based on <strong>wedoIT Solutions — Unpacking of Learning Competencies (All Subjects)</strong>.
                  </p>
                  <p style={{ textAlign: 'justify', lineHeight: '1.5' }}>
                    I affirm that the use of AI tools was intended solely to enhance the quality of instructional material, align with curriculum standards, and support the teaching and learning process. All outputs have been reviewed, adapted, edited, and validated using my professional expertise and agency to ensure accuracy, appropriateness, and alignment with learners’ developmental needs/levels.
                  </p>
                  <p style={{ textAlign: 'justify', lineHeight: '1.5' }}>
                    Likewise, I affirm that no confidential learner information or sensitive institutional information data was shared with the AI platform/app identified above in the process.
                  </p>
                  <br/>
                  <table style={{ width: '100%', border: 'none' }}>
                    <tbody>
                      <tr>
                        <td style={{ border: 'none', width: '50%' }}>
                          ________________________________________<br/>
                          <strong>Name of Teacher</strong><br/>
                          School / Position<br/>
                          Date:<br/>
                        </td>
                        <td style={{ border: 'none', width: '50%', textAlign: 'right' }}>
                          <br/>
                          ________________________________________<br/>
                          <strong>Signature</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <br/>
                  <p style={{ textAlign: 'center', fontSize: '9pt', color: '#666' }}>
                    wedoIT Solutions — Handa ang Bawat Guro, Tagumpay ang Bawat Mag-aaral
                  </p>
                </div>
              </div>
            </div>

          </section>
        )}
      </div>
    </div>
  );
}