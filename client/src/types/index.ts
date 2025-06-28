// client/src/types/index.ts - Updated with compatible Course types

// Re-export API service types for convenience
export type {
  Course as ApiCourse,
  University as ApiUniversity,
  SavedCourse as ApiSavedCourse,
  ApiResponse
} from '../services/apiService';

// Your existing University interface (enhanced)
export interface University {
  id: number;
  name: string;
  programs?: number;
  location?: string;
  image?: string;
  description?: string;
  established?: number;
  type: 'government' | 'private' | 'semi_government';
  website?: string;
  address?: string;
}

// Faculty interface
export interface Faculty {
  id: number;
  name: string;
}

// Enhanced Course interface that supports both your existing format AND API format
export interface Course {
  id: number;
  name: string;
  description: string;
  
  // University can be either string (your existing) or object (API)
  university: string | University | { id: number; name: string; type: string };
  
  // Faculty can be optional and either string or object
  faculty?: string | Faculty | { id: number; name: string };
  
  // Duration can be in different formats
  duration?: string; // Your existing format like "4 years"
  durationMonths?: number; // API format
  
  // Optional fields that may exist in either format
  requirements?: string[];
  category?: string;
  specialisation?: string[];
  courseCode?: string;
  courseUrl?: string;
  url?: string; // Alternative URL field
  studyMode?: string;
  courseType?: string;
  feeType?: string;
  feeAmount?: number;
}

// Rest of your existing types...
export interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  author?: string;
  readTime?: string;
}

// Enhanced Search Filters
export interface SearchFilters {
  query?: string;
  location?: string;
  category?: string;
  universityType?: 'all' | 'government' | 'private' | 'semi_government';
  // Additional filters
  university?: string[];
  faculty?: string[];
  studyMode?: string[];
  feeType?: string[];
  duration?: string[];
  minFee?: number;
  maxFee?: number;
}

export interface UserQualifications {
  alResults: {
    subject: string;
    grade: string;
  }[];
  otherQualifications: string[];
}

// Import types from savedCourses.ts
export type {
  SavedCourseDetails,
  SavedCourse,
  BookmarkToggleRequest,
  BookmarkToggleResponse,
  SavedCoursesApiResponse,
  BookmarkCheckResponse,
  ApiErrorResponse,
  NotesUpdateRequest,
  NotesUpdateResponse,
  StudyMode,
  CourseType,
  FeeType,
  CourseFilters,
  CourseAnalytics
} from './savedCourses';

// Additional UI-specific types
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  resultsPerPage: number;
}

// User types (extending your existing auth)
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin' | 'editor' | 'manager';
  profileData?: {
    olResults?: any;
    alResults?: any;
    preferences?: any;
    careerInterests?: any;
  };
}

// Navigation types
export type PageType = 'home' | 'course-flow' | 'signup' | 'login' | 'userdashboard' | 'admin';

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Event types for calendar/news
export interface NewsEvent {
  id: string;
  title: string;
  date: string;
  type: 'application' | 'exam' | 'result' | 'general';
  description: string;
  hasReminder: boolean;
}

export interface Reminder {
  id: string;
  eventId: string;
  reminderDate: string;
  reminderTime: string;
}

// Form types
export interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
}

// Loading and error states
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// API status
export interface ApiStatus {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Redux state interfaces
export interface CourseState {
  searchResults: Course[];
  searchQuery: string;
  searchLoading: boolean;
  searchError: string | null;
  allCourses: Course[];
  allCoursesLoading: boolean;
  allCoursesError: string | null;
  selectedCourse: Course | null;
  selectedCourseLoading: boolean;
  selectedCourseError: string | null;
  filters: SearchFilters;
  currentPage: number;
  totalPages: number;
  totalResults: number;
}

export interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}