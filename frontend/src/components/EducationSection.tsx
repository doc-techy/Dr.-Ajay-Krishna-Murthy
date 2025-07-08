'use client';

export default function EducationSection() {
  const educationData = [
    {
      degree: "Fellowship in Oculoplasty",
      institution: "L.V. Prasad Eye Institute",
      location: "Hyderabad, India",
      year: "2019",
      description: "Advanced subspecialty training in Oculoplastic and Reconstructive Surgery",
      icon: "🏆",
      highlight: "Fellowship"
    },
    {
      degree: "MS Ophthalmology",
      institution: "Jawaharlal Institute of Postgraduate Medical Education and Research (JIPMER)",
      location: "Puducherry, India", 
      year: "2017",
      description: "Master of Surgery in Ophthalmology with academic excellence",
      icon: "👁️",
      highlight: "Postgraduate"
    },
    {
      degree: "MBBS",
      institution: "A.J Hospital and Research Centre",
      location: "Mangalore, India",
      year: "2014",
      description: "Bachelor of Medicine and Bachelor of Surgery with distinction",
      icon: "🎓",
      highlight: "Undergraduate"
    }
  ];

  const professionalData = [
    {
      position: "Freelance Oculoplasty Consultant",
      organization: "Independent Practice",
      location: "Bangalore, India",
      year: "2019 - Present",
      description: "Comprehensive oculoplastic surgical services with focus on advanced lid and orbital procedures",
      icon: "💼",
      highlight: "Current",
      // details: ["Advanced oculoplastic procedures", "Patient-centered care", "Surgical innovation"]
    },
    {
      position: "Consulting Ophthalmologist",
      organization: "HCG Cancer Center",
      location: "K.R. Road, Bangalore",
      year: "2023 - Present",
      description: "Specialized ophthalmic oncology and reconstructive procedures",
      icon: "🏥",
      highlight: "Current",
      // details: ["Ophthalmic oncology", "Reconstructive surgery", "Multidisciplinary care"]
    },
    {
      position: "Consultant Oculoplasty",
      organization: "L.V. Prasad Eye Institute",
      location: "Hyderabad, India",
      year: "2018 - 2019",
      description: "Advanced oculoplastic procedures and fellowship training supervision",
      icon: "🔬",
      highlight: "Previous",
      // details: ["Complex oculoplastic cases", "Training supervision", "Research collaboration"]
    },
    {
      position: "Consultant Ophthalmologist",
      organization: "Narayana Nethralaya",
      location: "Bangalore, India",
      year: "2019 -  Present",
      description: "Comprehensive eye care and oculoplastic surgical services",
      icon: "👨‍⚕️",
      highlight: "Previous",
      // details: ["Comprehensive eye care", "Surgical procedures", "Patient consultation"]
    }
  ];

  return (
    <div className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-amber-50"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-orange-200/30 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          {/* <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-md rounded-2xl px-8 py-4 shadow-lg border border-white/20 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-sm font-bold">CV</span>
            </div>
            <span className="text-amber-700 font-semibold text-lg">Professional Profile</span>
          </div> */}
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Academic Excellence &
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent"> Professional Mastery</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            A distinguished career built on exceptional academic foundations and comprehensive professional experience 
            at India&apos;s most prestigious medical institutions.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-32 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div className="text-center lg:text-left mb-12">
              {/* <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-xl px-6 py-3 shadow-md border border-amber-200/50 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">ED</span>
                </div>
                <span className="text-blue-700 font-semibold">Educational Background</span>
              </div> */}
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Academic Journey</h3>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full lg:mx-0 mx-auto"></div>
            </div>

            <div className="space-y-6">
              {educationData.map((education, index) => (
                <div
                  key={index}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-white/50 hover:border-blue-200/60 hover:-translate-y-1"
                >
                  {index !== educationData.length - 1 && (
                    <div className="absolute left-8 top-20 w-0.5 h-12 bg-gradient-to-b from-blue-300 to-indigo-300 opacity-30"></div>
                  )}
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl">{education.icon}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                          {education.highlight}
                        </span>
                        <span className="text-lg font-bold text-blue-600">{education.year}</span>
                      </div>
                      
                      <h4 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                        {education.degree}
                      </h4>
                      <h5 className="text-base font-semibold text-gray-700 mb-1">
                        {education.institution}
                      </h5>
                      <p className="text-sm text-gray-600 mb-3 font-medium">
                        📍 {education.location}
                      </p>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {education.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="text-center lg:text-left mb-12">
              {/* <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-xl px-6 py-3 shadow-md border border-amber-200/50 mb-6"> */}
                {/* <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">PR</span>
                </div> */}
                {/* <span className="text-amber-700 font-semibold">Professional Background</span> */}
              {/* </div> */}
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Career Progression</h3>
              <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full lg:mx-0 mx-auto"></div>
            </div>

            <div className="space-y-6">
              {professionalData.map((experience, index) => (
                <div
                  key={index}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-white/50 hover:border-amber-200/60 hover:-translate-y-1"
                >
                  {index !== professionalData.length - 1 && (
                    <div className="absolute left-8 top-20 w-0.5 h-12 bg-gradient-to-b from-amber-300 to-orange-300 opacity-30"></div>
                  )}
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl">{experience.icon}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          experience.highlight === 'Current' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {experience.highlight}
                        </span>
                        <span className="text-lg font-bold text-amber-600">{experience.year}</span>
                      </div>
                      
                      <h4 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-amber-700 transition-colors">
                        {experience.position}
                      </h4>
                      <h5 className="text-base font-semibold text-gray-700 mb-1">
                        {experience.organization}
                      </h5>
                      <p className="text-sm text-gray-600 mb-3 font-medium">
                        📍 {experience.location}
                      </p>
                      <p className="text-gray-600 leading-relaxed text-sm mb-3">
                        {experience.description}
                      </p>
                      
                      {/* <div className="space-y-1">
                        {experience.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* <div className="mt-20">
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-sm font-bold">⭐</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Professional Excellence</h3>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6">
                &quot;My journey from JIPMER&apos;s rigorous academic environment to specialized fellowship training 
                at L.V. Prasad Eye Institute has shaped my commitment to excellence in oculoplastic surgery. 
                Every patient deserves the highest standard of care backed by continuous learning and innovation.&quot;
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-xl">🎓</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">Academic Excellence</h4>
                  <p className="text-sm text-gray-600">Top-tier medical education</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-xl">💼</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">Professional Growth</h4>
                  <p className="text-sm text-gray-600">Progressive career advancement</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-xl">🏆</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">Specialized Expertise</h4>
                  <p className="text-sm text-gray-600">Advanced oculoplastic mastery</p>
                </div>
              </div>
              
              <div className="mt-6">
                <span className="text-amber-700 font-semibold italic">- Dr. Ajay Krishna Murthy</span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
} 