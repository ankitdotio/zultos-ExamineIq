import { apiCall, API_CONFIGURED } from '@/utils/api';

export const getAllExams = async () => {
  if (!API_CONFIGURED) return [];

  const response = await apiCall('/api/exams');

  // Support different backend response formats
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.exams)) {
    return response.exams;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  return [];
};

export const getExamById = async (id) => {
  const exams = await getAllExams();

  const searchValue = decodeURIComponent(String(id))
    .trim()
    .toLowerCase();

  const exam = exams.find((item) => {
    const examId = String(
      item?._id ?? item?.id ?? ''
    )
      .trim()
      .toLowerCase();

    const examName = String(
      item?.name ?? item?.examName ?? ''
    )
      .trim()
      .toLowerCase();

    return (
      examId === searchValue ||
      examName === searchValue
    );
  });

  if (exam) {
    return exam;
  }

  throw new Error('Exam not found');
};

export const searchExams = async (query) => {
  if (!API_CONFIGURED) return [];

  const response = await apiCall(
    `/api/exams?search=${encodeURIComponent(query)}`
  );

  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.exams)) {
    return response.exams;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  return [];
};