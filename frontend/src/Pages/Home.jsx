export const Home = () => {
  return (
    // <div className="bg-blue-50 min-h-screen">
      
    //   {/* HERO SECTION */}
    //   <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
        
    //     {/* TEXT */}
    //     <div>
    //       <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
    //         Find Your Dream Job
    //       </h1>
    //       <p className="text-gray-600 mt-4">
    //         Search thousands of jobs, apply easily and get hired faster.
    //       </p>

    //       <a
    //         href="/jobs"
    //         className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
    //       >
    //         Browse Jobs
    //       </a>
    //     </div>

    //     {/* IMAGE */}
    //     <div>
    //       <img
    //         src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
    //         alt="Job Search"
    //         className="rounded-xl shadow-md w-full"
    //       />
    //     </div>
    //   </section>

    //   {/* FEATURES */}
    //   <section className="max-w-6xl mx-auto px-4 py-12">
    //     <h2 className="text-2xl font-bold text-center mb-8">
    //       Why Choose JobPortal?
    //     </h2>

    //     <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          
    //       <div className="bg-white p-6 rounded-xl shadow text-center">
    //         <h3 className="font-semibold text-lg text-blue-600">
    //           Easy Apply
    //         </h3>
    //         <p className="text-gray-600 mt-2">
    //           Apply to jobs in just one click.
    //         </p>
    //       </div>

    //       <div className="bg-white p-6 rounded-xl shadow text-center">
    //         <h3 className="font-semibold text-lg text-blue-600">
    //           Verified Companies
    //         </h3>
    //         <p className="text-gray-600 mt-2">
    //           We list only trusted employers.
    //         </p>
    //       </div>

    //       <div className="bg-white p-6 rounded-xl shadow text-center">
    //         <h3 className="font-semibold text-lg text-blue-600">
    //           Track Applications
    //         </h3>
    //         <p className="text-gray-600 mt-2">
    //           See status of all your applications.
    //         </p>
    //       </div>

    //     </div>
    //   </section>

    // </div>
    <div className="bg-slate-50 min-h-screen">

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-400 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Build Your Career <br />
              With The Right Job
            </h1>

            <p className="mt-5 text-blue-100 text-lg">
              Discover verified jobs, apply instantly, and track your applications — all in one place.
            </p>

            <div className="mt-8 flex gap-4">
              <a
                href="/jobs"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
              >
                Explore Jobs
              </a>

              <a
                href="/signup"
                className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition"
              >
                Get Started
              </a>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              className="rounded-2xl shadow-2xl"
              alt="career"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
<section className="max-w-6xl mx-auto px-6 py-20">
  <h2 className="text-3xl font-bold text-center mb-14">
    How JobPortal Works
  </h2>

  <div className="grid md:grid-cols-3 gap-10">
    
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
      <div className="text-blue-600 text-4xl font-bold mb-4">1</div>
      <h3 className="text-xl font-semibold mb-2">Create Profile</h3>
      <p className="text-gray-600">
        Sign up and complete your profile with skills and resume.
      </p>
    </div>

    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
      <div className="text-blue-600 text-4xl font-bold mb-4">2</div>
      <h3 className="text-xl font-semibold mb-2">Apply for Jobs</h3>
      <p className="text-gray-600">
        Browse verified jobs and apply in just one click.
      </p>
    </div>

    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
      <div className="text-blue-600 text-4xl font-bold mb-4">3</div>
      <h3 className="text-xl font-semibold mb-2">Get Hired</h3>
      <p className="text-gray-600">
        Track applications and get hired faster.
      </p>
    </div>

  </div>
</section>


      {/* FEATURE CARDS */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why JobPortal?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "One-Click Apply",
              desc: "Apply to jobs instantly without lengthy forms."
            },
            {
              title: "Verified Recruiters",
              desc: "Every company is manually reviewed."
            },
            {
              title: "Track Applications",
              desc: "Know your application status in real time."
            }
          ].map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition"
            >
              <h3 className="text-xl font-semibold text-blue-600">
                {f.title}
              </h3>
              <p className="text-gray-600 mt-3">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
