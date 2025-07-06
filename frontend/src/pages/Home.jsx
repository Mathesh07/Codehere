import React from 'react';
import CodeEditor from '../components/CodeEditor';
import OutputBox from '../components/OutputBox';
import ComplexityBox from '../components/ComplexityBox'; // <- new import
import Footer from '../components/Footer'; // <- new import

const Home = () => {
  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0f0f] via-[#14151a] to-[#0f0f0f] text-white p-4 flex flex-col items-center gap-6">
        <div className="w-full max-w-[1400px] flex flex-col md:flex-row gap-4">
          {/* Code Editor */}
          <div className="w-full md:w-1/2 h-[85vh]">
            <CodeEditor />
          </div>

          {/* Output Panel */}
          <div className="w-full md:w-1/2 h-[85vh]">
            <OutputBox />
          </div>
        </div>

        {/* Complexity Box */}
        <div className="w-full max-w-[1400px]">
          <ComplexityBox />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
