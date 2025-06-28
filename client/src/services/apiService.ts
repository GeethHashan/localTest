// client/src/services/apiService.ts
const API_BASE_URL = 'http://localhost:5000/api';

// Types for API responses
export interface Course {
  id: number;
  name: string;
  specialisation: string[];
  courseCode: string;
  courseUrl?: string;
  durationMonths: number;
  description: string;
  studyMode: string;
  courseType: string;
  feeType: string;
  feeAmount?: number;
  university: {
    id: number;
    name: string;
    type: string;
  };
  faculty: {
    id: number;
    name: string;
  };
}

export interface University {
  id: number;
  name: string;
  type: string;
  website?: string;
  address?: string;
}

export interface SavedCourse {
  id: number;
  courseId: number;
  notes?: string;
  course: Course;
}

export interface ApiResponse<T> {
  action: any;
  success: boolean;
  data?: T;
  courses?: T;
  message?: string;
  error?: string;
  total?: number;
  count?: number;
}

// Course Service
export const courseService = {
  // Search courses
  searchCourses: async (query: string): Promise<ApiResponse<Course[]>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/simple-search?query=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching courses:', error);
      throw new Error('Failed to search courses');
    }
  },

  // Get all courses
  getAllCourses: async (): Promise<ApiResponse<Course[]>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/courses`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw new Error('Failed to fetch courses');
    }
  },

  // Get course by ID (you'll need to create this endpoint)
  getCourseById: async (id: number): Promise<ApiResponse<Course>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/courses/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching course:', error);
      throw new Error('Failed to fetch course');
    }
  }
};

// University Service
export const universityService = {
  // Get all universities
  getAllUniversities: async (): Promise<ApiResponse<University[]>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/universities`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching universities:', error);
      throw new Error('Failed to fetch universities');
    }
  },

  // Get university by ID (you'll need to create this endpoint)
  getUniversityById: async (id: number): Promise<ApiResponse<University>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/universities/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching university:', error);
      throw new Error('Failed to fetch university');
    }
  }
};

// Saved Courses Service
export const savedCoursesService = {
  // Get saved courses for a user
  getSavedCourses: async (userId: number): Promise<ApiResponse<SavedCourse[]>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/saved-courses/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching saved courses:', error);
      throw new Error('Failed to fetch saved courses');
    }
  },

  // Toggle bookmark (save/unsave course)
  toggleBookmark: async (userId: number, courseId: number): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/saved-courses/toggle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, courseId }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      throw new Error('Failed to toggle bookmark');
    }
  },

  // Check if course is bookmarked
  checkBookmarkStatus: async (userId: number, courseId: number): Promise<ApiResponse<{isBookmarked: boolean}>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/saved-courses/check/${userId}/${courseId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error checking bookmark status:', error);
      throw new Error('Failed to check bookmark status');
    }
  },

  // Update notes for saved course
  updateNotes: async (bookmarkId: number, notes: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/saved-courses/${bookmarkId}/notes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notes }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating notes:', error);
      throw new Error('Failed to update notes');
    }
  },

  // Remove bookmark
  removeBookmark: async (bookmarkId: number): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/saved-courses/${bookmarkId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error removing bookmark:', error);
      throw new Error('Failed to remove bookmark');
    }
  }
};

// Health check service
export const healthService = {
  checkHealth: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`http://localhost:5000/health`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error checking health:', error);
      throw new Error('Failed to check server health');
    }
  }
};

// Export all services
export const apiService = {
  courses: courseService,
  universities: universityService,
  savedCourses: savedCoursesService,
  health: healthService
};