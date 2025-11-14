function UpcomingClasses() {
  const schedule = [
    { date: "Thursday Oct 2nd, 2–4pm", className: "Yoga Class", instructor: "Sai Yogesh" },
    { date: "Friday Oct 10th, 5–6pm", className: "Intro to Kickboxing", instructor: "Alex Pereira" },
    { date: "Wednesday Oct 11th, 5–6pm", className: "Zumba", instructor: "Alejandra Garcia" },
    { date: "Monday Oct 20th, 4–7pm", className: "Basketball Tournament", instructor: "LeBron James" },
    { date: "Friday Nov 1st, 2–4pm", className: "Mental Health & Fitness", instructor: "James David" },
  ];

  return (
    <>
      <h1>Upcoming Classes:</h1>
      <div className={`classes-list-container ${schedule.length > 5 ? "scrollable" : ""}`}>
        <ul className="list-group">
          {schedule.map((item, index) => (
            <li key={index} className="list-group-item schedule-item">
            <div className="class-info">
              <div className="schedule-date">{item.date}</div>
              <div className="schedule-class">{item.className}</div>
              <div className="schedule-instructor">Instructor: {item.instructor}</div>
            </div>
            <button type="submit" className="cancel-class">Cancel</button>
          </li>
          ))}
        </ul>
      </div>
      <div className="view-classes-wrapper">
        <button type="submit" className="view-class-btn">
          View All Available Classes
        </button>
      </div>
    </>
  );
}

export default UpcomingClasses;
