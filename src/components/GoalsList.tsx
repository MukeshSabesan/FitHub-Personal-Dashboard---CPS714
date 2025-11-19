import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot, querySnapshotFromJSON, DocumentData, QuerySnapshot } from "firebase/firestore";

type Goal = {
  id: string;
  text: string;
}

function GoalsList() {
  const [goals, setGoals] = useState<Goal[]>([]);
  
  const [newGoal, setNewGoal] = useState("");

  useEffect(() => {
    const goalsCollection = collection(db, "goals");

    const unsubscribe = onSnapshot(goalsCollection, (snapshot: QuerySnapshot<DocumentData>) => {
      const dbGoals: Goal[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text as string,
      }));
      setGoals(dbGoals);
    });

    return () => unsubscribe();
  }, []);

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


 const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newGoal.trim();
    if (!trimmed) return;

    try {
      await addDoc(collection(db, "goals"), {
        text: trimmed,
        createdAt: new Date(),
      });
      setNewGoal("");// clear the input
      //goals updating automatically 
    } catch (error) {
      console.error("Error adding goal:", error);
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
              <input type="checkbox" id={`goal-${index}`} className="mr-2" onChange={() => handleAchievement(item.text)}/>
               <label htmlFor={`goal-${item.id}`}>{item.text}</label>
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
