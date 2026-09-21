import { apiCall } from '@/utils/api';

export const getAllExams = async () => {
  return apiCall('/api/exams');
};

export const getExamById = async (id) => {
  return apiCall(`/api/exams/${encodeURIComponent(id)}`);
};

export const searchExams = async (query) => {
  return apiCall(`/api/exams?search=${encodeURIComponent(query)}`);
};
