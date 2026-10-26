import React, { useState } from 'react';
import { submitBugReport } from './api';

const EMPTY_FORM = {
  title: '',
  severity: '',
  description: '',
  stepsCount: 1,
};

export default function App() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successId, setSuccessId] = useState(null);
  const [serverError, setServerError] = useState('');

  // 1. Bug #1 & #6 Fix: Comprehensive validate function
  const validate = (data) => {
    const errs = {};
    if (!data.title.trim()) {
      errs.title = 'Bug title is required.';
    }
    if (!data.severity) {
      errs.severity = 'Please select a severity level.';
    }
    if (!data.description.trim()) {
      errs.description = 'Description is required.';
    }
    if (data.stepsCount === '' || Number(data.stepsCount) < 1) {
      errs.stepsCount = 'Steps count must be at least 1.';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccessId(null);

    // Bug #1 Gate: Stop submission if validation fails
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Bug #2 Fix: Set loading state before async call
    setLoading(true);

    try {
      const result = await submitBugReport(form);
      // Bug #3 Fix: Reset form on success
      setSuccessId(result.id);
      setForm(EMPTY_FORM);
      setErrors({});
    } catch (err) {
      // Bug #4 Fix: Route field-level vs general server errors
      if (err.field) {
        setErrors((prev) => ({ ...prev, [err.field]: err.message }));
      } else {
        setServerError(err.message || 'Failed to submit bug report.');
      }
    } finally {
      // Bug #2 Fix: Restore button state in finally
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>TrackFlow Bug Report</h2>

      {successId && (
        <div className="alert alert-success">
          Bug report submitted successfully! ID: {successId}
        </div>
      )}

      {serverError && (
        <div className="alert alert-danger">{serverError}</div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className={errors.title ? 'input-error' : ''}
          />
          {/* Bug #5 Fix: Render field error */}
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        {/* Severity Select */}
        <div className="form-group">
          <label>Severity</label>
          <select
            name="severity"
            value={form.severity}
            onChange={handleChange}
            className={errors.severity ? 'input-error' : ''}
          >
            <option value="">Select Severity</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
          {errors.severity && <span className="error-message">{errors.severity}</span>}
        </div>

        {/* Steps Count */}
        <div className="form-group">
          <label>Steps Count</label>
          <input
            type="number"
            name="stepsCount"
            value={form.stepsCount}
            onChange={handleChange}
            className={errors.stepsCount ? 'input-error' : ''}
          />
          {errors.stepsCount && <span className="error-message">{errors.stepsCount}</span>}
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className={errors.description ? 'input-error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting…' : 'Submit Bug Report'}
        </button>
      </form>
    </div>
  );
}