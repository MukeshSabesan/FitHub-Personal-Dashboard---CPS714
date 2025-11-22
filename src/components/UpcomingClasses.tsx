import { useEffect, useState } from "react";
import { ref, onValue, remove } from "firebase/database";
import { fithubDB } from "../firebase";
import { useUser } from "../context/UserContext";

function UpcomingClasses() {
  const { user } = useUser();
  const [classes, setClasses] = useState<any[]>([]);

  useEffect(() => {
    if (!user || !user.username) return;

    const classesRef = ref(
      fithubDB,
      `users/${user.username}/upcomingclasses`
    );

    const unsubscribe = onValue(classesRef, (snapshot) => {
      if (!snapshot.exists()) {
        setClasses([]);
        return;
      }

      const data = snapshot.val();

      const list = Object.entries(data).map(
        ([id, info]: [string, any]) => ({
          id,
          ...info,
        })
      );

      setClasses(list);
    });

    return () => unsubscribe();
  }, [user]);

  const cancelClass = async (classId: string) => {
    if (!user || !user.username) return;

    const classRef = ref(
      fithubDB,
      `users/${user.username}/upcomingclasses/${classId}`
    );

    await remove(classRef);
  };

  return (
    <>
      <h1>Upcoming Classes:</h1>

      {classes.length === 0 ? (
        <p>You have no upcoming classes.</p>
      ) : (
        <div
          className={`classes-list-container ${
            classes.length > 5 ? "scrollable" : ""
          }`}
        >
          <ul className="list-group">
            {classes.map((cls) => (
              <li key={cls.id} className="list-group-item schedule-item">
                <div className="class-info">
                  <div className="schedule-date">{cls.date}</div>
                  <div className="schedule-class">{cls.name}</div>
                  <div className="schedule-instructor">
                    Instructor: {cls.instructor}
                  </div>
                </div>

                <button
                  className="cancel-class"
                  onClick={() => cancelClass(cls.id)}
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="view-classes-wrapper">
        <button className="view-class-btn">
          View All Available Classes
        </button>
      </div>
    </>
  );
}

export default UpcomingClasses;
