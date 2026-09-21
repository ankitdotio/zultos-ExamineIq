const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const getAllExams = async () => {
  const response = await fetch(`${API_URL}/api/exams`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch exams');
  return data;
};

export const getExamById = async (id) => {
  const response = await fetch(`${API_URL}/api/exams/${id}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch exam');
  return data;
};

export const searchExams = async (query) => {
  const response = await fetch(`${API_URL}/api/exams?search=${encodeURIComponent(query)}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to search exams');
  return data;
};
