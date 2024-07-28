import Timer from "../../components/timer/timer";

function Edit(props) {
  return (
    <div>
      {props.timers.map((timer) => (
        <Timer
          time={timer.time}
          initial={timer.initial}
          id={timer.id}
          key={timer.id}
          handleTimerDelete={props.handleTimerDelete}
          handleTimerTimeChange={props.handleTimerTimeChange}
        />
      ))}
    </div>
  );
}

export default Edit;
