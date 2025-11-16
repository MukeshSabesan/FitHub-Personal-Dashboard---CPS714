import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function Achievements() {
  const [achievements, setAchievements] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const snapshot = await getDocs(collection(db, "achievements"));
      setAchievements(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    load();
  }, []);

  return (
    <div className="achievments-container">
      <h2>Your Achievements</h2>

      {achievements.length === 0 ? (
        <p>No achievements yet.</p>
      ) : (
        <ul className="list-group">
          {achievements.map((ach) => (
            <li key={ach.id} className="list-group-item">
              <strong>{ach.goal}</strong>
              <br />
              <small>
                Completed:{" "}
                {new Date(ach.completedAt.seconds * 1000).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Achievements;
