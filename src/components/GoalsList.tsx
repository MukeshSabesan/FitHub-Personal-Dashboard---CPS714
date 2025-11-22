import { useState, useEffect  } from "react";
import { achievementsDB as db } from "../firebase";
import { collection, addDoc, QuerySnapshot, DocumentData, onSnapshot, query, where} from "firebase/firestore";
import { useUser } from "../context/UserContext";

type Goal = {
  id: string;
  text: string;
};

function GoalsList() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const { user } = useUser();
  const [newGoal, setNewGoal] = useState("");

   const handleAchievement = async (goal: string) => {
    try {
      await addDoc(collection(db, "achievements"), {
        username: user?.username,
        email: user?.email,
        goal: goal,
        completed: true,
        completedAt: new Date(),
      });
      console.log("Achievement saved:", goal);
    } catch (error) {
      console.error("Error saving achievement:", error);
    }
  };

  useEffect(() => {
    if (!user?.email) return;
    const goalsCol = collection(db, "goals");
    const que = query(goalsCol, where("email", "==", user.email));

    const unsubscribe = onSnapshot(
      que,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const dbGoals: Goal[] = snapshot.docs.map((doc) => ({
          username: user?.username,
          email: user?.email,
          id: doc.id,
          text: doc.data().text as string,
        }));
        setGoals(dbGoals);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newGoal.trim();
     if (!trimmed || !user?.email) return;

    try {
      await addDoc(collection(db, "goals"), {
        username: user?.username,
        email: user?.email,
        text: trimmed,
        createdAt: new Date(),
      });
      setNewGoal("");
      // Should update goals automatically
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  return (
    <>
      <h1>Goals:</h1>

      <div className={`goals-list-container ${goals.length > 8 ? "scrollable" : ""}`}>
        <ul className="list-group">
          {goals.map((item, index) => (
            <li key={item.id} className="list-group-item">
              <input type="checkbox" id={`goal-${item.id}`} className="me-2" onChange={() => handleAchievement(item.text)} />
              <label htmlFor={`goal-${item.id}`}>{item.text}</label>
            </li>
          ))}
        </ul>
      </div>

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
