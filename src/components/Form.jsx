import React, { useState, useEffect } from "react";
import BirdAudio from "../assets/bird.mp3";
import RainAudio from "../assets/rain.mp3";
import NoisyAudio from "../assets/Noisey.mp3";
import BadResultAudio from "../assets/badresult.mp3";
import ApplauseAudio from "../assets/Applause.wav";

const Form = () => {
  const [studentName, setStudentName] = useState("");
  const [firstExamMarks, setFirstExamMarks] = useState(0);
  const [secondExamMarks, setSecondExamMarks] = useState(0);
  const [finalExamMarks, setFinalExamMarks] = useState(0);
  const [participationMarks, setParticipationMarks] = useState(0);
  const [numAbsences, setNumAbsences] = useState(0);
  const [total, setTotal] = useState(0);
  const [grade, setGrade] = useState("");
  const [birdAudio, setBirdAudio] = useState(null);
  const [rainAudio, setRainAudio] = useState(null);
  const [nameError, setNameError] = useState(false);
  const [firstExamError, setFirstExamError] = useState(false);
  const [secondExamError, setSecondExamError] = useState(false);
  const [finalExamError, setFinalExamError] = useState(false);
  const [studentsData, setStudentsData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const toggleTable = () => {
    setShowTable(!showTable);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("studentsData");
    if (storedData) {
      setStudentsData(JSON.parse(storedData));
    }

    const birdAudioElement = new Audio(BirdAudio);
    birdAudioElement.loop = true;
    birdAudioElement.volume = 0.5;

    const rainAudioElement = new Audio(RainAudio);
    rainAudioElement.loop = true;
    rainAudioElement.volume = 0.5;

    setBirdAudio(birdAudioElement);
    setRainAudio(rainAudioElement);

    birdAudioElement.play().catch((error) => {
      console.error("Autoplay was prevented:", error);
    });

    return () => {
      birdAudioElement.pause();
      birdAudioElement.currentTime = 0;
      rainAudioElement.pause();
      rainAudioElement.currentTime = 0;
    };
  }, []);

  const playRainAudio = () => {
    if (birdAudio) {
      birdAudio.pause();
      birdAudio.currentTime = 0;
    }
    if (rainAudio) {
      rainAudio.play().catch((error) => {
        console.error("Autoplay was prevented:", error);
      });
    }
  };

  const playBirdAudio = () => {
    if (rainAudio) {
      rainAudio.pause();
      rainAudio.currentTime = 0;
    }
    if (birdAudio) {
      birdAudio.play().catch((error) => {
        console.error("Autoplay was prevented:", error);
      });
    }
  };

  const handleFocus = () => {
    playRainAudio();
  };

  const handleBlur = () => {
    playBirdAudio();
  };

  const validateExamMarks = (marks, min, max, setValidationError) => {
    if (marks < min || marks > max) {
      setValidationError(true);
      const noisyAudioElement = new Audio(NoisyAudio);
      noisyAudioElement.play().catch((error) => {
        console.error("Autoplay was prevented:", error);
      });
    } else {
      setValidationError(false);
    }
  };

  const handleFirstExamBlur = () => {
    validateExamMarks(firstExamMarks, 0, 20, setFirstExamError);
  };

  const handleSecondExamBlur = () => {
    validateExamMarks(secondExamMarks, 0, 20, setSecondExamError);
  };

  const handleFinalExamBlur = () => {
    validateExamMarks(finalExamMarks, 0, 50, setFinalExamError);
  };

  const validateName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setStudentName(newName);

    if (!validateName(newName)) {
      setNameError(true);

      const noisyAudioElement = new Audio(NoisyAudio);
      noisyAudioElement.play().catch((error) => {
        console.error("Autoplay was prevented:", error);
      });
    } else {
      setNameError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    playBirdAudio();

    if (!validateName(studentName)) {
      setNameError(true);
      return;
    }

    validateExamMarks(firstExamMarks, 0, 20, setFirstExamError);
    validateExamMarks(secondExamMarks, 0, 20, setSecondExamError);
    validateExamMarks(finalExamMarks, 0, 50, setFinalExamError);

    if (nameError || firstExamError || secondExamError || finalExamError) {
      return;
    }

    const total =
      parseFloat(firstExamMarks) +
      parseFloat(secondExamMarks) +
      parseFloat(finalExamMarks) +
      parseFloat(participationMarks);

    setTotal(total);

    let gradeValue = "";

    if (numAbsences === "1") {
      if (total >= 0 && total <= 40) gradeValue = "F";
      else if (total > 40 && total <= 60) gradeValue = "E";
      else if (total > 60 && total <= 69) gradeValue = "D";
      else if (total > 69 && total <= 79) gradeValue = "C";
      else if (total > 79 && total <= 90) gradeValue = "B";
      else if (total > 90 && total <= 100) gradeValue = "A";
    } else {
      gradeValue = "F";
    }

    const newData = {
      studentName,
      firstExamMarks,
      secondExamMarks,
      finalExamMarks,
      participationMarks,
      numAbsences,
      total,
      grade: gradeValue,
    };

    localStorage.setItem(
      "studentsData",
      JSON.stringify([...studentsData, newData])
    );

    setStudentsData([...studentsData, newData]);

    setGrade(gradeValue);
  };

  const showAllData = () => {
    console.log("All Student Data:", studentsData);
  };

  return (
    <div className="cc max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="studentName" className="text-white">
            Student Name:
          </label>
          <input
            id="studentName"
            type="text"
            value={studentName}
            onChange={handleNameChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`w-full border-b border-[#78a2a7] focus:outline-none focus:border-[#78a2a7] rounded-[10px]  ${
              nameError ? "border-red-500" : ""
            }`}
          />
          {nameError && (
            <div className="text-red-500 mt-1">
              Error: The name must contain only letters and spaces
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="firstExamMarks" className="text-white">
            First Exam Marks (20%):
          </label>
          <input
            id="firstExamMarks"
            type="number"
            value={firstExamMarks}
            onChange={(e) => setFirstExamMarks(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleFirstExamBlur}
            className={`w-full border-b border-[#78a2a7] focus:outline-none focus:border-[#78a2a7] rounded-[10px] ${
              firstExamError ? "border-red-500" : ""
            }`}
          />
          {firstExamError && (
            <div className="text-red-500 mt-1">
              Error: You must enter a mark between 0-20
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="secondExamMarks" className="text-white">
            Second Exam Marks (20%):
          </label>
          <input
            id="secondExamMarks"
            type="number"
            value={secondExamMarks}
            onChange={(e) => setSecondExamMarks(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleSecondExamBlur}
            className={`w-full border-b border-[#78a2a7] focus:outline-none focus:border-[#78a2a7] rounded-[10px] ${
              secondExamError ? "border-red-500" : ""
            }`}
          />
          {secondExamError && (
            <div className="text-red-500 mt-1">
              Error: You must enter a mark between 0-20
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="finalExamMarks" className="text-white">
            Final Exam Marks (50%):
          </label>
          <input
            id="finalExamMarks"
            type="number"
            value={finalExamMarks}
            onChange={(e) => setFinalExamMarks(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleFinalExamBlur}
            className={`w-full border-b border-[#78a2a7] focus:outline-none focus:border-[#78a2a7] rounded-[10px] ${
              finalExamError ? "border-red-500" : ""
            }`}
          />
          {finalExamError && (
            <div className="text-red-500 mt-1">
              Error: You must enter a mark between 0-50
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="participationMarks" className="text-white">
            Participation Marks (10%):
          </label>
          <input
            id="participationMarks"
            type="number"
            value={participationMarks}
            onChange={(e) => setParticipationMarks(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-full border-b border-[#78a2a7] focus:outline-none focus:border-[#78a2a7] rounded-[10px]"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="numAbsences" className="text-white">
            Number of Absences:
          </label>
          <div className="flex justify-around">
            <label className="mr-4 text-white">
              <input
                type="radio"
                value="no"
                checked={numAbsences === "0"}
                onChange={() => setNumAbsences("0")}
                className="mr-1 "
              />
              {">="} 7 times
            </label>
            <label className="text-white">
              <input
                type="radio"
                value="Yes"
                checked={numAbsences === "1"}
                onChange={() => setNumAbsences("1")}
                className="mr-1"
              />
              {"<"} 7 times
            </label>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="flex justify-center bg-[#08545E] text-white p-2 rounded-md w-[15rem] hover:bg-[#08545E]"
          >
            Submit
          </button>
        </div>
      </form>

      {total !== 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="resultStudentName"
              className="text-sm font-medium text-[#08545E]"
            >
              Student Name:
            </label>
            <input
              id="resultStudentName"
              type="text"
              value={studentName}
              readOnly
              className="mt-1 p-2 block w-full border rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="resultTotal"
              className="text-sm font-medium text-[#08545E]"
            >
              Total:
            </label>
            <input
              id="resultTotal"
              type="text"
              value={total}
              readOnly
              className="mt-1 p-2 block w-full border rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="resultGrade"
              className="text-sm font-medium text-[#08545E]"
            >
              Grade:
            </label>
            <input
              id="resultGrade"
              type="text"
              value={grade}
              readOnly
              className={`mt-1 p-2 block w-full border rounded-md ${
                grade === "F"
                  ? "border-red-500"
                  : grade === "A"
                  ? "border-blue-500"
                  : ""
              }`}
            />
            {grade === "F" && (
              <div className="text-red-500 mt-1">You need more effort</div>
            )}
            {grade === "A" && (
              <div className="text-blue-500 mt-1">Great Effort</div>
            )}
          </div>
        </div>
      )}

      {grade === "F" && (
        <audio autoPlay>
          <source src={BadResultAudio} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}

      {grade === "A" && (
        <audio autoPlay>
          <source src={ApplauseAudio} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default Form;
