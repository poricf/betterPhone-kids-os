import React, { useState } from 'react';
import { X, Delete, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export const MathView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [problem, setProblem] = useState({ a: 8, b: 5 });
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);

  const checkAnswer = () => {
    if (parseInt(answer) === problem.a + problem.b) {
      setScore(s => s + 10);
      confetti({
         particleCount: 30,
         spread: 50,
         origin: { y: 0.6 }
      });
      generateProblem();
      setAnswer('');
    } else {
       // Visual feedback logic here
       setAnswer('');
    }
  };

  const generateProblem = () => {
    setProblem({
      a: Math.floor(Math.random() * 10) + 1,
      b: Math.floor(Math.random() * 10) + 1
    });
  };

  return (
    <div className="h-full bg-white flex flex-col relative font-sans">
      <div className="h-14 flex items-center justify-between px-4 border-b border-slate-100">
         <span className="font-bold text-slate-700">Math Tutor</span>
         <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full">
            <X size={20} className="text-slate-500" />
         </button>
      </div>

      {/* Screen */}
      <div className="flex-1 flex flex-col items-end justify-center px-8 pb-8 bg-slate-50">
         <div className="text-slate-400 text-lg font-medium mb-2">
            Score: {score}
         </div>
         <div className="flex items-center gap-4 text-5xl font-light text-slate-800 mb-4">
            <span>{problem.a}</span>
            <span className="text-blue-500">+</span>
            <span>{problem.b}</span>
         </div>
         <div className="text-6xl font-medium text-blue-600 min-h-[4rem]">
            {answer || '_'}
         </div>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-px bg-slate-100 pt-px pb-12">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
           <button 
             key={num}
             onClick={() => setAnswer(prev => prev.length < 3 ? prev + num : prev)}
             className="bg-white p-6 text-2xl font-medium text-slate-700 active:bg-slate-50"
           >
             {num}
           </button>
        ))}
        <button 
           onClick={() => setAnswer('')} 
           className="bg-white p-6 flex items-center justify-center text-red-500 active:bg-red-50"
        >
           <Delete size={28} />
        </button>
        <button 
             onClick={() => setAnswer(prev => prev.length < 3 ? prev + '0' : prev)}
             className="bg-white p-6 text-2xl font-medium text-slate-700 active:bg-slate-50"
        >
           0
        </button>
        <button 
           onClick={checkAnswer} 
           className="bg-blue-600 p-6 flex items-center justify-center text-white active:bg-blue-700"
        >
           <Check size={28} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};