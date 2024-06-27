
import React, { useState, useEffect } from 'react';

const AgeCalculator = () => {
  const [dob, setDob] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [age, setAge] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    let interval;
    if (isCalculating) {
      interval = setInterval(() => {
        calculateAge();
      }, 1000); 
    }
    return () => clearInterval(interval);
  }, [isCalculating]);

  const handleChange = (e) => {
    e.preventDefault();
    setIsCalculating(false);
    setDob(e.target.value);
  };

  const handleClick = () => {
    if (dob) {
      setIsCalculating(true);
      calculateAge();
    }
  };

  const calculateAge = () => {
    const birthDate = new Date(dob);
    const currentDate = new Date();


    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();
    let hours = currentDate.getHours() - birthDate.getHours();
    let minutes = currentDate.getMinutes() - birthDate.getMinutes();
    let seconds = currentDate.getSeconds() - birthDate.getSeconds();

    if (seconds < 0) {
      seconds += 60;
      minutes--;
    }
    if (minutes < 0) {
      minutes += 60;
      hours--;
    }
    if (hours < 0) {
      hours += 24;
      days--;
    }
    if (days < 0) {
      const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
      days += lastMonth.getDate();
      months--;
    }
    if (months < 0) {
      months += 12;
      years--;
    }

    setAge({
      years: years,
      months: months,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    });
  };

  return (
    <div className="container w-full md:w-1/3 flex flex-col mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Age Live Prediction</h1>
      <label htmlFor="dob" className="block mb-2">
        Enter your Date of Birth:
      </label>
      <input
        type="date"
        id="dob"
        name="dob"
        value={dob}
        onChange={handleChange}
        className="border border-gray-300 text-[#a484f5] rounded px-3 py-2 mb-4"
      />
      <button
        onClick={handleClick}
        className="bg-[#a484f5] text-white rounded px-3 py-2"
      >
        Show LIve
      </button>
      {isCalculating && (
        <div className="my-10">
          <p>Live Age:</p>
          <div className="border border-gray-300 text-2xl hover:bg-slate-200 hover:text-black hover:shadow-md shadow-red-700 font-semibold rounded my-2 px-3 py-6">
            <div>
              <div className='flex flex-col text-4xl'>
                <div><span className='text-[#a484f5] font-extrabold text-8xl'>{age.years}</span> <span className='text-6xl font-extrabold'> Years</span></div>
                <div><span className='text-[#a484f5] font-extrabold text-8xl'>{age.months}</span> <span className='text-6xl font-extrabold'> Months</span></div>
                <div><span className='text-[#a484f5] font-extrabold text-8xl'>{age.days}</span> <span className='text-6xl font-extrabold'> Days</span></div>
              </div>
              <div className='pt-4 pl-4 font-semibold'>
                {age.hours} Hours, {age.minutes} Minutes, <span className='text-red-700'>{age.seconds} Seconds</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgeCalculator;
