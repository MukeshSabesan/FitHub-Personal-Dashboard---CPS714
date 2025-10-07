function UpcomingClasses() {

    const schedule = [
        'Thursday Oct 2nd, 2-4pm, Yoga Class, Instructor: Sai Yogesh',
        'Friday Oct 10th, 5-6pm, Intro to Kickboxing, Instructor: Alex Pereira',
        'Wednesday Oct 11th, 5-6pm, Zumba, Instructor: Alejandra Garicia',
        'Monday Oct 20th, 4-7pm, Basketball Tournament, Organizer: LeBron James',
        'Friday Nov 1st, 2-4pm, Mental Health & Fitness, Instructor: James David'
    ];

    return (
         <>
      <h1>Upcoming Classes:</h1>
      <ul className="list-group">
        {schedule.map((item, index) => (
          <li key={item} className="list-group-item">
            <label htmlFor={`schedule-${index}`}>{item}</label>
          </li>
        ))}
      </ul>     
    </>
    );
}

export default UpcomingClasses;