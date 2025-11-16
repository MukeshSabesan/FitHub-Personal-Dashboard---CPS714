import { useState } from "react";
import { achievementsDB as db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";


function GoalsList() {
  const [goals, setGoals] = useState<string[]>([
    "Attend 5 Kickboxing classes in a month",
    "Go to the gym 4 times a week minimum",
    "Cut 5 lbs in a month",
    "Bench 225 lbs",
    "Do 8 pullups"
  ]);

  const [newGoal, setNewGoal] = useState("");



   const handleAchievement = async (goal: string) => {
    try {
      await addDoc(collection(db, "achievements"), {
        goal: goal,
        completed: true,
        completedAt: new Date(),
      });
      console.log("Achievement saved:", goal);
    } catch (error) {
      console.error("Error saving achievement:", error);
    }
  };


  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.trim()) {
      setGoals([...goals, newGoal]);
      setNewGoal("");
    }
  };

  return (
    <>
      <h1>Goals:</h1>

      {/* This container will scroll ONLY when > 8 goals */}
      <div className={`goals-list-container ${goals.length > 8 ? "scrollable" : ""}`}>
        <ul className="list-group">
          {goals.map((item, index) => (
            <li key={index} className="list-group-item">
              <input type="checkbox" id={`goal-${index}`} className="mr-2" onChange={() => handleAchievement(item)} />
              <label htmlFor={`goal-${index}`}>{item}</label>
            </li>
          ))}
        </ul>
      </div>

      {/* Add spacing below list */}
      <form onSubmit={handleAddGoal} className="add-goal-form">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new goal..."
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
        />
        <button type="submit" className="add-goal-btn">
          Add Goal
        </button>
      </form>
    </>
  );
}

export default GoalsList;
