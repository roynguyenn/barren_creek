export default function ProgressBar({ completed, total, onReset }) {
  const percent = Math.round((completed / total) * 100);

  return (
    <div className="progress-bar-wrapper">
      <div className="progress-bar-header">
        <span className="progress-label">
          {completed === total
            ? '🎉 All zones complete!'
            : `Zone ${completed + 1} of ${total}`}
        </span>
        <span className="progress-fraction">{completed}/{total}</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      {completed > 0 && (
        <button className="reset-btn" onClick={onReset}>
          reset progress
        </button>
      )}
    </div>
  );
}
