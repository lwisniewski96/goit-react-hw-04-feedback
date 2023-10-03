import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Dodajemy import PropTypes

export const Widget = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleFeedbackClick = feedbackType => {
    setFeedback(prevState => ({
      ...prevState,
      [feedbackType]: prevState[feedbackType] + 1,
    }));
  };

  const totalFeedback = Object.values(feedback).reduce(
    (acc, value) => acc + value,
    0
  );

  const countPositiveFeedbackPercentage = () => {
    const { good } = feedback;
    return totalFeedback === 0 ? 0 : (good / totalFeedback) * 100;
  };

  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={handleFeedbackClick}
        />
      </Section>
      <Section title="Statistics">
        {totalFeedback > 0 ? (
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={totalFeedback}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};

Widget.propTypes = {};

const Section = ({ title, children }) => (
  <div>
    <h2>{title}</h2>
    {children}
  </div>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const FeedbackOptions = ({ options, onLeaveFeedback }) => (
  <div>
    {options.map(option => (
      <button
        key={option}
        type="button"
        onClick={() => onLeaveFeedback(option)}
      >
        {option}
      </button>
    ))}
  </div>
);

FeedbackOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired, // options to tablica ciągów znaków i jest wymagana
  onLeaveFeedback: PropTypes.func.isRequired, // onLeaveFeedback to funkcja i jest wymagana
};

const Statistics = ({ good, neutral, bad, total, positivePercentage }) => (
  <div>
    <p>Good: {good}</p>
    <p>Neutral: {neutral}</p>
    <p>Bad: {bad}</p>
    <p>Total: {total}</p>
    <p>Positive Feedback Percentage: {positivePercentage.toFixed(2)}%</p>
  </div>
);

Statistics.propTypes = {
  good: PropTypes.number.isRequired, // good to liczba i jest wymagana
  neutral: PropTypes.number.isRequired, // neutral to liczba i jest wymagana
  bad: PropTypes.number.isRequired, // bad to liczba i jest wymagana
  total: PropTypes.number.isRequired, // total to liczba i jest wymagana
  positivePercentage: PropTypes.number.isRequired, // positivePercentage to liczba i jest wymagana
};

const Notification = ({ message }) => <p>{message}</p>;

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};
